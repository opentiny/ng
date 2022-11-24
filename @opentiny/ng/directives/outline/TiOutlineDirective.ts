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
import { Directive, ElementRef, Renderer2, NgZone, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
/**
 * @ignore
 * 点击需要和聚焦区分开。当点击的时候，不需要有outline。
 */
@Directive({
    selector: '[tiOutline]'
})
export class TiOutlineDirective implements AfterViewInit {
    constructor(private renderer: Renderer2, public hostEle: ElementRef,
         private zone: NgZone,
         @Inject(DOCUMENT) private document) {
    }
    private documentVisibilitychangeListener: () => void;
    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            let outlineColor: string;
            const outlineHostEle: any = this.hostEle.nativeElement;
            const transparentColor: string = 'rgba(0, 0, 0, 0)'; // 透明色,跟transparent色值一致
            if (outlineHostEle) {
                this.renderer.listen(outlineHostEle, 'mousedown', (): void => {
                    // 当点击的时候，不需要有outline。
                    this.renderer.setStyle(outlineHostEle, 'outlineColor', 'transparent');
                    // 注意：仅仅设置outlineColor为透明色，会导致点击后border不可见
                    this.renderer.setStyle(outlineHostEle, 'outlineWidth', '0px');
                });
                this.renderer.listen(outlineHostEle, 'blur', (): void => {
                    // blur时仅能读取到outlineColor，作为窗口切换前的状态标志。
                    outlineColor = getComputedStyle(outlineHostEle).outlineColor;
                    // 恢复outline原生状态
                    this.renderer.setStyle(outlineHostEle, 'outline', '');
                });
            }
            this.documentVisibilitychangeListener = this.renderer.listen(this.document, 'visibilitychange', (): void => {
                if (document.visibilityState === 'visible'
                    && this.document.activeElement === outlineHostEle
                    && outlineColor === transparentColor) {
                        this.renderer.setStyle(outlineHostEle, 'outlineColor', 'transparent');
                        // 解决checkbox组件聚焦状态下页面切换之后，border看不见问题。
                        this.renderer.setStyle(outlineHostEle, 'outlineWidth', '0px');
                    }
                }
            );
        });
    }

    ngOnDestroy(): void {
        this.documentVisibilitychangeListener && this.documentVisibilitychangeListener();
    }
}
