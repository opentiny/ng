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
import { AsyncCheck } from './AsyncCheck';
import { NgControl, ValidationErrors } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { TiValidationConfig } from '../TiValidationInterface';

/**
 * @ignore
 */
export class ChangeCheck extends AsyncCheck {
    public onStatusChange(ele: ElementRef, formControl: NgControl): void {
        super.onStatusChange(ele, formControl);
        this._checkHandle(ele, this.validationConf, formControl);
    }
    public onFocus(ele: ElementRef, formControl: NgControl): void {
        this._checkHandle(ele, this.validationConf, formControl);
    }
    public onBlur(ele: ElementRef, formControl: NgControl): void {
        // 清除先前校验信息,已失焦情况不做校验提示或tip提示,只边框标红,边框标红在样式类中通过ng-invalid处理
        this.commonHandle.destroyTip(ele);
    }

    // 校验处理函数,该函数覆盖了focus和statusChange状态下的校验处理
    private _checkHandle(ele: ElementRef, validationConf: TiValidationConfig, formControl: NgControl): void {
        this.commonHandle.destroyTip(ele); // 清除先前校验信息
        // 已失焦情况不做校验提示或tip提示,只边框标红,边框标红只在样式类中通过ng-invalid处理,JS中无需处理
        if (!this.commonHandle.isFocused(ele)) {
            return;
        }

        // 三种情况只做Tip提示：
        // 1.初次focus且初次focus情况下输入值未发生改变时不进行校验
        //   (初次focus值一旦发生变化且出错情况下,就要改变为错误提示)
        // 2.校验正确
        // 3.是弹窗中autofocus的元素
        // （弹窗中autofocus的元素，在弹窗打开动画结束后会先blur再focus,会使其由untouched变成touched,
        // 但需要使其表现与初次focus一致）
        const errors: ValidationErrors = formControl.control.errors;
        if ((formControl.pristine && formControl.untouched) || errors === null ||
            ele.nativeElement.querySelector('[tiautofocusinmodal]')) {
            this._addTip(ele, validationConf, validationConf && validationConf.tip);

            return;
        }
        // 其它情况下做错误提示
        this._addValidTip(ele, errors, validationConf);
    }

    // 显示错误提示信息
    private _addValidTip(ele: ElementRef, errors: ValidationErrors, validationConf: TiValidationConfig): void {
        const tipContentDom: any = this.commonHandle.getErrorMsg(errors, validationConf, true);
        if (tipContentDom === null) {// 无错误信息情况下,不做处理
            return;
        }
        this._addTip(ele, validationConf, tipContentDom);
    }

    // 显示tip提示
    private _addTip(ele: ElementRef, validationConf: TiValidationConfig, tipContent: string): /* ViewContainerData */void {
        // tip内容无效情况下不做处理
        if (tipContent === '' || Util.isUndefined(tipContent)) {
            return;
        }
        // 添加Tip提示
        this.commonHandle.generateTip(ele, tipContent, validationConf);
    }
}
