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
import { CheckHandle } from './CheckHandle';
import { NgControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { TiValidationConfig } from '../TiValidationInterface';
/**
 * @ignore
 */
export class BlurCheck extends CheckHandle {
  public onStatusChange(ele: ElementRef, formControl: NgControl): void {
    if (this.commonHandle.isFocused(ele)) {
      // 获取焦点/正在输入情况下,显示/修改tip提示
      this.addTip(ele, this.validationConf, formControl);

      return;
    }
    // 未输入过且未聚焦的情况下,先清除先前校验信息(存在reset即改变untounced状态情况下清除校验信息)
    if (formControl.untouched) {
      this.commonHandle.clearValidMsg(ele); // 清除先前校验信息

      return;
    }
    // 失焦情况下,根据校验结果,显示/清除错误提示
    this.commonHandle.clearValidMsg(ele); // 清除先前校验信息
    this.commonHandle.addValidMsg(ele, this.validationConf, formControl);
  }
  public onFocus(ele: ElementRef, formControl: NgControl): void {
    this.commonHandle.clearValidMsg(ele); // 清除先前错误提示信息
    this.addTip(ele, this.validationConf, formControl);
  }
  public onBlur(ele: ElementRef, formControl: NgControl): void {
    this.commonHandle.destroyTip(ele); // 清除先前校验信息
    this.commonHandle.addValidMsg(ele, this.validationConf, formControl);
  }

  public addTip(ele: ElementRef, validationConf: TiValidationConfig, formControl: NgControl): void {
    // 该方法子类会复写
    this.commonHandle.destroyTip(ele); // 清除先前tip提示信息
    const tipContent: string = validationConf && validationConf.tip;
    // tip内容无效情况下不做处理
    if (tipContent === '' || Util.isUndefined(tipContent)) {
      return;
    }
    // 添加Tip提示并缓存
    this.commonHandle.generateTip(ele, tipContent, validationConf);
  }
}
