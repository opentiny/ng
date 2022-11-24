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
import { NgControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { TiValidationConfig } from '../TiValidationInterface';

/**
 * @ignore
 */
export class CheckHandle {
    constructor(protected validationConf: TiValidationConfig, protected commonHandle: any) {
    }
    onStatusChange(ele: ElementRef, formControl: NgControl): void {
    }
    onFocus(ele: ElementRef, formControl: NgControl): void {
    }
    onBlur(ele: ElementRef, formControl: NgControl): void {
    }
    destroy(ele: ElementRef): void {
        this.commonHandle.destroyTip(ele);
    }
}
