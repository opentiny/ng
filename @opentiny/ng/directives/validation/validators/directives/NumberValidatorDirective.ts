/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { Directive, Input, forwardRef } from '@angular/core';
import { BaseValidator } from './BaseValidator';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
@Directive({
  // 数字校验与inputNumber组件重名，故此处选择器加tiValidation，其余校验规则不变
  selector: `[tiNumber][formControlName][tiValidation],[tiNumber][formControl][tiValidation],[tiNumber][ngModel][tiValidation]`,
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberValidatorDirective),
      multi: true
  }]
})
export class NumberValidatorDirective extends BaseValidator {
  static readonly NAME: string = 'tiNumber';
  @Input(NumberValidatorDirective.NAME) enabled: boolean;
  validatorStr: string = BaseValidator.getValidatorStr(NumberValidatorDirective.NAME);
}
