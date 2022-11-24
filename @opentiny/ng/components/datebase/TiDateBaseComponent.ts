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
/* eslint-disable no-param-reassign */
import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    NgZone,
    Output,
    QueryList,
    Renderer2,
    ViewChild,
    ViewChildren,
    Inject,
    ChangeDetectorRef,
    SimpleChanges
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TiDateUtil, TiKeymap, Util } from '../../utils/Util';
import { TiLocale, TiLocaleWords } from '../../locale/TiLocaleModule';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiDateDominatorComponent } from '../datedominator/TiDateDominatorModule';
import { TiDropComponent } from '../drop/TiDropModule';
import { TiDateEditComponent } from '../dateedit/TiDateEditModule';
import { TiButtonComponent } from '../button/TiButtonModule';
import { TiTextComponent } from '../text/TiTextModule';

/**
 * 时间日期范围类组件value接口
 */
export interface TiDateValue {
    /**
     * 开始时间
     */
    begin?: Date;
    /**
     * 结束时间
     */
    end?: Date;
    /**
     * 当前时区，目前支持‘本地时区’和‘UTC/GMT’
     */
    timeZone?: string;
}

export interface TiDateCustomizeOptions {
    /**
     * 自定义文本
     */
    label: string;
    /**
     * 自定义时间
     */
    value: TiDateValue;
}

/**
 * 时间日期格式化配置
 */
export interface TiDatetimeFormat {
    /**
     * 日期格式化，默认配置'yyyy/MM/dd'
     *
     * 1.年可以设置为：
     *
     * yyyy — 四位数字表示年：例如：'2016'；
     *
     * 2.月可以设置为：
     *
     * MMMM — 月份英文全称（January - December）；
     *
     * MMM — 月份英文简称 （Jan - Dec）；
     *
     * MM — 两位数字（01 - 12）；
     *
     * M — 开头不补零方式（1 - 12）
     *
     * 3.日可以设置为：
     *
     * dd — 两位数字（01 - 31）;
     *
     * d — 开头不补零数字（1 - 31）.
     */
    date: string;
    /**
     * 时间格式化，默认配置'HH:mm:ss'
     *
     * 1.小时可以设置为：
     *
     * HH — 24 小时制，两位数字（00 - 23）
     *
     * H — 24 小时制，开头不补零数字（0 - 23）
     *
     * 2.分钟可以设置为：
     *
     * mm — 两位数字（00-59）
     *
     * m — 开头不补零数字（0-59）
     *
     * 3.秒可以设置为：
     *
     * ss — 两位数字（00-59）
     *
     * s — 开头不补零数字（0-59）
     *
     * 说明：开头补零是指当前时间是个位数字时，前边补零，始终保持两位数字
     */
    time: string;
}

/**
 * @ignore
 * dateRange以及datetimeRange组件适配datepanel的接口类型
 */
export interface TiPicker {
     value?: TiDateValue;
     type?: string;
     picker?: string;
     min?: Date;
     max?: Date;
     nowDateTime?: Date;
     format?: string | TiDatetimeFormat; // 两种类型:date dateRange组件是string类型，datetime datetimeRange组件是DatetimeFormat类型
     select?(): void; // 月份/日期，点击事件回调函数
     selectTimeFn?(val: any): void;
 }

/**
 * @ignore
 * 配置time组件的接口
 */
export interface TimeOptions {
    value?: string;
    min?: string;
    max?: string;
}

// lib编译要求@Component
@Component({
    template: ''
})

export class TiDateBaseComponent extends TiFormComponent {
    /**
     * @ignore
     * 下拉距离选择框0px
     */
    private static readonly DOMINATOR_SPACE: number = -30;
    /**
     * 日期/日期时间下拉选择框距离浏览器上下边沿的距离为5px，开发者可在项目中整体配置
     */
    public static BROWSER_SPACE: number = 5;
    /**
     * 最小值，默认值为 new Date(1970, 0, 1, 0, 0, 0)
     */
    @Input() min: Date = TiDateUtil.minDate();
    /**
     * 最大值，默认值为 new Date(2099, 11, 31, 23, 59, 59)
     */
    @Input() max: Date = TiDateUtil.maxDate();
    /**
     * 日期、时间显示格式
     *
     * 1.date 和 dateRange 组件中类型为 string，默认值为'yyyy/MM/dd'；
     *
     * 2.datetime 和 datatimerange 组件中类型为 TiDatetimeFormat，默认值为{date: 'yyyy/MM/dd', time: 'HH:mm:ss'}
     *
     */
    @Input() format: string | TiDatetimeFormat;
    /**
     * 自定义当前时间，默认值为当前系统时间
     */
    @Input() nowDateTime: Date;
    /**
     * 是否显示清除图标
     */
    @Input() clearIcon: boolean = true;
    /**
     * 下拉面板与输入框的对齐方式
     */
    @Input() panelAlign: 'left' | 'right' = 'left';
    /**
     * 自定义下拉面板左侧内容，一般用于快速选择日期时间场景
     */
    @Input() customizeOptions: TiDateCustomizeOptions;
    /**
     * 自定义禁用日期，date 和 daterange 组件支持
     */
    @Input() disabledDays: Array<Date>;
    /**
     * 开始日期是否固定不可选，只有 daterange 组件支持
     */
    @Input() isBeginFixed: boolean = false;
    /**
     * 结束日期是否固定不可选，只有 daterange 组件支持
     */
    @Input() isEndFixed: boolean = false;
    /**
     * 点击下拉面板上的确认按钮时触发的回调，date 组件不支持
     */
    @Output() readonly okClick: EventEmitter<any> = new EventEmitter();
    /**
     * 点击日期面板上的日期触发的回调，date 和 datertime 组件不支持
     */
    @Output() readonly dayClick: EventEmitter<any> = new EventEmitter();
    /**
     * @ignore
     * dominator组件
     */
    @ViewChild(TiDateDominatorComponent, { static: true }) dominatorCom: TiDateDominatorComponent;
    /**
     * @ignore
     * drop下拉组件
     */
    @ViewChild(TiDropComponent, { static: true }) dropCom: TiDropComponent;
    /**
     * @ignore
     *
     * 配合tab快捷键操作的过度Dom
     */
    @ViewChild('input', { static: true }) inputRef: ElementRef;
    /**
     * @ignore
     * dateEdit组件
     */
    @ViewChildren(TiDateEditComponent) dateEditComs: QueryList<TiDateEditComponent>;
    /**
     * @ignore
     * 时间编辑框
     */
    @ViewChildren(TiTextComponent) textComs: QueryList<TiTextComponent>;
    /**
     * @ignore
     * button组件
     */
    @ViewChildren(TiButtonComponent) buttonComs: QueryList<TiButtonComponent>;

    private readonly localeWords: TiLocaleWords = TiLocale.getLocaleWords();

    // 该基类主要用于实现公共变量接口声明,公共的事件，以及公共方法
    /**
     * @ignore
     * 保存旧日期显示格式
     */
    public oldFormat: string | TiDatetimeFormat;
    /**
     * @ignore
     * 保存旧model值：date类型或者datevalue类型
     */
    public oldModel: Date | TiDateValue;
    /**
     * @ignore
     * 判断当前value值是不是合法的，不合法则确认按钮灰化
     */
    public inValidValue: boolean;
    /**
     * @ignore
     * 标记点击叉号
     */
    public isClearClick: boolean;
    /**
     * @ignore
     * 标志是日期还是时间日期
     */
    public isDatetime: boolean;
    /**
     * @ignore
     * 标志是时间日期还是时间日期段
     */
    public isRange: boolean;
    /**
     * @ignore
     * 时间面板dominator对应的placehoder
     */
    public placeholder: string;
    /**
     * @ignore
     * 标志是时间选择面板还是日期选择面板
     */
    public selectTime: boolean = false;
    /**
     * @ignore
     * 对应每个时间日期组件的最大最小值的配置
     */
    public config: {min: Date, max: Date} = {
        min: TiDateUtil.minDate(),
        max: TiDateUtil.maxDate()
    };
    /**
     * @ignore
     * model默认值
     */
    public defaultValue: TiDateValue = {
        begin: null,
        end: null
    };
    /**
     * @ignore
     * 模板初始化
     */
    public datePanel: TiPicker = {
        value: this.defaultValue
    };

    /**
     * @ignore
     * 面板宽度
     */
    public datePanelWidth: string = 'auto';
    /**
     * @ignore
     * 日期显示字符串
     */
    public inputValue: string = '';
    private documentKeydownListener: () => void;
    /**
     * @ignore
     * 模板中使用
     */
    public browserSpace: string = TiDateBaseComponent.BROWSER_SPACE + 'px';
    /**
     * @ignore 面板与dominator的距离
     */
    public dominatorSpace: string = TiDateBaseComponent.DOMINATOR_SPACE + 'px';
    /**
     * @ignore
     * 记录当前面板内部编辑区域焦点位置
     */
    public focusedPosition: string = 'begin';
    /**
     * @ignore
     * 时间编辑框placehoder
     */
    public timeplaceholder: string = 'hh:mm:ss';
    /**
     * @ignore
     * 底部选择时间按钮禁用标志
     */
    public timeEditDisabled: boolean;
    /**
     * @ignore
     * 标志是否存在左侧自定义时间区域
     */
    public hasCustomizeTime: boolean = false;
    /**
     * @ignore
     * 可聚焦元素集合
     */
    public focusElementsArr: Array<any> = [];
    /**
     * @ignore
     * 保存用户设置的max值
     */
    public userSetMaxvalue: Date;
    /**
     * @ignore
     * 保存用户设置的min值
     */
    public userSetMinvalue: Date;
    /**
     * @ignore
     * 日期面板/时间面板类型
     */
    public datepanelPicker: 'onlyYear' | 'year' | 'onlyYearMonth' | 'month' | 'day' | 'quarter' | 'onlyHours' | 'onlyHoursMinutes' | 'seconds';

    constructor(protected hostRef: ElementRef, protected render: Renderer2, protected changeDetectorRef: ChangeDetectorRef,
         private zone: NgZone, @Inject(DOCUMENT) private document) {
        super(hostRef, render, changeDetectorRef);
    }

    private static getFocusElements(focusComs: any, focusElements: Array<any>): Array<any> {
        for (const focusCom of focusComs.toArray()) {
            focusElements = focusElements.concat(focusCom.getFocusableElems());
        }

        return focusElements;
    }

    /**
     * @ignore
     * 组件快捷键处理tab键 enter键
     */
    @HostListener('keydown', ['$event']) public onKeydown(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case TiKeymap.KEY_TAB : // TAB键
                this.hidePanel();
                break;
            case TiKeymap.KEY_ENTER : // ENTER键(大键盘)
            case TiKeymap.KEY_NUMPAD_ENTER : // ENTER键(数字小键盘)
                this.responseEnter();
                break;
            default :
                break;
        }
    }

    /**
     * @ignore
     * writeValue区分是不是range组件：
     */
    writeValue(value: any): void {
        super.writeValue(value);
        // 1.daterange和datetimerange组件的处理
        // 新旧值判断处理放在docheck中
        if (this.isRange) {
            // value不是对象时，将value设置为null，输入框中显示空白
            if (!(value instanceof Object) || !this.isValidValue(value)) {
                this.model = value?.timeZone ? {
                    begin: null,
                    end: null,
                    timeZone: value?.timeZone
                } : null;

                return;
            }
        }

        // 2.date和datetime组件的处理，非法时间日期值统一置为null，显示空
        if (!this.isValidValue(value)) {
            this.model = null;

            return;
        }

        // 新旧值相同时不作处理；
        if (TiDateUtil.isDateEqual(value, this.model)) {
            return;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        // 记录服务设置的最大值
        if (changes['max']) {
            this.userSetMaxvalue = this.max;
        }

        // 记录服务设置的最小值
        if (changes['min']) {
            this.userSetMinvalue = this.min;
        }
    }
    ngOnInit(): void {
        super.ngOnInit();
        // 是否存在左侧自定义面板
        this.hasCustomizeTime = !Util.isUndefined(this.customizeOptions) && !Util.isNull(this.customizeOptions);
        // format接口校验:对时间日期进行国际化处理
        this.validateFormat(this.isDatetime);
        // 设置面板显示格式
        this.setPicker();
        // 最大最小值校验
        this.validateMinAndMax(this.config, this.isDatetime);

        this.zone.runOutsideAngular(() => { // 避免不停触发变化检测
            // document上的Ecs快捷键功能
            this.documentKeydownListener = this.render.listen(this.document, 'keydown', this.keydownHandlerFn);
        });
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        // 定义变量存储聚焦元素；
        let focusElements: Array<any> = [];

        // 获取dateedit的聚焦元素
        focusElements = TiDateBaseComponent.getFocusElements(this.dateEditComs, focusElements);
        // 获取时间编辑框聚焦元素
        if (this.textComs.length !== 0) {
            for (const textCom of this.textComs.toArray()) {
                focusElements = focusElements.concat(textCom.nativeElement);
            }
        }

        if (this.inputRef) {
            focusElements = focusElements.concat(this.inputRef.nativeElement);
        }

        // 获取确认取消按钮的聚焦元素
        for (const buttonCom of this.buttonComs.toArray()) {
            focusElements = focusElements.concat(buttonCom.nativeElement);
        }
        this.focusElementsArr = focusElements;
        this.setFocusableElems([this.dominatorCom.nativeElement]
            .concat(this.dropCom.nativeElement)
            .concat(focusElements));
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.documentKeydownListener) {
            this.documentKeydownListener();
        }
    }

    protected keydownHandlerFn = (event: KeyboardEvent): void => {
        if (!this.dropCom.isShow) {
            return;
        }
        if (event.keyCode === TiKeymap.KEY_ESCAPE) {
            this.hidePanel();
            this.dominatorCom.focus();
        }
        this.tabKeydown(event);
    }

    /**
     * 实现按tab键时，focus在下拉面板中循环
     */
    private tabKeydown(event: KeyboardEvent): void {
        if(this.focusElementsArr.length === 0 ) {
            return;
        }
        let focusChanged: boolean = false;
        if (event.keyCode === TiKeymap.KEY_TAB) {
            const panelFocusElementsArr = this.focusElementsArr.filter((item: any) => !item.hasAttribute('disabled'));
            if (event.shiftKey) {
                if(event.target === panelFocusElementsArr[0]) {
                    focusChanged = true;
                    panelFocusElementsArr[panelFocusElementsArr.length - 1].focus();
                }
            } else if (event.target === panelFocusElementsArr[panelFocusElementsArr.length - 1]) {
                focusChanged = true;
                panelFocusElementsArr[0].focus();
            }
        }
        if (focusChanged) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    // ----------------------------- 公共事件处理 -----------------------------
    /**
     * @ignore
     * 点击面板展开收起函数
     */
    public onShowClick(): void {
        if (this.disabled) { // 非灰化可点击展开面板
            return;
        }

        if (this.dropCom.isShow || this.isClearClick) {
            this.isClearClick = false;
            this.dropCom.hide();
        } else {
            // 配置时间日期面板接口
            this.setPickerDate();
            this.show();
            this.selectTime = false; // 面板打开初次总展示日期面板
            setTimeout(() => {
                if (this.isBeginFixed && !this.isEndFixed) {
                    this.dateEditComs.last.focus(); // 开始值固定，则第二个编辑区域聚焦
                    this.focusedPosition = 'end';
                } else {
                    this.dateEditComs.first.focus(); // 初始化打开面板，第一个编辑区域聚焦
                    this.focusedPosition = 'begin';
                }
            }, 0);
        }
    }
    /**
     * @ignore
     * 左侧自定义时间文本点击事件
     */
    public customizeTimeClickFn(val: TiDateValue): void {
        this.model = val;
        this.dropCom.hide();
    }
    /**
     * @ignore
     * 点击选择时间，根据初始传入值设定下拉选择项
     */
    public selectTimeFn(): void {
        if (this.timeEditDisabled) {
            return;
        }
        this.selectTime = true; // 切换为时间选择面板
        this.textComs.first.nativeElement.focus();
    }
    /**
     * @ignore
     */
    public selectDateFn(): void {
        this.selectTime = false;
        this.dateEditComs.first.nativeElement.focus();
        this.focusedPosition = 'begin';
    }
    /**
     * @ignore
     */
    public dateEditClick(val: string): void {
        if (this.isBeginFixed || this.isEndFixed) {
            return;
        }
        this.focusedPosition = val;
        this.selectTime = false;
    }
    /**
     * @ignore
     */
    public dateEditFocus(val: string): void {
        this.focusedPosition = val;
        this.selectTime = false;

        if (!this.isRange) {
            return;
        }

        const value: any = this.datePanel.value;
        // 先选择开始日期，焦点会自动到结束日期，此时开始日期之前日期禁用，若不选择结束日期手动聚焦到开始日期时，需将开始日期之前日期取消禁用即恢复默认最小值，以便用户重新选择开始日期；
        if (val === 'begin' && TiDateUtil.isDate(value.begin) && !TiDateUtil.isDate(value.end)) {
            this.datePanel.min = this.min;
        } else if (val === 'end' && TiDateUtil.isDate(value.end) && !TiDateUtil.isDate(value.begin)) { // 先选择结束日期，与先选择结束日期同理；
            this.datePanel.max = this.max;
        }
    }
    /**
     * @ignore
     * 时间框聚焦
     */
    public timeFocus(val: string): void {
        this.selectTime = true;
        this.focusedPosition = val === 'begin' ? 'beginTime' : 'endTime';
    }
    /**
     * @ignore
     */
    public setTimeFn(obj: any, beginTime: TimeOptions, endTime?: TimeOptions): void {
        const timePosition: string = obj.timeOption;
        const beginTimeArr: any = beginTime.value.split(':');
        let endTimeArr: any;
        if (!Util.isUndefined(endTime)) {
            endTimeArr = endTime.value.split(':');
        }
        switch (timePosition) {
            case 'beginHour':
                beginTimeArr[0] = obj.val.label;
                break;
            case 'beginMinute':
                beginTimeArr[1] = obj.val.label;
                break;
            case 'beginSecond':
                beginTimeArr[2] = obj.val.label;
                break;
            case 'endHour':
                endTimeArr[0] = obj.val.label;
                break;
            case 'endMinute':
                endTimeArr[1] = obj.val.label;
                break;
            case 'endSecond':
                endTimeArr[2] = obj.val.label;
                break;
            default:
                break;
        }
        beginTime.value = beginTimeArr.join(':');
        if (!Util.isUndefined(endTime)) {
            endTime.value = endTimeArr.join(':');
        }
    }

    /**
     * @ignore
     * 点击删除按钮
     */
    public onIconClearClick(event: MouseEvent): void {
        // 阻止事件冒泡：可以防止点击叉号引起面板的显示或者隐藏，但此处不能阻止事件冒泡，
        // 事件不会冒泡到document上，会出现页面上其他下拉类组件面板不收起情况
        // 添加标志量，在onShowClick函数中处理
        if (this.disabled || !this.clearIcon) {
            return;
        }
        this.isClearClick = true;
        this.model = this.model?.timeZone ? {
            begin: null,
            end: null,
            timeZone: this.model?.timeZone
        } : null;
        this.inputValue = '';
        // 时间日期面板显示则隐藏
        this.hidePanel();
    }

    /**
     * @ignore
     * 隐藏drop, 适用于drop中用户点击引起drop隐藏，阻止了整体失焦。
     */
    public hideDrop(): void {
        // 阻止整体失去焦点
        this.dominatorCom.focus();
        this.dropCom.hide();
    }
    /**
     * @ignore
     * 隐藏面板
     */
    public hidePanel(): void {
        if (this.dropCom.isShow) {
            this.dropCom.hide();
        }
    }

    /**
     * @ignore
     * enter键的功能：如果面板展开不处理，面板收起则展开，设置datePanel指令的接口值
     */
    public responseEnter(): void {
        if (this.dropCom.isShow) {
            return;
        }

        // 面板收起前是年或月面板，按enter键重新设置datePanel指令的接口值
        this.setPickerDate();

        // 时间面板展开
        this.show();
        setTimeout(()=> {
            this.dateEditComs.first.nativeElement.focus();
            this.focusedPosition = 'begin';
        }, 0);
    }
    /**
     * @ignore
     *
     * 设置按钮禁用场景下 过度input的样式（适配tab快捷键场景）
     */
    public setInputStyle(val: boolean): void {
        if(val) {
            this.render.removeStyle(this.inputRef.nativeElement, 'display');
            this.render.setStyle(this.inputRef.nativeElement, 'opacity', '0');
        } else {
            this.render.setStyle(this.inputRef.nativeElement, 'display', 'none');
        }
    }

    /**
     * @ignore
     */
    public setPlacehoder(): void {
        if (Util.isUndefined(this.format)) {
            return;
        }
        if (this.format === 'YYYY/QQ') {
            this.placeholder = this.isRange ?
            `${TiLocale.getLocaleWords().tiDate.quarterRangeBeginLabel} ─ ${TiLocale.getLocaleWords().tiDate.quarterRangeEndLabel}`
            : TiLocale.getLocaleWords().tiDate.quarterSelectPlacehoder;

            return;
        }
        // 如果只显示年
        if ((this.format as string).indexOf('M') === -1 && this.format !== 'mediumDate') {
            this.placeholder = this.isRange ?
            `${TiLocale.getLocaleWords().tiDate.yearRangeBeginLabel} ─ ${TiLocale.getLocaleWords().tiDate.yearRangeEndLabel}`
            : TiLocale.getLocaleWords().tiDate.yearSelectPlacehoder;
        } else if ((this.format as string).indexOf('d') === -1) { // 如果只显示年月
            this.placeholder = this.isRange ?
            `${TiLocale.getLocaleWords().tiDate.monthRangeBeginLabel} ─ ${TiLocale.getLocaleWords().tiDate.monthRangeEndLabel}`
            : TiLocale.getLocaleWords().tiDate.monthSelectPlacehoder;
        } else {
            this.placeholder = this.isRange ?
            `${TiLocale.getLocaleWords().tiDate.rangeBeginLabel} ─ ${TiLocale.getLocaleWords().tiDate.rangeEndLabel}`
            : TiLocale.getLocaleWords().tiDate.datePlaceholder;
        }
    }

    private setPicker(): void {
        if (this.isDatetime) {
            this.setDatetimepanelPicker();
        } else {
            this.setDatepanelPicker();
        }
    }

    /**
     * @ignore
     *
     * @param isDatetime 是否是日期时间组件
     *
     * 设置日期时间和日期时间范围组件时间面板类型
     */
     public setDatetimepanelPicker(): string {
        if (!this.format) {
            return;
        }

        this.format = this.format as TiDatetimeFormat;

        if (this.format.time.indexOf('m') === -1) {
            this.datepanelPicker = 'onlyHours';
        } else if (this.format.time.indexOf('s') === -1) {
            this.datepanelPicker = 'onlyHoursMinutes';
        } else {
            this.datepanelPicker = 'seconds';
        }

    }

    /**
     * @ignore
     *
     * @param isDatetime 是否是日期时间组件
     *
     * 设置日期和日期范围组件面板类型
     */
    public setDatepanelPicker(): void {
        if (!this.format) {
            return;
        }

        this.format = this.format as string;

        // 如果只显示年
        if (this.format.indexOf('M') === -1 && this.format !== 'mediumDate') {
            this.datepanelPicker = this.isRange ? 'onlyYear' : 'year';
        } else if (this.format.indexOf('d') === -1) {  // 如果只显示年月
            this.datepanelPicker = this.isRange ? 'onlyYearMonth' : 'month';
        } else {
            this.datepanelPicker = 'day';
        }

        if (this.format === 'YYYY/QQ') {
            this.datepanelPicker = 'quarter';
        }
    }

    // ----------------------------- 公共方法处理 -----------------------------
    /**
     * @ignore
     * 判断是不是合法的DatetimeFormat: format为对象 {date:'', time: ''}
     */
    public isValidDatetimeFormat(): boolean {
        return (this.format instanceof Object) && Util.isString(this.format['date']) && Util.isString(this.format['time']);
    }

    /**
     * @ignore
     * 最大值最小值校验
     */
    public validateMinAndMax(dateCofig: {min: Date, max: Date}, isDatetime?: boolean): void {
        const maxChanged: Date = TiDateUtil.changeMaxTime(this.userSetMaxvalue, this.datepanelPicker, isDatetime);
        this.max = TiDateUtil.isDate(maxChanged) ? maxChanged : dateCofig.max;

        const minChanged: Date =  TiDateUtil.changeMinTime(this.userSetMinvalue, this.datepanelPicker, isDatetime);
        this.min = TiDateUtil.isDate(minChanged) ? minChanged : dateCofig.min;

        // 最大最小值矛盾时，设置为默认值
        if (this.max.getTime() < this.min.getTime()) {
            this.max = dateCofig.max;
            this.min = dateCofig.min;
        }
    }

    /**
     * @ignore
     * 校验format接口
     */
    public validateFormat(isDatetime: boolean): void {
        if (isDatetime) {
            this.validateDatetimeFormat();
        } else {
            this.validateDateFormat();
        }
    }

    /**
     * @ignore
     * 校验format: string类型，
     */
    public validateDateFormat(): void {
        if (Util.isString(this.format)) {
            return;
        }
        // TODO:如果配置时间日期国际化
        this.format = this.localeWords.tiLocaleDate['date'];
    }

    /**
     * @ignore
     * 校验format: 对象类型{date:'', time:''}
     */
    public validateDatetimeFormat(): void {
        // TODO:初始化为ngLocale格式
        // 用户设置format不是一个对象，设置为国际配置的format或默认值
        if (!(this.format instanceof Object)) {
            this.format = {
                date: this.localeWords.tiLocaleDate['date'],
                time: this.localeWords.tiLocaleDate['time']
            };

            return;
        }

        // format 为联合类型:此处处理DatetimeFormat类型
        this.format = this.format as TiDatetimeFormat;
        // 日期格式校验
        if (!Util.isString(this.format.date)) {
            this.format.date = this.localeWords.tiLocaleDate['date'];
        }

        // 日期格式校验
        if (!Util.isString(this.format.time)) {
            this.format.time = this.localeWords.tiLocaleDate['time'];
        }

        // 时间框提示文本按照小写显示
        this.timeplaceholder = this.format.time.toLowerCase();
    }

    /**
     * @ignore
     * 判断range类型的model是否变化：比较起始时间和结束时间
     */
    public rangeValueIsEqual(newValue: TiDateValue, oldValue: TiDateValue, isDatetime: boolean): boolean {
        if (newValue === oldValue) {
            return true;
        }

        if ((newValue instanceof Object) && (oldValue instanceof Object)) {
            if (isDatetime) {
                return (TiDateUtil.isDatetimeEqual(newValue['begin'], oldValue['begin']) &&
                             TiDateUtil.isDatetimeEqual(newValue['end'], oldValue['end']));
            } else {
                return (TiDateUtil.isDateEqual(newValue['begin'], oldValue['begin']) &&
                             TiDateUtil.isDateEqual(newValue['end'], oldValue['end']));
            }
        }

        return false;
    }

    // ----------------------------- 动态监听处理 -----------------------------
    /**
     * @ignore
     * model值动态变更：支持仅修改begin或end值
     */
    public setModel(isDatetime: boolean): void {
        if (this.rangeValueIsEqual(this.model, this.oldModel as TiDateValue, isDatetime)) {
            return;
        }

        // model中begin或者end值的变更
        this.formatValue();

        // 通过按钮改变model值：当面板处于打开状态时需要重新设置面板接口
        if (this.dropCom.isShow) {
            this.setPickerDate();
        }

        this.oldModel = (this.model === null) ? null : {
            begin: this.model.begin,
            end: this.model.end
        };
    }

    /**
     * @ignore
     * datetime与datetimeRange组件format动态变更
     */
    public setFormat(): void {
        if (this.format && this.format['date'] === this.oldFormat['date'] &&
            this.format['time'] === this.oldFormat['time']) {
                return;
        }

        if (!this.isValidDatetimeFormat()) {
            this.format = this.oldFormat;

            return;
        }
        if (this.isDatetime && this.format['time'] !== this.oldFormat['time']) {
            this.format = this.format as TiDatetimeFormat;
            // 时间框提示文本按照小写显示
            this.timeplaceholder = this.format.time.toLowerCase();
        }
        this.formatValue();
        this.oldFormat = this.format;
        this.setDatetimepanelPicker();
        this.validateMinAndMax(this.config, true);
    }

    private show(): void {
        if (this.renderer.parentNode(this.dropCom.nativeElement) === document.body) {
           this.dropCom.show();
        } else {
            // 使用setTimeout是为了保证datepanel渲染完成后再显示，否则首次打开时定位计算不准确
            setTimeout(() => {
                this.dropCom.show();
            }, 0);
        }
    }

    /**
     * @ignore
     * 决定上下位置的函数
     */
    public determinPositionFn: (layout: any) => string = (layout: any) =>  {
        const needHeight: number = layout.targetLayout.height + TiDateBaseComponent.DOMINATOR_SPACE + TiDateBaseComponent.BROWSER_SPACE;
        if (layout.avilableLayout.bottom >= needHeight) { // 下方空间足够，向下展开
            return this.panelAlign === 'left' ? 'bottom-left' : 'bottom-right';
        } else {
            return this.panelAlign === 'left' ? 'top-left' : 'top-right';
        }
    }
    /**
     * @ignore
     * 设置时间
     */
    public setDateTime(timeArr: Array<string>): Date {

        let dateVal: Date ;

        if (timeArr.length === 1) {
           dateVal = new Date(2020, 10, 30, parseInt(timeArr[0], 10));
        } else if (timeArr.length === 2) {
           dateVal = new Date(2020, 10, 30, parseInt(timeArr[0], 10), parseInt(timeArr[1], 10));
        } else {
           dateVal = new Date(2020, 10, 30, parseInt(timeArr[0], 10), parseInt(timeArr[1], 10), parseInt(timeArr[2], 10));
        }

        return dateVal;
    }

    /**
     * @ignore
     * TiDateRangeComponent 和 TiDatetimeRangeComponen 中使用
     */
    public rangeChange(changes: SimpleChanges): void {
        // 验证最大值最小值，为了处理最大值和最小值从合法日期变为undefined 的情景
        if ((changes['max'] && !changes['max'].firstChange)) {
            this.validateMinAndMax(this.config, this.isDatetime);
            this.datePanel.max = this.max;

            // dayClick事件中（选择日期）动态变更最大值时，只有在点击确认按钮时需要更新model值，此处只处理面板未打开情况下变更最大值的场景
            if (TiDateUtil.isDate(this.model?.end) && TiDateUtil.isBigger(this.model.end, this.max) && !this.dropCom.isShow) {
                this.model.end = this.max;

                return;
            }

            if (TiDateUtil.isDate(this.datePanel.value.end) && TiDateUtil.isBigger(this.datePanel.value.end, this.max)) {
                this.datePanel.value.end = this.max;
            }
        }

        if ((changes['min'] && !changes['min'].firstChange)) {
            this.validateMinAndMax(this.config, this.isDatetime);
            this.datePanel.min = this.min;

            // dayClick事件中（选择日期）动态变更最小值时，只有在点击确认按钮时需要更新model值，此处只处理面板未打开情况下变更最小值的场景
            if (TiDateUtil.isDate(this.model?.begin) && TiDateUtil.isSmaller(this.model.begin, this.min) && !this.dropCom.isShow) {
                this.model.begin = this.min;

                return;
            }

            if (TiDateUtil.isDate(this.datePanel.value.begin) && TiDateUtil.isSmaller(this.datePanel.value.begin, this.min)) {
                this.datePanel.value.begin = this.min;
            }

        }
    }

    // ----------------------------- 需要在子类中实现 -----------------------------
    /**
     * @ignore
     * 0.判断是不是合法的model
     */
    protected isValidValue(value: any): boolean {
        return true;
    }

    /**
     * @ignore
     * 1.配置时间日期面板接口
     */
    protected setPickerDate(): void {}

    /**
     * @ignore
     * 2.根据format格式model值
     */
    protected formatValue(): void {}

    /**
     * @ignore
     * 3.根据当前值设置确认按钮的状态
     */
    protected setOkBtnState(): void {}

    /**
     * @ignore
     * 起始面板日期有变化时，要重新设置其time组件对应最大值 datetimeRange组件中实现此方法
     */
    protected setBeginTimeMaxValue(): void {}

    /**
     * @ignore
     * 起始面板日期有变化时，要重新设置其time组件对应最小值 datetimeRange组件中实现此方法
     */
    protected setBeginTimeMinValue(): void {}

    /**
     * @ignore
     * 结束日期有变化时，要重新设置其time组件对应最大值 datetimeRange组件中实现此方法
     */
    protected setEndTimeMaxValue(): void {}

    /**
     * @ignore
     * 结束日期有变化时，要重新设置其time组件对应最小值 datetimeRange组件中实现此方法
     */
    protected setEndTimeMinValue(): void {}
}
