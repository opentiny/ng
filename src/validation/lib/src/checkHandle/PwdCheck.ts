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
import { TiPwdMsgComponent } from '../TiPwdMsgComponent';
import { BlurCheck } from './BlurCheck';
import { CheckHandle } from './CheckHandle';
import { TiValidationDefaultConfig } from '../TiValidationConfig';
import { TiPasswordValidatorConfig, TiValidationConfig } from '../TiValidationInterface';
import { NgControl } from '@angular/forms';
import { ElementRef } from '@angular/core';

/**
 * @ignore
 */
export class PwdCheck extends BlurCheck implements CheckHandle {
  private msgItems: any;
  private validator: TiPasswordValidatorConfig;
  private levelFn: (value: string, validator: TiPasswordValidatorConfig) => void;
  constructor(private config: TiValidationConfig, private common: any) {
    super(config, common);
    const pwdConfig: any = this.config && this.config.passwordConfig;
    // 设置参数，用于规则提示组件数据组装
    this._setValidator(pwdConfig);
    this._setMsgItems();
    this._setLevelFn(pwdConfig);
  }

  onFocus(ele: ElementRef, formControl: NgControl): void {
    // 由于密码组件需要依赖于其他输入框，因此在focus时需要更新其状态
    formControl.control.updateValueAndValidity();
    super.onFocus(ele, formControl);
  }

  // 设置validator params和msg
  private _setValidator(pwdConfig: any): void {
    let pwdValidator: any = TiValidationDefaultConfig.pwdValidator;
    if (pwdConfig && pwdConfig.validator) {
      // validator定义情况下,处理validator
      const pwdValidatorConfig: TiPasswordValidatorConfig = pwdConfig.validator;
      if (Util.isUndefined(pwdValidatorConfig.rule) || pwdValidatorConfig.rule === pwdValidator.rule) {
        // 依然使用默认规则情况下,只做参数合并
        pwdValidator = {
          params: { ...pwdValidator.params, ...pwdValidatorConfig.params },
          message: { ...pwdValidator.message, ...pwdValidatorConfig.message }
        };
      } else {
        pwdValidator = {
          params: pwdValidatorConfig.params,
          message: pwdValidatorConfig.message
        };
      }
    }
    this.validator = pwdValidator;
  }

  // 设置msgItems,msgItems数据格式为:{ruleKey: msgStr,...}
  // 其中msgStr为格式化后的页面可显示字串
  private _setMsgItems(): void {
    const validatorConfig: TiPasswordValidatorConfig = this.validator;
    const msgConfig: any = validatorConfig.message;
    const paramsConfig: any = validatorConfig.params;
    let msgStr: string;
    const msgItems: any = {};
    // msgConfig中定义的规则提示才会在页面中显示
    for (const key in msgConfig) {
      if (Object.prototype.hasOwnProperty.call(msgConfig, key)) {
        // 规则提示优先从config中读取,如果读取到的是无效字串,则从国际化默认配置中读取
        msgStr = msgConfig[key] || this.common.getMsg(key);
        // 如果对应的规则有参数的情况下,则根据参数做字串格式化
        if (paramsConfig && Object.prototype.hasOwnProperty.call(paramsConfig, key)) {
          msgStr = Util.formatEntry(msgStr, paramsConfig[key]);
        }
        msgItems[key] = msgStr;
      }
    }
    this.msgItems = msgItems;
  }

  // 设置levelFn:levelFn支持业务自定义
  private _setLevelFn(pwdConfig: any): void {
    let levelFn: (value: string, validator: TiPasswordValidatorConfig) => void = TiValidationDefaultConfig.pwdLevelFn;
    if (pwdConfig && Util.isFunction(pwdConfig.levelFn)) {
      levelFn = pwdConfig.levelFn;
    }
    this.levelFn = levelFn;
  }
  public addTip(ele: ElementRef, validationConf: TiValidationConfig, formControl: NgControl): void {
    this.commonHandle.destroyTip(ele); // 清除先前提示信息
    const inputsObj: any = {
      msgItems: this.msgItems,
      validator: this.validator,
      control: formControl,
      levelFn: this.levelFn
    };
    // tip默认值设置
    const configAssigned: TiValidationDefaultConfig = {
      tipPosition: TiValidationDefaultConfig.pwdTipPostion,
      tipMaxWidth: TiValidationDefaultConfig.pwdTipMaxWidth,
      ...validationConf
    };
    this.common.generateTip(ele, TiPwdMsgComponent, configAssigned, inputsObj);
  }
}
