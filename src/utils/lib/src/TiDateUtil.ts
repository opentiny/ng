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
/**
 * @ignore
 */
export class TiDateUtil {
  /*
   * 区分中英文冒号
   */
  public static COLON_REGEXP: RegExp = /[:\uff1a]/;
  /*
   * 默认时间格式
   */
  public static DEFAULT_TIME_FORMAT: string = 'HH:mm:ss';
  /**
   * 日期类组件的默认最小值
   */
  public static minDate(): Date {
    return new Date(1970, 0, 1, 0, 0, 0);
  }
  /**
   * 日期类组件的默认最大值
   */
  public static maxDate(): Date {
    return new Date(2099, 11, 31, 23, 59, 59);
  }
  /**
   * 判断是不是合法的时间对象
   */
  public static isDate(date: object | string): boolean {
    if (Object.prototype.toString.call(date) === '[object Date]' && String(date) !== 'Invalid Date') {
      return true;
    }

    return false;
  }

  /**
   * @description 根据当前格式，格式化最大值
   * @param maxValue 最大值
   * @param picker 面板格式
   * @param isDateTime 是否是日期时间组件
   */
  public static changeMaxTime(maxValue: Date, picker?: string, isDateTime?: boolean): Date {
    let value: Date = maxValue;

    if (!TiDateUtil.isDate(value)) {
      value = TiDateUtil.maxDate();
    }

    if (isDateTime) {
      return TiDateUtil.transformDatetimeToExactDatetime(value, picker, true);
    }

    if (picker === 'quarter') {
      const transfromDateToString: string = TiDateUtil.transformDateToQuarter(value);

      return TiDateUtil.getValidQuarterDate(transfromDateToString, true);
    }

    return TiDateUtil.transformDateToExactDate(value, picker, true);
  }

  /**
   * @description 根据当前格式，格式化最小值
   * @param minValue 最小值
   * @param picker 面板格式
   * @param isDateTime 是否是日期时间组件
   */
  public static changeMinTime(minValue: Date, picker?: string, isDateTime?: boolean): Date {
    let value: Date = minValue;

    if (!TiDateUtil.isDate(value)) {
      value = TiDateUtil.minDate();
    }

    if (isDateTime) {
      return TiDateUtil.transformDatetimeToExactDatetime(value, picker);
    }

    if (picker === 'quarter') {
      const transfromDateToString: string = TiDateUtil.transformDateToQuarter(value);

      return TiDateUtil.getValidQuarterDate(transfromDateToString);
    }

    return TiDateUtil.transformDateToExactDate(value, picker);
  }

  /**
   * @description 判断两个日期是不是相等：只包括年月日
   * @param newValue 新值
   * @param oldValue 旧值
   */
  public static isDateEqual(newValue: Date, oldValue: Date): boolean {
    if (newValue === oldValue) {
      return true;
    }

    // 当两个value都是Date类型时，要判断两个值的年月日是否相等，直接用‘===’判断不准确
    if (TiDateUtil.isDate(newValue) && TiDateUtil.isDate(oldValue)) {
      // 转换成年月日，然后重新生成一个Date，再将其转换成毫秒数进行判断
      const newDate: Date = new Date(newValue.getFullYear(), newValue.getMonth(), newValue.getDate());
      const oldDate: Date = new Date(oldValue.getFullYear(), oldValue.getMonth(), oldValue.getDate());
      if (newDate.getTime() === oldDate.getTime()) {
        return true;
      }
    }

    return false;
  }

  /**
   * @description 判断两个时间日期是不是相等；
   * @param newValue 新值
   * @param oldValue 旧值
   */
  public static isDatetimeEqual(newValue: Date, oldValue: Date): boolean {
    if (newValue === oldValue) {
      return true;
    }

    if (TiDateUtil.isDate(newValue) && TiDateUtil.isDate(oldValue)) {
      if (newValue.getTime() === oldValue.getTime()) {
        return true;
      }
    }

    return false;
  }

  /**
   * @description 判断是不是合法的NowDateTime值
   * 存在nowDateTime值，并且是时间对象，且大于最小值小于最大值
   */
  public static isValidNowDateTime(nowDateTime: Date, min: Date, max: Date): boolean {
    return (
      nowDateTime && TiDateUtil.isDate(nowDateTime) && nowDateTime.getTime() >= min.getTime() && nowDateTime.getTime() <= max.getTime()
    );
  }

  /**
   * @description 判断value1是否大于value2
   */
  public static isBigger(value1: Date, value2: Date): boolean {
    return value1.getTime() > value2.getTime();
  }

  /**
   * @description 判断value1是否大于value2
   */
  public static isBiggerOrEqual(value1: Date, value2: Date): boolean {
    return value1.getTime() >= value2.getTime();
  }

  /**
   * @description 判断value1是否小于value2
   */
  public static isSmaller(value1: Date, value2: Date): boolean {
    return value1.getTime() < value2.getTime();
  }

  /**
   * @description 将Date类型的日期转换成年月日字符串
   * @param date 要进行转换的日期值
   */
  public static getDateStr(date: Date): string {
    return date === null ? '' : `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  /**
   * @description 将Date类型的日期转换成时分秒字符串
   * @param date 要进行转换的日期值
   */
  public static getTimeStr(date: Date): string {
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `${hour}:${minute}:${second}`;
  }

  /**
   * @description 判断是不是一个合法的最大值
   * @param min 最小值
   * @param max 最大值
   */
  public static isValidMaxValue(min: Date, max: Date): boolean {
    return TiDateUtil.isDate(max) && max.getTime() >= min.getTime();
  }

  /**
   * @description 判断是不是一个合法的最小值
   * @param min 最小值
   * @param max 最大值
   */
  public static isValidMinValue(min: Date, max: Date): boolean {
    return TiDateUtil.isDate(min) && max.getTime() >= min.getTime();
  }

  /**
   * @description 是否在最大值最小值区间
   * @param min 最小值
   * @param max 最大值
   */
  public static isBetweenMaxAndmin(value: Date, min: Date, max: Date): boolean {
    return value.getTime() >= min.getTime() && value.getTime() <= max.getTime();
  }

  /**
   * @description  12小时制添加AMPM
   */
  public static addAmPm(timeFormat: string): string {
    if (timeFormat.match(/h/) && !timeFormat.match(/a/)) {
      // 已设置ampm格式情况下，不做处理
      return timeFormat + ' a'; // Angular 的datePipe 设置时间时，"a"代表AMPM
    }

    return timeFormat;
  }

  /**
   * @description: 若时间字符串没有一个冒号时处理成合法的事件字符串，根据时间字符串冒号的个数和是否是结束时间添加为完整的时间（包含时分秒）
   *               例如 value: 12, isEndTime: true, 则返回12:59:59
   * @param value 时间字符串
   * @param isEndTime 是否是结束时间
   */
  public static addColon(value: string, isEndTime?: boolean): string {
    const colonNumber: number = value.split(':').length - 1;
    if (colonNumber) {
      if (isEndTime && colonNumber === 1) {
        return `${value}:59`;
      }

      return value;
    }

    const ampm: any = value.match(/am|AM|pm|PM/) || '';

    if (isEndTime) {
      return `${parseInt(value, 10)}:59:59 ${ampm}`;
    }

    return `${parseInt(value, 10)}: ${ampm}`;
  }

  /**
   * @ignore
   * date类型转换为季度
   */
  public static transformDateToQuarter(val: Date): string {
    switch (val?.getMonth()) {
      case 0:
      case 1:
      case 2:
        return `${val.getFullYear()}/Q1`;
      case 3:
      case 4:
      case 5:
        return `${val.getFullYear()}/Q2`;
      case 6:
      case 7:
      case 8:
        return `${val.getFullYear()}/Q3`;
      case 9:
      case 10:
      case 11:
        return `${val.getFullYear()}/Q4`;
      default:
        return undefined;
    }
  }
  /**
   * 季度值转换为date类型
   */
  public static transFormQuarterToDate(year: number, val: string, isEnd?: boolean): any {
    if (isEnd) {
      switch (val) {
        case 'Q1':
          return new Date(year, 2, 31, 23, 59, 59, 999);
        case 'Q2':
          return new Date(year, 5, 30, 23, 59, 59, 999);
        case 'Q3':
          return new Date(year, 8, 30, 23, 59, 59, 999);
        case 'Q4':
          return new Date(year, 11, 31, 23, 59, 59, 999);
        default:
          return undefined;
      }
    } else {
      switch (val) {
        case 'Q1':
          return new Date(year, 0, 1, 0, 0, 0);
        case 'Q2':
          return new Date(year, 3, 1, 0, 0, 0);
        case 'Q3':
          return new Date(year, 6, 1, 0, 0, 0);
        case 'Q4':
          return new Date(year, 9, 1, 0, 0, 0);
        default:
          return undefined;
      }
    }
  }
  /**
   * @description 将当前日期转化为对应具体日期时间
   *
   * @param value 要进行转换的日期值
   * @param picker 面板格式
   * @param isEnd 是否是结束日期
   */
  public static transformDateToExactDate(value: Date, picker: string, isEnd?: boolean): Date {
    if (!this.isDate(value)) {
      return;
    }
    const year: number = value.getFullYear();
    const month: number = value.getMonth() || value.getMonth() === 0 ? value.getMonth() : 11;

    if (isEnd) {
      switch (picker) {
        case 'onlyYear':
        case 'year':
          // 纯年份格式下，结束具体日期时间为12月31号23时59分59秒
          return new Date(year, 11, 31, 23, 59, 59, 999);
        case 'onlyYearMonth':
        case 'month':
          // 年月格式下，结束具体日期时间当月最后一天的23时59分59秒
          // new Date(val.getFullYear(), month + 1, 0).getDate()获取当月的总天数，
          // 此处month需要加1，否则获取的是上月总天数。
          return new Date(year, month, new Date(value.getFullYear(), month + 1, 0).getDate(), 23, 59, 59, 999);
        default:
          // 正常情况下，结束时间值取23时59分59秒，开始时间不处理，默认为零点。
          return new Date(year, month, value.getDate(), 23, 59, 59, 999);
      }
    } else {
      switch (picker) {
        case 'onlyYear':
        case 'year':
          // 纯年份格式下，开始具体日期时间为1月1号零点
          return new Date(year, 0, 1);
        case 'onlyYearMonth':
        case 'month':
          // 年月格式下，开始具体日期时间当月第一天零点
          return new Date(year, month);
        default:
          // 正常情况下，开始时间值零点
          return new Date(year, month, value.getDate());
      }
    }
  }

  /**
   * @description 将当前日期时间转化为对应具体日期时间
   *
   * @param value 要进行转换的日期时间值
   * @param dateTimePicker 时间格式
   */
  public static transformDatetimeToExactDatetime(value: Date, dateTimePicker: string, isEnd?: boolean): Date {
    if (!TiDateUtil.isDate(value)) {
      return;
    }

    const year: number = value.getFullYear();
    const month: number = value.getMonth();
    const date: number = value.getDate();
    const hours: number = value.getHours();
    const minutes: number = value.getMinutes();
    const seconds: number = value.getSeconds();

    if (isEnd) {
      switch (dateTimePicker) {
        case 'onlyHours':
          // 纯小时格式下，结束具体日期时间到59分59秒
          return new Date(year, month, date, hours, 59, 59, 999);
        case 'onlyHoursMinutes':
          // 纯时分格式下，结束具体日期时间到59秒
          return new Date(year, month, date, hours, minutes, 59, 999);
        default:
          // 正常情况下，结束时间值具体到秒
          return new Date(year, month, date, hours, minutes, seconds, 999);
      }
    } else {
      switch (dateTimePicker) {
        case 'onlyHours':
          // 纯小时格式下，结束具体日期时间到时
          return new Date(year, month, date, hours);
        case 'onlyHoursMinutes':
          // 纯时分格式下，结束具体日期时间到分
          return new Date(year, month, date, hours, minutes);
        default:
          // 正常情况下，结束时间值具体到秒
          return new Date(year, month, date, hours, minutes, seconds);
      }
    }
  }

  /**
   * @description 获取当前合法的季度值并转化为对应的日期
   *
   * @param value 季度值
   * @param isEnd 是否是结束日期
   */
  public static getValidQuarterDate(value: string, isEnd?: boolean): Date {
    const quarters: Array<string> = ['Q1', 'Q2', 'Q3', 'Q4'];
    const reg: RegExp = /[年月日\-/._]/;
    const dateArr: Array<string> = value.split(reg);
    const index: number = quarters.findIndex((item: string) => item === dateArr[1].toUpperCase());
    if (dateArr.length < 2 || index === -1) {
      return;
    }

    return TiDateUtil.transFormQuarterToDate(Number(dateArr[0]), dateArr[1].toUpperCase(), isEnd);
  }

  /**
   * @description 判断是否为禁用日期
   *
   * @param disabledDays 禁用的日期
   * @param value 日期值
   */
  public static isDisabledDays(disabledDays: Array<any>, value: Date): boolean {
    if (!Array.isArray(disabledDays)) {
      return false;
    }

    return disabledDays.some((item: Date) => item.getTime() === value.getTime());
  }

  /**
   * @description 根据时区获取当前选中本地时间
   *
   * @param dateString 当前选择的时间
   * @param timeZoneable 时区选择开关
   * @param selectedOption 时区选择项
   */
  public static getLocalDate(dateString: string, timeZoneable: boolean, selectedOption: string): Date {
    if (dateString === 'null') {
      return null;
    }

    // 将UTC时间转化为本地时间
    return timeZoneable && selectedOption === 'UTC/GMT' ? new Date(`${dateString} UTC`) : new Date(`${dateString}`);
  }

  /**
   * @description 根据时区获取当前选中UTC时间（此处的UTC时间指的并不是实际意义上的UTC时间，而是根据UTC时间转化为对应的本地时间呈现给用户）
   *
   * @param date 当前选择的时间
   * @param timeZoneable 时区选择开关
   * @param selectedOption 时区选择项
   */
  public static getUtcDate(date: Date, timeZoneable: boolean, selectedOption: string): Date {
    if (date === null) {
      return null;
    }

    // 将UTC时间转化为new Date()形式时间格式
    // getTimezoneOffset() 返回 UTC 时间与本地时间之间的时差，以分钟为单位。
    return timeZoneable && selectedOption === 'UTC/GMT' ? new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000) : date;
  }
}
