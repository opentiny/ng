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
/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Util } from '../../../utils/Util';
import { TiPwdConfig } from '../checkHandle/TiPwdConfig';
import { TiValidationCheckConfig } from '../TiValidationInterface';

// 1:比较值高的； 0：比较值相等 ；-1：比较值低的
type compareResult = 1 | 0 | -1;
// 下面注释，可以避免编译lib时正则报错。原理未知，副作用未知。
// @dynamic
/**
 * Tiny封装的常用校验规则及校验方法
 *
 * ### 规则使用
 * **提供了两种使用方式：**
 *
 * 1.静态方法：通过TiValidators.XXX（规则名）在JS中定义
 *
 * 2.指令方式：对应规则的指令名为tiXXX(规则名首字母大写)，如required规则的指令名为 tiRequired
 *
 * **支持的校验规则如下：**
 *
 * | 规则名称    |  配置参数意义/类型   |  规则描述  |
 * | --------   | :-----   | :---- |
 * | required   | 无       |  为空校验    |
 * | maxLength    | 最大字符长度/number      |  字符长度最大值校验    |
 * | minLength    | 最小字符长度/number      |   字符长度最小值校验    |
 * | rangeSize    | 最小长度限制/number <br/> 最大长度限制/number      |   字符长度大小区间校验    |
 * | integer   |  无      |   整数校验     |
 * | number    |  无      |   数字校验     |
 * | digits    |  无      |   自然数校验   |
 * | maxValue    | 最大数值/number      |  数字最大数值校验    |
 * | minValue    | 最小数值/number      |   数字最小数值校验    |
 * | rangeValue    | 最小数值限制/number <br/> 最大数值限制/number    |   数字大小区间校验    |
 * | bigInteger   |  无     |   校验字符串是否为整数，不支持科学计数法       |
 * | bigNumber    |  无     |   校验字符串是否为数字，不支持科学计数法     |
 * | bigDigits    |  无     |   校验字符串是否为自然数，不支持科学计数法   |
 * | maxValueByString    | 最大数值/string      |   最大数值校验（支持任意大小和精度的数字），不支持科学计数法    |
 * | minValueByString    | 最小数值/string      |   最小数值校验（支持任意大小和精度的数字），不支持科学计数法 |
 * | rangeValueByString  | 最小数值/string      |   数值范围校验（支持任意大小和精度的数字），不支持科学计数法   |
 * | regExp   | 正则表达式参数/RegExp|string（不包括正则表达式头尾标识符'^(?:'、')$'）       |  正则校验    |
 * | email    | 无      |  邮箱校验    |
 * | contains    | 包含的内容/(string/number)     |   包含校验    |
 * | notContains    | 不包含的内容/(string/number)      |   不包含校验    |
 * | equal   | 相等的内容/(string/number/boolean )     |  相等校验    |
 * | notEqual    | 不相等的内容/(string/number)    |  不相等校验    |
 * | notScript    | 无      |   包含script标签校验    |
 * | port    |  无     |   端口号校验，范围为0~65535    |
 * | date    | 无      |   日期类型校验    |
 * | url    |  无     |   url校验    |
 * | ipv4    |  无     |   ipv4校验    |
 * | ipv6    |  无     |   ipv6校验    |
 * | minCharType | 1. 符合要求的字符种类/number;<br/>2. 字符集对象类型（可选）/{string:RegExp}。<br/>默认的字符种类分别为：大写字母、小写字母、数字、特殊字符`~!@#$%^&*()-_=+\\\|[{}];:\'\",<.>/?  和空格 | 符合最小字符种类校验，默认情况为至少包含2种字符类型`。  |
 * | notEqualPosRev    |  需要比对的表单formControl对象获取函数/ () => AbstractControl     |   不能和表单对象的正序或倒序相同    |
 * | password    | 密码校验各项规则参数/对象形式 |   密码校验   |
 *
 *
 *  **password规则的参数类型**
 *
 *    {
 *        rangeSize?: [number, number],
 *        minCharType?: [bumber, {
 *            digitsCharReg: RegExp,
 *            specialCharReg: RegExp,
 *            lowerCharReg: RegExp,
 *            upperCharReg: RegExp}],
 *        notEqualPosRev: () => AbstractControl
 *    }
 */
export class TiValidators {
  private static readonly EMAIL_REGEXP: RegExp = /^((([A-Za-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([A-Za-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
  private static readonly SCRIPT_REGEXP: RegExp = /<+\/?[Ss][Cc][Rr][Ii][Pp][Tt] *.*>*/;
  private static readonly DIGITS_REGEXP: RegExp = /^\d+$/;
  private static readonly PORT_RANGE: Array<number> = [0, 65535];
  private static readonly INTEGER_REGEXP: RegExp = /^-?\d+$/;
  private static readonly NUMBER_REGEXP: RegExp = /^(?:-?\d+|[+-]?[\d]+([\.][\d]+)?([Ee][+-]?[\d]+)?|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/; // 支持科学计数法
  private static readonly BIG_NUMBER_REGEXP: RegExp = /^[-]?([1-9]\d*\.\d+$|0\.\d+$|[1-9]\d*$|0$)/;
  // 采用自研的ipv4正则表达式
  private static readonly IPV4_REGEXP: RegExp = /^(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))$/i;
  // 采用自研的ipv6正则表达式
  private static readonly IPV6_REGEXP: RegExp = /^(((([\da-f]{1,4}):){7}([\da-f]{1,4}))|(((([\da-f]{1,4}):){1,7}:)|((([\da-f]{1,4}):){6}:([\da-f]{1,4}))|((([\da-f]{1,4}):){5}:(([\da-f]{1,4}):)?([\da-f]{1,4}))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):){0,2}([\da-f]{1,4}))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,3}([\da-f]{1,4}))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,4}([\da-f]{1,4}))|((([\da-f]{1,4}):){1}:(([\da-f]{1,4}):){0,5}([\da-f]{1,4}))|(::(([\da-f]{1,4}):){0,6}([\da-f]{1,4}))|(::([\da-f]{1,4})?))|(((([\da-f]{1,4}):){6}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){5}:(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){4}:(([\da-f]{1,4}):)?(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){3}:(([\da-f]{1,4}):){0,2}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|((([\da-f]{1,4}):){2}:(([\da-f]{1,4}):){0,3}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(([\da-f]{1,4})::(([\da-f]{1,4}):){0,4}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))|(::(([\da-f]{1,4}):){0,5}(((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5]))\.){3}((1?[1-9]?\d)|(10\d)|(2[0-4]\d)|(25[0-5])))))$/i;
  private static isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value == null || value.length === 0;
  }

 // 字符串大小比较
 private static comparePlaces(aPlaces: string, bPlaces: string, type: 'integer' | 'decimal'): compareResult {
  const len: number = Math.max(aPlaces.length, bPlaces.length);
  const aVal: string = type === 'integer' ? aPlaces.padStart(len, '0') : aPlaces.padEnd(len, '0');
  const bVal: string = type === 'integer' ? bPlaces.padStart(len, '0') : bPlaces.padEnd(len, '0');
  if (aVal === bVal) {
    return 0;
  }
   return [aVal, bVal].sort()[0] === aVal ? -1 : 1;
}

private static realNumberStringCondition(aInfo, bInfo):compareResult {

  function zeroDeal (aInfo, bInfo) {
    if (aInfo.isZero && bInfo.isZero) {
      return 0;
    } else if (aInfo.isZero) {
      return bInfo.isNegative ? 1 : -1;
    } else {
      return aInfo.isNegative ? -1 : 1;
    }
  }

  function zeroCompare(aInfo, bInfo) {
    if (aInfo.isNegative === bInfo.isNegative) {
      let result: compareResult = TiValidators.comparePlaces(aInfo.integerPlaces, bInfo.integerPlaces, 'integer');
      if (result === 0) {
        result = TiValidators.comparePlaces(aInfo.decimalPlaces, bInfo.decimalPlaces, 'decimal');
      }
      // To avoid ambiguity, do not return -0
      if (result === 0) {
        return 0;
      } else {
        return result * (aInfo.isNegative ? -1 : 1) as 1 | -1;
      }
    } else {
      return aInfo.isNegative ? -1 : 1;
    }
  }

  if (aInfo.isZero || bInfo.isZero) {
    return zeroDeal(aInfo, bInfo);
  } else {
    return zeroCompare(aInfo, bInfo);
}

}
  // 返回字符串的 整型，十进制 ，字符串第一个值，是否存在0
private static getInfo(value: string) {
  const num: string = ['+', '-'].includes(value[0]) ? value.slice(1) : value;
  const index: number = num.indexOf('.');
  const integerPlaces: string = index > -1 ? num.slice(0, index) : num;
  const decimalPlaces: string = index > -1 ? num.slice(index + 1) : '0';
  return {
    integerPlaces,
    decimalPlaces,
    isNegative: value[0] === '-',
    isZero: Array.from([...integerPlaces, ...decimalPlaces]).every(e => e === '0')
  };
};


private static realNumberStringCompareTo = function (a: string, b: string): compareResult {
  // a字符串的拆分
  // tslint:disable-next-line: typedef
  const aInfo = TiValidators.getInfo(a);
  // b字符串的拆分
  // tslint:disable-next-line: typedef
  const bInfo = TiValidators.getInfo(b);

  // tslint:disable-next-line: typedef
  return TiValidators.realNumberStringCondition(aInfo, bInfo);

};

  /**
   * @ignore
   */
  public static required(control: AbstractControl): ValidationErrors | null {
    return Validators.required(control);
  }
  /**
   * @ignore
   */
  public static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const length: number = control.value ? control.value.length : 0;

      return length > maxLength ?
        { maxLength: { requiredLength: maxLength, actualLength: length } } :
        null;
    };
  }
  /**
   * @ignore
   */
  public static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;

      return length < minLength ?
        { minLength: { requiredLength: minLength, actualLength: length } } :
        null;
    };
  }
  /**
   * @ignore
   */
  public static rangeSize(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;

      return length > maxLength || length < minLength ?
        { rangeSize: { requiredMinLength: minLength, requiredMaxLength: maxLength, actualLength: length } } :
        null;
    };
  }
  /**
   * @ignore
   */
  public static maxValue(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(max)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value: number = parseFloat(control.value);

      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value) && value > max ? { maxValue: { requiredMaxValue: max, actual: control.value } } : null;
    };
  }
  /**
   * @ignore
   */
  public static minValue(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(min)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value: number = parseFloat(control.value);

      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value) && value < min ? { minValue: { requiredMinValue: min, actual: control.value } } : null;
    };
  }
  /**
   * @ignore
   */
  public static maxValueByString(max: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(max)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: any = control.value;
      const err: ValidationErrors = { maxValue: { requiredMaxValue: max, actual: value } };
      if (typeof max !== 'string' || !TiValidators.BIG_NUMBER_REGEXP.test(max)) {
        return err;
      }
      if (typeof value !== 'string' || !TiValidators.BIG_NUMBER_REGEXP.test(value)) {
        return null;
      }

      return TiValidators.realNumberStringCompareTo(value, max) > 0 ? err : null;
    };
  }
  /**
   * @ignore
   */
  public static minValueByString(min: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: any = control.value;
      const err: ValidationErrors = { minValue: { requiredMinValue: min, actual: control.value } };
      if (typeof min !== 'string' || !TiValidators.BIG_NUMBER_REGEXP.test(min)) {
        return err;
      }
      if (typeof value !== 'string' || !TiValidators.BIG_NUMBER_REGEXP.test(value)) {
        return null;
      }

      return TiValidators.realNumberStringCompareTo(min, value) > 0 ? err : null;
    };
  }
  /**
   * @ignore
   */
  public static rangeValue(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(min) || TiValidators.isEmptyInputValue(max)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value: number = parseFloat(control.value);

      // Controls with NaN values after parsing should be treated as not having a
      // maximum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-max
      return !isNaN(value) && (value < min || value > max) ? {
        rangeValue: {
          requiredMinValue: min,
          requiredMaxValue: max, actual: control.value
        }
      } : null;
    };
  }
  /**
   * @ignore
   */
  public static rangeValueByString(min: string, max: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(min) || TiValidators.isEmptyInputValue(max)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return TiValidators.minValueByString(min)(control) || TiValidators.maxValueByString(max)(control);
    };
  }
  /**
   * @ignore
   */
  public static regExp(pattern: string | RegExp): ValidatorFn {
    if (!pattern) {
      return Validators.nullValidator;
    }
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') {
        regexStr += '^';
      }

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') {
        regexStr += '$';
      }

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }

    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value)) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value: string = control.value;

      return regex.test(value) ? null : { regExp: { requiredPattern: regexStr, actualValue: value } };
    };
  }
  /**
   * @ignore
   */
  public static email(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.EMAIL_REGEXP.test(control.value) ? null : { email: true };
  }
  /**
   * @ignore
   */
  public static contains(contain: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(contain)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return control.value.indexOf(contain) === -1 ?
        { contains: { requiredContains: contain, actualValue: control.value } } : null;
    };
  }
  /**
   * @ignore
   */
  public static notContains(contain: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(contain)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return control.value.indexOf(contain) !== -1 ?
        { notContains: { requiredNotContains: contain, actualValue: control.value } } : null;
    };
  }
  /**
   * @ignore
   */
  public static equal(equal: string | number | boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(equal)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return control.value !== equal ?
        { equal: { requiredEqual: equal, actualValue: control.value } } : null;
    };
  }
  /**
   * @ignore
   */
  public static notEqual(equal: string | number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(equal)) {
        return null;  // don't validate empty values to allow optional controls
      }

      return control.value === equal ?
        { notEqual: { requiredNotEqual: equal, actualValue: control.value } } : null;
    };
  }
  /**
   * @ignore
   */
  public static notScript(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.SCRIPT_REGEXP.test(control.value) ? { notScript: true } : null;
  }
  /**
   * @ignore
   */
  public static port(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.DIGITS_REGEXP.test(control.value) && (control.value >= TiValidators.PORT_RANGE[0]) &&
      (control.value <= TiValidators.PORT_RANGE[1]) ?
      null : { port: { min: TiValidators.PORT_RANGE[0], max: TiValidators.PORT_RANGE[1] } };
  }
  /**
   * @ignore
   */
  public static date(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return !/Invalid|NaN/.test(new Date(control.value).toString()) ?
      null : { date: true };
  }
  /**
   * @ignore
   */
  public static url(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }
    try {
      new URL(control.value);
      return null;
    } catch (e) {
      return { url: true };
    }
  }
  /**
   * @ignore
   */
  public static integer(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.INTEGER_REGEXP.test(control.value) ?
      null : { integer: true };
  }
  /**
   * @ignore
   */
  public static number(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.NUMBER_REGEXP.test(control.value) ?
      null : { number: true };
  }
  /**
   * @ignore
   */
  public static digits(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.DIGITS_REGEXP.test(control.value) ?
      null : { digits: true };
  }
  /**
   * @ignore
   */
  public static bigInteger(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return (TiValidators.INTEGER_REGEXP.test(control.value) &&
      TiValidators.BIG_NUMBER_REGEXP.test(control.value) &&
      typeof control.value === 'string')
      ? null
      : { integer: true };
  }
  /**
   * @ignore
   */
  public static bigNumber(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return (TiValidators.NUMBER_REGEXP.test(control.value) &&
      TiValidators.BIG_NUMBER_REGEXP.test(control.value) &&
      typeof control.value === 'string')
      ? null
      : { number: true };
  }
  /**
   * @ignore
   */
  public static bigDigits(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null; // don't validate empty values to allow optional controls
    }

    return (TiValidators.DIGITS_REGEXP.test(control.value) &&
      TiValidators.BIG_NUMBER_REGEXP.test(control.value) &&
      typeof control.value === 'string')
      ? null
      : { digits: true };
  }
  /**
   * @ignore
   */
  public static ipv4(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.IPV4_REGEXP.test(control.value) ?
      null : { ipv4: true };
  }
  /**
   * @ignore
   */
  public static ipv6(control: AbstractControl): ValidationErrors | null {
    if (TiValidators.isEmptyInputValue(control.value)) {
      return null;  // don't validate empty values to allow optional controls
    }

    return TiValidators.IPV6_REGEXP.test(control.value) ?
      null : { ipv6: true };
  }


  /**
 * 正则表达式转为字符串并首尾去除“/”符号，为添加g修饰符做准备
 */
  private static regExpToString(regExp: RegExp): string {
    if (typeof regExp !== 'object') {
      return '';
    }
    const regExpStr: string = String(regExp);

    return regExpStr.substring(1, regExpStr.length - 1);
  }


  /**
   * @ignore
   * 密码字符类型最小种类校验
   * 用于密码校验，其规则如下：
   * 口令必须包含且只能包含如下至少两种字符的组合:
   * －至少一个小写字母；
   * －至少一个大写字母；
   * －至少一个数字；
   * －至少一个特殊字符：`~!@#$%^&*()-_=+\|[{}];:'",<.>/?和空格
   * @param  num 字符类型最小个数
   * @param  charTypeRegObj 字符类型校验正则表达式，涉及到强度计算，参考defaults中定义
   */

  public static minCharType(num: number, charTypeRegObj?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || TiValidators.isEmptyInputValue(num) || num === 0) {
        return null;  // don't validate empty values to allow optional controls
      }
      // 各类字符校验正则表达式集合,默认使用pwdConfig中的默认配置
      const charRegObj: any = typeof charTypeRegObj === 'object' ? charTypeRegObj :
        TiPwdConfig.pwdCharTypeRegObj;

      // 校验输入是否符合单条校验字符规则，并记录符合的单条规则个数
      let checkValidNum: number = 0; // 校验通过结果个数
      let replacedValue: string = control.value; // 正则替换后的value值

      for (const key in charRegObj) {
        if (Object.prototype.hasOwnProperty.call(charRegObj, key)) {
          const regExp: RegExp = charRegObj[key];
          const checkResult = regExp.test(control.value);
          if (checkResult) {
            checkValidNum++;
            // 使用全局替换方式，用于替换字串中所有符合正则规则的字符
            replacedValue = regExp.global
              ? replacedValue.replace(regExp, '')
              : replacedValue.replace(new RegExp(TiValidators.regExpToString(regExp), 'g'), '');
          }
        }
      }
      // 替换后的值非空情况:代表值中存在非法字符
      return replacedValue.length > 0 || checkValidNum < num ?
        { minCharType: true } : null;
    };
  }

  private static notEqualPosRevValue(value: string, refreValue: string): any {
    return (value.toLowerCase() !== refreValue.split('')
      .reverse()
      .join('')
      .toLowerCase()) &&
      (value.toLowerCase() !== refreValue.toLowerCase()) ?
      null : { notEqualPosRev: true };
  };

    /**
   * @ignore
   * 用于密码校验：密码不能和用户名或其倒序相同
   * @param  getControlFn 获取对比的表单元素formControl函数
   */
  public static notEqualPosRev(getControlFn: () => AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (TiValidators.isEmptyInputValue(control.value) || Util.isUndefined(getControlFn && getControlFn())) {
        return null;  // don't validate empty values to allow optional controls
      }
      const value: string = control.value;
      const refreValue: string = getControlFn().value;

      // 使用如下方式会出现卡顿的情况：
      // 对比formControl value修改时，需要同步修改该表单的状态，否则会存在下次focus该元素或表单整体校验时
      // 该元素校验结果依然是上次的结果

      return TiValidators.notEqualPosRevValue(value, refreValue);
    };
  }

  private static _executeValidators(control: AbstractControl, validators: Array<ValidatorFn>): Array<any> {
    return validators.map((v: any) => v(control));
  }
  private static _mergeErrorsPwd(arrayOfErrors: Array<ValidationErrors>): ValidationErrors | null {
    const res: { [key: string]: any } =
      arrayOfErrors.reduce((resource: ValidationErrors | null, errors: ValidationErrors | null) => {
        return errors != null ? { ...resource, ...errors } : resource;
      }, {});

    return Object.keys(res).length === 0 ? null : { password: true, ...res };
  }


  /**
 * @ignore
 * 密码校验规则
 * @param pValue 规则参数:{ruleKey: param}
 */
  public static password(pValue: {
    rangeSize?: [number, number];
    minCharType?: [number, any];
    notEqualPosRev?(): AbstractControl;
  }): ValidatorFn {
    const rangeSizeParamArr: Array<number> = pValue.rangeSize || TiPwdConfig.pwdValidator.params.rangeSize;
    const minCharTypeParamArr: Array<any> = pValue.minCharType || TiPwdConfig.pwdValidator.params.minCharType;
    if (Util.isUndefined(minCharTypeParamArr[1])) {
      minCharTypeParamArr[1] = TiPwdConfig.pwdCharTypeRegObj;
    }
    const validatorComposeArr: Array<any> = [TiValidators.required,
    TiValidators.rangeSize(rangeSizeParamArr[0], rangeSizeParamArr[1]),
    TiValidators.minCharType(minCharTypeParamArr[0], minCharTypeParamArr[1]),
    TiValidators.notEqualPosRev(pValue.notEqualPosRev)];

    // 由于错误提示为password专有提示,需要自定义password error,而compose方法不能自定义,因此此处未使用compose
    // 此外,各子规则的错误依然需要保留,用于规则提示信息
    return (control: AbstractControl): any => TiValidators._mergeErrorsPwd(TiValidators._executeValidators(control, validatorComposeArr));
  }

  private static checkErrors(form: FormGroup, config: TiValidationCheckConfig, errorsFlatted: boolean, ignoreForms: string | string[], updateValueAndValidityConfig: TiValidationCheckConfig) {

    let errors = form.errors ? { ...form.errors } : {};

    for (const key in form.controls) {
      if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
        const control: AbstractControl | any = form.controls[key];
        if (control.controls) { // 嵌套的FormArray,FormGroup
          const checkedErrors: any = TiValidators.check(control, config);
          errors = TiValidators.getErrors(errors, checkedErrors, errorsFlatted, key);
        } else if (control.tiGroup && !control.disabled) { // 类似ipsection组件场景 FormControl嵌套FormGroup 表单禁用时不验证
          const checkedErrors: any = TiValidators.check(control.tiGroup, config);
          errors = TiValidators.getErrors(errors, checkedErrors, errorsFlatted, key);
        } else {
          // 配置忽略校验的表单元素不做处理
          if (ignoreForms && ignoreForms.indexOf(key) !== -1) {
            continue;
          }

          control.markAsTouched();
          // 由于表单间可能有关联关系（如密码校验的notEqualPosRev，该关联关系需要对单个表单元素再次校验
          control.updateValueAndValidity(updateValueAndValidityConfig);
          // 读取errors信息
          if (control.errors !== null) {
            errors[key] = control.errors;
          }
        }
      }
    }
    return errors;
  }

  // 该方法用于整体校验:由于表单未foucs时,即使错误也不会显示红框,
  // 而整体校验时需要将错误的表单边框标红显示,因此需要显示调用整体校验方法
  /**
   * 该方法用于整体校验
   *
   * 参数form：需要校验的表单族
   *
   * 参数config：可选 表单族的配置
   *
   * 返回：表单错误信息
   */
  public static check(form: FormGroup, config?: TiValidationCheckConfig): ValidationErrors | null {
    let ignoreForms: Array<string>; // 忽略校验的表单元素
    let updateValueAndValidityConfig: TiValidationCheckConfig; // updateValueAndValidity方法的参数
    let errorsFlatted: boolean; // 错误信息是否扁平化

    if (config) {
      ignoreForms = config.ignoreNames;
      updateValueAndValidityConfig = { onlySelf: config.onlySelf, emitEvent: config.emitEvent };
      errorsFlatted = config.errorsFlatted;
    }


    let errors = TiValidators.checkErrors(form, config, errorsFlatted, ignoreForms, updateValueAndValidityConfig);
    // 无errors信息时，设置为null，方便业务处理
    if (JSON.stringify(errors) === '{}') {
      errors = null;
    }

    return errors;
  }

  private static getErrors(errors: any, checkedErrors: any, flatten: boolean, key: string): any {
    if (checkedErrors === null) {
      return errors;
    }

    let result: any = { ...errors };

    if (flatten) {
      result = { ...result, ...checkedErrors };
    } else {
      result[key] = checkedErrors;
    }

    return result;
  }
}


