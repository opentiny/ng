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
import { ElementRef } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { TiValidationConfig } from '../TiValidationInterface';
import { CheckHandle } from './CheckHandle';

export class RadiobaseCheck extends CheckHandle {
  constructor(protected validationConf: TiValidationConfig, protected commonHandle: any) {
    super(validationConf, commonHandle);
  }
  public onStatusChange(ele: ElementRef, formControl: NgControl): void {
    if (formControl instanceof NgModel && !ele.nativeElement.isInit) {
      ele.nativeElement.isInit = true;

      return;
    }
    this.commonHandle.clearValidMsg(ele, this.validationConf, formControl);
    if (formControl.invalid) {
      this.commonHandle.addValidMsg(ele, this.validationConf, formControl);
    }
  }

  public destroy(ele: ElementRef): void {
    this.commonHandle.clearValidMsg(ele);
  }
}
