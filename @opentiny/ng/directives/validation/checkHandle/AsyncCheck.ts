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
import { Util } from '../../../utils/Util';
import { CheckHandle } from './CheckHandle';
import { NgControl, ValidationErrors } from '@angular/forms';
import { ComponentRef, ElementRef } from '@angular/core';
import { TiPendingStateComponent } from '../TiPendingStateComponent';

/**
 * @ignore
 *
 */
export class AsyncCheck extends CheckHandle {
    // 处理异步校验错误提示信息
    public onStatusChange(ele: ElementRef, formControl: NgControl): void {
        // 清除先前校验信息
        this.commonHandle.clearValidMsg(ele);

        const errors: ValidationErrors = formControl.control.errors;
        if (!errors) {
            return;
        }

        const ruleKey: string = Object.keys(errors)[0];
        const ruleErrors: any = errors[ruleKey];
        // 添加异步校验错误提示信息
        if (typeof ruleErrors === 'object' && Util.isString(ruleErrors.tiAsyncErrorMessage)) {
            this.commonHandle.addValidMsg(ele, this.validationConf, formControl, true);
        }
    }

    // 处理异步校验pending状态时的loading图标
    public onAsyncStatusChange(ele: ElementRef, formControl: NgControl): void {
        if (formControl.pending) {
            this.addPendingIcon(ele, formControl);
        } else {
            this.clearPendingIcon(ele);
        }
    }

    public addPendingIcon(ele: ElementRef, formControl: NgControl): void {
        if (ele.nativeElement.tiPendingStateRef) {
            return;
        }
        const pendingStateRef: ComponentRef<any> = this.getPendingStateRef(ele);
        const pendingDom: Element = pendingStateRef.location.nativeElement;
        if (pendingDom === null || pendingDom.childNodes.length === 0) {
            return;
        }
        this.commonHandle._tiRenderer.insertAfter(pendingDom, ele.nativeElement);

        ele.nativeElement.tiPendingStateRef = pendingStateRef;
    }

    public clearPendingIcon(ele: ElementRef): void {
        const pendingStateRef: ComponentRef<any>  = ele.nativeElement.tiPendingStateRef;
        if (pendingStateRef) {
            pendingStateRef.destroy();
            ele.nativeElement.tiPendingStateRef = undefined;
        }
    }

    private getPendingStateRef(ele: ElementRef): ComponentRef<any> {
        const pendignComponentRef: ComponentRef<any> = this.commonHandle._tiPopupService.createCompoentRef({
            componentType: TiPendingStateComponent,
            context: {
                validElement: ele.nativeElement
            }
        });

        return pendignComponentRef;
    }
}
