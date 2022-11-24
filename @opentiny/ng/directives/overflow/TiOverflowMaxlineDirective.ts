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
import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { TiTipService } from '../../services/tip/TiTipService';
import { TiTipRef, TiTipShowInfo } from '../../services/tip/TiTipInterface';
import { Util, TiBrowser } from '../../utils/Util';
import { TiPositionType } from '../../utils/Position';
import { DOCUMENT } from '@angular/common';

/**
 * 多行文本超出情况下文本处理出...并tip提示
 *
 */
@Directive({
    selector: '[tiOverflow][maxLine]'
})

export class TiOverflowMaxlineDirective implements AfterViewInit, OnChanges, OnDestroy {
    public nativeElement: any;
    constructor(
        private hostRef: ElementRef,
        private renderer2: Renderer2,
        private tipService: TiTipService,
        private zone: NgZone,
        @Inject(DOCUMENT) private document) {
        this.nativeElement = this.hostRef.nativeElement;
    }
    /**
     * 文本最大行数
     */
    @Input() maxLine: number = 3;
    /**
     * 配置文本过长时显示的 tip 的最大宽度
     */
    @Input() tiTipMaxWidth: string = '276px';
    /**
     * 配置文本过长时显示的 tip 方向
     */
    @Input() tiTipPosition: TiPositionType;
    /**
     * 配置文本过长时显示的 tip 内容，默认为宿主元素文本
     */
    @Input() tiTipContent: string;
    /**
     * @ignore
     * 文本被截断之后末尾图标展示
     */
    @Input() iconName: string;
    /**
     * @ignore
     * 图标提示
     */
    @Input() iconTip: string = '';
    /**
     * 宿主文本
     */
    @Input() textContent: string;
    /**
     * @ignore
     * 文本被截断之后的末尾填充符号
     */
    @Input() character: string = '...'; // 暂不开放
    /**
     * @ignore
     * 图标是否可以聚焦，默认不可聚焦。
     */
    @Input() iconFocusable: boolean = false;
    /**
     * @ignore
     * 图标是否灰化，默认不灰化
     */
    @Input() iconDisabled: boolean = false;
    /**
     * @ignore
     * 文本被截断之后末尾图标点击事件
     */
    @Output() readonly iconClick: EventEmitter<Event> = new EventEmitter();
    private text: string; // 宿主元素文本
    private isShave: boolean; // 是否已经截取
    private tipInstance: TiTipRef;  // tip实例
    private icontipInstance: TiTipRef;  // icontip实例

    private windowResizeListener: () => void;
    private tipContent: string; // 最终展示的tip内容
    private documentVisibilitychangeListener: () => void;

    private shaveTextFn = (): void => {
        let fontHtml: string;
        if (Util.isEmptyString(this.iconName)) {
            fontHtml = '';
        } else {
            // 此处添加属性tiOverflowEndicon为了适配在plus3中定义末尾图标的样式
            // 在labelEditor组件中，需要可以聚焦。
            fontHtml = this.iconFocusable ? `<span style="display:inline-block;width:16px;line-height: 1"
                tabindex="${this.iconDisabled ? -1 : 0}" tiOverflowEndicon  class="ti3-icon-${this.iconName} ti3-icon"></span>`
                : `<span style="display:inline-block;width:16px;line-height: 1"
                tiOverflowEndicon class="ti3-icon-${this.iconName} ti3-icon"></span>`;
        }
        // 修复SSR错误：ERROR ReferenceError: getComputedStyle is not defined
        if (typeof getComputedStyle === 'undefined') {
            return;
        }
        const lineHeight: number = parseFloat(getComputedStyle(this.nativeElement)
            .getPropertyValue('line-height'));
        const multiLineHeight: number = lineHeight * this.maxLine;
        this.nativeElement.textContent = this.text;
        // 如果该元素为inline元素时，宽度不生效会导致元素出...样式不生效，因此此处做处理
        if (getComputedStyle(this.nativeElement).display === 'inline') {
            this.renderer2.setStyle(this.nativeElement, 'display', 'inline-block');
        }
        this.nativeElement.insertAdjacentHTML('beforeend', fontHtml);
        if (this.text.length < 2 || this.nativeElement.offsetHeight <= multiLineHeight) {
            this.setEvents();
            this.isShave = false;

            return;
        }
        let charHtml: string = this.character;
        charHtml = charHtml.concat(fontHtml);
        // 以下使用二分算法计算文本截取位置
        let max: number = this.text.length - 1;
        let min: number = 0;
        let middle: number;
        while (min < max) {
            middle = (min + max + 1) / 2;
            this.nativeElement.textContent = this.text.slice(0, middle);
            this.nativeElement.insertAdjacentHTML('beforeend', charHtml);
            if (this.nativeElement.offsetHeight > multiLineHeight + 1) {
                max = middle - 1; // 截取的内容少
            } else {
                min = middle; // 截取的内容多
            }
        }
        this.nativeElement.textContent = this.text.slice(0, max);
        this.nativeElement.insertAdjacentHTML('beforeend', charHtml);
        this.setEvents();
        this.isShave = true;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.text = this.textContent || this.nativeElement.innerHTML;
        if ((changes.maxLine && !changes.maxLine.firstChange)
            || (changes.textContent && !changes.textContent.firstChange)) {
            this.shaveTextFn();
        }

        if (this.iconFocusable && changes.iconDisabled && !changes.iconDisabled.firstChange) {
            const spanEle: HTMLElement = this.nativeElement.querySelector('span[tiOverflowEndicon]');
            if (spanEle) {
                this.renderer2.setAttribute(spanEle, 'tabindex', this.iconDisabled ? '-1' : '0');
            }
        }
    }
    // tip配置
    ngAfterViewInit(): void {
        this.text = this.textContent || this.nativeElement.innerHTML; // 视图初始化完成后获取宿主元素文本
        if (TiBrowser.isIE()) {
            setTimeout(() => {
                this.shaveTextFn(); // IE下需延时处理，否则初始化获取到 offsetHeight 值与谷歌有差异
            }, 0);
        } else {
            this.shaveTextFn();
        }
        this.tipInstance = this.tipService.create(this.nativeElement, {
            position: this.tiTipPosition || 'right',
            maxWidth: this.tiTipMaxWidth,
            trigger: 'mouse',
            showFn: (): TiTipShowInfo => {
                if (!this.isShave) {
                    return;
                }
                this.tipContent = this.tiTipContent !== undefined ? this.tiTipContent : this.text;

                return { content: this.tipContent};
            }
        });
        // 修复SSR错误：ERROR ReferenceError: window is not defined
        if (typeof window === 'undefined') {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.windowResizeListener = this.renderer2.listen(window, 'resize', this.shaveTextFn);
        });
    }

    ngOnDestroy(): void {
        if (this.windowResizeListener) {
            this.windowResizeListener();
        }
        if (this.documentVisibilitychangeListener) {
            this.documentVisibilitychangeListener();
        }
        // 当组件销毁的时候文本tip也销毁
        // eslint-disable-next-line no-unused-expressions
        this.tipInstance?.hide();

        // 当组件销毁的时候编辑图标tip也销毁
        // eslint-disable-next-line no-unused-expressions
        this.icontipInstance?.hide();
    }

    /**
     * @ignore
     */
    public setEvents(): void {
        const clickIconEle: HTMLElement = this.nativeElement.querySelector('span[tiOverflowEndicon]');
        if (!clickIconEle) {
            return;
        }

        this.renderer2.listen(clickIconEle, 'click', (): void => {
            this.zone.run(() => {
                if (this.icontipInstance) {
                    this.icontipInstance.hide();
                }
                this.iconClick.emit();
            });
        });
        this.renderer2.listen(clickIconEle, 'mouseenter', (): void => {
            if (this.tipInstance) {
                this.zone.run(() => {
                    this.tipInstance.hide();
                });
            }
        });
        this.renderer2.listen(clickIconEle, 'mouseleave', (): void => {
                if (this.tipInstance && this.isShave) {
                    this.zone.run(() => {
                        this.tipContent = this.tiTipContent || this.text;
                        this.tipInstance.show(this.tipContent);
                    });
                }
        });
        this.icontipInstance = this.tipService.create(clickIconEle, {
            position: 'top',
            maxWidth: this.tiTipMaxWidth,
            trigger: 'mouse',
            showFn: (): TiTipShowInfo => {
                return { content: this.iconTip};
            }
        });
        if (this.iconFocusable) {
            this.zone.runOutsideAngular((): void => {
                let outlineColor: string;
                const transparentColor: string = 'rgba(0, 0, 0, 0)'; // 透明色,跟transparent色值一致
                this.renderer2.listen(clickIconEle, 'mousedown', (): void => {
                    this.renderer2.setStyle(clickIconEle, 'outlineColor', 'transparent');
                });
                this.renderer2.listen(clickIconEle, 'blur', (): void => {
                    // blur时仅能读取到outlineColor，作为窗口切换前的状态标志。
                    outlineColor = getComputedStyle(clickIconEle).outlineColor;
                    // 恢复outline原生状态
                    this.renderer2.setStyle(clickIconEle, 'outline', '');
                });
                this.documentVisibilitychangeListener = this.renderer2.listen(this.document, 'visibilitychange', (): void => {
                    if (document.visibilityState === 'visible'
                    && this.document.activeElement === clickIconEle
                    && outlineColor === transparentColor) {
                            this.renderer2.setStyle(clickIconEle, 'outlineColor', 'transparent');
                            }
                        }
                );
            });
        }
    }
}
