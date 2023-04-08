import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { TiValidationDirective } from '@opentiny/ng';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './labeleditor-validation-async.html',
  styles: [
    `
      .demo-labeleditor-container {
        line-height: 30px;
        max-width: 300px;
        display: inline-block;
      }
    `
  ]
})
export class LabeleditorValidationAsyncComponent {
  label: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  asyncValidatorRules: any = [CustomAsyncValidators.isRightUserName()];
  control: FormControl = new FormControl(this.label);
}

export class CustomAsyncValidators {
  // 自定义异步校验规则
  static isRightUserName(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (control.valueChanges) {
        // 初始时control中可能没有valueChanges属性
        return control.valueChanges.pipe(
          debounceTime(TiValidationDirective.ASYNC_DEBOUNCE_TIME), // 防抖处理(输入停顿后再进行校验)
          distinctUntilChanged(), // 防止对前后相同的值进行校验
          switchMap((value: string) => CustomAsyncValidators.isRight(value)), // 进行后台请求校验
          map((isRight: boolean) => {
            // 拿到后台返回值
            // 异步校验需要在校验错误信息中通过 tiAsyncErrorMessage 属性来设置校验错误提示信息
            return isRight ? { rightUserName: { actualValue: control.value, tiAsyncErrorMessage: '用户名不正确' } } : null;
          }),
          first(), // complete control.valueChanges
          catchError(() => null)
        );
      } else {
        return of(null);
      }
    };
  }

  // 模拟后台异步请求
  static isRight(value: string): Observable<boolean> {
    return of(value !== 'tiny').pipe(
      delay(2000),
      catchError(() => of(false))
    );
  }
}
