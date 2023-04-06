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
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TiBrowser, TiDateUtil, TiKeymap, Util } from '@opentiny/ng-utils';
import { TiLocale, TiLocaleFormat } from '@opentiny/ng-locale';
import { TiFormComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

/**
 * @ignore
 */
@Component({
  selector: 'ti-date-edit',
  templateUrl: './dateedit.html',
  styleUrls: ['../../../text/lib/src/text.less'], // 引用text的less文件
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiDateEditComponent)]
})
export class TiDateEditComponent extends TiFormComponent {
  @Input() format: string; // 设置日期显示格式
  @Input() min: Date; // 设置最小日期值
  @Input() max: Date; // 设置最大日期值
  @Input() disabled: boolean; // 支持禁用
  @Input() isEndValue: boolean = false; // 在时间段组件中是否代表结束时间

  @Input() disabledDays: Array<any>;
  @Input() time: string; // 时间值
  /**
   * 当失焦或按回车键时触发的回调
   *
   * 参数：时间值
   *
   */
  @Output() readonly inputChange: EventEmitter<string> = new EventEmitter();
  @ViewChild('input', { static: true }) inputRef: ElementRef;
  /**
   * @ignore
   */
  @HostBinding('style.display') display: string = 'inline-block';

  protected oldMinvalue: Date;
  protected oldMaxvalue: Date;
  private oldModel: Date;
  private oldInputvalue: string;
  private inputFormat: string;
  public inputValue: string = '';
  public placehoderText: string;
  public MAX: Date = TiDateUtil.maxDate();
  public MIN: Date = TiDateUtil.minDate();
  protected versionInfo: string = super.getVersion(packageInfo);

  writeValue(value: Date): void {
    super.writeValue(value);
    // model为null时，输入框不显示内容
    if (value === null) {
      return;
    }

    // 传入的model值是非日期时，设置为当前日期
    if (!TiDateUtil.isDate(value)) {
      this.model = new Date();
    } else if (TiDateUtil.isBigger(value, this.max)) {
      // 如果大于最大值，设置为最大值
      this.model = this.max;
    } else if (TiDateUtil.isSmaller(value, this.min)) {
      // 小于最小值，设置为最小值
      this.model = this.min;
    }
  }

  ngOnModelChange(): void {
    this.formatValue();
  }

  ngOnInit(): void {
    super.ngOnInit();
    // 设置聚焦元素为input
    this.setFocusableElems([this.inputRef.nativeElement]);
    // format接口校验:对时间日期进行国际化处理
    this.validateFormat();

    // 最大最小值校验
    this.validateMinAndMax();

    if (!Util.isUndefined(this.format)) {
      this.setPlacehoderText();
    }

    this.oldMinvalue = this.min;
    this.oldMaxvalue = this.max;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // format支持动态变更
    if (changes['format'] && !changes['format'].firstChange) {
      // 新的format是非法时，format值保持之前值不变
      if (!Util.isString(changes['format'].currentValue) && !Util.isString(changes['format'].currentValue.date)) {
        this.format = changes['format'].previousValue;

        return;
      }
      if (!Util.isString(changes['format'].currentValue)) {
        this.format = changes['format'].currentValue.date;
      }
      this.setPlacehoderText();
      this.formatValue();
    }
  }
  /**
   * 不同场景下设置日期输入框placehoder文本
   */
  private setPlacehoderText(): void {
    // 以下是为了处理英文状态下，dateEdit输入时有问题，将其placeholder调整为国际化以后的值
    const englishFormatArr: any = this.format.match(/M/g);
    const formatPureArr: any = this.format.split(/[-\/\.\_,\s]/).filter(this.filterEmptyFn);
    // 确定其为英文显示月份
    if (Util.isArray(englishFormatArr) && englishFormatArr.length === 3) {
      this.inputFormat = formatPureArr.length === 3 ? 'MM/dd/yyyy' : 'MM/yyyy';
    } else if (this.format === 'mediumDate') {
      // 显示格式为"mediumDate"
      this.inputFormat = TiLocale.getLocale() === TiLocale.ZH_CN ? 'yyyy年M月dd日' : 'MM/d/yyyy';
    } else {
      this.inputFormat = this.format;
    }

    // 日期框提示文本按照大写显示
    this.placehoderText = this.inputFormat.toUpperCase();
  }

  onFocus(): void {
    // 在输入框聚焦时获取当前合法的model值：
    this.oldModel = this.model;
  }

  onBlur(): void {
    if (this.oldInputvalue !== this.inputValue) {
      this.handleInputValue();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
      this.handleInputValue();
    }
  }
  /**
   * @ignore
   */
  handleInputValue(): void {
    // blur时拿到输入框的值
    this.inputValue = this.inputRef.nativeElement.value;
    // 校验输入框中值：得到合法的model值
    if (this.inputValue !== '') {
      if (this.format === 'YYYY/QQ') {
        this.getValidQuarterModel();
      } else {
        this.getValidModel();
      }
    } else {
      this.model = null; // 当用户输入为空或者为null的情况,model赋值为null
    }

    // 根据model值格式化
    this.formatValue();
    this.oldInputvalue = this.inputValue;
  }

  isValidValue(value: Date): boolean {
    // value值为null时会将输入框清空，是一个合法的value值
    if (value === null) {
      return true;
    }

    // value值为一个Date类型值并且在最大最小值范围内时，是一个合法值
    if (TiDateUtil.isDate(value) && !TiDateUtil.isBigger(value, this.max) && !TiDateUtil.isSmaller(value, this.min)) {
      return true;
    }

    return false;
  }
  /**
   * @ignore
   */
  public filterEmptyFn(value: any): any {
    return value !== '';
  }

  // 日期格式校验
  private validateFormat(): void {
    if (Util.isString(this.format) && this.format !== '') {
      return;
    }
    // TODO:如果配置时间日期国际化
    this.format = TiLocale.getLocaleWords().tiDateedit['date'];
  }

  // 最大值最小值校验
  private validateMinAndMax(): void {
    // 最大值合法性校验:(时分秒：23:59:59)
    const maxTimeChanged: Date = TiDateUtil.changeMaxTime(this.max);
    this.max = TiDateUtil.isDate(this.max) ? maxTimeChanged : this.MAX;

    // 最小值合法性校验:(时分秒：0:0:0)
    const minTimeChanged: Date = TiDateUtil.changeMinTime(this.min);
    this.min = TiDateUtil.isDate(this.min) ? minTimeChanged : this.MIN;

    // 最大最小值矛盾时，设置为默认值
    if (this.max.getTime() < this.min.getTime()) {
      this.max = this.MAX;
      this.min = this.MIN;
    }
  }

  // 根据model值和format接口，格式化显示时间日期
  public formatValue(): void {
    if (this.format === 'YYYY/QQ') {
      this.inputValue = TiDateUtil.transformDateToQuarter(this.model);
    } else {
      this.inputValue = this.model !== null ? TiLocaleFormat.formatDate(this.model, this.inputFormat) : '';
    }
    this.oldInputvalue = this.inputValue;
  }

  // 校验输入框中的值
  private getValidModel(): void {
    // 日期时间支持分隔符：空格
    const datetimeArr: Array<string> = this.inputValue.trim().split(' ');
    const time: string = datetimeArr[1] ? TiDateUtil.addColon(datetimeArr[1]).trim() : '';

    let dateValue: any = this.getDateValue(datetimeArr, time);

    // 1.输入值为不合法日期：2018-3-34;
    // 2.输入值不在最小值最大值范围内;
    // 3.当前输入框中的值，和上次输入框中的值相同时;
    const invalidDate: boolean = String(dateValue) === 'Invalid Date' || !this.isValidValue(dateValue) || this.isDisabledDays(dateValue);
    this.model = invalidDate ? this.oldModel : new Date(TiDateUtil.getDateStr(dateValue));

    if (!invalidDate) {
      this.inputChange.emit(time);
    }
  }

  private getValidQuarterModel(): void {
    const value: Date = TiDateUtil.getValidQuarterDate(this.inputValue, this.isEndValue);
    this.model = this.isValidValue(value) ? value : this.oldModel;
    this.oldModel = this.model;
  }
  /**
   * @ignore
   * 是否为禁用日期
   */
  public isDisabledDays(value: Date): boolean {
    return TiDateUtil.isDisabledDays(this.disabledDays, value);
  }

  /**
   * 获取当前输入框的值
   * @param datetimeArr 输入框中的日期时间
   * @param time 用户输入的时间
   * @returns 处理后的日期时间
   */
  private getDateValue(datetimeArr: Array<string>, time: string): any {
    const datetime: string = time ? `${datetimeArr[0]} ${time}` : datetimeArr[0];

    // 支持分隔符:中划线，下划线，点，斜杠
    const reg: RegExp = /[年月日\-/._]/;
    const dateArr: Array<string> = datetime.split(reg);

    // 以年月日结尾的格式最后一项为空字符串，在后续合法性校验 dateArr.length > 3 时造成逻辑错误，故需要删除最后一项
    if (/[年月日]/.test(datetime) && !dateArr[dateArr.length - 1].length) {
      dateArr.pop();
    }

    const formatArr: Array<string> = this.inputFormat.split(reg);
    const arr: Array<number> = []; // 保存format格式下年月日的顺序下标；年月日，日月年，月日年，年月。。。
    for (let i: number = 0; i < formatArr.length; i++) {
      if (formatArr[i].indexOf('y') !== -1) {
        arr[0] = i;
      } else if (formatArr[i].indexOf('M') !== -1) {
        arr[1] = i;
      } else if (formatArr[i].indexOf('d') !== -1) {
        arr[2] = i;
      }
    }
    // 处理年月情况
    if (arr.length === 2) {
      dateArr[arr[2]] = '1';
    }
    // 处理只有年份情况
    if (arr.length === 1) {
      dateArr[arr[1]] = '1';
      dateArr[arr[2]] = '1';
    }

    // 浏览器兼容性处理：对于非法日期表现不一致：eg:new Date('2018/13/12'),谷歌和火狐处理为非法日期对象，而IE浏览器会处理为2019/1/12；
    // 获取当前月总天数
    const totalDays: number = new Date(parseInt(dateArr[arr[0]], 10), parseInt(dateArr[arr[1]], 10), 0).getDate();
    let dateValue: any;

    // 将时间日期转换成字符串，原因：2018-3-34 不合法日期，用new Date(2018, 2, 34)生成日期对象，会处理成 ==>2018/4/3
    // 将其转换成字符串形式：new Date('2018/2/34')生成日期对象，处理成 ==>Invalid Date对象
    dateValue =
      (TiBrowser.isIE() && (parseInt(dateArr[arr[1]], 10) > 12 || parseInt(dateArr[arr[2]], 10) > totalDays)) ||
      String(new Date(parseInt(dateArr[arr[0]], 10), parseInt(dateArr[arr[1]], 10), parseInt(dateArr[arr[2]], 10))) === 'Invalid Date' ||
      dateArr.length > 3
        ? 'Invalid Date'
        : new Date(`${dateArr[arr[0]]}/${dateArr[arr[1]]}/${dateArr[arr[2]]}`);

    // 时间日期组件，若当前输入日期与最小值相等时，需要与时间一起进行合法值校验
    if (!time && TiDateUtil.isDateEqual(dateValue, this.min)) {
      dateValue = this.time ? new Date(`${TiDateUtil.getDateStr(dateValue)} ${this.time}:999`) : this.min;
    }

    return dateValue;
  }
}
