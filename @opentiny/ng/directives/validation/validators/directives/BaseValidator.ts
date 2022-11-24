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
import { Directive, forwardRef, OnChanges, SimpleChanges, Type } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TiValidators } from '../TiValidators';
import { Util } from '../../../../utils/Util';
// 下面注释，是为了避免lib编译错误。具体原理未知，副作用未知。
// @dynamic
/**
 * @ignore
 */
@Directive({selector: '[BaseValidator]'})
export class BaseValidator implements Validator, OnChanges {
  public validatorStr: string;
  public baseValue: string; // 需要传参的校验规则的参数
  public enabled: boolean = true; // 无需传参的校验规则是否开启校验
  private _validator: ValidatorFn = Validators.nullValidator;
  private _onChange?: () => void;

  /**
   * 获取各directive中的参数配置
   * @param validatorClass 校验实现类
   * @param name 校验指令名：由于该方法在类外部调用，无法使用BaseValidator中的参数，因此需要传入
   */
  public static getDirectiveConfig(validatorClass: Type<any>, name: string): Directive {
    return {
        selector: `[${name}][formControlName],[${name}][formControl],[${name}][ngModel]`,
        providers: [{
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => validatorClass),
            multi: true
        }]
    };
  }
  public static getValidatorStr(name: string): any {
    return name.replace(/ti/, '')
    .replace(/^\S/, (s: string) => {
      return s.toLowerCase();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['baseValue'] || changes['enabled']) {
      this._createValidator();
      if (this._onChange) {
        this._onChange();
      }
    }
  }

  validate(c: AbstractControl): ValidationErrors|null {
    return (this.enabled === false || this.enabled as any === 'false') ? null : this._validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

  private _createValidator(): void {
    const validatorStr: string = this.validatorStr;
    const validatorParam: string = this.baseValue;
    if (Util.isArray(validatorParam)) {
      this._validator = TiValidators[validatorStr].apply(null, validatorParam);
    } else if (!Util.isUndefined(validatorParam)) {
      this._validator = TiValidators[validatorStr](validatorParam);
    } else {
      this._validator = TiValidators[validatorStr];
    }
  }
}
