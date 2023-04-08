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
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { Util } from '@opentiny/ng-utils';
import { TiLocale } from '@opentiny/ng-locale';
/**
 * @ignore
 */
export interface MsgItem {
  msg: string;
  validStatus: any;
}
/**
 * @ignore
 */
export interface MsgModel {
  level: number;
  msgItems: Array<MsgItem>;
  securityText: string;
  securityStatus: string;
}
/**
 * @ignore
 */
@Component({
  selector: 'ti-pwd-msg',
  templateUrl: './TiPwdMsgComponent.html',
  styleUrls: ['./pwdMsg.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiPwdMsgComponent implements OnInit {
  @Input() control: FormControl;
  @Input() msgItems: Array<MsgItem>;
  @Input() validator: any;
  @Input() levelFn: Function;
  public msgModel: MsgModel = {
    level: -1,
    msgItems: [],
    securityText: '',
    securityStatus: ''
  };

  private static _getPwdStrengthLan(key: string): string {
    return TiLocale.getLocaleWords().tiValid.passwordStrength[key];
  }

  // 获取各项规则提示
  private static _getMsgItems(msgObj: any, control: FormControl): Array<any> {
    let validStatus: number | boolean;
    if (control.untouched && control.pristine) {
      // 初次聚焦,未输入情况下，不校验
      validStatus = -1;
    }

    const msgInfoArr: Array<any> = [];
    let msgItem: string = '';
    for (const key in msgObj) {
      if (Object.prototype.hasOwnProperty.call(msgObj, key)) {
        msgItem = msgObj[key];
        msgInfoArr.push({
          msg: msgItem,
          validStatus: TiPwdMsgComponent._getValidStatus(validStatus, key, control)
        });
      }
    }

    return msgInfoArr;
  }

  private static _getValidStatus(validStatus: number | boolean, key: string, control: FormControl): number | boolean {
    const errors: ValidationErrors | null = control.errors;
    // validStatus已定义情况下，直接返回
    if (!Util.isUndefined(validStatus)) {
      return validStatus;
    }
    // errors中有该条消息，说明校验未通过
    if (errors && !Util.isUndefined(errors[key])) {
      return false;
    }
    // 值为空的情况下，除notEqualPosRev外，其他规则均为错误
    if (control.value === '' && key !== 'notEqualPosRev') {
      return false;
    }

    return true;
  }

  /**
   * 获取密码强度等级
   * @param value 输入值
   * @param validator 校验规则配置
   * @param levelFn 密码等级计算函数
   * @returns  密码强度等级
   */
  private static _getLevel(value: string, validator: any, levelFn: Function): number {
    return levelFn(value, validator);
  }
  ngOnInit(): void {
    const value: string = this.control.value;
    // level计算
    let level: number = -1;
    if (!(value === null || value.length === 0)) {
      // value值为空情况下,level无效处理
      level = TiPwdMsgComponent._getLevel(value, this.validator, this.levelFn);
    }

    // 设置呈现时需要使用的字段
    this.msgModel = {
      level,
      msgItems: TiPwdMsgComponent._getMsgItems(this.msgItems, this.control),
      securityText: TiPwdMsgComponent._getPwdStrengthLan('securityText'),
      securityStatus: level === -1 ? '' : TiPwdMsgComponent._getPwdStrengthLan('levelDecArr')[level]
    };
  }
}
