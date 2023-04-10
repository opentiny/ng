import { Component } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, first, map, catchError, switchMap } from 'rxjs/operators';
import { TiValidators, TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './validation-async-check-test.html'
})
export class ValidationAsyncCheckTestComponent {
  label: string = '用户名：';
  ccControl: FormControl = new FormControl('', [TiValidators.required, TiValidators.minLength(5)], CustomAsyncValidators.isRightUserName());
  ccControl1: FormControl = new FormControl(
    '',
    [TiValidators.required, TiValidators.minLength(5)],
    CustomAsyncValidators.isRightUserName()
  );
}

export class CustomAsyncValidators {
  // 自定义异步校验规则
  static isRightUserName(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (control.valueChanges) {
        // 初始时control中可能没有valueChanges属性
        return control.valueChanges.pipe(
          debounceTime(500), // 防抖处理(输入停顿后再进行校验)
          distinctUntilChanged(), // 防止对前后相同的值进行校验
          switchMap((value: string) => CustomAsyncValidators.isRight(value)), // 进行后台请求校验
          map((isRight: boolean) => {
            // 拿到后台返回值
            // 异步校验需要在校验错误信息中通过 tiAsyncErrorMessage 属性来设置校验错误提示信息
            return isRight
              ? {
                  rightUserName: {
                    actualValue: control.value,
                    tiAsyncErrorMessage: '用户名 {0} 不正确'
                  }
                }
              : null;
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
    return of(value !== 'happy').pipe(
      delay(2000),
      catchError(() => of(false))
    );
  }
}
