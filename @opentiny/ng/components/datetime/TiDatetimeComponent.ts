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
    ChangeDetectionStrategy
} from '@angular/core';
import { TiLocale, TiLocaleFormat } from '../../locale/TiLocaleModule';
import { TiDateUtil, TiKeymap, Util } from '../../utils/Util';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiDateBaseComponent, TiDatetimeFormat, TimeOptions } from '../datebase/TiDateBaseModule';

/**
 * Datetime日期时间组件
 *
 * Datetime组件提供了一种方便的显示和设置日期时间的方式。
 *
 */
@Component({
    selector: 'ti-datetime',
    templateUrl: './datetime.html',
    styleUrls: ['./datetime.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-datetime-input-container]': 'true',
        '(blur)': 'hidePanel()'
    },
    providers: [ TiFormComponent.getValueAccessor(TiDatetimeComponent) ]
})
export class TiDatetimeComponent extends TiDateBaseComponent {
    /**
     * @ignore
     * 配置time组件的接口
     */
    public beginTime: TimeOptions = {};
    /**
     * @ignore
     * 日期显示格式: Datetime组件的format为DatetimeFormat类型
     */
    public format: TiDatetimeFormat;
    /**
     * @ignore
     * 标记date/datetime的类型
     */
    public isDatetime: boolean = true;
    /**
     * @ignore
     * 用于标记是不是range
     */
    public isRange: boolean = false;
    /**
     * @ignore
     * placeholder提示文本
     */
    public placeholder: string = `${TiLocale.getLocaleWords().tiDate.datetimePlaceholder}`;
    /**
     * @ignore
     * 旧时间值
     */
    public oldValue: any = '';

    ngOnInit(): void {
        super.ngOnInit();
        this.oldFormat = this.format;
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        // 验证最大值最小值，为了处理最大值和最小值从合法日期变为undefined 的情景
        if ((changes['max'] && !changes['max'].firstChange) || (changes['min'] && !changes['min'].firstChange)) {
            this.validateMinAndMax(this.config, this.isDatetime);
        }
    }

    ngDoCheck(): void {
        // 监听format的变化
        this.setFormat();
    }

    /**
     * @ignore
     * model值变化时的回调
     */
    ngOnModelChange(): void {
        if (!TiDateUtil.isDate(this.model)) {
            this.inputValue = '';

            return;
        }
        this.formatValue();
        this.setOkBtnState();
        this.setPickerDate();
    }
    /**
     * @ignore
     * 确认按钮的点击事件处理
     */
    onOkClick(): void {
        if (this.inValidValue) {
            return;
        }

        if (!TiDateUtil.isDate(this.datePanel['value']['begin'])) {
            this.dropCom.hide();

            return;
        }

        // 获取时间的字符串
        const dateStr: string = TiDateUtil.getDateStr(this.datePanel['value']['begin']);
        // 空格误删
        const newValue: Date = new Date(`${dateStr} ${TiDateUtil.addColon(this.beginTime['value'])}`);
        // 点击确认按钮对比新旧值：相等不做处理，不相等将新值赋给model
        if (!TiDateUtil.isDatetimeEqual(this.model, newValue)) {
            this.model = newValue;
        }

        this.hideDrop();

        this.okClick.emit(this.model);
    }

    /**
     * @ignore
     * 设置下拉面板中datePanel组件接口
     */
    private setDatePanel(): void {
        this.datePanel = {
            picker: 'day',
            max: this.max,
            min: this.min,
            format : this.format,
            nowDateTime: this.nowDateTime,
            value : {
                begin: this.model,
                end: null
                },
            select: (): void => {
                // 点击日期面板值，校验时间的最大值最小值
                // 原因：当选择的日期是最小或者最大时，需要校验当前的时间是否合法
                // 设定时间范围
                const minFormatTime: string = TiLocaleFormat.formatTime('2020/10/30 00:00:00', this.format.time);
                const maxFormatTime: string = TiLocaleFormat.formatTime('2020/10/30 23:59:59', this.format.time);
                if (TiDateUtil.isDateEqual(this.datePanel['value']['begin'], this.max)) {
                    this.beginTime['max'] = TiLocaleFormat.formatTime(this.max, this.format.time);
                    this.beginTime['min'] = minFormatTime;
                } else if (TiDateUtil.isDateEqual(this.datePanel['value']['begin'], this.min)) {
                    this.beginTime['max'] = maxFormatTime;
                    this.beginTime['min'] = TiLocaleFormat.formatTime(this.min, this.format.time);
                } else {
                    this.beginTime['min'] = minFormatTime;
                    this.beginTime['max'] = maxFormatTime;
                }
                this.setBeginTime();
                this.setOkBtnState();
            },
            selectTimeFn: (obj: any): void => {
                this.setTimeFn(obj, this.beginTime);
                this.setOkBtnState();
            }
        };
    }
    private setBeginTime(): void {
        if (this.timeEditDisabled) {
            this.beginTime['value'] = TiLocaleFormat.formatTime(new Date(), this.format.time);
        }
        // 1.获取时间的字符串
        const dateStr: string = TiDateUtil.getDateStr(this.datePanel['value']['begin']);
        // 空格误删
        const datetimeStr: Date = new Date(`${dateStr} ${TiDateUtil.addColon(this.beginTime['value'])}`);
        // 最大值校验
        if (TiDateUtil.isBigger(datetimeStr, this.max)) {
            this.beginTime['value'] = TiLocaleFormat.formatTime(this.max, this.format.time);
        }
        // 最小值校验
        if (TiDateUtil.isSmaller(datetimeStr, this.min)) {
            this.beginTime['value'] = TiLocaleFormat.formatTime(this.min, this.format.time);
        }
        this.oldValue = this.beginTime['value'];

        this.timeEditDisabled = false;
    }
    /**
     * @ignore
     * @param event
     * @param val
     */
    onKeydownFn(event: KeyboardEvent, val: any): void {
        if (event.keyCode === TiKeymap.KEY_ENTER  || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
            if (!TiDateUtil.isDate(val)) {
                return;
            }
            this.setBeginTime();
            this.setOkBtnState();
        }
    }

    /**
     * @ignore
     */
    public editBlur(val: any): void {
        if (val !== null) {
            this.setBeginTime();
        } else {
            setTimeout(() => {
                // 添加setTimeout原因：确保点击时间输入框时拿到的focusedPosition为beginTime
                // 点击禁用的确认按钮，需保证焦点在面板内部，否则点击document空白处无法关闭面板
                if (this.focusedPosition === 'begin') {
                    this.dropCom.nativeElement.focus();
                };
            }, 0);
        }
        this.setOkBtnState();
     }
    // 设置下拉面板中time组件接口
    private setTime(): void {
        // value接口设置
        this.setTimeValue();

        // maxValue接口设置
        this.setTimeMaxValue();

        // minValue接口设置
        this.setTimeMinValue();
    }

    private setTimeValue(): void {
        this.beginTime['value'] = TiDateUtil.isDate(this.model) ?  TiLocaleFormat.formatTime(this.model, this.format.time) : '';
    }

    private setTimeMaxValue(): void {
        if (!TiDateUtil.isDate(this.model)) {
            return;
        }

        this.beginTime['max'] = (TiDateUtil.isDateEqual(this.model, this.max)) ?
                                TiLocaleFormat.formatTime(this.max, this.format.time) : '23:59:59';
    }

    private setTimeMinValue(): void {
        if (!TiDateUtil.isDate(this.model)) {
            return;
        }

        this.beginTime['min'] = (TiDateUtil.isDateEqual(this.model, this.min)) ?
                                TiLocaleFormat.formatTime(this.min, this.format.time) : '00:00:00';
    }

    /**
     * @ignore
     */
    public isValidValue(value: Date): boolean {
        if (TiDateUtil.isDate(value) && TiDateUtil.isBetweenMaxAndmin(value, this.min, this.max)) {
            return true;
        }

        return false;
    }

    /**
     * @ignore
     */
    public setPickerDate(): void {
        // 设置下拉面板中datePanel组件接口
        this.setDatePanel();

        // 设置下拉面板中time组件接口
        this.setTime();

        this.setOkBtnState();

        this.timeEditDisabled = TiDateUtil.isDate(this.model) ? false : true;

        if (this.timeEditDisabled) {
            this.selectTime = false;
        }
    }

    /**
     * @ignore
     * 设置确认按钮的状态
     */
    public setOkBtnState(): void {
        // 输入中文冒号之后，及时转换为英文冒号
        const inputvalue: string = this.beginTime.value;
        if (!Util.isUndefined(inputvalue)) {
            this.beginTime.value = inputvalue.replace('：', ':');
        }
        const date: Date = this.datePanel.value.begin;
        if (!TiDateUtil.isDate(date)) {
            this.inValidValue = true;
        } else {
            const dateTime: Date = new Date(
                `${TiDateUtil.getDateStr(date)} ${TiDateUtil.addColon(this.beginTime['value'])}`);
            this.inValidValue = !TiDateUtil.isBetweenMaxAndmin(dateTime, this.min, this.max);
        }
        if (this.buttonComs) {
            this.setAttr(this.buttonComs.last.nativeElement, 'disabled', this.inValidValue);
            this.setInputStyle(this.inValidValue);
        }
    }

    /**
     * @ignore
     * 将value转换为format接口格式的字符串
     */
    public formatValue(): void {
        if (this.model === null) {
            this.inputValue = '';
            this.oldValue = '';
        } else {
            // 空格误删
            const format: string = `${this.format.date} ${TiDateUtil.addAmPm(this.format.time)}`;
            this.inputValue = TiLocaleFormat.formatDateTime(this.model, format);
            this.oldValue = TiLocaleFormat.formatTime(this.model, this.format.time);
        }
    }
    /**
     * @ignore
     * 时间框失焦事件
     */
    public timeBlur(): void {
        this.handleTimeValue();
    }
    /**
     * @ignore
     * 时间框enter事件
     */
    public timeKeydown(event: KeyboardEvent): void {
        if (event.keyCode === TiKeymap.KEY_ENTER  || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
            this.handleTimeValue();
        }
    }
    /**
     * @ignore
     * time时间框输入内容处理
     */
    public handleTimeValue(): void {
        // 输入区间是否存在小数点，非整数
        let isNotInteger: boolean = false;
        this.beginTime = JSON.parse(JSON.stringify(this.beginTime));

        const timeArr: Array<string> = this.beginTime.value.split(TiDateUtil.COLON_REGEXP);
        timeArr.forEach((item: string, index: number): void => {
            if (item.length === 1) {
                timeArr[index] = '0' + item;
            }
            if (parseInt(item, 10) !== Number(item)) {
                isNotInteger = true;
            }
        });
        this.beginTime.value = timeArr.join(':');
        let datetime: Date;
        let dateVal: Date;
        if (this.datePanel['value']['begin']) {
            datetime = new Date(`2020/10/30 ${TiDateUtil.addColon(this.beginTime['value'])}`);
            dateVal = this.setDateTime(timeArr);
        }
        if (String(datetime) === 'Invalid Date' || String(dateVal) === 'Invalid Date' || timeArr.length > 3 || isNotInteger) {
            this.beginTime.value = this.oldValue;
            this.setOkBtnState();

            return;
        }
        this.oldValue = this.beginTime.value;
        this.setOkBtnState();
    }
    /**
     * @description 判读字符串是否是合法的时间
     * @param: time: 校验的时间
     */
    private isValidTime(time: string): boolean {
        if (!Util.isString(time) || time.trim() === '') {
            return false;
        }
        const date: any = new Date(`2018/5/15 ${time}`);

        return !(String(date) === 'Invalid Date');
    }
}
