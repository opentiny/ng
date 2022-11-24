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
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Util } from '../../utils/Util';
/**
 * tiScroll指令用于触发document上的tiScroll事件。
 *
 *
 */
@Directive({
    selector: '[tiScroll]'
})

export class TiScrollDirective {
    private hostEle: Element;
    constructor(private hostEleRef: ElementRef, private renderer2: Renderer2) {
        this.hostEle = this.hostEleRef.nativeElement;
        this.renderer2.listen(this.hostEle, 'scroll', () => {
            Util.trigger(document, 'tiScroll');
        });
    }
}