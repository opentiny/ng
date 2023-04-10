import { Component, ElementRef, Input } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of, Subscription, zip } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';
import { TiValidationDirective, TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './validation-form-group.html'
})
export class ValidationFormGroupComponent {
  countries: Array<any> = [
    {
      label: '中国',
      englishname: 'China'
    },
    {
      label: '美国',
      englishname: 'America'
    },
    {
      label: '加拿大',
      englishname: 'Canada'
    }
  ];
  groupFormControl: FormGroup;
  showRequiredController: boolean = true;
  templateEqualValue: string = 'hello tiny';
  templateRequiredValue: string = '';
  defaultEmail: string = 'hello@example.com';
  asyncFormGroup: FormGroup;
  constructor(builder: FormBuilder, private elementRef: ElementRef) {
    this.groupFormControl = builder.group({
      emailController: new FormControl('hello tiny', [TiValidators.email, TiValidators.required]),
      requiredController: new FormControl('', [TiValidators.required]),
      selectControllor: new FormControl('', [TiValidators.required])
    });
    this.asyncFormGroup = builder.group({
      syncInput: new FormControl('', [TiValidators.required]),
      asyncInput: new FormControl('', null, CustomAsyncValidators.isRightUserName(2000))
    });
  }
  checkGroupFormControl(): void {
    const errors: ValidationErrors | null = TiValidators.check(this.groupFormControl);
    if (errors) {
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement.querySelector(`[formControlName=${firstError}]`).focus();
    }
  }
  hideAndCheck(): void {
    this.showRequiredController = false;
    this.groupFormControl.removeControl('requiredController');
  }
  resetGroup(): void {
    this.groupFormControl.reset({
      emailController: 'hello tiny',
      requiredController: '',
      selectControllor: ''
    });
  }
  selectDisabled(): void {
    if (this.groupFormControl.controls.selectControllor.disabled) {
      this.groupFormControl.controls.selectControllor.enable();
    } else {
      this.groupFormControl.controls.selectControllor.disable();
    }
  }

  checkTemplateForm(form: FormGroup): void {
    const errors: ValidationErrors | null = TiValidators.check(form);
    console.log('errors', errors);

    // 整体校验后如果需要聚焦到第一个校验不通过元素，请参考以下代码
    if (errors) {
      // 注意：要保证fb.group时各个FormControl的顺序与对应表单元素dom放置顺序一致
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement.querySelector(`[name=${firstError}]`).focus();
    }
  }

  checkAsyncForm(): void {
    let errors: ValidationErrors | null = TiValidators.check(this.asyncFormGroup);
    const pendingStatusChangesArray: Array<any> = [];
    const pendingControlsArray: Array<any> = [];
    for (const key in this.asyncFormGroup.controls) {
      if (Object.prototype.hasOwnProperty.call(this.asyncFormGroup.controls, key)) {
        const control: AbstractControl = this.asyncFormGroup.controls[key];
        if (control.pending) {
          pendingControlsArray.push({ name: key, control: control });
          pendingStatusChangesArray.push(control.statusChanges);
        }
      }
    }
    if (pendingStatusChangesArray.length > 0) {
      const pendingStatusChanges: Subscription = zip(...pendingStatusChangesArray).subscribe((resultArray: Array<string>) => {
        resultArray.forEach((result: string, index: number) => {
          if (result === 'INVALID') {
            if (errors === null) {
              errors = {};
            }
            errors[pendingControlsArray[index].name] = pendingControlsArray[index].control.errors;
          }
        });
        pendingStatusChanges.unsubscribe();
        if (errors) {
          const firstError: any = Object.keys(errors)[0];
          this.elementRef.nativeElement.querySelector(`[formControlName=${firstError}]`).focus();
        }
      });
    }
  }

  setDefaultEmail(): void {
    this.groupFormControl.controls.emailController.setValue(this.defaultEmail);
  }
}

export class CustomAsyncValidators {
  static isRightUserName(delay: number): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (control.valueChanges) {
        return control.valueChanges.pipe(
          debounceTime(TiValidationDirective.ASYNC_DEBOUNCE_TIME),
          distinctUntilChanged(),
          switchMap((value: string) => CustomAsyncValidators.isRight(value, delay)),
          map((isRight: boolean) => {
            return isRight
              ? {
                  rightUserName: {
                    actualValue: control.value,
                    tiAsyncErrorMessage: '用户名 {0} 不正确'
                  }
                }
              : null;
          }),
          first(),
          catchError(() => null)
        );
      } else {
        return of(null);
      }
    };
  }

  static isRight(value: string, time: number): Observable<boolean> {
    return of(value !== 'tiny').pipe(
      delay(time),
      catchError(() => of(false))
    );
  }
}
