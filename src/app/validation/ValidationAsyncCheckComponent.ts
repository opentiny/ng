import { Component } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  first,
  map,
  catchError,
  switchMap,
} from 'rxjs/operators';
import {
  TiValidators,
  TiValidationDirective,
} from '@opentiny/ng';

@Component({
  templateUrl: './validation-async-check.html',
})
export class ValidationAsyncCheckComponent {
  asyncControl: FormControl = new FormControl(
    '',
    null,
    CustomAsyncValidators.isRightUserName()
  );

  mixControl: FormControl = new FormControl(
    '',
    [TiValidators.required, TiValidators.minLength(5)],
    CustomAsyncValidators.isRightUserName()
  );
}

export class CustomAsyncValidators {
  static isRightUserName(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      if (control.valueChanges) {
        return control.valueChanges.pipe(
          debounceTime(TiValidationDirective.ASYNC_DEBOUNCE_TIME),
          distinctUntilChanged(),
          switchMap((value: string) => CustomAsyncValidators.isRight(value)),
          map((isRight: boolean) => {
            return isRight
              ? {
                  rightUserName: {
                    actualValue: control.value,
                    tiAsyncErrorMessage: '用户名 {0} 不正确',
                  },
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

  static isRight(value: string): Observable<boolean> {
    return of(value !== 'hello tiny').pipe(
      delay(2000),
      catchError(() => of(false))
    );
  }
}
