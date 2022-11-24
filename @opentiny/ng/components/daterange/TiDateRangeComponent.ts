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
    Component,
    ElementRef,
    NgZone,
    Renderer2,
    SimpleChanges,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';
import { TiDateUtil, TiKeymap, Util } from '../../utils/Util';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiDateBaseComponent, TiDateValue } from '../datebase/TiDateBaseModule';
import { TiLocale, TiLocaleFormat } from '../../locale/TiLocaleModule';

/**
 * DateRange日期范围组件
 *
 * DateRange组件提供了一种方便的显示和设置日期范围的方式
 *
 */
@Component({
    selector: 'ti-date-range',
    templateUrl: './daterange.html',
    styleUrls: ['./daterange.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-date-range-input-container]': 'true',
        '(blur)': 'hidePanel()'
    },
    providers: [TiFormComponent.getValueAccessor(TiDateRangeComponent)]
})

export class TiDateRangeComponent extends TiDateBaseComponent {
    /**
     * 是否允许结束日期和开始日期相同
     */
    @Input() isAllowBeginEqualEnd: boolean = true;
    /**
     * @ignore
     * 日期显示格式: date组件的format为string类型
     */
    public format: string;
    /**
     * @ignore
     * 标记date/datetime的类型
     */
    public isDatetime: boolean = false;
    /**
     * @ignore
     * 用于标记是不是range
     */
    public isRange: boolean = true;
    /**
     * @ignore
     * 保存model值
     */
    public oldModel: TiDateValue = {
        begin: null,
        end: null
    };
    /**
     * @ignore
     * placeholder提示文本
     */
    public placeholder: string = `${TiLocale.getLocaleWords().tiDate.rangeBeginLabel} ─ ${TiLocale.getLocaleWords().tiDate.rangeEndLabel}`;

    ngOnInit(): void {
        super.ngOnInit();
        this.setPlacehoder();
    }
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        // format支持动态变更
        if (changes['format'] && !changes['format'].firstChange) {
            // 新的format是非法时，format值保持之前值不变
            if (!Util.isString(changes['format'].currentValue)) {
                this.format = changes['format'].previousValue;

                return;
            }
            this.formatValue();
            this.setPlacehoder();
            this.setDatepanelPicker();
            this.validateMinAndMax(this.config);
        }
        this.rangeChange(changes);
    }

    ngDoCheck(): void {
        // 监听value值
        if (!Util.isUndefined(this.model)) {
            if (!this.isValidValue(this.model)) {
                return;
            }
            // 监听model值的变化
            this.setModel(this.isDatetime);
        }
    }

    /**
     * @ignore
     * 将value转换成format接口格式的字符串
     */
    public formatValue(): void {
        if (this.model === null || (this.model.begin === null && this.model.end === null)) {

            this.inputValue = '';
        } else {
            let begin: string = TiLocaleFormat.formatDate(this.model.begin, this.format);
            let end: string = TiLocaleFormat.formatDate(this.model.end, this.format);
            // 注意：中划线用的是制表符中的中划线，与正常的中线区分开2017-2-12 - 2018-3-20+
            if (this.format === 'YYYY/QQ') {
                begin = TiDateUtil.transformDateToQuarter(this.model.begin);
                end = TiDateUtil.transformDateToQuarter(this.model.end);
            }
            this.inputValue = `${begin} ─ ${end}`;
        }
    }
    /**
     * @ignore
     */
    onKeydownFn(event: KeyboardEvent, pos: string): void {
        if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
            this.dateEditBlur(pos);
        }
    }
    /**
     * @ignore
     */
    dateEditBlur(pos: string): void {
        // 输入值超出最大最小 认为非法
        const value: any = this.datePanel.value;
        if (pos === 'begin') {
            // 添加setTimeout原因：确保日期框失焦，this.focusedPosition获取到的是处于聚焦状态时的位置
            setTimeout(() => {
                if (this.focusedPosition === 'end' && TiDateUtil.isDate(value.begin)) {
                    this.datePanel.min = value.begin;

                    if (TiDateUtil.isDate(value.end)) {
                        this.datePanel.max = this.max;
                    }
                }
                // 绑定在模板上的值变了，需要手动触发变更检测
                this.changeDetectorRef.detectChanges();
            }, 0);

        } else {
            setTimeout(() => {
                if (this.focusedPosition === 'begin' && TiDateUtil.isDate(value.end)) {
                    this.datePanel.max = value.end;

                    if (TiDateUtil.isDate(value.begin)) {
                        this.datePanel.min = this.min;
                    }
                }
                this.changeDetectorRef.detectChanges();
            }, 0);

        }

        // 添加setTimeout原因：点击另外输入框时，获取到最新的focusedPosition再做判断
        // 点击非禁用的确认按钮，需保证焦点在面板内部，否则点击document空白处无法关闭面板
        setTimeout(() => {
            if (((!TiDateUtil.isDate(value.begin) && this.focusedPosition !== 'end')
                 || (!TiDateUtil.isDate(value.end) && this.focusedPosition !== 'begin'))
                && !this.inValidValue) {
                this.dropCom.nativeElement.focus();
            }
            this.setOkBtnState();
        }, 0);
    }
    /**
     * @ignore
     * 确认按钮
     */
    public onOkClick(): void {
        if (this.inValidValue) {
            return;
        }

        if (this.datePanel instanceof Object) {
            // 新旧值不同更新model值
            if (!this.rangeValueIsEqual(this.model, this.datePanel['value'], this.isDatetime)) {
                const endDate: Date = this.datePanel['value'].end;
                const transformDateToExactDate: Date = TiDateUtil.transformDateToExactDate(endDate, this.datePanel.picker, true);
                this.model = {
                    begin: this.datePanel['value'].begin,
                    // 结束日期应转化为对应具体日期时间，此处添加判断排除用户通过鼠标操作选择结束日期的场景
                    end: TiDateUtil.isDatetimeEqual(endDate, transformDateToExactDate) ? endDate : transformDateToExactDate
                };
            }
        }

        this.hideDrop();

        this.okClick.emit(this.model);
    }

    /**
     * @ignore
     * 是否为禁用日期
     */
    public isDisabledDays(value: Date): boolean {
        return TiDateUtil.isDisabledDays(this.disabledDays, value);
    }
    /**
     * @ignore
     * model值的合法性判断
     */
    public isValidValue(value: TiDateValue): boolean {
        if (value === null) {
            return true;
        }

        return this.isValidRange(value) ? true : false;
    }

    // 判断是不是合法范围
    private isValidRange(value: TiDateValue): boolean {
        if (!(value instanceof Object) || !TiDateUtil.isDate(value.begin) || !TiDateUtil.isDate(value.end)) {
            return false;
        }

        const startDate: Date = new Date(value.begin.getFullYear(), value.begin.getMonth(), value.begin.getDate());
        const endDate: Date = new Date(value.end.getFullYear(), value.end.getMonth(), value.end.getDate());

        return startDate.getTime() <= endDate.getTime() && TiDateUtil.isBetweenMaxAndmin(startDate, this.min, this.max)
            && TiDateUtil.isBetweenMaxAndmin(endDate, this.min, this.max);
    }
    /**
     * @ignore
     * 设置确认按钮的状态
     */
    public setOkBtnState(): void {
        const date: TiDateValue = this.datePanel.value;
        let endTime: number;
        let beginTime: number;
        if (TiDateUtil.isDate(date.end)) {
            endTime = new Date(date.end.getFullYear(), date.end.getMonth(), date.end.getDate()).getTime();
        }
        if (TiDateUtil.isDate(date.begin)) {
            beginTime = new Date(date.begin.getFullYear(), date.begin.getMonth(), date.begin.getDate()).getTime();
        }
        const isBeginSmallorEqualEnd: boolean = this.isAllowBeginEqualEnd ? endTime < beginTime : endTime <= beginTime;
        this.inValidValue = !(date instanceof Object)
            || !TiDateUtil.isDate(date.begin)
            || !TiDateUtil.isDate(date.end)
            || isBeginSmallorEqualEnd;

        if (this.buttonComs) {
            this.setAttr(this.buttonComs.last.nativeElement, 'disabled', this.inValidValue);
            this.setInputStyle(this.inValidValue);
        }
    }

    /**
     * @ignore
     * 配置时间日期面板接口
     */
    public setPickerDate(): void {
        // 做深拷贝的原因：不让model和datePanel组件中value双向绑定，
        // 因为下拉面板中日期变化时，不立即更新到输入框中
        let value: TiDateValue;
        if (this.model === null || this.model === undefined) {
            value = {
                begin: null,
                end: null
            };
        } else {
            value = {
                begin: this.model.begin,
                end: this.model.end
            };
        }

        this.datePanel = {
            value,
            format: this.format,
            max: this.max,
            min: this.min,
            picker: this.datepanelPicker,
            select: (): void => {
                const obj: any = {
                    value: this.datePanel.value[this.focusedPosition],
                    focusedPosition: this.focusedPosition,
                    beginValue: this.datePanel.value.begin,
                    endValue: this.datePanel.value.end
                };
                this.dayClick.emit(obj);
                // 初始化选择结束之后，如果开始未选择，焦点转移到开始日期编辑框
                if (this.focusedPosition === 'end' && this.datePanel.value.begin === null) {
                    // 延时作用：setValue()函数内部需要根据当前focusedPosition做判断
                    setTimeout(() => {
                        this.focusedPosition = 'begin';
                        this.dateEditComs.first.focus();
                    }, 0);
                } else {
                    if (!this.isEndFixed) {

                        // 延时作用：setValue()函数内部需要根据当前focusedPosition做判断
                        setTimeout(() => {
                            this.focusedPosition = 'end';
                            this.dateEditComs.last.focus();
                        }, 0);
                    }
                }
                this.setOkBtnState();
            }

        };

        this.setOkBtnState();
    }
}
