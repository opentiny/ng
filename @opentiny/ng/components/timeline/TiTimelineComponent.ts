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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseModule';
import { Util } from '../../utils/Util';

export interface TiTimelineOption {
    /**
     * 节点类型
     */
    type?: 'info' | 'success' | 'danger' | 'primary' | 'warning';
    /**
     * 必选，节点文本
     */
    label: string;
    /**
     * 节点时间
     */
    time?: string;
    /**
     * 节点是否为一级标题
     */
    isTitle?: boolean;
    /**
     * 节点执行失败错误信息
     */
    errorMessage?: string;
    /**
     * 帮助提示图标 tip 提示内容
     */
    iconTip?: string | TemplateRef<any> | any;
    /**
     * 帮助提示图标 tip 提示方向
     */
    iconTipPosition?: string;
    /**
     * 帮助提示图标 tip 最大宽度
     */
    iconTipMaxWidth?: string;

}
/**
 * 时间线timeline组件
 */
@Component({
    selector: 'ti-timeline',
    templateUrl: './timeline.html',
    styleUrls: ['./timeline.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TiTimelineComponent extends TiBaseComponent {
    /**
     * 必选，时间线节点数据集
     */
    @Input() options: Array<TiTimelineOption>;
    /**
     * 当前激活项
     */
    @Input() activeIndex: number = -1;
    /**
     * 时间线节点内容区域的模板
     */
    @ContentChild('item', { static: true }) itemTemplate: TemplateRef<any>;
    /**
     * @ignore
     * 时间轴一级信息集合
     */
    public titleOptions: Array<any> = [];

    constructor(protected hostRef: ElementRef, protected renderer: Renderer2,
                protected changeDetectorRef: ChangeDetectorRef) {
        super(hostRef, renderer);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.titleOptions = this.getTitleOptions();
        this.changeToSuccess();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['activeIndex'] && !changes['activeIndex'].firstChange) {
            this.changeToSuccess();
        }
        if (changes['options'] && !changes['options'].firstChange) {
            this.titleOptions = this.getTitleOptions();
        }
    }

    ngDoCheck(): void {
        super.ngDoCheck();
        // 改为onPush模式后，复杂数据类型接口的变更必须要修改引用地址，才能出发变更检测。此处添加标记向前兼容。
        this.changeDetectorRef.markForCheck();
    }

    /**
     * @ignore
     */
    public findItemIndex(item: TiTimelineOption) {
        return this.titleOptions.findIndex((ele: TiTimelineOption) => ele === item);
    }
    /**
     * @ignore
     * 获取时间轴一级（标题）信息集合
     */
    public getTitleOptions(): Array<TiTimelineOption> {
        return this.options.filter((option: TiTimelineOption) => option.isTitle);
    }
    /**
     * @ignore
     * activeIndex之前的项全部变更为success状态
     */
    public changeToSuccess(): void {
        if (this.activeIndex === -1 || Util.isUndefined(this.activeIndex) || !Util.isNumber(this.activeIndex)) {
            return;
        }
        this.options.forEach ((option: TiTimelineOption, index: number) => {
            option.type = index < this.activeIndex ? 'success' : (option.type || 'primary');
        });
    }
    /**
     * @ignore
     * 判断当前一级时间轴状态
     */
    public isSuccess(option: TiTimelineOption): boolean {
        if (!option.isTitle) {
            return;
        }
        let level2Options: Array<TiTimelineOption> = [];
        const index: number = this.options.findIndex((item: TiTimelineOption) => item === option);
        let isSucess: boolean = true;
        for (let i = index + 1; i <= this.activeIndex; i++) {
            if (this.options[i] && this.options[i].isTitle) {
                break;
            }
            level2Options.push(this.options[i]);
        }
        if (level2Options.length > 0) {
            level2Options.forEach((option: TiTimelineOption) => {
                if (option.type && option.type !== 'success') {
                    isSucess = false;
                }
            });
        }

        return isSucess;
    }
}
