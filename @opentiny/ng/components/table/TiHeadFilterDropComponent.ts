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
import { ChangeDetectionStrategy, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { TiDropsearchComponent } from '../dropsearch/TiDropsearchModule';
import { TiDateBaseComponent, TiDatetimeFormat } from '../datebase/TiDateBaseModule';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiBrowser } from '../../utils/Util';
import { TiButtonComponent } from '../button/TiButtonComponent';

/**
 * datetime 接口相应的匹配值
 */
export interface TiHeadFilterDatetimeConfig {
    /**
     * datetime 类型日期显示格式
     */
    format?: string | TiDatetimeFormat;
    /**
     * datetime可选最小值
     */
    min?: Date;
    /**
     * datetime可选最大值
     */
    max?: Date;
    /**
     * 是否仅是日期的选择(没有时间的选择)。不设置时默认是日期时间的选择
     */
    onlyDate?: boolean;

    [propName: string]: any;
}

/**
 * @ignore
 * TiHeadFilterDrop 表头过滤漏斗组件的下拉框选择组件
 */
@Component({
    selector: 'ti-head-filter-drop',
    templateUrl: './head-filter-drop.html',
    styleUrls: ['./head-filter-drop.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TiFormComponent.getValueAccessor(TiHeadFilterDropComponent)]
})
export class TiHeadFilterDropComponent extends TiDropsearchComponent {
    public static readonly DOMINATOR_SPACE: number = 6;
    public dominatorSpace: string = TiHeadFilterDropComponent.DOMINATOR_SPACE + 'px';
    // 选中项
    public selected: Array<any>;
    // 时间日期面板选中项
    public datetimeSelected: TiHeadFilterDatetimeConfig  = {};
    // 时间日期值范围设置
    public datetimeLimit: TiHeadFilterDatetimeConfig = {};
    protected heightExcludeContent: number = 10; // 上下边框为2，上下padding为8
    protected buttonHeight: number = 45; // 确定、取消按钮高度
    /**
     * 是否开启时间日期下拉
     */
    @Input() isDatetime: boolean = false;
    /**
     * 时间日期相关的配置
     */
    @Input() datetimeConfig: TiHeadFilterDatetimeConfig = {};
    /**
     * @ignore
     * 时间日期范围开始
     */
    @ViewChild('datetimeStart', {static: false}) datetimeStartCom: TiDateBaseComponent;
    /**
     * @ignore
     * 时间日期范围结束
     */
    @ViewChild('datetimeEnd', {static: false}) datetimeEndCom: TiDateBaseComponent;
    @ViewChild('datetimeOk', { static: false }) datetimeOkCom: TiButtonComponent;
    @ViewChild('datetimeCancel', { static: false }) datetimeCancelCom: TiButtonComponent;

    ngOnInit(): void {
        super.ngOnInit();
        this.initDatetime();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        // 重新设置headfilterdrop的heightExcludeList
        if (changes['searchable']) {
            if (changes['searchable'].currentValue) {
                this.heightExcludeList = this.multiple
                    ? this.heightExcludeContent + this.buttonHeight + TiDropsearchComponent.SEARCHBOX_EXCLUDE_HEIGHT
                    : this.heightExcludeContent + TiDropsearchComponent.SEARCHBOX_EXCLUDE_HEIGHT;
            } else {
                this.heightExcludeList = this.multiple ? this.heightExcludeContent + this.buttonHeight : this.heightExcludeContent;
            }
        }
    }

    // 初始化时间日期面板信息
    public initDatetime(): void {
        if (this.isDatetime) {
            // 初始化 this.datetimeConfig如果用户传入undefined，组件会报错，此处做下初始化容错处理。
            this.datetimeConfig = this.datetimeConfig ? this.datetimeConfig : {};
            // 开始日期的max是结束日期的选中值，如果结束日期没有选择，使用item中设置的max
            this.datetimeLimit.startMax = this.datetimeSelected?.end ? this.datetimeSelected.end :  this.datetimeConfig.max;
            // 结束日期的min是开始日期的选中值，如果开始日期没有选择，使用中设置的min
            this.datetimeLimit.endMin = this.datetimeSelected?.start ? this.datetimeSelected.start :  this.datetimeConfig.min;
        }
    }

    writeValue(model: any): void {
        super.writeValue(model);
        // 初始化selected选中项
        if (this.multiple) {
            this.selected = [...model ? model : []];
        } else if (this.isDatetime) {
            this.datetimeSelected = {
                start: this.isValidDate(model?.start) ? model.start : undefined,
                end: this.isValidDate(model?.end) ? model.end : undefined
            };
            this.dateStartChange(this.datetimeSelected.start);
            this.dateEndChange(this.datetimeSelected.end);
        } else {
            this.selected = model ? model : '';
        }
    }

    onSelect(option: any): void {
        // 多选时不处理onSelect事件（在点击确定按钮时触发）
        if (this.multiple) {
            return;
        }
        this.model = option;
        super.onSelect(option);
    }

    private restoreSelected(): void {
        // 还原selected选中项
        if (this.multiple) {
            this.selected = [...this.model ? this.model : []];
        }

        // 还原时间日期的选中项
        if (this.isDatetime) {
            this.datetimeSelected = {
                start: this.isValidDate(this.model?.start) ? this.model.start : undefined,
                end: this.isValidDate(this.model?.end) ? this.model.end : undefined
            };
        }
    }

    public hide(): void {
        // 处理问题：搜索框时，在下拉中选择完收起后漏斗图标由于聚焦而有了虚线框
        if (this.searchable) {
            this.renderer.setStyle(this.dominatorElem, 'outlineStyle', 'none');
            super.hide();
        } else {
            super.hide();
        }
        this.restoreSelected();
    }

    hideWithoutFocus(): void {
        super.hideWithoutFocus();
        this.restoreSelected();
    }

    // 按钮面板鼠标按下事件（解决因点击按钮面板导致整个下拉面板隐藏的问题）
    btnContainerMousedown(event: any): void {
        event.preventDefault();
    }

    // 确定按钮
    okClick(): void {
        // 选中值发生改变时对model值做处理
        if (JSON.stringify(this.selected) !== JSON.stringify(this.model ? this.model : [])) {
            this.model = [...this.selected];
        }
        // 触发onSelect事件
        this.select.emit(this.model);
        this.hide();
    }

    // 取消按钮
    cancelClick(): void {
        // 还原selected选中项
        this.selected = [...this.model ? this.model : []];
        this.hide();
    }

    // 时间面板确定按钮
    onClickDatetimeOK(): void {
        // 进行时间戳对比，在选中项发生改变时再进行model的赋值。直接给model赋值，在开始和结束时间都没有改变的情况下，也会触发ngmodelchange事件
        if ((Date.parse(this.datetimeSelected?.start) !== Date.parse(this.model?.start)) ||
        (Date.parse(this.datetimeSelected?.end) !== Date.parse(this.model?.end))) {
            this.model = {
                start: this.datetimeSelected.start,
                end: (this.datetimeSelected.end && this.datetimeConfig?.onlyDate)
                    ? new Date(this.datetimeSelected.end.getFullYear(),
                        this.datetimeSelected.end.getMonth(), this.datetimeSelected.end.getDate(), 23, 59, 59)
                    : this.datetimeSelected.end, // 如果只是日期的选择，那么结束日期的时间应该是 23:59:59
                type: 'datetime'
            };
        }
        // 触发onSelect事件
        this.select.emit(this.model);
        this.hide();
    }

    // 时间面板取消按钮
    onClickDatetimeCancel(): void {
        this.hide();
    }

    // Invalid Date判断
    private isValidDate(dateTemp: Date | string): boolean {
        let date: Date | string = dateTemp;
        if (Object.prototype.toString.call(date) === '[object String]') {
            // 转为时间格式
            date = new Date(dateTemp);
        }

        return Object.prototype.toString.call(date) === '[object Date]' && String(date) !== 'Invalid Date';
    }

    // 监听开始时间值的变化,开始时间的最大值不大于结束选中时间
    dateStartChange(value: Date): void {
        if (this.isValidDate(value)) {
            this.datetimeLimit.endMin = value;
        } else if (this.isValidDate(this.datetimeConfig?.min as Date)) {
            this.datetimeLimit.endMin = this.datetimeConfig?.min;
        } else {
            // 没有设置min,开始日期选中又清除后，需要设置一个min的缺省值
            this.datetimeLimit.endMin = undefined;
        }
    }

    // 监听结束时间值的变化，结束时间的最最小值不小于开始选中时间
    dateEndChange(value: any): void {
        if (this.isValidDate(value)) {
            this.datetimeLimit.startMax = value;
        } else if (this.isValidDate(this.datetimeConfig?.max as Date)) {
            this.datetimeLimit.startMax =  this.datetimeConfig?.max;
        } else {
            // 没有设置 max, 结束日期选中又清除后，需要设置一个max的缺省值
            this.datetimeLimit.startMax = undefined;
        }
    }
}
