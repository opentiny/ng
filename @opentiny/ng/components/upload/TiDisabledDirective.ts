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
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
/**
 * @ignore
 */
@Directive({
    selector: '[tiDisabled]'
})

export class TiDisabledDirective {
    constructor(private hostEle: ElementRef, private renderer: Renderer2) {
    }
    @Input()
    set tiDisabled(value: boolean) {
        if (value) {
            this.renderer.setAttribute(this.hostEle.nativeElement, 'disabled', 'disabled');
        } else {
            this.renderer.removeAttribute(this.hostEle.nativeElement, 'disabled');
        }
    }
}
