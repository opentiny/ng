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
import { Util } from '@opentiny/ng-utils';
import { TiPasswordValidatorConfig } from '../TiValidationInterface';
/**
 * @ignore
 */
export interface TiPwdParams {
  minCharLen: number;
  minCharTypeNum: number;
  charTypeRegObj: any;
}
/**
 * @ignore
 */
export class TiPwdConfig {
  public static pwdTipPostion: string = 'right';
  public static pwdTipMaxWidth: string = '440px';
  // pwd校验规则
  public static pwdCharTypeRegObj: any = {
    // 默认字串类型集合,特殊规则可在此处进行配置
    // specialCharReg: /[~`!\?,.:;\-_'"\(\)\{\}\[\]\/<>@#\$%\^&\*\+\|\\=\s]/,
    // https://www.bejson.com/zhuanyi/ Json转义工具有错，单引号未转义
    // eslint-disable-next-line prefer-regex-literals
    specialCharReg: new RegExp('[~`!\\?,.:;\\-_\'"\\(\\)\\{\\}\\[\\]\\/<>@#\\$%\\^&\\*\\+\\|\\\\=\\s]'),
    // eslint-disable-next-line prefer-regex-literals
    lowerCharReg: new RegExp('[a-z]+'),
    // eslint-disable-next-line prefer-regex-literals
    upperCharReg: new RegExp('[A-Z]+'),
    // eslint-disable-next-line prefer-regex-literals
    digitsCharReg: new RegExp('[0-9]+')
  };
  public static pwdValidator: any = {
    rule: 'password',
    params: {
      rangeSize: [6, 32],
      minCharType: [2] // 该校验方法支持两个参数传递,第二个参数为charTypeRegObj,不传递第二个参数情况下,代表使用该配置中的默认值
    },
    message: {
      rangeSize: '', // ''代表使用组件国际化语言中的默认提示文本
      minCharType: '',
      notEqualPosRev: ''
    }
  };
  // /**
  //  * 计算密码熵值,具体的计算密码熵值的算法如下：
  //  * 1、第一个字符为4bits
  //  * 2、2-8个字符，每一个字符为2bits
  //  * 3、9-20个字符之间，每一个字符为1.5bits
  //  * 4、21个字符之后，每一个字符为1bit
  //  * 5、如果密码中同时存在大写字母和特殊字符，则熵值+6
  //  * @param {String} str 密码字串
  //  * @param {Number} minLen 密码最小长度
  //  * @param {Number} minType 密码最小组合种类
  //  * @returns {Number} level 密码等级
  //  */
  public static pwdLevelFn(value: string, validator: TiPasswordValidatorConfig): number {
    const validatorParam: TiPwdParams = getValidatorParam();
    const minCharLen: number = validatorParam.minCharLen;
    const minCharTypeNum: number = validatorParam.minCharTypeNum;
    const charTypeRegObj: any = validatorParam.charTypeRegObj as any;
    // 根据字符个数初步计算熵值
    const len: number = value.length;
    let pwdScore: number = 0;
    if (len >= 21) {
      pwdScore = len - 21 + 1.5 * 12 + 2 * 7 + 4;
    } else if (len >= 9 && len < 21) {
      pwdScore = (len - 9 + 1) * 1.5 + 2 * 7 + 4;
    } else if (len >= 2 && len < 9) {
      pwdScore = (len - 2 + 1) * 2 + 4;
    } else if (len >= 1 && len < 2) {
      pwdScore = 4;
    }
    // 同时存在大写字母和特殊字符，熵值+6
    if (charTypeRegObj.upperCharReg && charTypeRegObj.upperCharReg.test(value) && charTypeRegObj.specialCharReg.test(value)) {
      pwdScore += 6;

      // 重置正则表达式的lastIndex属性:只有正则表达式使用了表示全局检索的 "g" 标志时，该属性才会起作用，
      // 当前正则匹配到字串后，下次使用同样的正则匹配该字串时，正则检查位置会发生变化
      charTypeRegObj.upperCharReg.lastIndex = 0;
      charTypeRegObj.specialCharReg.lastIndex = 0;
    }

    // 根据熵值计算等级
    return countLevel(pwdScore);

    function getValidatorParam(): TiPwdParams {
      const params: any = validator.params;
      // 默认值设定
      let minCharLength: number = 0;
      let minCharTypeNumber: number = 0;
      let charTypeRegObject: any = {
        // 默认字串类型集合,特殊规则可在此处进行配置
        specialCharReg: /[~`!\?,.:;\-_'"\(\)\{\}\[\]\/<>@#\$%\^&\*\+\|\\=\s]/,
        lowerCharReg: /[a-z]+/,
        upperCharReg: /[A-Z]+/,
        digitsCharReg: /[0-9]+/
      };

      // 通过rangeSize规则获取最小长度
      const rangeSizeParams: number = params.rangeSize;
      if (!Util.isUndefined(rangeSizeParams)) {
        minCharLength = parseInt(rangeSizeParams[0], 10) || 0;
      }
      // 通过minCharType规则获取最小字符类型及其正则
      const minCharTypeParams: number = params.minCharType;
      if (!Util.isUndefined(minCharTypeParams)) {
        minCharTypeNumber = parseInt(minCharTypeParams[0], 10) || 0;
        charTypeRegObject = minCharTypeParams[1] || charTypeRegObject;
      }

      // 返回对象值
      return {
        minCharLen: minCharLength,
        minCharTypeNum: minCharTypeNumber,
        charTypeRegObj: charTypeRegObject
      };
    }

    /**
     * 计算密码等级
     * 低： 0~25.5（ 小于等于25 .5）
     * 中： 25.5~30(大于25 .5 小于等于30)
     * 高： 30~（大于30）
     * @param score 密码分数
     * @returns 密码等级
     */
    function countLevel(score: number): number {
      let level: number = 0;
      if (score > 30) {
        level = 2;
      } else if (score > 25.5 && score <= 30) {
        level = 1;
      } else if (score >= 0 && score <= 25.5) {
        level = 0;
      }
      level = levelHandle(minCharLen, minCharTypeNum, level);

      return level;
    }

    // 密码降级处理
    function levelHandle(psdLen: number, psdType: number, level: number): number {
      const type: number = getCharType(value);
      let pwdLevel: number = level;
      if (level > 0) {
        if ((psdLen && len < psdLen) || (psdType && type < psdType)) {
          pwdLevel = level - 1;
        }
      }

      return pwdLevel;
    }

    // 获取当前密码字符种类
    function getCharType(str: string): number {
      let typeNum: number = 0;
      for (const key in charTypeRegObj) {
        if (Object.prototype.hasOwnProperty.call(charTypeRegObj, key)) {
          const regExp: RegExp = charTypeRegObj[key];
          if (regExp.test(str)) {
            typeNum++;
            regExp.lastIndex = 0;
          }
        }
      }

      return typeNum;
    }
  }
}
