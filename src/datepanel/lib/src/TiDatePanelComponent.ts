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
  EventEmitter,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { TiDateUtil, Util } from '@opentiny/ng-utils';
import { TiLocale } from '@opentiny/ng-locale';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiDateValue, TimeOptions } from '@opentiny/ng-datebase';
import { TiDropComponent } from '@opentiny/ng-drop';
import { TiListComponent } from '@opentiny/ng-list';
import packageInfo from '../package.json';
import { TiDatepanelWords } from './i18n/TiDatepanelWords';

/**
 * @ignore
 * 面板内部年月日
 */
export interface TiDatePanel {
  year: number;
  month: number;
  day: number;
}

/**
 * @ignore
 * 面板头部显示文本接口
 */
export interface TiPickerHeadText {
  year?: string;
  month?: string;
  yearRange?: string;
  endpanelYearRange?: string;
  onlyYear?: string;
}

/**
 * @ignore
 * 年月日数据的接口：state状态；value年月日值
 */
export interface TiDateValueAndState {
  state: string; // 面板中每个年月日具体的状态：日期：状态值为上个月日期，当前月日期，下个月日期
  value: number | string; // TODO:类型为string或number:此处处理 this.local.monthArr.indexOf(month.value + '')
  isToday?: boolean;
  isMonth?: boolean;
  isYear?: boolean;
}

/**
 * @ignore
 * 最大年最小年范围
 */
export interface TiYearRange {
  min: number;
  max: number;
}
/**
 * @ignore
 */
@Component({
  selector: 'ti-date-panel',
  templateUrl: './datepanel.html',
  styleUrls: ['./datepanel.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiDatePanelComponent extends TiBaseComponent {
  @Input() value: TiDateValue;
  @Output() readonly valueChange: EventEmitter<TiDateValue> = new EventEmitter<TiDateValue>();

  @Input() picker: string = 'day'; // 设置年、月、日面板
  @Output() readonly pickerChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() nowDateTime: Date;
  @Input() max: Date;
  @Input() min: Date;
  @Input() format: string;
  @Input() timeFormat: string;
  @Input() disabledDays: Array<Date>;
  @Input() endTimeDisabled: boolean;
  @Input() beginTimeDisabled: boolean;
  /**
   * @ignore
   * 面板内部焦点位置标志量
   */
  @Input() focusedPosition: string;
  /**
   * @ignore
   * 面板呈现选择时间或者选择日期 标志量
   */
  @Input() selectTime: boolean;
  /**
   * @ignore
   * 开始时间
   */
  @Input() beginTime: TimeOptions;
  /**
   * @ignore
   * 结束时间
   */
  @Input() endTime: TimeOptions;
  /**
   * @ignore
   * 判断是单日期（时间）还是日期（时间）段
   */
  @Input() isRange: boolean;
  /**
   * @ignore
   * 输入框的日期是否为手动输入
   */
  @Input() isInputValue: boolean = false;
  /**
   * 开始日期是否禁用
   */
  @Input() isBeginFixed: boolean = false;
  /**
   * 结束日期是否禁用
   */
  @Input() isEndFixed: boolean = false;

  // 日期面板，月份面板点击每个日期、月份的事件回调
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  // 时间面板选择时分秒的事件回调
  @Output() readonly selectTimeFn: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('next', { static: true }) nextRef: ElementRef;
  @ViewChild('beginHourContainer', { static: true })
  private beginHourContainerRef: ElementRef;
  @ViewChild('beginMinuteContainer', { static: true })
  private beginMinuteContainerRef: ElementRef;
  @ViewChild('beginSecondContainer', { static: true })
  private beginSecondContainerRef: ElementRef;
  @ViewChild('endHourContainer', { static: true })
  private endHourContainerRef: ElementRef;
  @ViewChild('endMinuteContainer', { static: true })
  private endMinuteContainerRef: ElementRef;
  @ViewChild('endSecondContainer', { static: true })
  private endSecondContainerRef: ElementRef;
  private date: TiDatePanel; // 内部时间值：包括年月日
  public dayArr: Array<Array<TiDateValueAndState>> = [];
  public nextdayArr: Array<Array<TiDateValueAndState>> = [];
  public monthArr: Array<Array<TiDateValueAndState>> = [];
  public endpanelMonthArr: Array<Array<TiDateValueAndState>> = [];
  public yearArr: Array<Array<TiDateValueAndState>> = [];
  public quartersArr: Array<any> = [];
  public nextQuartersArr: Array<any> = [];
  public endpanelYearArr: Array<Array<TiDateValueAndState>> = [];
  public pickerValue: TiPickerHeadText = {}; // 面板头部显示文本数据
  public nextPickerValue: TiPickerHeadText = {}; // 面板头部显示文本数据
  public nextYearPanelClick: boolean = false; // 纯年份面板点击的是否是右侧面板
  public isMaxMonth: boolean;
  public isMinMonth: boolean;
  private isMaxYear: boolean;
  private isMinYear: boolean;
  private isMaxYearRange: boolean;
  private isMinYearRange: boolean;
  private oldValue: TiDateValue = {
    // 当初始值为null时，做新旧值对比渲染时间面板
    begin: undefined,
    end: undefined
  };
  public hourOptions: Array<any> = this.setOptions(24);
  public minuteOptions: Array<any> = this.setOptions(60);
  public secondOptions: Array<any> = this.setOptions(60);
  public endHourOptions: Array<any> = this.setOptions(24);
  public endMinuteOptions: Array<any> = this.setOptions(60);
  public endSecondOptions: Array<any> = this.setOptions(60);
  public beginHour: any;
  public beginMinute: any;
  public beginSecond: any;
  public endHour: any;
  public endMinute: any;
  public endSecond: any;
  public isChinese: boolean = true;
  public onlyHour: boolean;
  public onlyHourMinute: boolean;
  protected versionInfo: string = super.getVersion(packageInfo);

  public local: {
    weekArr: Array<string>;
    weekTitleArr: Array<string>;
    monthArr: Array<string>;
    yearText: string;
  } = {
    weekArr: [],
    weekTitleArr: [],
    monthArr: [],
    yearText: ''
  };

  constructor(
    protected render: Renderer2,
    protected hostRef: ElementRef,
    public changeDetectorRef: ChangeDetectorRef,
    public drop: TiDropComponent
  ) {
    super(hostRef, render);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const datePanelWords: TiDatepanelWords = TiLocale.getLocaleWords().tiDatepanel;
    this.isChinese = TiLocale.getLocale() === TiLocale.ZH_CN;
    this.local = {
      weekArr: datePanelWords['weekNamesAbb'],
      weekTitleArr: datePanelWords['weeknamesTitle'],
      monthArr: datePanelWords['monthNamesAbb'],
      yearText: datePanelWords['yearSuffixLabel']
    };
    this.drop.dropSubject.subscribe(() => {
      this.setValue();
    });
    this.renderer.listen(this.nativeElement, 'mousedown', (event: MouseEvent): void => {
      event.preventDefault(); // 防止dominator blur行为
    });

    // 初始化设置时间面板
    this.setTimePanel();
  }

  private changeEndTimeDisabled(changes: SimpleChanges): void {
    if (changes['endTimeDisabled'] && !changes['endTimeDisabled'].firstChange) {
      this.endHourOptions = this.setOptions(24, 'end');
      this.endMinuteOptions = this.setOptions(60, 'end');
      this.endSecondOptions = this.setOptions(60, 'end');
    }
  }

  private changeBeginTimeDisabled(changes: SimpleChanges): void {
    if (changes['beginTimeDisabled'] && !changes['beginTimeDisabled'].firstChange) {
      this.hourOptions = this.setOptions(24);
      this.minuteOptions = this.setOptions(60);
      this.secondOptions = this.setOptions(60);
    }
  }

  private changePicker(changes: SimpleChanges): void {
    if (changes['picker'] && !changes['picker'].firstChange) {
      if (Util.isUndefined(this.date)) {
        return;
      }
      // 设置下拉面板的数据
      this.setDatePanel();
    }
  }
  private changeScope(changes: SimpleChanges): void {
    // 最大最小值更新时，需要更新面板来保证最大最小值外的禁用有效
    if ((changes['max'] && !changes['max'].firstChange) || (changes['min'] && !changes['min'].firstChange)) {
      if (Util.isUndefined(this.date)) {
        return;
      }
      this.setDatePanel();
    }
  }

  private changesSelectTime(changes: SimpleChanges): void {
    if (changes['selectTime'] && !changes['selectTime'].firstChange) {
      this.setTimeValue(this.beginTime.value);

      if (this.endTime) {
        this.setTimeValue(this.endTime.value, true);
      }
      setTimeout(() => {
        this.setTimepanelPosition();
        if (this.endTime) {
          this.setTimepanelPosition(true);
        }
      }, 0);
    }
  }

  private changeBeginTime(changes: SimpleChanges): void {
    if (changes['beginTime'] && !changes['beginTime'].firstChange) {
      this.setTimeValue(changes['beginTime'].currentValue.value);
      this.setTimepanelPosition();
    }
  }

  private changeEndTime(changes: SimpleChanges): void {
    if (changes['endTime'] && !changes['endTime'].firstChange) {
      this.setTimeValue(changes['endTime'].currentValue.value, true);
      this.setTimepanelPosition(true);
    }
  }

  private changeEndValue(changes: SimpleChanges): void {
    if (TiDateUtil.isDate(this.value.end) && changes['focusedPosition'].currentValue === 'end') {
      const num1: number = this.date.year - (this.date.year % 10);
      const num2: number = this.value.end.getFullYear() - (this.value.end.getFullYear() % 10);
      // num2 > num1表示end值在当前面板不可见，所以切换到end聚焦时，需要面板跳转，否则不需要（针对纯年份场景）
      const isHideEndvalue: boolean = num2 > num1;
      // 面板的切换需要根据this.picker做不同处理
      this.date = {
        year:
          (this.picker === 'onlyYearMonth' && this.date.year < this.value.end.getFullYear()) ||
          (this.picker === 'quarter' && this.date.year < this.value.end.getFullYear())
            ? this.value.end.getFullYear() - 1
            : this.picker === 'onlyYear' && isHideEndvalue
            ? this.value.end.getFullYear() - 10
            : this.value.end.getFullYear(),
        // 同年同月场景下，点击切换焦点面板不需要切换
        month:
          this.value.end.getMonth() === this.value.begin?.getMonth() && this.value.end.getFullYear() === this.value.begin?.getFullYear()
            ? this.value.end.getMonth() + 1
            : this.value.end.getMonth(),
        day: this.value.end.getDate()
      };
    }
  }
  private changesFocusedPosition(changes: SimpleChanges): void {
    if (changes['focusedPosition'] && !changes['focusedPosition'].firstChange) {
      this.changeEndValue(changes);
      if (TiDateUtil.isDate(this.value.begin) && changes['focusedPosition'].currentValue === 'begin') {
        this.date = {
          year: this.date.year < this.value.begin.getFullYear() ? this.value.begin.getFullYear() - 1 : this.value.begin.getFullYear(),
          month: this.value.begin.getMonth() + 1,
          day: this.value.begin.getDate()
        };
      }
      this.setDatePanel();
    }
  }

  private changesTimeFormat(changes: SimpleChanges): void {
    if (changes['timeFormat'] && !changes['timeFormat'].firstChange) {
      this.setTimePanel();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeEndTimeDisabled(changes);

    this.changeBeginTimeDisabled(changes);

    // format支持动态变更
    this.changePicker(changes);

    // 最大最小值更新时，需要更新面板来保证最大最小值外的禁用有效
    this.changeScope(changes);

    // 根据传入值确定时间下拉选择项
    this.changesSelectTime(changes);

    this.changeBeginTime(changes);

    this.changeEndTime(changes);

    // 焦点切换时，面板需要根据焦点位置切换对应展示
    this.changesFocusedPosition(changes);

    this.changesTimeFormat(changes);
  }

  /**
   * 设置开始时间/结束时间各面板滚动位置
   */
  private setTimepanelPosition(isEndTime?: boolean): void {
    if (isEndTime) {
      this.timeHandleFn(this.endHour, this.endHourContainerRef);
      this.timeHandleFn(this.endMinute, this.endMinuteContainerRef);
      this.timeHandleFn(this.endSecond, this.endSecondContainerRef);
    } else {
      this.timeHandleFn(this.beginHour, this.beginHourContainerRef);
      this.timeHandleFn(this.beginMinute, this.beginMinuteContainerRef);
      this.timeHandleFn(this.beginSecond, this.beginSecondContainerRef);
    }
  }

  /**
   * 设置开始时间/结束时间
   */
  private setTimeValue(value: string, isEndTime?: boolean): void {
    const timeArr: Array<any> = value.split(':');
    timeArr.forEach((item: string, index: number): void => {
      if (item.length === 1) {
        timeArr[index] = '0' + item;
      }
    });

    if (isEndTime) {
      this.endHour = this.endHourOptions.find((item: any) => item.label === timeArr[0]);
      this.endMinute = this.endMinuteOptions.find((item: any) => item.label === timeArr[1]);
      this.endSecond = this.endSecondOptions.find((item: any) => item.label === timeArr[2]);
    } else {
      this.beginHour = this.hourOptions.find((item: any) => item.label === timeArr[0]);
      this.beginMinute = this.minuteOptions.find((item: any) => item.label === timeArr[1]);
      this.beginSecond = this.secondOptions.find((item: any) => item.label === timeArr[2]);
    }
  }

  private timeHandleFn(model: any, ele: ElementRef): void {
    if (model === undefined) {
      return;
    }
    const index: number = model.label;
    this.render.setProperty(ele.nativeElement.children[0], 'scrollTop', index * 30);
    // TODO 动画效果
  }

  ngDoCheck(): void {
    super.ngDoCheck();

    // 只有点击面板打开时，才会有接口值，需要渲染面板，在没有打开时间日期面板时不需要渲染面板数据
    // daterange组件，动态更新最大最小值时，也更新了面板的最大最小值，此时可获取到对应更新后的值，因此需要添加最小值的容错处理
    if (Util.isUndefined(this.value) || Util.isUndefined(this.max) || Util.isUndefined(this.min)) {
      return;
    }

    if (
      !TiDateUtil.isDateEqual(this.oldValue['begin'], this.value['begin']) ||
      !TiDateUtil.isDateEqual(this.oldValue['end'], this.value['end'])
    ) {
      this.setValue();
      this.oldValue = {
        begin: this.value.begin,
        end: this.value.end
      };
    }
    // onpush模式下datepanel.value属性发生变化，面板数据不更新
    this.changeDetectorRef.markForCheck();
  }
  private setTime(year: number): void {
    this.setYearMonthText();
    this.setPreNextState(year, this.date.month);
    this.setDayMonthArr(this.picker);
    this.setQuarterArr();
    this.setNextQuarterArr();
  }
  // 处理左侧年后退按钮事件
  onPreYearClick(event: MouseEvent): void {
    // 最小月，最小年，最小年时间段：左按钮灰化
    if (this.isPickerYearMinValue()) {
      return;
    }

    // 日期和月份面板
    if (this.picker === 'day' || this.picker === 'month' || this.picker === 'onlyYearMonth' || this.picker === 'quarter') {
      const year: number = this.date.year - 1; // 年份减1
      if (year >= this.min.getFullYear()) {
        // 当年份大于等于最小值
        this.date.year = year;
        if (this.isSmallerThanMinMonth(year, this.date.month)) {
          this.date.month = this.min.getMonth() + 1;
        }
        this.setTime(year);
      }

      return;
    }

    // 年面板
    if (this.picker === 'year' || this.picker === 'onlyYear') {
      // 当前年减10
      const year: number = this.date.year - 10; // 年份减10
      const minValueRange: TiYearRange = this.getYearRange(this.min.getFullYear()); // 最小年：年面板的范围
      const currentYearRange: TiYearRange = this.getYearRange(year); // 当前年面板的范围
      // 当年份大于等于最小年面板的最小值是有效的
      if (year >= minValueRange.min) {
        this.date.year = currentYearRange.min; // 默认跳转到年面板的第一个有效年
        // 设置下拉面板头部显示文本
        this.setYearMonthText();

        // 设置左右键状态
        this.setYearRangePreNextState();

        // 设置年份面板的值和状态
        this.setYearArr();

        this.setEndpanelYearArr();
      }
    }
  }

  // 处理左侧月后退按钮事件
  onPreMonthClick(event: MouseEvent, tag?: string): void {
    // 日期面板
    let month: number;
    let year: number;
    if (this.date.month === 1) {
      month = 12;
      year = this.date.year - 1;
    } else {
      month = this.date.month - 1;
      year = this.date.year;
    }

    // 最小月，最小年，最小年时间段：左按钮灰化
    if (this.isMinMonth) {
      if (tag === 'onDayClick') {
        this.date.month = month;
        this.date.year = year;
      }

      return;
    }

    if (!this.isSmallerThanMinMonth(year, month)) {
      this.date.month = month;
      this.date.year = year;
      this.setYearMonthText();
      this.setPreNextState(year, month);
      this.setDayArr();
      this.setNextDayArr();
    }
  }
  // 处理右侧月前进按钮事件
  onNextMonthClick(event: MouseEvent): void {
    // 最大月，最大年，最大年时间段
    if (this.isMaxMonth) {
      return;
    }

    let month: number;
    let year: number;
    if (this.date.month === 12) {
      month = 1;
      year = this.date.year + 1;
    } else {
      month = this.date.month + 1;
      year = this.date.year;
    }

    if (!this.isBiggerThanMaxMonth(year, month)) {
      this.date.month = month;
      this.date.year = year;
      this.setYearMonthText();
      this.setPreNextState(year, month);
      this.setDayArr();
      this.setNextDayArr();
    }
  }
  // 处理右侧年前进按钮事件
  onNextYearClick(event: MouseEvent): void {
    // 最大月，最大年，最大年时间段
    if (this.isPickerYearMaxValue()) {
      return;
    }

    // 日期和月份面板
    if (this.picker === 'day' || this.picker === 'month' || this.picker === 'onlyYearMonth' || this.picker === 'quarter') {
      const year: number = this.date.year + 1; // 年份加1
      if (year <= this.max.getFullYear()) {
        // 判断是否小于等于最大年
        this.date.year = year;
        if (this.isBiggerThanMaxMonth(year, this.date.month)) {
          this.date.month = this.max.getMonth() + 1;
        }
        this.setTime(year);
      }

      return;
    }

    // 年面板
    if (this.picker === 'year' || this.picker === 'onlyYear') {
      const year: number = this.date.year + 10; // 年份加10

      const maxValueRange: TiYearRange = this.getYearRange(this.max.getFullYear());
      const currentYearRange: TiYearRange = this.getYearRange(year);
      // 当年份小于等于最大年面板的最大值是有效的
      if (year <= maxValueRange.max) {
        this.date.year = currentYearRange.min;
        // 设置下拉面板头部显示文本
        this.setYearMonthText();

        // 设置左右键状态
        this.setYearRangePreNextState();

        // 设置年份面板的值和状态
        this.setYearArr();

        this.setEndpanelYearArr();
      }
    }
  }

  // 面板头部文本点击事件
  onHeadTextClick(picker: string): void {
    // 点击日期面板头部，跳转到月份面板
    this.picker = picker;
    this.pickerChange.emit(picker);
  }

  // 日期面板：日期点击事件
  onDayClick(isNext: boolean, day: TiDateValueAndState, event: MouseEvent): void {
    // 输入框的日期标识为非手动输入
    this.isInputValue = false;
    if (day.state === 'disable') {
      return;
    }
    if (day.state === 'preMonth') {
      // 如果是上个月的日期则跳转到上个月
      this.onPreMonthClick(event, 'onDayClick');
    } else if (day.state === 'nextMonth') {
      // 如果是下个月的日期则跳转到下个月
      this.onNextMonthClick(event);
    }
    let dateSelect: Date;
    const newDate: TiDatePanel = JSON.parse(JSON.stringify(this.date));
    if (isNext) {
      newDate.year = this.date.month === 12 ? this.date.year + 1 : this.date.year;
      newDate.month = this.date.month === 12 ? 1 : this.date.month + 1;
      dateSelect = new Date(newDate.year, newDate.month - 1, Number(day.value));
    } else {
      dateSelect = new Date(this.date.year, this.date.month - 1, day.value as number);
    }

    if (this.beginTime || this.endTime) {
      dateSelect = new Date(` ${TiDateUtil.getDateStr(dateSelect)} ${TiDateUtil.getTimeStr(new Date())}`);
    }

    if (this.focusedPosition !== 'begin' && this.isRange) {
      this.value.end = TiDateUtil.transformDateToExactDate(dateSelect, this.picker, true);

      if (this.endTime?.value) {
        this.value.end = new Date(` ${TiDateUtil.getDateStr(this.value.end)} ${TiDateUtil.addColon(this.endTime.value)}`);
      }
    } else {
      this.value.begin = dateSelect;

      if (this.beginTime?.value) {
        this.value.begin = new Date(` ${TiDateUtil.getDateStr(this.value.begin)} ${TiDateUtil.addColon(this.beginTime.value)}`);
      }

      if (TiDateUtil.isDate(this.value.end) && TiDateUtil.isSmaller(this.value.end, this.value.begin)) {
        this.value.end = null;
      }
    }

    this.valueChange.emit(this.value);
    // 事件回调：点击日期执行面板收起操作
    this.select.emit(day.state);
  }
  // 月份面板：月份点击事件
  onMonthClick(month: TiDateValueAndState, event: MouseEvent, isEndClick?: boolean): void {
    // 输入框的日期标识为非手动输入
    this.isInputValue = false;

    // 月份灰化不可点击
    if (month.state === 'disable') {
      return;
    }
    // 当前月值变更
    this.date.month = this.local.monthArr.indexOf(String(month.value)) + 1;
    // 根据当前月更新面板头部月份显示
    this.pickerValue = this.pickerValue instanceof Object ? this.pickerValue : {};
    this.nextPickerValue = this.nextPickerValue instanceof Object ? this.nextPickerValue : {};
    this.pickerValue['month'] = this.local.monthArr[this.date.month - 1];
    this.nextPickerValue['month'] = this.date.month === 12 ? this.local.monthArr[0] : this.local.monthArr[this.date.month];
    // 无日期面板：点击月份将value值变更。将执行select事件回调
    // 有日期面板：点击跳转到日期面板，根据年月设置左右按钮状态和日期面板值；
    if (this.format.indexOf('d') === -1) {
      // 只显示年月
      const yearNum: number = isEndClick ? this.date.year + 1 : this.date.year;
      this.setTiDateValue(new Date(yearNum, this.date.month - 1));
      this.valueChange.emit(this.value);
      this.select.emit();
    } else {
      this.picker = 'day';
      this.pickerChange.emit(this.picker);
    }
  }
  // 年范围面板：年点击事件
  onYearClick(year: TiDateValueAndState, event: MouseEvent): void {
    // 输入框的日期标识为非手动输入
    this.isInputValue = false;
    if (year.state !== 'disable') {
      // 纯年份面板需判断用户点选的是否为右侧面板，放置面板跳转。
      if (this.picker === 'onlyYear') {
        const num1: number = this.date.year - (this.date.year % 10);
        const num2: number = Number(year.value) - (Number(year.value) % 10);
        this.nextYearPanelClick = num2 > num1;
      }
      this.date.year = year.value as number;
      this.pickerValue = this.pickerValue instanceof Object ? this.pickerValue : {};
      this.nextPickerValue = this.nextPickerValue instanceof Object ? this.nextPickerValue : {};
      this.pickerValue['year'] = `${this.date.year}${this.local.yearText}`;
      this.nextPickerValue['year'] =
        this.date.month === 12 ? `${this.date.year + 1}${this.local.yearText}` : `${this.date.year}${this.local.yearText}`;
      this.nextPickerValue['onlyYear'] = `${this.date.year + 1}${this.local.yearText}`;
      if (this.format === 'YYYY/QQ') {
        this.picker = 'quarter';
        this.nextPickerValue['year'] = `${this.date.year + 1}${this.local.yearText}`;
        this.setQuarterArr();
        this.setNextQuarterArr();
        this.pickerChange.emit(this.picker);

        return;
      }
      // 只有年份面板
      if (this.format.indexOf('M') === -1) {
        this.setTiDateValue(new Date(this.date.year, 0, 1));
        this.valueChange.emit(this.value);
        this.select.emit();
        return;
      }
      // 年月格式
      if (this.format.indexOf('d') === -1) {
        this.picker = 'onlyYearMonth';
        this.setDayMonthArr(this.picker);
        this.pickerChange.emit(this.picker);

        return;
      }
      this.picker = 'month';
      this.pickerChange.emit(this.picker);
    }
  }

  public onQuarterClick(quarter: any, next?: boolean): void {
    // 输入框的日期标识为非手动输入
    this.isInputValue = false;
    if (quarter.state === 'disable') {
      return;
    }
    const year: number = next ? this.date.year + 1 : this.date.year;
    if (this.focusedPosition === 'begin') {
      this.value.begin = TiDateUtil.transFormQuarterToDate(year, quarter.value);
      if (this.value.begin.getTime() > this.value.end?.getTime()) {
        this.value.end = null;
      }
    } else {
      this.value.end = TiDateUtil.transFormQuarterToDate(year, quarter.value, true);
      if (this.value.end.getTime() < this.value.begin?.getTime()) {
        this.value.begin = null;
      }
    }
    this.valueChange.emit(this.value);
    this.select.emit(this.value);
  }

  public onSelect(val: any, timeOption: string): void {
    const obj: any = {
      timeOption,
      val
    };
    this.selectTimeFn.emit(obj);
    switch (timeOption) {
      case 'beginHour':
        this.timeHandleFn(val, this.beginHourContainerRef);
        break;
      case 'beginMinute':
        this.timeHandleFn(val, this.beginMinuteContainerRef);
        break;
      case 'beginSecond':
        this.timeHandleFn(val, this.beginSecondContainerRef);
        break;
      case 'endHour':
        this.timeHandleFn(val, this.endHourContainerRef);
        break;
      case 'endMinute':
        this.timeHandleFn(val, this.endMinuteContainerRef);
        break;
      case 'endSecond':
        this.timeHandleFn(val, this.endSecondContainerRef);
        break;
      default:
        break;
    }
  }

  // 分年月日三个面板：根据不同面板设置相应的值
  private setDatePanel(): void {
    // 设置下拉面板头部显示文本
    this.setYearMonthText();

    // 设置年月文本；设置左右键状态；设置下拉面板中日期
    switch (this.picker) {
      case 'day':
        this.setPreNextState(this.date.year, this.date.month);

        this.setDayArr();
        this.setNextDayArr();

        break;
      case 'month':
      case 'onlyYearMonth':
        this.setPreNextState(this.date.year, this.date.month);
        this.setMonthArr();
        this.setEndpanelMonthArr();

        break;
      case 'year':
      case 'onlyYear':
        this.setYearRangePreNextState();

        this.setYearArr();
        this.setEndpanelYearArr();

        break;
      case 'quarter':
        this.setPreNextState(this.date.year, this.date.month);

        this.setQuarterArr();
        this.setNextQuarterArr();
        break;
      default:
        break;
    }
  }
  private setTiDateValue(val: Date): void {
    if (this.focusedPosition === 'begin') {
      this.value.begin = val;
      if (this.value.end !== null && TiDateUtil.isBigger(this.value.begin, this.value.end)) {
        this.value.end = null;
      }
    } else {
      this.value.end = TiDateUtil.transformDateToExactDate(val, this.picker, true);
      if (this.value.begin !== null && TiDateUtil.isBigger(this.value.begin, this.value.end)) {
        this.value.begin = null;
      }
    }
  }

  /**
   * @description 设置展示的日期
   */
  // eslint-disable-next-line complexity
  private setValue(): void {
    if (this.isRangeSelectStartOrEndTime()) {
      this.nextYearPanelClick = false;
      this.setDatePanel();
      return;
    }

    // 1.根据接口值获取合法的当前值
    let date: Date;
    let today: Date;
    let nextDayPanelClick: boolean; // 年月日格式场景下是否点击的是右侧日期面板（daterange/datetimerange）
    let nextMonthPanelClick: boolean; // 年月格式场景下是否点击的是右侧月份面板（daterange/datetimerange）
    const isBeginFocused: boolean = this.focusedPosition === 'begin' || this.focusedPosition === 'beginTime'; // 当前焦点是否在开始日期框或开始时间框上
    const isEndFocused: boolean = this.focusedPosition === 'end' || this.focusedPosition === 'endTime'; // 当前焦点是否在结束日期框或结束时间框上

    if (this.value instanceof Object && TiDateUtil.isDate(this.value.begin) && isBeginFocused) {
      date = this.value.begin;
      if (!TiDateUtil.isDate(this.value.end)) {
        nextDayPanelClick = this.isRange && this.date?.month < this.value.begin.getMonth() + 1;
        if (this.picker === 'onlyYearMonth') {
          nextMonthPanelClick = this.date?.year < this.value.begin.getFullYear();
        }
        if (this.picker === 'quarter' && this.isRange && this.date.year < this.value.begin.getFullYear()) {
          nextMonthPanelClick = true;
        }
      }
    } else if (this.value instanceof Object && TiDateUtil.isDate(this.value.end) && isEndFocused) {
      date = this.value.end;
      nextDayPanelClick = this.date?.month < this.value.end.getMonth() + 1;
      if (this.picker === 'onlyYearMonth') {
        nextMonthPanelClick = this.date?.year < this.value.end.getFullYear();
      }
      if (this.picker === 'quarter' && TiDateUtil.isDate(this.value.begin)) {
        nextMonthPanelClick = true;
      }
    } else {
      // 1.1根据nowDateTime接口获取现在时间
      today = this.nowDateTime && TiDateUtil.isDate(this.nowDateTime) ? this.nowDateTime : new Date();
      // 1.2根据最大值最小值对获取的现在时间进行进一步判断
      const year: number = today.getFullYear();
      const month: number = today.getMonth() + 1;
      const day: number = today.getDate();
      date = !this.isBiggerThanMaxDay(year, month, day) && !this.isSmallerThanMinDay(year, month, day) ? today : this.min;
    }

    if (!TiDateUtil.isDate(date)) {
      return;
    }

    let dateYear: number = date.getFullYear();

    if (this.nextYearPanelClick) {
      dateYear = date.getFullYear() - 10;
    }

    if (nextMonthPanelClick) {
      dateYear = date.getFullYear() - 1;
    }
    // 2.将当前时间的年月日存在对象
    this.date = {
      year: dateYear,
      month: nextDayPanelClick ? date.getMonth() : date.getMonth() + 1,
      day: date.getDate()
    };
    this.nextYearPanelClick = false;
    this.setDatePanel();
  }

  // 判断日期时间段组件是否已选择了起始时间或结束时间
  private isRangeSelectStartOrEndTime(): boolean {
    return (
      this.value instanceof Object &&
      this.isRange &&
      !this.isInputValue &&
      ((TiDateUtil.isDate(this.value.begin) && !TiDateUtil.isDate(this.value.end)) ||
        (!TiDateUtil.isDate(this.value.begin) && TiDateUtil.isDate(this.value.end)))
    );
  }

  /**
   * @description 判断参数传来的日期是否大于最大日期：大于返回true，小于返回false
   * @param year 年份
   * @param month 月份
   * @param day 日
   */
  private isBiggerThanMaxDay(year: number, month: number, day: number): boolean {
    // 1.最大值不是合法的时间对象
    if (!TiDateUtil.isDate(this.max)) {
      return false;
    }

    // 2.重新生成一个新的最大值的原因：防止传入一个带时分的最大值
    let max: Date = this.max;
    max = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (max.getTime() < new Date(year, month - 1, day).getTime()) {
      return true;
    }

    return false;
  }

  /**
   * @description 判断参数传来的日期是否小于最小日期：小于返回true，大于返回false
   * @param year 年份
   * @param month 月份
   * @param day 日
   */
  private isSmallerThanMinDay(year: number, month: number, day: number): boolean {
    if (!TiDateUtil.isDate(this.min)) {
      return false;
    }

    // 防止传入一个带时分的最小值
    let min: Date = this.min;
    min = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (min.getTime() > new Date(year, month - 1, day).getTime()) {
      return true;
    }

    return false;
  }
  // 是否为禁用日期
  private isDisabledDay(year: number, month: number, day: number): boolean {
    if (!Util.isArray(this.disabledDays)) {
      return false;
    }
    let isDisabled: boolean = false;
    this.disabledDays.forEach((item: Date) => {
      if (item.getTime() === new Date(year, month - 1, day).getTime()) {
        isDisabled = true;
      }
    });

    return isDisabled;
  }

  // 开始日期或者结束日期固定不允许修改时，超出范围的需要禁用
  private isFixedWithDisabled(year: number, month: number, day: number): boolean {
    if ((!this.isBeginFixed && !this.isEndFixed) || this.value === null) {
      return false;
    }
    // 开始日期有值并且禁用
    if (this.isBeginFixed) {
      if (this.value.begin.getTime() > new Date(year, month - 1, day).getTime()) {
        return true;
      }
    }
    if (this.isEndFixed) {
      if (this.value.end.getTime() < new Date(year, month - 1, day).getTime()) {
        return true;
      }
    }

    return false;
  }

  /**
   * @description 设置下拉面板中年月文本
   */
  private setYearMonthText(): void {
    // 1.大于等于最大年，设置年为最大年，月大于最大月，设置为最大月；
    if (this.date.year >= this.max.getFullYear()) {
      this.date.year = this.max.getFullYear();
      if (this.date.month > this.max.getMonth() + 1) {
        this.date.month = this.max.getMonth() + 1;
      }
    }

    // 2.小于等于最小年，设置年为最小年，月份小于最小月设置为最小月；
    if (this.date.year <= this.min.getFullYear()) {
      this.date.year = this.min.getFullYear();
      if (this.date.month < this.min.getMonth() + 1) {
        this.date.month = this.min.getMonth() + 1;
      }
    }

    // 3.根据年月值，拼成下拉面板中年月文本
    const start: number = this.date.year - (this.date.year % 10);
    this.pickerValue = this.pickerValue instanceof Object ? this.pickerValue : {};
    this.nextPickerValue = this.nextPickerValue instanceof Object ? this.nextPickerValue : {};
    this.pickerValue['year'] =
      this.date.month === 0 ? `${this.date.year - 1}${this.local.yearText}` : `${this.date.year}${this.local.yearText}`;
    this.nextPickerValue['onlyYear'] = `${this.date.year + 1}${this.local.yearText}`;
    this.nextPickerValue['year'] =
      this.date.month === 12 ? `${this.date.year + 1}${this.local.yearText}` : `${this.date.year}${this.local.yearText}`;
    if (this.format === 'YYYY/QQ') {
      this.nextPickerValue['year'] = `${this.date.year + 1}${this.local.yearText}`;
    }
    this.pickerValue['month'] = this.date.month === 0 ? this.local.monthArr[11] : this.local.monthArr[this.date.month - 1];
    this.nextPickerValue['month'] = this.date.month === 12 ? this.local.monthArr[0] : this.local.monthArr[this.date.month];
    this.pickerValue['yearRange'] = `${start} - ${start + 9}`;
    this.pickerValue['endpanelYearRange'] = `${start + 10} - ${start + 19}`;
  }

  /**
   * @description 设置上月、下月按钮状态：已经是最大、最小月时，将对应的按钮置灰
   * @param year 年份
   * @param month 月份
   */
  private setPreNextState(year: number, month: number): void {
    this.isMaxMonth = this.isEqualToMaxMonth(year, month);
    this.isMinMonth = this.isEqualToMinMonth(year, month);
    this.isMaxYear = year === this.max.getFullYear();
    this.isMinYear = year === this.min.getFullYear();
  }

  /**
   * @description 判断参数传来的年月是否等于最大月份：等于返回true，不等于返回false
   * @param year 年份
   * @param month 月份
   */
  private isEqualToMaxMonth(year: number, month: number): boolean {
    // 1.最大值不是合法的时间对象
    if (!TiDateUtil.isDate(this.max)) {
      return false;
    }

    // 2.重新生成一个新的最大值的原因：防止传入一个带时分的最大值
    let max: Date = this.max;
    max = new Date(max.getFullYear(), max.getMonth(), 1);
    if (max.getTime() === new Date(year, month - 1, 1).getTime()) {
      return true;
    }

    return false;
  }

  /**
   * @description 判断参数传来的年月是否等于最小月份：等于返回true，不等于返回false
   * @param year 年份
   * @param month 月份
   */
  private isEqualToMinMonth(year: number, month: number): boolean {
    if (!TiDateUtil.isDate(this.min)) {
      return false;
    }

    let min: Date = this.min;
    min = new Date(min.getFullYear(), min.getMonth(), 1);
    if (min.getTime() === new Date(year, month - 1, 1).getTime()) {
      return true;
    }

    return false;
  }
  /**
   * @description 根据面板设置 dayArr或monthArr
   *
   */
  private setDayMonthArr(picker: string): void {
    if (picker === 'day') {
      this.setDayArr();
      this.setNextDayArr();
    } else if (picker === 'month' || picker === 'onlyYearMonth') {
      this.setMonthArr();
      this.setEndpanelMonthArr();
    }
  }
  /**
   * @description 根据当前年月值，设置下拉面板中显示的日数据
   */
  private setDayArr(): void {
    // 获取当前年月
    const year: number = parseInt(String(this.date.year), 10);
    const month: number = parseInt(String(this.date.month), 10);

    // 1：计算这个月1号是下拉面板第一行的第几个
    // 获取到这个月1号是周几 周一到周六：1-6，周天：0；
    const begin: number = new Date(year, month - 1, 1).getDay();

    // 2：将上个月的日期存入数组dateArr
    const dateArr: Array<TiDateValueAndState> = []; // 存储下拉面板中所有日的值和状态
    const preMonth: number = month === 1 ? 12 : month - 1; // 上个月
    const preMonthDays: number = new Date(year, preMonth, 0).getDate(); // 上个月总天数
    const preMonthStart: number = preMonthDays - begin + 1; // 获取到第一行的起始值
    let preMonthDayState: string = ''; // 上个月日期的状态
    // 本月是最小月时的上月日期置灰
    preMonthDayState = this.isMinMonth ? 'disable' : 'preMonth';

    for (let i: number = 0; i < begin; i++) {
      dateArr[i] = {
        value: preMonthStart + i,
        state: preMonthDayState
      };
      if (
        this.isSmallerThanMinDay(year, month - 1, preMonthStart + i) ||
        this.isDisabledDay(year, month - 1, preMonthStart + i) ||
        this.isFixedWithDisabled(year, month - 1, preMonthStart + i)
      ) {
        dateArr[i].state = 'disable';
      }
    }

    // 3：将本月的日存入数组dateArr
    this.setToday(year, month, begin, dateArr);

    // 4：将下个月的日存入数组dateArr
    let dayNum: number = 1;
    const nextMonthDayState: string = this.isMaxMonth ? 'disable' : 'nextMonth'; // 下个月日期的状态
    for (let k: number = dateArr.length; k < 42; k++) {
      dateArr[k] = {
        value: dayNum,
        state: nextMonthDayState
      };

      if (
        this.isBiggerThanMaxDay(year, month + 1, dayNum) ||
        this.isDisabledDay(year, month + 1, dayNum) ||
        this.isFixedWithDisabled(year, month + 1, dayNum)
      ) {
        dateArr[k].state = 'disable';
      }

      dayNum++;
    }

    // 5：将dateArr组装成下拉面板中显示日的二维数组dayArr
    for (let p: number = 0; p < dateArr.length / 7; p++) {
      this.dayArr[p] = [];
      for (let q: number = 0; q < 7; q++) {
        this.dayArr[p].push(dateArr[q + p * 7]);
      }
    }
  }

  private setToday(year: number, month: number, begin: number, dateArr: Array<any>): void {
    let dayNum: number = 1;
    const monthDays: number = new Date(year, month, 0).getDate(); // 这个月总天数
    const length: number = begin + monthDays;
    let state: string = '';

    for (let j: number = begin; j < length; j++) {
      if (
        this.isBiggerThanMaxDay(year, month, dayNum) ||
        this.isSmallerThanMinDay(year, month, dayNum) ||
        this.isDisabledDay(year, month, dayNum) ||
        this.isFixedWithDisabled(year, month, dayNum)
      ) {
        state = 'disable'; // 日样式置灰
      } else if (this.isEqualToValue('day', year, month, dayNum)) {
        state = 'current'; // 当前选中
      } else if (this.isBetweenInRange('day', year, month, dayNum)) {
        state = 'select'; // 在选中范围
      } else {
        state = 'default'; // 没有选中
      }

      dateArr[j] = {
        value: dayNum,
        state,
        isToday: this.isEqualToToday('day', year, month, dayNum)
      };

      dayNum++;
    }
  }

  /**
   * @description 根据当前年月值，设置下拉面板中显示的日数据
   */
  private setNextDayArr(): void {
    // 获取当前年月
    const sss: number = this.date.month === 12 ? 1 : this.date.month + 1;
    const yyy: number = this.date.month === 12 ? this.date.year + 1 : this.date.year;
    const year: number = parseInt(String(yyy), 10);
    const month: number = parseInt(String(sss), 10);

    // 1：计算这个月1号是下拉面板第一行的第几个
    // 获取到这个月1号是周几 周一到周六：1-6，周天：0；
    const begin: number = new Date(year, month - 1, 1).getDay();

    // 2：将上个月的日期存入数组dateArr
    const dateArr: Array<TiDateValueAndState> = []; // 存储下拉面板中所有日的值和状态
    const preMonth: number = month === 1 ? 12 : month - 1; // 上个月
    const preMonthDays: number = new Date(year, preMonth, 0).getDate(); // 上个月总天数
    const preMonthStart: number = preMonthDays - begin + 1; // 获取到第一行的起始值

    for (let i: number = 0; i < begin; i++) {
      dateArr[i] = {
        value: preMonthStart + i,
        state: 'preMonth'
      };

      if (
        this.isBiggerThanMaxDay(year, month - 1, preMonthStart + i) ||
        this.isSmallerThanMinDay(year, month - 1, preMonthStart + i) ||
        this.isDisabledDay(year, month - 1, preMonthStart + i) ||
        this.isFixedWithDisabled(year, month - 1, preMonthStart + i)
      ) {
        dateArr[i].state = 'disable';
      }
    }

    // 3：将本月的日存入数组dateArr
    this.setToday(year, month, begin, dateArr);

    // 4：将下个月的日存入数组dateArr
    let dayNum: number = 1;
    const nextMonthDayState: string = this.isMaxMonth ? 'disable' : 'nextMonth'; // 下个月日期的状态
    for (let k: number = dateArr.length; k < 42; k++) {
      dateArr[k] = {
        value: dayNum,
        state: nextMonthDayState
      };

      if (
        this.isBiggerThanMaxDay(year, month + 1, dayNum) ||
        this.isDisabledDay(year, month + 1, dayNum) ||
        this.isFixedWithDisabled(year, month + 1, dayNum)
      ) {
        dateArr[k].state = 'disable';
      }

      dayNum++;
    }

    // 5：将dateArr组装成下拉面板中显示日的二维数组dayArr
    for (let p: number = 0; p < dateArr.length / 7; p++) {
      this.nextdayArr[p] = [];
      for (let q: number = 0; q < 7; q++) {
        this.nextdayArr[p].push(dateArr[q + p * 7]);
      }
    }
  }

  /**
   * @description 判断参数传来的日期是否begin值小于end的值，end值大于begion值
   * @param year 年份
   * @param month 月份
   * @param day 日
   */
  private isOutInRange(year: number, month: number, day: number): boolean {
    const value: TiDateValue = this.value;
    const curValue: number = new Date(year, month - 1, day).getTime();

    if (!(value instanceof Object)) {
      return false;
    }
    let end: Date = value.end;
    let endValue: number;
    if (TiDateUtil.isDate(value.end)) {
      // 只取年月日：防止传入带有时分秒的值
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      endValue = end.getTime();

      return curValue > endValue;
    }

    return false;
  }

  /**
   * @description 判断参数传来的日期是否等于当前选中的日期：等于返回true，不等于返回false
   * @param year 年份
   * @param month 月份
   * @param day 日
   */
  private isEqualToValue(type?: string, year?: number, month?: number, day?: number): boolean {
    const beginVal: Date = this.value.begin;
    const endVal: Date = this.value.end;
    if (beginVal === null && endVal === null) {
      return false;
    } else {
      let value1: Date;
      let value2: Date;
      let beginV: boolean;
      let endV: boolean;
      if (beginVal !== null) {
        value1 = new Date(beginVal.getFullYear(), beginVal.getMonth(), beginVal.getDate());
        beginV = this.isEqualValue(type, value1, year, month, day);
      }
      if (endVal !== null) {
        value2 = new Date(endVal.getFullYear(), endVal.getMonth(), endVal.getDate());
        endV = this.isEqualValue(type, value2, year, month, day);
      }

      return beginV || endV;
    }
  }

  /**
   * @description 判断参数传来的日期是否在当前选中日期的范围内,并且不等于当前选中的值：符合返回true，不符合返回false
   * @param year 年份
   * @param month 月份
   * @param day 日
   */
  private isBetweenInRange(type?: string, year?: number, month?: number, day?: number): boolean {
    const value: TiDateValue = this.value;
    // value不是对象，begin或者end不是合法日期
    if (!(value instanceof Object) || !TiDateUtil.isDate(value.begin) || !TiDateUtil.isDate(value.end)) {
      return false;
    }

    let begin: Date = value.begin;
    let end: Date = value.end;
    let curValue: number;

    if (type === 'day') {
      begin = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate());
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      curValue = new Date(year, month - 1, day).getTime();
    }

    if (type === 'year') {
      begin = new Date(begin.getFullYear());
      end = new Date(end.getFullYear());
      curValue = new Date(year).getTime();
    }

    if (type === 'month') {
      begin = new Date(begin.getFullYear(), begin.getMonth());
      end = new Date(end.getFullYear(), end.getMonth());
      curValue = new Date(year, month - 1).getTime();
    }

    const beginValue: number = begin.getTime();
    const endValue: number = end.getTime();

    if (beginValue < curValue && curValue <= endValue) {
      return true;
    }

    return false;
  }

  /**
   * @description 判断参数传来的日期是否等于当前日期时间
   * @param year 年份
   * @param month 月份
   * @param day 日
   */
  private isEqualToToday(type?: string, year?: number, month?: number, day?: number): boolean {
    const today: Date = this.nowDateTime && TiDateUtil.isDate(this.nowDateTime) ? this.nowDateTime : new Date();

    return this.isEqualValue(type, today, year, month, day);
  }

  // 判断日期是当前日期或当前选中日期
  private isEqualValue(type?: string, value?: any, year?: number, month?: number, day?: number): boolean {
    let _value: any;
    if (type === 'year') {
      // 年
      _value = value.getFullYear();
      if (_value === year) {
        return true;
      }

      return false;
    }

    if (type === 'month') {
      // 年、月
      _value = new Date(value.getFullYear(), value.getMonth());
      if (_value.getTime() === new Date(year, month - 1).getTime()) {
        return true;
      }

      return false;
    }
    // 年、月、日
    _value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    if (_value.getTime() === new Date(year, month - 1, day).getTime()) {
      return true;
    }

    return false;
  }

  private setMonthValue(year: number): Array<TiDateValueAndState> {
    const innerMonth: Array<TiDateValueAndState> = [];
    let state: string = '';
    // 设置每个月份对应的值和状态
    for (let month: number = 1; month <= 12; month++) {
      if (this.isSmallerThanMinMonth(year, month) || this.isBiggerThanMaxMonth(year, month)) {
        state = 'disable'; // 月样式置灰
      } else if (this.isEqualToValue('month', year, month)) {
        state = 'current'; // 当前选中
      } else if (this.isBetweenInRange('month', year, month)) {
        state = 'select'; // 在选中范围
      } else {
        state = 'default'; // 没有选中
      }

      innerMonth[month - 1] = {
        value: this.local.monthArr[month - 1],
        state,
        isMonth: this.isEqualToToday('month', year, month)
      };
    }

    return innerMonth;
  }

  /**
   * @description 根据当前年份和最大最小值，设置下拉面板中显示的月份状态
   */
  private setMonthArr(): void {
    const year: number = this.date.year;
    const innerMonth: Array<TiDateValueAndState> = this.setMonthValue(year);
    // 将月份数据格式化为二维数组
    this.monthArr = [];
    for (let p: number = 0; p < 3; p++) {
      this.monthArr[p] = [];
      for (let q: number = 0; q < 4; q++) {
        this.monthArr[p].push(innerMonth[q + p * 4]);
      }
    }
  }
  private setQuarterArr(): void {
    const year: number = this.date.year;
    this.setQuarterState(year, this.quartersArr);
  }

  private setNextQuarterArr(): void {
    const year: number = this.date.year + 1;
    this.setQuarterState(year, this.nextQuartersArr);
  }
  /**
   * 设置季节状态
   */
  private setQuarterState(year: number, quartersArr: any): void {
    const arr: Array<string> = ['Q1', 'Q2', 'Q3', 'Q4'];
    const value: string = TiDateUtil.transformDateToQuarter(this.value.begin);
    const value1: string = TiDateUtil.transformDateToQuarter(this.value.end);
    const min: string = TiDateUtil.transformDateToQuarter(this.min);
    const max: string = TiDateUtil.transformDateToQuarter(this.max);
    let state: string = '';
    arr.forEach((val: string, index: number) => {
      const quarter: string = `${year}/${val}`;
      if (quarter < min || quarter > max) {
        state = 'disable';
      } else if (quarter === value || quarter === value1) {
        state = 'current';
      } else if (quarter > value && quarter < value1) {
        state = 'select';
      } else {
        state = 'default';
      }
      quartersArr[index] = {
        value: arr[index],
        state
      };
    });
  }

  /**
   * @description 根据当前年份和最大最小值，设置下拉面板中显示的月份状态
   */
  private setEndpanelMonthArr(): void {
    const year: number = this.date.year + 1;
    const innerMonth: Array<TiDateValueAndState> = this.setMonthValue(year);
    // 将月份数据格式化为二维数组
    this.endpanelMonthArr = [];
    for (let p: number = 0; p < 3; p++) {
      this.endpanelMonthArr[p] = [];
      for (let q: number = 0; q < 4; q++) {
        this.endpanelMonthArr[p].push(innerMonth[q + p * 4]);
      }
    }
  }

  /**
   * @description 判断参数传来的年月是否小于最小月份：小于返回true，大于返回false
   * @param year 年份
   * @param month 月份
   */
  private isSmallerThanMinMonth(year: number, month: number): boolean {
    if (!TiDateUtil.isDate(this.min)) {
      return false;
    }

    let min: Date = this.min;
    min = new Date(min.getFullYear(), min.getMonth(), 1);
    if (min.getTime() > new Date(year, month - 1, 1).getTime()) {
      return true;
    }

    return false;
  }

  /**
   * @description 判断参数传来的年月是否大于最大月份：大于返回true，小于返回false
   * @param year 年份
   * @param month 月份
   */
  private isBiggerThanMaxMonth(year: number, month: number): boolean {
    if (!TiDateUtil.isDate(this.max)) {
      return false;
    }

    let max: Date = this.max;
    max = new Date(max.getFullYear(), max.getMonth(), 1);
    if (max.getTime() < new Date(year, month - 1, 1).getTime()) {
      return true;
    }

    return false;
  }

  /**
   * @description 设置按钮状态：
   */
  private setYearRangePreNextState(): void {
    const minValueRange: TiYearRange = this.getYearRange(this.min.getFullYear());
    const maxValueRange: TiYearRange = this.getYearRange(this.max.getFullYear());
    this.isMaxYearRange = this.date.year >= maxValueRange.min && this.date.year <= maxValueRange.max ? true : false;
    this.isMinYearRange = this.date.year >= minValueRange.min && this.date.year <= minValueRange.max ? true : false;
  }

  // 获取时间面板：最大值和最小值年面板范围
  private getYearRange(year: number): TiYearRange {
    const minDateRange: number = year - (year % 10);
    const maxDateRange: number = minDateRange + 9;

    return {
      min: minDateRange,
      max: maxDateRange
    };
  }
  /**
   *  当前年份是否在最大最小值范围内
   * @param year 当前年
   * @returns
   */
  private isNotBetweenMaxAndmin(year: number): boolean {
    return year < this.min.getFullYear() || year > this.max.getFullYear() ? true : false;
  }

  /**
   * 设置当前年份面板值
   * @param innerYear 当前年月数据集合
   * @returns
   */
  private setYearMonth(innerYear: Array<TiDateValueAndState>): Array<Array<TiDateValueAndState>> {
    const yearArr: Array<Array<TiDateValueAndState>> = [];

    for (let p: number = 0; p < 3; p++) {
      yearArr[p] = [];
      for (let q: number = 0; q < 4; q++) {
        yearArr[p].push(innerYear[q + p * 4]);
      }
    }

    return yearArr;
  }
  private setYearValue(year: number): Array<TiDateValueAndState> {
    const innerYear: Array<TiDateValueAndState> = []; // 存储年值
    // 2.数组的第一个为起始年 -1；
    const start: number = year - 1;
    const end: number = year + 9;
    let index: number = 0;
    let state: string = '';
    const preYearRange: string = this.isNotBetweenMaxAndmin(start) ? 'disable' : 'preYear';
    innerYear.push({
      state: preYearRange,
      value: start
    });
    // 3.起始年  - 最终年（起始年+9）（for遍历）
    for (let i: number = year; i <= end; i++) {
      index++;
      if (this.isNotBetweenMaxAndmin(i)) {
        state = 'disable';
      } else if (this.isEqualToValue('year', i)) {
        state = 'current'; // 当前选中
      } else if (this.isBetweenInRange('year', i)) {
        state = 'select'; // 在选中范围
      } else {
        state = 'default';
      }

      innerYear[index] = {
        value: i,
        state,
        isYear: this.isEqualToToday('year', i)
      };
    }

    // 判断是不是大于最大年：大于最大年状态为灰化
    const nextYearRange: string = this.isNotBetweenMaxAndmin(end + 1) ? 'disable' : 'nextYear';
    innerYear.push({
      state: nextYearRange,
      value: end + 1
    });

    return innerYear;
  }

  /**
   * @description 根据当前年份和最大最小值，设置下拉面板中显示的年份状态
   */
  private setYearArr(): void {
    // 1.获取当前年；算出起始年，
    const year: number = this.date.year - (this.date.year % 10);
    const innerYear: Array<TiDateValueAndState> = this.setYearValue(year);
    this.yearArr = this.setYearMonth(innerYear);
  }

  /**
   * @description 根据当前年份和最大最小值，设置下拉面板中显示的年份状态
   */
  private setEndpanelYearArr(): void {
    // 1.获取当前年；算出起始年，
    const year: number = this.date.year - (this.date.year % 10) + 10;
    const innerYear: Array<TiDateValueAndState> = this.setYearValue(year);
    this.endpanelYearArr = this.setYearMonth(innerYear);
  }

  // 设置左年后退按钮灰化
  isPickerYearMinValue(): boolean {
    return this.picker === 'year' || this.picker === 'onlyYear' ? this.isMinYearRange : this.isMinYear;
  }
  // 设置右年前进按钮灰化
  isPickerYearMaxValue(): boolean {
    return this.picker === 'year' || this.picker === 'onlyYear' ? this.isMaxYearRange : this.isMaxYear;
  }

  public trackByFn(index: number, item: any): number {
    return index;
  }

  private setOptions(num: number, pos?: string): Array<any> {
    const options: Array<any> = [];
    for (let i: number = 0; i < num; i++) {
      options[i] = {
        label: i < 10 ? '0' + i : String(i),
        disabled: pos === 'end' ? this.endTimeDisabled : this.beginTimeDisabled
      };
    }

    return options;
  }

  /**
   * @ignore
   * 时间选择框部分鼠标移出时去除hover样式
   */
  public onMouseleave(listCom: TiListComponent): void {
    listCom.hoverOption = null;
  }
  /**
   * @ignore
   * 时间面板：根据格式显隐分秒面板
   */
  private setTimePanel(): void {
    // 仅时
    if (this.timeFormat?.indexOf('m') === -1) {
      this.onlyHour = true;
    } else if (this.timeFormat?.indexOf('s') === -1) {
      // 仅时分
      this.onlyHourMinute = true;
    } else {
      this.onlyHour = false;
      this.onlyHourMinute = false;
    }
  }
}
