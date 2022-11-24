import { Component, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import {
  TiValidationConfig,
  TiValidationCheckConfig,
  TiValidators,
} from '@opentiny/ng';

@Component({
  templateUrl: './validation-form-group-config.html',
})
export class ValidationFormGroupConfigComponent {
  myLogs: Array<string> = [];
  groupFormControl: FormGroup;
  pwdConfig: TiValidationConfig = {
    type: 'password',
  };
  constructor(fb: FormBuilder, private elementRef: ElementRef) {
    this.groupFormControl = fb.group({
      pwdInput: new FormControl('', [
        TiValidators.password({
          notEqualPosRev: () => {
            return this.groupFormControl.get('emailInput');
          },
        }),
      ]),
      emailInput: new FormControl('hello', [TiValidators.email]),
      nicknameInput: new FormControl('', [TiValidators.required]),
      childGroupFormControl: new FormGroup({usernameInput: new FormControl('', [TiValidators.required])})
    });
  }
  checkGroup(): void {
    const errors: ValidationErrors | null = TiValidators.check(this.groupFormControl);
    this.myLogs = [...this.myLogs, `整体校验结果：${JSON.stringify(errors)}`];
    if (errors) {
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement
        .querySelector(`[formControlName=${firstError}]`)
        .focus();
    }
  }
  checkGroupWithConfig(): void {
    const config: TiValidationCheckConfig = {
      emitEvent: false,
      ignoreNames: ['pwdInput'],
      onlySelf: true,
      errorsFlatted: false
    };
    const errors: ValidationErrors | null = TiValidators.check(
      this.groupFormControl,
      config
    );
    if (errors) {
      this.myLogs = [...this.myLogs, `屏蔽密码输入框的校验结果：${JSON.stringify(errors)}`];
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement
        .querySelector(`[formControlName=${firstError}]`)
        .focus();
    }
  }
  checkGroupWithErrorsFlatted(): void {
    const errors: ValidationErrors | null = TiValidators.check(
      this.groupFormControl,
      {errorsFlatted: true}
    );
    this.myLogs = [...this.myLogs, `校验结果扁平化结构：${JSON.stringify(errors)}`];
    if (errors) {
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement
        .querySelector(`[formControlName=${firstError}]`)
        .focus();
    }
  }
}
