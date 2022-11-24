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
import { Component, Input, Renderer2, ViewEncapsulation, ElementRef, NgZone, AfterViewInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { TiAutofocusComponent } from '../base/TiBaseModule';
import { DOCUMENT } from '@angular/common';

/**
 * Button按钮组件
 *
 * 尽管这是一个组件，但使用方法有点像属性指令。
 *
 * 按钮组件基于原生button组件进行扩展，原生button加tiButton属性即为tiny button，button的多种样式则通过为button设置不同的样式类来进行区分，具体用法见示例。
 *
 */
@Component({
    selector: '[tiButton]',
    templateUrl: './button.html',
    styleUrls: ['./button.less'],
    host: {
        '[class.ti3-btn-primary]': 'color === "primary" && hasBorder!== false',
        '[class.ti3-btn-danger]': 'color === "danger" && hasBorder!== false',
        '[class.ti3-btn-noborder]': 'hasBorder === false',
        '[class.ti3-btn-icon]': 'icon && hasBorder!== false',
        '[class.ti3-btn-onlyIcon]': 'onlyIcon && hasBorder!== false',
        '[class.ti3-btn-large]': 'size === "large" && hasBorder!== false',
        '[class.ti3-btn-middle]': 'size === "middle" && hasBorder!== false',
        '[class.ti3-btn-small]': 'size === "small" && hasBorder!== false',
        '[class.ti3-btn-xs]': 'size === "xs" && hasBorder!== false',
        '[class.ti3-btn-loading]': 'loading && hasBorder!== false'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None // 让宿主元素也用上button.less样式。否则，默认胶囊封装避免CSS污染。
})
export class TiButtonComponent extends TiAutofocusComponent implements AfterViewInit {
    /**
     * 按钮颜色
     */
    @Input() color: 'default' | 'danger' | 'primary' = 'default';
    /**
     * 是否包含图标
     */
    @Input() icon: boolean = false;
    /**
     * 是否为纯图标按钮
     */
    @Input() onlyIcon: boolean = false;
    /**
     * 按钮大小
     */
    @Input() size: 'xs' | 'small' | 'middle' | 'large' = 'middle';
    /**
     * 是否处于加载状态，一般用于异步提交场景
     */
    @Input() loading: boolean = false;
    /**
     * 是否为无边框文本按钮
     */
    @Input() hasBorder: boolean = true;

     constructor(public renderer: Renderer2, private hostEle: ElementRef,
         private zone: NgZone, @Inject(DOCUMENT) private document) {
        super(hostEle, renderer);
    }
    private documentVisibilitychangeListener: () => void;
    ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            let outlineColor: string;
            const transparentColor: string = 'rgba(0, 0, 0, 0)'; // 透明色,跟transparent色值一致
            this.renderer.listen(this.hostEle.nativeElement, 'mousedown', (): void => {
                // 当点击的时候，不需要有outline。
                this.renderer.setStyle(this.hostEle.nativeElement, 'outline', 'none');
                // 按钮聚焦时，正常点击获取的outlineColor为按钮border色，但是此处需要区分点击聚焦与tab快捷键聚焦两种场景，
                // 所以额外设定点击聚焦场景下outlineColor为透明色。
                // 注意：仅仅设置outlineColor为透明色，会导致按钮点击后border不可见
                this.renderer.setStyle(this.hostEle.nativeElement, 'outlineColor', 'transparent');
            });
            this.renderer.listen(this.hostEle.nativeElement, 'blur', (): void => {
                // blur时仅能读取到outlineColor，作为窗口切换前的状态标志。
                outlineColor = getComputedStyle(this.hostEle.nativeElement).outlineColor;
                // 恢复outline原生状态
                this.renderer.setStyle(this.hostEle.nativeElement, 'outline', '');
            });
            this.documentVisibilitychangeListener = this.renderer.listen(this.document, 'visibilitychange', (): void => {
                if (document.visibilityState === 'visible'
                && this.document.activeElement === this.hostEle.nativeElement
                && outlineColor === transparentColor) {
                    this.renderer.setStyle(this.hostEle.nativeElement, 'outline', 'none');
                    }
                }
            );
        });
    }

    ngOnDestroy(): void {
        this.documentVisibilitychangeListener && this.documentVisibilitychangeListener();
    }
}
