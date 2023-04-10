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
import { TiDateUtil, TiKeymap, Util } from '@opentiny/ng-utils';
import { TiLocaleFormat } from '@opentiny/ng-locale';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiDateBaseComponent, TiDatetimeFormat, TiDateValue, TimeOptions } from '@opentiny/ng-datebase';
import { TiSelectComponent } from '@opentiny/ng-select';
import packageInfo from '../package.json';
/**
 * DatetimeRange日期时间范围组件
 *
 * Datetime组件提供了一种方便的显示和设置日期时间范围的方式。
 *
 */
@Component({
  selector: 'ti-datetime-range',
  templateUrl: './datetimerange.html',
  styleUrls: ['./datetimerange.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-datetime-range-input-container]': 'true',
    '(blur)': 'hidePanel()'
  },
  providers: [TiFormComponent.getValueAccessor(TiDatetimeRangeComponent)]
})
export class TiDatetimeRangeComponent extends TiDateBaseComponent {
  /**
   * 是否允许结束时间和开始时间相同
   */
  @Input() isAllowBeginEqualEnd: boolean = true;
  /**
   * 是否显示时区选择框（选项：‘本地时区’、‘UTC/GMT’），默认值为‘本地时区’
   */
  @Input() timeZoneable: boolean = false;
  /**
   * @ignore
   */
  @ViewChild(TiSelectComponent, { static: false })
  selectComRef: TiSelectComponent;

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
   * 对应Time组件的接口属性
   */
  public beginTime: TimeOptions = {};
  /**
   * @ignore
   * 对应Time组件的接口属性
   */
  public endTime: TimeOptions = {};
  /**
   * @ignore
   */
  public beginTimeDisabled: boolean;
  /**
   * @ignore
   */
  public endTimeDisabled: boolean;
  /**
   * @ignore
   * 时间日期的format
   */
  public dominatorFormat: string;
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
  public isRange: boolean = true;
  /**
   * @ignore
   * 标记输入框中的时间是不是手动输入
   */
  public isInputValue: boolean = false;
  /**
   * @ignore
   */
  public oldBegintimeValue: any = '';
  /**
   * @ignore
   */
  public oldEndtimeValue: any = '';
  /**
   * @ignore
   * placeholder提示文本
   */
  public placeholder: string = `${this.dateWords.rangeBeginLabel} ─ ${this.dateWords.rangeEndLabel}`;
  /**
   * @ignore
   * 时区选择下拉建议项
   */
  public timeZoneOptions: Array<any> = [{ label: this.dateWords.utcZone }, { label: this.dateWords.localZone }];
  /**
   * @ignore
   * 时区选择当前选中项
   */
  public selectedOption: string;
  protected versionInfo: string = super.getVersion(packageInfo);
  private lastTimeZone: string; // 记录上次选择的时区
  private beginDateTime: string = ''; // 开始日期框中的时间值
  private endDateTime: string = ''; // 结束日期框中的时间值

  ngOnInit(): void {
    super.ngOnInit();
    // 将日期与时间的format拼接为一个字符串
    this.dominatorFormat = `${this.format.date} ${this.format.time}`;
    this.oldFormat = this.format;
    // model有值时，需要记录初始时间值
    if (Util.isUndefined(this.model)) {
      return;
    }
    if (this.model !== null) {
      setTimeout((): void => {
        this.oldBegintimeValue = TiLocaleFormat.formatTime(this.model.begin, this.format.time);
        this.oldEndtimeValue = TiLocaleFormat.formatTime(this.model.end, this.format.time);
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    if (this.timeZoneable && this.selectComRef) {
      // 将select dominator设置为可聚焦元素
      this.setFocusableElems(
        [this.dominatorCom.nativeElement]
          .concat(this.dropCom.nativeElement)
          .concat(this.focusElementsArr)
          .concat(this.selectComRef.dominatorCom.getFocusableElems())
      );
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.rangeChange(changes);
  }

  ngDoCheck(): void {
    if (!Util.isUndefined(this.model)) {
      // 设置初始时区选择的选中项
      if (this.timeZoneable && !this.selectedOption) {
        this.selectedOption = this.model?.timeZone;
        this.lastTimeZone = this.selectedOption;
      }
      // 监听model值的变化
      this.setModel(this.isDatetime);

      // 监听format变化
      this.setFormat();
    }
  }

  /**
   * @ignore
   * 确认按钮事件处理
   */
  public onOkClick(): void {
    if (this.inValidValue) {
      return;
    }

    const beginDateStr: string = TiDateUtil.getDateStr(this.datePanel['value']['begin']);
    // 中间空格误删
    const beginValue: Date = TiDateUtil.getLocalDate(
      `${beginDateStr} ${TiDateUtil.addColon(this.beginTime['value'])}`,
      this.timeZoneable,
      this.selectedOption
    );
    const endDateStr: string = TiDateUtil.getDateStr(this.datePanel['value']['end']);
    // 中间空格误删
    const endValue: Date = TiDateUtil.getLocalDate(
      `${endDateStr} ${TiDateUtil.addColon(this.endTime['value'], true)}`,
      this.timeZoneable,
      this.selectedOption
    );

    const newModel: TiDateValue = {
      begin: beginValue,
      end: endValue
    };

    if (this.selectedOption) {
      newModel.timeZone = this.selectedOption;
      this.lastTimeZone = this.selectedOption;
    }

    // 新旧值不同更新model值
    if (!this.rangeValueIsEqual(this.model, newModel, this.isDatetime)) {
      this.model = newModel;
    }

    this.hideDrop();

    this.okClick.emit(this.model);
  }

  /**
   * @ignore
   * model值的合法性判断
   */
  public isValidValue(value: TiDateValue): boolean {
    if (value === null || (value.begin === null && value.end === null)) {
      return true;
    }

    if (
      TiDateUtil.isDate(value['begin']) &&
      TiDateUtil.isDate(value['end']) &&
      value['begin'].getTime() <= value['end'].getTime() &&
      TiDateUtil.isBetweenMaxAndmin(value['begin'], this.min, this.max) &&
      TiDateUtil.isBetweenMaxAndmin(value['end'], this.min, this.max)
    ) {
      return true;
    }

    return false;
  }

  /**
   * @ignore
   * 将value转换成format接口格式的字符串
   */
  public formatValue(): void {
    if (this.model === null || (this.model.begin === null && this.model.end === null)) {
      this.inputValue = '';
    } else {
      // 空格误删
      const format: string = `${this.format.date} ${TiDateUtil.addAmPm(this.format.time)}`;
      const begin: string = TiLocaleFormat.formatDateTime(
        TiDateUtil.getUtcDate(this.model.begin, this.timeZoneable, this.selectedOption),
        format
      );
      const end: string = TiLocaleFormat.formatDateTime(
        TiDateUtil.getUtcDate(this.model.end, this.timeZoneable, this.selectedOption),
        format
      );
      // 注意：中划线用的是制表符中的中划线，与正常的中线区分开2017-2-12 - 2018-3-20
      this.inputValue = `${begin} ─ ${end}`;
    }
  }

  /**
   * @ignore
   * 配置时间日期面板接口
   */
  public setPickerDate(): void {
    // 设置时区选择的选中项
    if (this.timeZoneable) {
      this.selectedOption = this.lastTimeZone ? this.lastTimeZone : this.model?.timeZone || this.timeZoneOptions[1].label;
      this.lastTimeZone = this.selectedOption;
    }

    // 设置datepanel指令接口
    this.setDatePanelOptions();

    // 设置time指令接口
    this.setTimeOptions();

    // 设置OK按钮状态
    this.setOkBtnState();
    this.beginTimeDisabled = this.model === null || this.model['begin'] === null ? true : false;
    this.endTimeDisabled = this.model === null || this.model['end'] === null ? true : false;
    this.timeEditDisabled = this.beginTimeDisabled && this.endTimeDisabled;
  }

  // 设置datepanel指令接口
  private setDatePanelOptions(): void {
    let value: TiDateValue;
    if (this.model === null || (this.model['begin'] === null && this.model['end'] === null)) {
      value = {
        begin: null,
        end: null
      };
    } else {
      value = {
        begin: TiDateUtil.getUtcDate(this.model.begin, this.timeZoneable, this.selectedOption),
        end: TiDateUtil.getUtcDate(this.model.end, this.timeZoneable, this.selectedOption)
      };
    }

    this.datePanel = {
      value,
      max: this.max,
      min: this.min,
      format: this.format,
      picker: 'day',
      select: (): void => {
        const nowTime: string = TiLocaleFormat.formatTime(
          TiDateUtil.getUtcDate(new Date(), this.timeZoneable, this.selectedOption),
          this.format.time
        );
        const isSameday: boolean = TiDateUtil.isDateEqual(this.datePanel.value.begin, this.datePanel.value.end);

        // 选择开始日期
        if (this.focusedPosition === 'begin') {
          if (this.beginTimeDisabled) {
            const isSmallerNowtime: boolean = nowTime > this.endTime.value;

            this.beginTime['value'] = isSameday && isSmallerNowtime ? this.endTime.value : nowTime;
            this.beginTimeDisabled = false;
          }

          const beginDateStr: string = TiDateUtil.getDateStr(this.datePanel['value']['begin']);
          // 中间空格误删
          const beginValue: Date = new Date(`${beginDateStr} ${TiDateUtil.addColon(this.beginTime['value'])}`);
          this.datePanel.value.begin = beginValue;
          this.dayClick.emit({
            value: TiDateUtil.getLocalDate(`${beginValue}`, this.timeZoneable, this.selectedOption),
            focusedPosition: this.focusedPosition,
            beginValue: TiDateUtil.getLocalDate(`${this.datePanel.value.begin}`, this.timeZoneable, this.selectedOption),
            endValue: TiDateUtil.getLocalDate(`${this.datePanel.value.end}`, this.timeZoneable, this.selectedOption)
          });

          if (this.datePanel.value.end === null) {
            this.datePanel.min = this.datePanel.value.begin;
            this.endTime.value = '';
            this.endTimeDisabled = true;
          }

          this.timeEditDisabled = false;
          this.dateEditComs.last.focus();
          this.focusedPosition = 'end';

          // 先选择结束日期后，焦点由开始自动聚焦到结束面板上，需要此处处理
          if (TiDateUtil.isDate(value.end)) {
            this.datePanel.min = value.begin;
            this.datePanel.max = this.max;
          }
        } else {
          if (this.endTimeDisabled) {
            const isBiggerNowtime: boolean = nowTime < this.beginTime.value;

            this.endTime['value'] = isSameday && isBiggerNowtime ? this.beginTime.value : nowTime;
            this.endTimeDisabled = false;
          }
          if (this.focusedPosition === 'end' && this.datePanel.value.begin === null) {
            this.focusedPosition = 'begin';
            this.dateEditComs.first.focus();
          }
          const endDateStr: string = TiDateUtil.getDateStr(this.datePanel['value']['end']);
          // 中间空格误删
          const endValue: Date = new Date(`${endDateStr} ${TiDateUtil.addColon(this.endTime['value'], true)}`);
          this.datePanel.value.end = endValue;
          this.dayClick.emit({
            value: TiDateUtil.getLocalDate(`${endValue}`, this.timeZoneable, this.selectedOption),
            focusedPosition: this.focusedPosition,
            beginValue: TiDateUtil.getLocalDate(`${this.datePanel.value.begin}`, this.timeZoneable, this.selectedOption),
            endValue: TiDateUtil.getLocalDate(`${this.datePanel.value.end}`, this.timeZoneable, this.selectedOption)
          });

          if (this.datePanel.value.begin === null) {
            this.datePanel.max = this.datePanel.value.end;
          }

          // 焦点结束面板上，有值情况下不会触发失焦事件，因此需要单独处理
          if (TiDateUtil.isDate(value.begin)) {
            const isSmallerBeginTime: boolean = this.endTime.value < this.beginTime.value;
            this.endTime.value = isSameday && isSmallerBeginTime ? this.beginTime.value : this.endTime.value;
          }
        }
        this.validTime();
        this.setOkBtnState();
      },
      selectTimeFn: (obj: any): void => {
        this.setTimeFn(obj, this.beginTime, this.endTime);
        this.setOkBtnState();
        // 选择结束时分秒 焦点移动到结束时间框
        if (obj.timeOption.includes('end')) {
          this.textComs.last.nativeElement.focus();
        } else {
          // 选择开始时分秒 焦点移动到开始时间框
          this.textComs.first.nativeElement.focus();
        }
      }
    };
  }

  private validTime(): void {
    const beginDateStr: string = this.datePanel.value.begin ? TiDateUtil.getDateStr(this.datePanel.value.begin) : '';
    const beginDateTime: Date = new Date(` ${beginDateStr} ${TiDateUtil.addColon(this.beginTime.value)}`);
    const endDateStr: string = this.datePanel.value.end ? TiDateUtil.getDateStr(this.datePanel.value.end) : '';
    const endDateTime: Date = new Date(` ${endDateStr} ${TiDateUtil.addColon(this.endTime.value)}`);
    if (TiDateUtil.isSmaller(beginDateTime, this.min)) {
      this.beginTime.value = TiLocaleFormat.formatTime(this.min, this.format.time);
    }
    if (TiDateUtil.isSmaller(endDateTime, this.min)) {
      this.endTime.value = TiLocaleFormat.formatTime(this.min, this.format.time);
    }
    if (TiDateUtil.isBigger(beginDateTime, this.max)) {
      this.beginTime.value = TiLocaleFormat.formatTime(this.max, this.format.time);
    }
    if (TiDateUtil.isBigger(endDateTime, this.max)) {
      this.endTime.value = TiLocaleFormat.formatTime(this.max, this.format.time);
    }
    this.oldBegintimeValue = this.beginTime['value'];
    this.oldEndtimeValue = this.endTime['value'];
  }

  /**
   * @ignore
   *  时间框失焦事件
   */
  public timeBlur(pos: string, val: string): void {
    let timeVal: string = val;
    this.beginTime = JSON.parse(JSON.stringify(this.beginTime));
    this.endTime = JSON.parse(JSON.stringify(this.endTime));
    // 输入区间是否存在小数点，非整数
    let isNotInteger: boolean = false;
    const timeArr: Array<string> = val.split(TiDateUtil.COLON_REGEXP);
    timeArr.forEach((item: string, index: number): void => {
      if (item.length === 1) {
        timeArr[index] = '0' + item;
      }
      if (item && parseInt(item, 10) !== Number(item)) {
        isNotInteger = true;
      }
    });
    timeVal = timeArr.join(':');
    const dateStr: string = '2020/10/30';
    if (pos === 'begin' && TiDateUtil.isDate(this.datePanel.value.begin)) {
      const beginDateVal: Date = new Date(`${TiDateUtil.getDateStr(this.datePanel.value.begin)} ${TiDateUtil.addColon(timeVal)}`);
      const isSmallerThanMin: boolean = TiDateUtil.isSmaller(beginDateVal, this.min);
      const beginDate: Date = new Date(`${dateStr} ${TiDateUtil.addColon(timeVal)}`);
      const dateVal: Date = this.setDateTime(timeArr);

      if (
        String(beginDate) === 'Invalid Date' ||
        String(dateVal) === 'Invalid Date' ||
        timeArr.length > 3 ||
        isNotInteger ||
        (!this.isBeginSmallerThanEnd('begin', timeVal) && TiDateUtil.isDate(this.datePanel.value.end)) ||
        isSmallerThanMin
      ) {
        this.beginTime.value = this.oldBegintimeValue;
      } else {
        this.beginTime.value = TiLocaleFormat.formatTime(dateVal, this.format.time);
        this.oldBegintimeValue = this.beginTime.value;
      }

      this.setDateDisabled('beginTime');
    } else if (pos === 'end' && TiDateUtil.isDate(this.datePanel.value.end)) {
      const endDateVal: Date = new Date(`${TiDateUtil.getDateStr(this.datePanel.value.end)} ${TiDateUtil.addColon(timeVal)}`);
      const isBiggerThanMax: boolean = TiDateUtil.isBigger(endDateVal, this.max);
      const endDate: Date = new Date(`${dateStr} ${TiDateUtil.addColon(this.endTime['value'])}`);
      const dateVal: Date = this.setDateTime(timeArr);

      if (
        String(endDate) === 'Invalid Date' ||
        String(dateVal) === 'Invalid Date' ||
        timeArr.length > 3 ||
        isNotInteger ||
        (!this.isBeginSmallerThanEnd('end', timeVal) && TiDateUtil.isDate(this.datePanel.value.begin)) ||
        isBiggerThanMax
      ) {
        this.endTime.value = this.oldEndtimeValue;
      } else {
        this.endTime.value = TiLocaleFormat.formatTime(dateVal, this.format.time);
        this.oldEndtimeValue = this.endTime.value;
      }

      this.setDateDisabled('endTime');
    }
    this.setOkBtnState();
  }
  /**
   * @ignore
   * 时间框enter事件
   */
  public timeKeydown(pos: string, val: string, event: KeyboardEvent): void {
    if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
      this.timeBlur(pos, val);
    }
  }
  /**
   * @ignore
   * 日期框值变化且是合法值时触发
   */
  onInputChange(time: string, pos: string): void {
    this.isInputValue = true;
    if (pos === 'begin') {
      this.beginDateTime = time;
    } else {
      this.endDateTime = time;
    }
  }

  /**
   * @ignore
   */
  public dateEditBlur(val: any, pos: string, timeVal?: string): void {
    const value: any = this.datePanel.value;
    if (val === null) {
      setTimeout(() => {
        // 添加setTimeout原因：确保点击时间输入框时拿到的focusedPosition为beginTime或者endTime
        // 点击非禁用的确认按钮，需保证焦点在面板内部，否则点击document空白处无法关闭面板
        if (
          ((!TiDateUtil.isDate(value.begin) && this.focusedPosition !== 'end') ||
            (!TiDateUtil.isDate(value.end) && this.focusedPosition !== 'begin')) &&
          !this.inValidValue
        ) {
          this.dropCom.nativeElement.focus();
        }
        this.setOkBtnState();
      }, 0);

      return;
    }

    // 时间日期组件，若当前输入日期与最小值相等时，需要与时间一起进行合法值校验
    let dateValue: any = val;

    if (TiDateUtil.isDateEqual(dateValue, this.min)) {
      dateValue = timeVal ? new Date(`${TiDateUtil.getDateStr(dateValue)} ${timeVal}:999`) : this.min;
    }

    if (TiDateUtil.isBetweenMaxAndmin(dateValue, this.min, this.max)) {
      if (pos === 'begin') {
        if (this.beginTimeDisabled) {
          this.beginTime['value'] = TiLocaleFormat.formatTime(
            TiDateUtil.getUtcDate(new Date(), this.timeZoneable, this.selectedOption),
            this.format.time
          );
          this.beginTimeDisabled = false;
        }

        const inputValue: string = this.dateEditComs.first.nativeElement.firstChild.value;
        if (inputValue === '') {
          return;
        }

        if (this.beginDateTime) {
          this.timeBlur('begin', this.beginDateTime);
          this.beginDateTime = '';
        }

        this.setDateDisabled('begin');
      } else {
        if (this.endTimeDisabled) {
          this.endTime['value'] = TiLocaleFormat.formatTime(
            TiDateUtil.getUtcDate(new Date(), this.timeZoneable, this.selectedOption),
            this.format.time
          );
          this.endTimeDisabled = false;
        }
        const inputValue: string = this.dateEditComs.last.nativeElement.firstChild.value;
        if (inputValue === '') {
          return;
        }

        if (this.endDateTime) {
          this.timeBlur('end', this.endDateTime);
          this.endDateTime = '';
        }

        this.setDateDisabled('end');
      }
      this.validTime();
      this.setOkBtnState();
      this.timeEditDisabled = this.beginTimeDisabled && this.endTimeDisabled;
    }
  }

  /**
   * 设置日期禁用状态
   * 选择开始日期，开始日期前禁用；选择结束日期，结束日期后禁用
   */
  private setDateDisabled(pos: string): void {
    const value: any = this.datePanel.value;
    const isSameday: boolean = TiDateUtil.isDateEqual(value.begin, value.end);

    // 添加setTimeout原因：确保时间框或日期框失焦，this.focusedPosition获取到的是处于聚焦状态时的位置
    if (pos === 'begin' || pos === 'endTime') {
      setTimeout(() => {
        if (this.focusedPosition === 'end' || this.focusedPosition === 'beginTime') {
          if (value.begin === null) {
            return;
          }

          this.datePanel.min = value.begin;

          if (TiDateUtil.isDate(value.end)) {
            this.datePanel.max = this.max;
            const isSmallerBeginTime: boolean = this.endTime.value < this.beginTime.value;
            this.endTime.value = isSameday && isSmallerBeginTime ? this.beginTime.value : this.endTime.value;
            // 时间有变化时，需要更新确认按钮状态
            this.setOkBtnState();
          }
        }

        // 绑定在模板上的值变了，需要手动触发变更检测
        this.changeDetectorRef.markForCheck();
      }, 0);
    } else {
      setTimeout(() => {
        if (this.focusedPosition === 'begin' || this.focusedPosition === 'endTime') {
          if (value.end === null) {
            return;
          }

          this.datePanel.max = value.end;

          if (TiDateUtil.isDate(value.begin)) {
            this.datePanel.min = this.min;
            const isBiggerEndTime: boolean = this.beginTime.value > this.endTime.value;
            this.beginTime.value = isSameday && isBiggerEndTime ? this.endTime.value : this.beginTime.value;
            // 时间有变化时，需要更新确认按钮状态
            this.setOkBtnState();
          }
        }

        // 绑定在模板上的值变了，需要手动触发变更检测
        this.changeDetectorRef.markForCheck();
      }, 0);
    }
  }
  /**
   * @ignore
   */
  public onKeydownFn(event: KeyboardEvent, val: any, pos: string, timeVal: string): void {
    if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
      this.dateEditBlur(val, pos, timeVal);
    }
  }

  // 设置time指令接口
  private setTimeOptions(): void {
    // 设置开始time指令接口
    this.setBeginTimeOptions();

    // 设置结束time指令接口
    this.setEndTimeOptions();
  }

  // 设置开始面板time指令接口
  private setBeginTimeOptions(): void {
    // value接口设置
    this.setBeginTimeValue();

    // max接口设置
    this.setBeginTimeMaxValue();

    // min接口设置
    this.setBeginTimeMinValue();
  }

  // time指令的起始面板的value接口设置 点击删除按钮：如果设置nowDateTime并且值为合法时间日期，时间设置为nowDateTime的时间
  private setBeginTimeValue(): void {
    if (this.model === null || (this.model['begin'] === null && this.model['end'] === null)) {
      this.beginTime['value'] = '';

      return;
    }
    this.beginTime['value'] = TiLocaleFormat.formatTime(
      TiDateUtil.getUtcDate(this.model.begin, this.timeZoneable, this.selectedOption),
      this.format.time
    );
  }

  /**
   * @ignore
   * time指令的起始面板的max接口设置
   */
  public setBeginTimeMaxValue(): void {
    // 起始日期是最大日期时，时间组件最大值是max接口中的时间；其他情况最大值是""23:59:59"|"23:59"|"23"
    const value: TiDateValue = this.datePanel['value'];
    const maxFormatTime: string = TiLocaleFormat.formatTime('2020/10/30 23:59:59', this.format.time);
    this.beginTime['max'] =
      value instanceof Object && TiDateUtil.isDateEqual(this.max, value['begin'])
        ? TiLocaleFormat.formatTime(this.max, this.format.time)
        : maxFormatTime;
  }

  /**
   * @ignore
   * time指令的起始面板的min接口设置
   */
  public setBeginTimeMinValue(): void {
    // 起始日期是最小日期时，时间组件最小值是min接口中的时间；其他情况最大值是"00:00:00"|"00:00"|"00"
    const value: TiDateValue = this.datePanel['value'];
    const minFormatTime: string = TiLocaleFormat.formatTime('2020/10/30 00:00:00', this.format.time);
    this.beginTime['min'] =
      value instanceof Object && TiDateUtil.isDateEqual(this.min, value['begin'])
        ? TiLocaleFormat.formatTime(this.min, this.format.time)
        : minFormatTime;
  }

  // 设置结束面板time指令接口
  private setEndTimeOptions(): void {
    // value接口设置
    this.setEndTimeValue();

    // max接口设置
    this.setEndTimeMaxValue();

    // min接口设置
    this.setEndTimeMinValue();
  }

  // time指令的结束面板的value接口设置
  private setEndTimeValue(): void {
    if (this.model === null || (this.model['begin'] === null && this.model['end'] === null)) {
      this.endTime['value'] = '';

      return;
    }
    this.endTime['value'] = TiLocaleFormat.formatTime(
      TiDateUtil.getUtcDate(this.model.end, this.timeZoneable, this.selectedOption),
      this.format.time
    );
  }

  /**
   * @ignore
   * time指令的结束面板的max接口设置
   */
  public setEndTimeMaxValue(): void {
    // 结束日期是最大日期时，时间组件最大值是max接口中的时间; 否则，时间组件最大值是"23:59:59"|"23:59"|"23"
    const value: TiDateValue = this.datePanel['value'];
    const maxFormatTime: string = TiLocaleFormat.formatTime('2020/10/30 23:59:59', this.format.time);
    this.endTime['max'] =
      value instanceof Object && TiDateUtil.isDateEqual(this.max, value['end'])
        ? TiLocaleFormat.formatTime(this.max, this.format.time)
        : maxFormatTime;
  }

  /**
   * @ignore
   * time指令的结束面板的min接口设置
   */
  public setEndTimeMinValue(): void {
    // 起始日期是最小日期时，时间组件最小值是min接口中的时间；其他情况最大值是"00:00:00"|"00:00"|"00"
    const value: TiDateValue = this.datePanel['value'];
    const minFormatTime: string = TiLocaleFormat.formatTime('2020/10/30 00:00:00', this.format.time);
    this.endTime['min'] =
      value instanceof Object && TiDateUtil.isDateEqual(this.min, value['end'])
        ? TiLocaleFormat.formatTime(this.min, this.format.time)
        : minFormatTime;
  }

  /**
   * @ignore
   * 设置确认按钮的状态
   */
  public setOkBtnState(): void {
    // 输入中文冒号之后，及时转换为英文冒号
    const inputvalue: string = this.beginTime.value;
    const inputvalue1: string = this.endTime.value;
    this.beginTime.value = inputvalue.replace('：', ':');
    this.endTime.value = inputvalue1.replace('：', ':');
    // 判断下拉面板中时间区间是否合法
    this.inValidValue = !this.isValidRange();
    if (this.buttonComs) {
      this.setAttr(this.buttonComs.last.nativeElement, 'disabled', this.inValidValue);
      this.setInputStyle(this.inValidValue);
    }
  }

  /**
   * @ignore
   * 左侧自定义时间文本点击事件
   */
  public customizeTimeClickFn(val: TiDateValue): void {
    this.model = {
      begin: TiDateUtil.getLocalDate(`${val.begin}`, this.timeZoneable, this.selectedOption),
      end: TiDateUtil.getLocalDate(`${val.end}`, this.timeZoneable, this.selectedOption)
    };

    if (this.selectedOption) {
      this.model.timeZone = this.selectedOption;
      this.lastTimeZone = this.selectedOption;
    }
    this.dropCom.hide();
    this.customizeOptionClick.emit(this.model);
  }

  // 判断下拉面板中时间区间是否合法
  private isValidRange(): boolean {
    const date: TiDateValue = this.datePanel.value;

    return date instanceof Object && TiDateUtil.isDate(date.begin) && TiDateUtil.isDate(date.end) && this.isBeginSmallerThanEnd();
  }

  // 判断起始值和结束值都在最小值最大值之间
  private isBeginSmallerThanEnd(pos?: string, value?: string): boolean {
    if (!TiDateUtil.isDate(this.datePanel.value.begin) || !TiDateUtil.isDate(this.datePanel.value.end)) {
      return false;
    }

    const beginTime: string = pos === 'begin' && value ? value : this.beginTime['value'];
    const endTime: string = pos === 'end' && value ? value : this.endTime['value'];
    // 组装起始日期时间 空格误删
    const begin: Date = new Date(`${TiDateUtil.getDateStr(this.datePanel.value.begin)} ${TiDateUtil.addColon(beginTime)}`);
    const end: Date = new Date(`${TiDateUtil.getDateStr(this.datePanel.value.end)} ${TiDateUtil.addColon(endTime, true)}`);

    return this.isAllowBeginEqualEnd ? begin.getTime() <= end.getTime() : begin.getTime() < end.getTime();
  }
}
