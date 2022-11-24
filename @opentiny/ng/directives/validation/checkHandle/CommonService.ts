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
import { ComponentRef, ElementRef, Injectable, Renderer2 } from '@angular/core';
import { TiLocale, TiLocaleWords } from '../../../locale/TiLocaleModule';
import { TiRenderer } from '../../../services/renderer/TiRenderer';
import { TiPopupService } from '../../../services/popup/TiPopupService';
import { Util } from '../../../utils/Util';
import { TiTipService } from '../../../services/tip/TiTipService';
import { TiTipRef } from '../../../services/tip/TiTipInterface';
import { TiValidationDefaultConfig } from '../TiValidationConfig';
import { TiValidationConfig } from '../TiValidationInterface';
import { TiErrorMsgComponent } from '../TiErrorMsgComponent';
import { NgControl, ValidationErrors } from '@angular/forms';
import { CommonServiceModule } from './CommonServiceModule';

/**
 * @ignore
 */
@Injectable({
    providedIn: CommonServiceModule
})
export class CommonService {
    constructor(private _renderer: Renderer2,
                private _tiRenderer: TiRenderer,
                private _tipService: TiTipService,
                private _tiPopupService: TiPopupService<TiErrorMsgComponent>) {
    }

    // 获取错误信息源字串
    private static _getSourceStr(ruleKey: string, ruleErrors: any, validationConf: TiValidationConfig, isAsync: boolean): string {
        // 优先使用tiValidation中的规则项配置errorMsg
        const errMsgConf: any = validationConf && validationConf.errorMessage;
        if (!Util.isUndefined(errMsgConf) && Util.isString(errMsgConf[ruleKey])) {
            return errMsgConf[ruleKey];
        }

        if (typeof ruleErrors === 'object') {
            // 获取自定义校验规则中的 tiErrorMsg
            if (!isAsync && Util.isString(ruleErrors.tiErrorMessage)) {
                return ruleErrors.tiErrorMessage;
            }

            // 获取自定义异步校验规则中的 tiAsyncErrorMessage
            if (isAsync && Util.isString(ruleErrors.tiAsyncErrorMessage)) {
                return ruleErrors.tiAsyncErrorMessage;
            }
        }

        // 获取到的tiValidation errorMsg无效情况下,使用默认规则提示
        return (TiLocale.getLocaleWords() as TiLocaleWords).tiValid.errorMsg[ruleKey] || '';
    }

    // 获取错误提示字符串，思路是：
    // 1.先获取错误信息源字串（可能带params标识{0}/{1}等）;
    // 2.将获取的源字串中的参数替换为真实数据
    private static _getErrorStr(errors: ValidationErrors, validationConf: TiValidationConfig, isAsync: boolean): string {
        const ruleKey: string = Object.keys(errors)[0];
        const ruleErrors: any = errors[ruleKey];
        const msgStr: string = CommonService._getSourceStr(ruleKey, ruleErrors, validationConf, isAsync);
        // 获取错误信息参数,无参数情况下,不需做格式匹配直接返回
        // errors格式示例：{required:true,{'maxlength': {'requiredLength': maxLength, 'actualLength': length}}}
        if ((typeof ruleErrors) !== 'object') {
            return msgStr;
        }
        const params: Array<string> = Object.values(ruleErrors); // 此处对错误信息定义有要求：要求错误返回对象与词条中的参数次序与一致

        return Util.formatEntry(msgStr, params);
    }
    public isFocused(ele: any): boolean {
        return ele.nativeElement.attributes.tiFocused !== undefined;
    }
    // 获取密码校验中校验规则信息
    public getMsg(ruleKey: string, params: any): string {
        const messageStr: string = (TiLocale.getLocaleWords() as TiLocaleWords).tiValid.message[ruleKey];

        return Util.formatEntry(messageStr, params);
    }
    // 获取错误提示信息DOM文本，此处TiErrorMsgComponent组件处理的不仅是提示信息，还包括错误时的组件边框变红样式加载
    public getErrorMsg(errors: ValidationErrors, validationConf: TiValidationConfig, appendToTip: boolean = false, isAsync?: boolean): Element {
        const errorMsg: string = CommonService._getErrorStr(errors, validationConf, isAsync);
        if (!errorMsg) {
            return null;
        }
        const errorMsgComponentRef: ComponentRef<any> = this._tiPopupService.createCompoentRef({
            componentType: TiErrorMsgComponent,
            context: {
                errorMessage: errorMsg,
                appendToTip
            }
        });

        return errorMsgComponentRef.location.nativeElement;
    }

    // 调用ti-Tip组件生成Tip提示,该公共方法中同时传递了tip的位置信息等
    public generateTip(ele: ElementRef, tipContent: string, validationConf: TiValidationConfig, context?: any): TiTipRef {
        const tipInstance: TiTipRef = this._tipService.create(ele.nativeElement, {
            position: validationConf.tipPosition || TiValidationDefaultConfig.tipPosition,
            maxWidth: validationConf.tipMaxWidth
        });
        tipInstance.show(tipContent, context);
        ele.nativeElement.tiValidTip = tipInstance;

        return tipInstance;
    }
    // 销毁Tip提示
    public destroyTip(ele: ElementRef): void {
        const tipEle: TiTipRef = ele.nativeElement.tiValidTip;
        if (!Util.isUndefined(tipEle)) {
            tipEle.hide();
        }
    }
    // 根据errors结果生成可占位的错误提示信息(blurCheck和pwdCheck中使用)
    public addValidMsg(ele: ElementRef, validationConf: TiValidationConfig, formControl: NgControl, isAsync?: boolean): void {
        const errors: ValidationErrors = formControl.control.errors;
        // 校验正确情况下不做处理
        if (errors === null) {
            return;
        }
        const errorDom: Element = this.getErrorMsg(errors, validationConf, false, isAsync);
        if (errorDom === null || errorDom.childNodes.length === 0) {
            return;
        }
        // 添加错误信息
        if (validationConf && validationConf.errorMessageWrapper) {
            this._renderer.appendChild(validationConf.errorMessageWrapper, errorDom);
        } else if (ele.nativeElement.hasAttribute('tiTextarea')) {
            this._tiRenderer.insertAfter(errorDom, this._renderer.parentNode(ele.nativeElement));
        } else {
            this._tiRenderer.insertAfter(errorDom, ele.nativeElement);
        }
        ele.nativeElement.tiErrorMessage = errorDom;
    }
    // 销毁可占位的错误提示信息(blurCheck和pwdCheck中使用)
    public clearValidMsg(ele: ElementRef): void {
        const errMsgDom: any  = ele.nativeElement.tiErrorMessage;
        if (!Util.isUndefined(errMsgDom)) {
            this._renderer.removeChild(errMsgDom.parentNode, errMsgDom);
        }
    }
}
