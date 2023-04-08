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
import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TiLocale } from '@opentiny/ng-locale';
import parsePhoneNumber, { CountryCode, PhoneNumber } from 'libphonenumber-js/max'; // max为严格匹配 TODO:都放在大括号中输入一位的时候报错
/**
 * @ignore
 */
@Directive({
  selector: `[tiPhone][formControlName],[tiPhone][formControl],[tiPhone][ngModel]`,
  providers: [
    {
      provide: NG_VALIDATORS, // 该 Token 用于配置自定义验证器 Provider
      useExisting: forwardRef(() => TiPhoneValidatorDirective),
      multi: true // 可以使用相同的 Token 去注册多个 Provider
    }
  ]
})
export class TiPhoneValidatorDirective implements Validator, OnChanges {
  private validator: ValidatorFn = Validators.nullValidator; // 校验规则函数
  private onChange?: () => void; // 承接fn的回调函数
  /**
   * @ignore
   * 电话号码校验参数
   */
  @Input() tiPhone!: CountryCode;
  ngOnChanges(changes: SimpleChanges): void {
    if ('tiPhone' in changes) {
      this._createValidator();
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

  private _createValidator(): void {
    this.validator = phone(this.tiPhone);

    function phone(code: CountryCode): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const localeWords: any = TiLocale.getLocaleWords().tiPhonenumber;

        // 输入框为空时
        if (control.value === null || control.value === undefined || control.value.length === 0) {
          return { phone: { tiErrorMessage: localeWords.not_blank } };
        }
        /**
         * 电话号码可以包含空格、逗号、括号、数字、连字符、点号，不能包含大小写字母、汉字、其他特殊字符
         * 正则表达式有^，取反集
         */
        const isInValidPhonenumberReg = /[^0-9-.,\s\(\)]/;
        if (control.value.match(isInValidPhonenumberReg)) {
          return { phone: { tiErrorMessage: localeWords.invalid } };
        }
        // 输入框非空时
        const phoneNum: PhoneNumber = parsePhoneNumber(control.value, code); // 输入字母等phoneNum为undefined

        return phoneNum && phoneNum.isValid() ? null : { phone: { tiErrorMessage: localeWords.invalid } };
      };
    }
  }
}
