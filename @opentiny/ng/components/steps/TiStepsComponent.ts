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
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    IterableDiffers,
    NgZone,
    Output,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { Util } from '../../utils/Util';
import { TiBaseComponent } from '../base/TiBaseModule';

/**
 * steps步骤组件
 *
 * 点击可跳转和不可跳转两种方式（默认点击不跳转）
 *
 */
@Component({
    selector: 'ti-steps',
    templateUrl: './steps.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./steps.less']
})

export class TiStepsComponent extends TiBaseComponent {
    /**
     * 必选，步骤导航数据项。每个步骤包含 2 个可选属性。
     *
     * 1.steps[i].label（类型：string；设置每个步骤对应的默认标题）；
     *
     * 2.steps[i].disabled（类型：boolean；步骤导航是否禁用）；
     */
    @Input() steps: Array<any>;
    /**
     * 是否支持点击跳转功能，当为 false 时，视觉呈现和禁用一致
     */
    @Input() clickable: boolean = false;
    /**
     * 步骤标题文本最大宽度
     */
    @Input() maxWidth: string;
    /**
     * 步骤标题要显示的字段。 和 select 保持一致
     */
    @Input() labelKey: string = 'label';
    /**
     * 必选，当前激活步骤项，10.1.19 版本支持传入激活项的下标
     */
    @Input() activeStep: any;
    /**
     * 宽度是否自动撑满父容器。
     *
     * 设置为 true 整体宽度会撑满父容器，常用在弹窗场景
     */
    @Input() adaptive: boolean = false;
    /**
     * 步骤激活项改变时触发的回调
     */
    @Output() readonly activeStepChange: EventEmitter<any> = new EventEmitter<any>();
    /**
     * 步骤激活项改变前触发的回调
     */
    @Output() readonly beforeStep: EventEmitter<any> = new EventEmitter<any>();
    /**
     * @ignore
     */
    @ViewChild('stepRef') stepsRef: ElementRef;
    /**
     * @ignore
     */
    @ViewChildren('line') lineRef: QueryList<ElementRef>;
    /**
     * @ignore
     */
    @ViewChildren('explain') explainRef: QueryList<ElementRef>;
    /**
     * @ignore
     * 获取到用户自定义的模板
     */
    @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;
    /**
     * 文本区域的模板
     */
     @ContentChild('step', { static: true }) stepTemplate: TemplateRef<any>;
    /**
     * icon 区域的模板
     */
    @ContentChild('icon', { static: true }) iconTemplate: TemplateRef<any>;
    private labelChange: boolean; // 标志文本长度是否变化，从而重新计算线长
    private stepsDiffer: any;
    private isInitLabelChange: boolean = true;
    private explainTotalWidth: number = 0;
    private windowResizeListener: () => void;
    constructor(protected elementRef: ElementRef,
                protected renderer2: Renderer2,
                private iterableDiffers: IterableDiffers,
                private zone: NgZone,
                private changeDetectorRef: ChangeDetectorRef) {
                super(elementRef, renderer2);
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!this.adaptive) {
            return;
        }
        // this.trackByLabelFn监听对象：可以深度监听
        this.stepsDiffer = this.iterableDiffers.find(this.steps)
                                               .create(this.trackByLabelFn);
        // 修复错误：ERROR ReferenceError: window is not defined
        if (typeof window === 'undefined') {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.windowResizeListener = this.renderer2.listen(window, 'resize', this.setLineWidth);
        });
    }

    ngDoCheck(): void {
        if (this.adaptive) {
            // 处理增删步骤
            const stepsDiffer: any = this.stepsDiffer.diff(this.steps);
            if (stepsDiffer) {
                this.labelChange = true;
            }
        }

        // 增删步骤，改变属性时指引未发生变化，onpush模式下不会触发变更，故手动触发
        this.changeDetectorRef.markForCheck();
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
        /**
         * 兼容旧版无命名模板：
         * 10.1.16 版本到 10.1.22 之前只能内嵌一个模板，无命名。
         * 10.1.22 版本之后可以内嵌两个模板，#step #icon
         */
        if (!this.stepTemplate && this.itemTemplate
            && (this.itemTemplate.elementRef.nativeElement !== (this.iconTemplate && this.iconTemplate.elementRef.nativeElement))) {
            this.stepTemplate = this.itemTemplate;
        }
    }

    ngAfterViewChecked(): void {
        // 需要判断当label变化时才计算线长
        if (this.adaptive && this.labelChange) {
            this.labelChange = false;
            this.setLineWidth();
            // 初始时在前几次的 ngAfterViewChecked 中计算文本宽度，生产环境清缓存场景下计算有点不准确(时机有点早)，但在初始时的后几次ngAfterViewChecked中计算的文本宽度是准确的。
            // TODO: 是否有更合适的时机计算(已验证使用MutationObserver也解决不了，在ngAfterViewChecked中加setTimeout(0)也解决不了)
            if (this.isInitLabelChange) {
                setTimeout(() => {
                    const explainTotalWidth: number = this.getExplainTotalWidth();
                    if (explainTotalWidth !== this.explainTotalWidth) {
                        this.setLineWidth(explainTotalWidth);
                    }
                }, 50); // 50ms是经验值
                this.isInitLabelChange = false;
            }
        }
    }

    ngOnDestroy(): void {
        if (this.windowResizeListener) {
            this.windowResizeListener();
        }
    }

    /**
     * @ignore
     * 每步的点击事件处理
     */
    public onClick(index: number): void {
        const step: any = this.steps[index];
        // 不支持点击跳转、当前项灰化或者点击当前激活想项时，不处理
        if (!this.clickable || step.disabled || this.activeStep === step || this.activeStep === index) {
            return;
        }

        // 未定义beforeStep事件，直接跳转，定义beforeStep事件将当前点击项索引传出
        if (this.beforeStep.observers.length === 0) {
            this.activeStep = Util.isNumber(this.activeStep) ? index : step;
            this.activeStepChange.emit(this.activeStep);
        } else {
            this.beforeStep.emit(step);
        }
    }

    // 设置每个步骤之间的横线的宽度
    public setLineWidth = (width?: number): void => {
        this.explainTotalWidth = Util.isUndefined(width) ? this.getExplainTotalWidth() : width;
        this.lineRef.forEach((stepLine: ElementRef) => {
            this.renderer2.setStyle(stepLine.nativeElement, 'width',
                `calc((100% - ${this.explainTotalWidth}px) / ${this.steps.length - 1})`);
        });
    }

    private getExplainTotalWidth(): number {
        let explainTotalWidth: number = 0;
        if (!Util.isUndefined(this.explainRef)) {
            this.explainRef.forEach((step: ElementRef) => {
                // 计算每步选择框和文字的总长度
                explainTotalWidth += step.nativeElement.offsetWidth;
            });
        }

        return explainTotalWidth;
    }

    /**
     * @ignore
     * Diff监听steps中label值的改变
     */
    public trackByLabelFn(index: number, item: any): string {
        return item.label;
    }

    /**
     * @ignore
     * ngFor 使用
     */
    public trackByIndexFn(index: number): number {
        return index;
    }

    /**
     * @ignore
     * 判断当前项的状态
     */
    public getStepState(index: number): string {
        const activedIndex: number = Util.isNumber(this.activeStep) ? this.activeStep : this.steps.indexOf(this.activeStep);
        if (index < activedIndex) {
            return 'complete';
        } else if (index === activedIndex) {
            return 'active';
        } else {
            return 'uncomplete';
        }
    }
}
