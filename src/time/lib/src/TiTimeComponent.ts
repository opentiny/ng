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
  ElementRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TiDateUtil, TiKeymap, Util } from '@opentiny/ng-utils';
import { TiLocaleFormat } from '@opentiny/ng-locale';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiDropComponent } from '@opentiny/ng-drop';
import { DOCUMENT } from '@angular/common';
import { TiListComponent } from '@opentiny/ng-list';
import packageInfo from '../package.json';
/**
 * @ignore
 */
export interface TimeField {
  hour: string;
  minute: string;
  second: string;
}

/**
 * @ignore
 */
export interface TiComputingParams {
  max: number;
  min: number;
  needAddZero: boolean;
}

/**
 * Time时间组件
 *
 * Time组件提供了一种方便的显示和设置时间的方式。
 *
 */
@Component({
  selector: 'ti-time',
  templateUrl: './time.html',
  styleUrls: ['./time.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiTimeComponent)],
  host: {
    '[class.ti3-time-container]': 'true',
    '(blur)': 'onBlur()'
  }
})
export class TiTimeComponent extends TiFormComponent {
  /**
   * 时间显示格式。各个时间段格式规则; 默认值：'HH:mm:ss'
   *
   * 1.小时可以设置为：
   *
   * HH —— 24 小时制,两位数字表示小时(00-23)
   *
   * H —— 24 小时制，开头不补零数字表示小时(0-23)
   *
   * 2.分钟可以设置为：
   *
   * mm —— 两位数字表示分钟值（00-59）
   *
   * m —— 开头不补零数字表示分钟值（0-59）
   *
   * 3.秒可以设置为：
   *
   * ss —— 两位数字表示秒值(00-59)
   *
   * s —— 开头不补零数字表示秒值(0-59)
   *
   * 说明：开头补零是指当前时间是个位数字时，前边补零，始终保持两位数字
   */
  @Input() format: string;
  /**
   * 时间最大值，默认值：'23:59:59'
   */
  @Input() max: string;
  /**
   * 时间最小值，默认值：'00:00:00'
   */
  @Input() min: string;
  /**
   * 是否展示清除时间图标（默认显示）
   */
  @Input() clearIcon: boolean = true;
  /**
   * 面板对齐方式
   */
  @Input() panelAlign: 'left' | 'right' = 'left';
  /**
   * @ignore
   */
  @ViewChild('dominator', { static: true }) private containerRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild(TiDropComponent, { static: true }) dropCom: TiDropComponent;
  /**
   * @ignore
   */
  @ViewChild('text', { static: true }) textCom: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('input', { static: true }) inputEle: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('button', { static: true }) buttonEle: ElementRef;
  /**
   * @ignore
   * time编辑框内部value值
   */
  public inputValue: string = '';
  /**
   * @ignore
   * dominator最终显示时间值
   */
  public timeValue: string = '';
  /**
   * @ignore
   */
  public dominatorCom: ElementRef;
  /**
   * @ignore
   * 时间下拉面板宽度，根据时间格式宽度各异
   */
  public timePanelWidth: number = 284;
  /**
   * @ignore
   * 底部确认按钮是否禁用
   */
  public buttonDisabled: boolean = true;
  /**
   * @ignore
   * placeholder提示文本
   */
  public placeholder: string;
  /**
   * @ignore
   */
  public hourOptions: Array<any>;
  /**
   * @ignore
   */
  public minuteOptions: Array<any>;
  /**
   * @ignore
   */
  public secondOptions: Array<any>;
  /**
   * @ignore
   */
  public selectedHour: any;
  /**
   * @ignore
   */
  public selectedMinute: any;
  /**
   * @ignore
   */
  public selectedSecond: any;
  /**
   * @ignore
   */
  public hourScroll: number;
  /**
   * @ignore
   */
  public minuteScroll: number;
  /**
   * @ignore
   */
  public secondScroll: number;
  /**
   * @ignore
   * 只展示小时段
   */
  public onlyHour: boolean;
  /**
   * @ignore
   * 只展示时分段
   */
  public onlyHourMinute: boolean;
  /**
   * @ignore
   * 只展示分秒段
   */
  public onlyMinuteSecond: boolean;
  /**
   * @ignore
   */
  public oldInputValue: string = '';
  /**
   * @ignore
   * 面板与dominator的距离
   */
  public dominatorSpace: string = '-30px';
  /**
   * @ignore
   * 是否清除
   */
  public isClearClick: boolean;
  protected versionInfo: string = super.getVersion(packageInfo);
  // 默认最大最小值
  private config: { min: string; max: string } = {
    min: '00:00:00',
    max: '23:59:59'
  };
  private documentKeydownListener: () => void;

  constructor(
    protected hostRef: ElementRef,
    protected renderer2: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    @Inject(DOCUMENT) private document
  ) {
    super(hostRef, renderer2, changeDetectorRef);
  }

  /**
   * @description: 若时间字符串没有一个冒号时处理成合法的事件字符串（加冒号）
   * @param value 时间字符串
   */
  private static addColon(value: any): string {
    // new Date()时，时间中没有一个冒号得到的是非法时间
    if (value.match(/:/)) {
      return value;
    }
    let ampm: string = value.match(/am|AM|pm|PM/);
    ampm = ampm || '';

    return `${parseInt(value, 10)}: ${ampm}`;
  }

  /**
   * @description 判读字符串是否是合法的时间
   * @param: time: 校验的时间
   */
  private static isValidTime(time: string): boolean {
    // value非字符串或者为空字符串时，为非法时间
    if (!Util.isString(time) || time.trim() === '') {
      return false;
    }

    const date: any = new Date(`2018/5/15 ${TiTimeComponent.addColon(time)}`);

    // any类型是为了防止编译报错 Date类型不能和string类型比较
    return !(String(date) === 'Invalid Date');
  }

  /**
   * @description: hh/HH/mm/ss 时间格式时，显示的值处理成2位，不足2位补0
   * @param: num : 各个时间显示框的数值
   * @param: length : 需要处理之后的长度
   */
  private static addZero(num: number, length: number): string {
    const zeroNum: string = `00${num}`;

    return zeroNum.substr(zeroNum.length - length, length);
  }
  /**
   * @description newVal参数为合法值时返回newVal，否则返回defaultValue参数
   * @param: newVal:新值
   * @param: defaultValue:默认值
   */
  private static verifyTime(newVal: string, defaultValue: string): string {
    return TiTimeComponent.isValidTime(newVal) ? newVal : defaultValue;
  }
  /**
   * @description 比较value1和value2两个时间值大小.value1 < value2时，返回true；否则返回false  ；
   * @param: value1:比较的前一个值
   * @param: value2:比较的后一个值
   */
  private static isSmaller(value1: string, value2: string): boolean {
    return Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value1)}`) < Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value2)}`);
  }

  /**
   * @description 比较value1和value2两个时间值大小.value1 > value2时，返回true；否则返回false  ；
   * @param: value1:比较的前一个值
   * @param: value2:比较的后一个值
   */
  private static isBigger(value1: string, value2: string): boolean {
    return Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value1)}`) > Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value2)}`);
  }

  /**
   * @description 比较value1和value2两个时间值大小.value1 <= value2时，返回true；否则返回false  ；
   * @param: value1:比较的前一个值
   * @param: value2:比较的后一个值
   */
  private static isSmallerOrEqual(value1: string, value2: string): boolean {
    return Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value1)}`) <= Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value2)}`);
  }

  /**
   * @description 比较value1和value2两个时间值大小.value1 >= value2时，返回true；否则返回false  ；
   * @param: value1:比较的前一个值
   * @param: value2:比较的后一个值
   */
  private static isBiggerOrEqual(value1: string, value2: string): boolean {
    return Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value1)}`) >= Date.parse(`2018/5/15 ${TiTimeComponent.addColon(value2)}`);
  }

  // 组件声明周期钩子--start
  ngOnInit(): void {
    super.ngOnInit();
    // 初始化变量
    this.initVariable();

    this.showTimeWithFormat();

    // 最大最小值校验
    this.validateMaxAndMin();

    this.setTimeOptions();

    // 时间框提示文本按照小写显示
    this.placeholder = this.format.toLowerCase();

    this.zone.runOutsideAngular(() => {
      // 避免不停触发变化检测
      // document上的Ecs快捷键功能
      this.documentKeydownListener = this.renderer2.listen(this.document, 'keydown', this.keydownHandlerFn);
    });
  }

  private setTimeOptions(): void {
    this.hourOptions = this.setOptions(24, 'hour');
    this.minuteOptions = this.setOptions(60, 'minute');
    this.secondOptions = this.setOptions(60, 'second');
  }
  // 根据格式format判断面板展示情况
  private showTimeWithFormat(): void {
    // 纯小时
    if (this.format.indexOf('m') === -1) {
      this.onlyHour = true;
    } else if (this.format.indexOf('s') === -1) {
      // 仅时分
      this.onlyHourMinute = true;
    } else if (this.format.indexOf('H') === -1) {
      // 仅分秒
      this.onlyMinuteSecond = true;
    }
  }

  private initVariable(): void {
    // 1. 时间格式校验
    this.format = Util.isString(this.format) ? this.format : TiDateUtil.DEFAULT_TIME_FORMAT;
  }

  private validateMaxAndMin(): void {
    this.config.max = this.formatTime(this.config.max);
    this.config.min = this.formatTime(this.config.min);
    // 最大值合法性校验
    this.max = TiTimeComponent.verifyTime(this.formatTime(this.max), this.config.max);
    // 最小值合法性校验
    this.min = TiTimeComponent.verifyTime(this.formatTime(this.min), this.config.min);
    // 最大最小值矛盾时，设置为默认值
    if (TiTimeComponent.isSmaller(this.max, this.min)) {
      this.min = this.config.min;
      this.max = this.config.max;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // 1.0 minValue监控
    if (changes['min'] && !changes['min'].isFirstChange()) {
      this.min = this.formatTime(changes['min'].currentValue);
      // 新minValue值非法时，恢复到之前值
      if (!this.isValidMinValue(this.min)) {
        this.min = changes['min'].previousValue;

        return;
      }
      // 对value值进行最小值校验
      // setTimeout不能去掉，在onpush环境没问题，但是在default环境会报错
      // （ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked）
      setTimeout(() => {
        const model: string = this.addHour(this.model);
        if (TiTimeComponent.isValidTime(model) && TiTimeComponent.isSmaller(model, this.min)) {
          this.model = this.min;
          this.formatValue();
        }
        this.setDisableData(true);
        this.changeDetectorRef.markForCheck();
      }, 0);
    }
    // 2.0 maxValue监控
    if (changes['max'] && !changes['max'].isFirstChange()) {
      this.max = this.formatTime(changes['max'].currentValue);
      // 新maxValue值非法时，恢复到之前值
      if (!this.isValidMaxValue(this.max)) {
        this.max = changes['max'].previousValue;

        return;
      }
      // 对value值进行最小值校验
      // setTimeout不能去掉，在onpush环境没问题，但是在default环境会报错
      // （ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked）
      setTimeout(() => {
        const model: string = this.addHour(this.model);
        if (TiTimeComponent.isValidTime(model) && TiTimeComponent.isBigger(model, this.max)) {
          this.model = this.max;
          this.formatValue();
        }
        this.setDisableData(true);
        this.changeDetectorRef.markForCheck();
      }, 0);
    }
    // 3.0 format监控
    if (changes['format'] && !changes['format'].isFirstChange()) {
      // 新format值非法时，恢复到之前值
      if (!Util.isString(changes['format'].currentValue)) {
        this.format = changes['format'].previousValue;

        return;
      }
      this.showTimeWithFormat();
      if (TiTimeComponent.isValidTime(this.addHour(this.model))) {
        this.formatValue();
      }
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.dominatorCom = this.containerRef.nativeElement;
    this.setFocusableElems(
      [this.dominatorCom]
        .concat(this.dropCom.nativeElement)
        .concat(this.textCom.nativeElement)
        .concat(this.inputEle.nativeElement)
        .concat(this.buttonEle.nativeElement)
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.documentKeydownListener) {
      this.documentKeydownListener();
    }
  }
  // 组件声明周期钩子--end

  // 实现ControlValueAccessor接口
  /**
   * @ignore
   */
  writeValue(value: any): void {
    super.writeValue(value);
    if (value === '' || !this.isValidValue(value)) {
      this.model = '';
      this.buttonDisabled = true;
      if (this.timeValue) {
        this.timeValue = '';
        this.inputValue = '';
        this.oldInputValue = '';
        this.setSelectVal();
      }

      this.setDisableData();

      return;
    }
    this.buttonDisabled = false;
    this.model = value;
    this.formatValue();
    this.setDisableData();
  }
  // 实现ControlValueAccessor接口--end
  /**
   * @ignore
   * @description: 组件整体失焦之后处理函数
   */
  public onBlur(): void {
    // 失焦后下拉关闭
    this.hidePanel();
    this.inputValue = this.model;
    this.setDisableData();
    this.setSelectVal();
    this.getScrollData();
    this.oldInputValue = this.inputValue;
  }
  // 面板延迟200ms关闭,用户输入新值之后，直接点击确认按钮关闭面板时，
  // 面板内部选中项先刷新 再关闭 200ms的延迟 用户可以看到这样一个视觉的过程
  // 200ms通过本地用例，跟规范侧共同决定的一个延时数值
  private hidePanel(): void {
    setTimeout(() => {
      this.dropCom.hide();
      // 初始化数据，保证有时间值时，初次打开数据定位在顶部
      this.hourScroll = -1;
      this.minuteScroll = -1;
      this.secondScroll = -1;
    }, 200);
  }
  /**
   * @ignore
   * 点击dominator打开面板
   */
  public onShowClick(): void {
    if (this.disabled) {
      return;
    }
    if (this.isClearClick) {
      this.isClearClick = false;
      return;
    }
    this.getScrollData();
    this.dropCom.show();
    this.textCom.nativeElement.focus();
    this.buttonDisabled = !this.model;
  }
  /**
   * @ignore
   * 点击确认按钮关闭面板
   */
  public okClickFn(): void {
    this.timeValue = this.inputValue;
    this.model = this.inputValue;
    // 记录旧值，当输入非法时，返回之前合法值
    this.oldInputValue = this.inputValue;
    this.containerRef.nativeElement.focus();
    this.hidePanel();
  }
  /**
   * @ignore
   * 时间面板点击选择事件
   * @param val
   * @param title
   */
  public onSelect(val: any, title: string): void {
    // 禁用状态
    if (val.disabled) {
      return;
    }
    let arr: Array<string> = [];
    if (this.onlyHour) {
      arr = ['00'];
    } else if (this.onlyHourMinute) {
      arr = ['00', '00'];
    } else {
      arr = ['00', '00', '00'];
    }
    const timeArr: Array<string> = this.inputValue === '' ? arr : this.addHour(this.inputValue).split(':');
    switch (title) {
      case 'hour':
        timeArr[0] = val.label;
        timeArr[1] = timeArr[1] ? timeArr[1] : '00';
        timeArr[2] = timeArr[2] ? timeArr[2] : '00';
        this.hourScroll = val.label * 30;
        break;
      case 'minute':
        timeArr[1] = val.label;
        timeArr[2] = timeArr[2] ? timeArr[2] : '00';
        this.minuteScroll = val.label * 30;
        break;
      case 'second':
        timeArr[2] = val.label;
        this.secondScroll = val.label * 30;
        break;
      default:
        break;
    }

    // 仅有分秒时，去除时
    if (this.onlyMinuteSecond) {
      timeArr.shift();
    }

    this.inputValue = timeArr.join(':');
    this.setDisableData();
    this.setSelectVal();
    this.oldInputValue = this.inputValue;
    this.buttonDisabled = false;
  }

  private setSelectVal(): void {
    let value: string = this.addHour(this.inputValue);

    if (!TiTimeComponent.isValidTime(value)) {
      this.selectedHour = null;
      this.selectedMinute = null;
      this.selectedSecond = null;
      return;
    }
    const newtimeArr: Array<string> = this.validateValue(value).split(':');
    const hourVal: string = TiTimeComponent.addZero(Number(newtimeArr[0]), 2);
    const minuteVal: string = TiTimeComponent.addZero(Number(newtimeArr[1]), 2);
    const secondVal: string = TiTimeComponent.addZero(Number(newtimeArr[2]), 2);
    this.selectedHour = this.getSelectedVal(this.hourOptions, hourVal);
    this.selectedMinute = this.getSelectedVal(this.minuteOptions, minuteVal);
    this.selectedSecond = this.getSelectedVal(this.secondOptions, secondVal);
    // 失焦之后，个位的数字需补零
    if (this.onlyHour) {
      this.inputValue = hourVal;
    } else if (this.onlyHourMinute) {
      this.inputValue = hourVal + ':' + minuteVal;
    } else if (this.onlyMinuteSecond) {
      this.inputValue = minuteVal + ':' + secondVal;
    } else {
      this.inputValue = hourVal + ':' + minuteVal + ':' + secondVal;
    }
    this.getScrollData();
  }

  private keydownHandlerFn = (event: KeyboardEvent): void => {
    if (event.keyCode === TiKeymap.KEY_ESCAPE) {
      this.hidePanel();
    }
  };
  /**
   * @ignore
   * 组件快捷键处理tab键 enter键
   */
  @HostListener('keydown', ['$event']) public onKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case TiKeymap.KEY_ENTER: // ENTER键(大键盘)
      case TiKeymap.KEY_NUMPAD_ENTER: // ENTER键(数字小键盘)
        this.responseEnter();
        break;
      default:
        break;
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
    this.getScrollData();
    // 时间面板展开
    this.dropCom.show();
    this.textCom.nativeElement.focus();
  }
  /**
   * @ignore
   * 输入为中文冒号时，自动转换为英文冒号
   * @param val
   */
  public onInputChangeFn(val: any): void {
    if (!Util.isEmptyString(val)) {
      let value: string = val;
      value = value.replace('：', ':');
      this.inputValue = value;
    } else {
      this.buttonDisabled = true;
    }
  }

  /**
   * @ignore
   * 时间框enter事件
   */
  public timeKeydownFn(event: KeyboardEvent, val: string): void {
    if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
      this.timeBlur(val);
    }
  }

  /**
   * @ignore
   *
   */
  public timeBlur(val: string): void {
    if (val === '') {
      this.buttonDisabled = true;
      this.inputValue = '';
      this.oldInputValue = this.inputValue;
      this.getScrollData();

      return;
    }

    const timeArr: Array<any> = val.split(TiDateUtil.COLON_REGEXP);
    const formatArr: Array<any> = this.format.split(':');
    const datetime: Date = new Date(`2022/01/28 ${TiDateUtil.addColon(this.addHour(val))}`);
    // 用户输入与format不匹配或当前时间是非法值时，都按照非法字符处理
    if (timeArr.length !== formatArr.length || String(datetime) === 'Invalid Date') {
      this.inputValue = this.oldInputValue;
      this.buttonDisabled = Util.isEmptyString(this.inputValue);

      return;
    }

    // 时分秒是负数或不是数字时
    timeArr.forEach((item: any) => {
      if (item < 0 || isNaN(Number(item))) {
        this.inputValue = this.oldInputValue;
        this.buttonDisabled = Util.isEmptyString(this.inputValue);

        return;
      }
    });
    this.setDisableData();
    this.setSelectVal();
    this.getScrollData();
    this.oldInputValue = this.inputValue;
    this.buttonDisabled = false;
  }
  // 获取滚动值
  private getScrollData(): void {
    if (Util.isEmptyString(this.inputValue)) {
      this.hourScroll = 0;
      this.minuteScroll = 0;
      this.secondScroll = 0;
    } else {
      const timeArr: Array<any> = this.addHour(this.inputValue).split(TiDateUtil.COLON_REGEXP);
      this.hourScroll = timeArr[0] * 30;
      this.minuteScroll = timeArr[1] * 30;
      this.secondScroll = timeArr[2] * 30;
    }
  }
  /**
   * @ignore
   * 清除
   */
  public onIconClearClick(): void {
    if (this.disabled || !this.clearIcon) {
      return;
    }
    this.inputValue = '';
    this.oldInputValue = '';
    this.timeValue = '';
    this.model = '';
    this.selectedHour = null;
    this.selectedMinute = null;
    this.selectedSecond = null;
    this.buttonDisabled = true;
    this.isClearClick = true;
    this.setDisableData();
  }

  private getSelectedVal(options: Array<any>, val: any): Function {
    return options.find((item: any) => {
      if (!item.disabled && item.label === val) {
        return item;
      } else {
        return null;
      }
    });
  }
  private setOptions(num: number, labelKey?: string): Array<any> {
    const options: Array<any> = [];
    for (let i: number = 0; i < num; i++) {
      options[i] = {
        label: TiTimeComponent.addZero(i, 2),
        disabled: false
      };
    }

    return options;
  }

  private setDisableData(isChange?: boolean): boolean {
    if (this.max === this.config.max && this.min === this.config.min && !isChange) {
      return false;
    }
    const maxArr: Array<string> = this.max.split(':');
    const minArr: Array<string> = this.min.split(':');
    const value: string = this.addHour(this.inputValue);
    const timeArr: Array<string> = this.validateValue(value).split(':');
    // 根据最大最小值判定小时禁用项
    this.hourOptions.forEach((item: any) => {
      item.disabled = Number(item.label) < Number(minArr[0]) || Number(item.label) > Number(maxArr[0]);
    });

    if (Util.isNumber(Number(timeArr[0])) && Number(minArr[0]) === Number(maxArr[0])) {
      // 最大小时最小小时相等情况,需考虑分钟禁用
      this.minuteOptions.forEach((minuteItem: any) => {
        minuteItem.disabled = Number(minuteItem.label) < Number(minArr[1]) || Number(minuteItem.label) > Number(maxArr[1]);
      });
    } else if (Number(timeArr[0]) === Number(minArr[0])) {
      // 最小小时情况,需考虑分钟禁用
      this.minuteOptions.forEach((minuteItem: any) => {
        minuteItem.disabled = Number(minuteItem.label) < Number(minArr[1]);
      });
    } else if (Number(timeArr[0]) === Number(maxArr[0])) {
      // 最大小时情况,需考虑分钟禁用
      this.minuteOptions.forEach((minuteItem: any) => {
        minuteItem.disabled = Number(minuteItem.label) > Number(maxArr[1]);
      });
    } else {
      this.minuteOptions.forEach((minuteItem: any) => {
        minuteItem.disabled = false;
      });
    }

    if (Util.isNumber(Number(timeArr[1])) && Number(minArr[0]) === Number(maxArr[0]) && Number(minArr[1]) === Number(maxArr[1])) {
      // 最大小时分最小小时分相等情况,需考虑分钟禁用
      this.secondOptions.forEach((secondItem: any) => {
        secondItem.disabled = Number(secondItem.label) < Number(minArr[2]) || Number(secondItem.label) > Number(maxArr[2]);
      });
    } else if (Number(timeArr[0]) === Number(minArr[0]) && Number(timeArr[1]) === Number(minArr[1])) {
      // 最小时分情况,需考虑秒数禁用
      this.secondOptions.forEach((secondItem: any) => {
        secondItem.disabled = Number(secondItem.label) < Number(minArr[2]);
      });
    } else if (Number(timeArr[0]) === Number(maxArr[0]) && Number(timeArr[1]) === Number(maxArr[1])) {
      // 最大时分情况,需考虑秒数禁用
      this.secondOptions.forEach((secondItem: any) => {
        secondItem.disabled = Number(secondItem.label) > Number(maxArr[2]);
      });
    } else {
      this.secondOptions.forEach((secondItem: any) => {
        secondItem.disabled = false;
      });
    }

    // 需要修改配置对象的引用，实现下拉禁用状态及时刷新
    this.hourOptions = [...this.hourOptions];
    this.minuteOptions = [...this.minuteOptions];
    this.secondOptions = [...this.secondOptions];
  }

  /**
   * @ignore
   * 时间选择框部分鼠标移出时去除hover样式
   */
  public onMouseleave(listCom: TiListComponent): void {
    listCom.hoverOption = null;
  }
  // 组件交互方法集合--end

  // 内部公共方法集合--start
  /**
   * 校正当前时间为最大值或最小值
   * @param value 时间值
   * @returns
   */
  private validateValue(value: string): string {
    let timeValue: string = value;

    if (TiTimeComponent.isSmaller(timeValue, this.min)) {
      timeValue = this.min;
    }

    if (TiTimeComponent.isBigger(timeValue, this.max)) {
      timeValue = this.max;
    }

    return timeValue;
  }

  /**
   * @description: 时间格式化及时间各个框显示值设置
   */
  private formatValue(): void {
    // 格式化value
    const date: Date = new Date(`2018/5/15 ${TiTimeComponent.addColon(this.model)}`);
    const formatStr: string = TiLocaleFormat.formatTime(date, this.format);
    if (this.model !== formatStr) {
      this.model = formatStr;
    }
    this.timeValue = this.model;
    this.inputValue = this.model;
    this.oldInputValue = this.inputValue;
    const timeArr: Array<any> = this.addHour(this.inputValue).split(':');
    this.selectedHour = this.getSelectedVal(this.hourOptions, TiTimeComponent.addZero(Number(timeArr[0]), 2));
    this.selectedMinute = this.getSelectedVal(this.minuteOptions, TiTimeComponent.addZero(Number(timeArr[1]), 2));
    this.selectedSecond = this.getSelectedVal(this.secondOptions, TiTimeComponent.addZero(Number(timeArr[2]), 2));
  }
  /**
   * @description: 校验动态更新的minValue是否是合法值
   * @param: minValue:动态更新的传入的minValue
   */
  private isValidMinValue(minValue: string): boolean {
    return TiTimeComponent.isValidTime(minValue) && TiTimeComponent.isSmallerOrEqual(minValue, this.max);
  }

  /**
   * @description: 校验动态更新的maxValue是否是合法值
   * @param: maxValue:动态更新的传入的maxValue
   */
  private isValidMaxValue(maxValue: string): boolean {
    return TiTimeComponent.isValidTime(maxValue) && TiTimeComponent.isBiggerOrEqual(maxValue, this.min);
  }

  /**
   * @description: 判断动态更新写入组件的value值是否是一个合法值
   * @param: value 动态更新写入组件的value值
   */
  private isValidValue(value: string): boolean {
    const time: string = this.formatTime(value);

    return (
      TiTimeComponent.isValidTime(time) &&
      TiTimeComponent.isBiggerOrEqual(time, this.min) &&
      TiTimeComponent.isSmallerOrEqual(time, this.max)
    );
  }

  /**
   * @description: 格式化时间值
   * @param: value 值
   */
  private formatTime(value: string): string {
    if (!value) {
      return value;
    }
    const date: Date = new Date(`2018/5/15 ${TiTimeComponent.addColon(value)}`);

    if (String(date) === 'Invalid Date') {
      return value;
    }

    return this.addHour(TiLocaleFormat.formatTime(date, this.format));
  }

  /**
   * 若当前格式是 mm:ss，补充小时位
   * @param value 时间值
   * @returns
   */
  private addHour(value: string): string {
    return this.onlyMinuteSecond && value ? `00:${value}` : value;
  }
  // 内部公共方法集合--end
}
