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
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, forwardRef, Input, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TiLocaleFormat } from '@opentiny/ng-locale';
import { Util } from '@opentiny/ng-utils';
/**
 * TiNumber 数字输入框指令
 *
 * 该指令主要作用于输入框上，限制只能输入数字。用户可以通过设置 数字保留精度、是否国际化 来设置数字显示格式
 *
 * 输入框处于焦点状态时，输入框中数字标准化显示。失去焦点时，根据用户配置是否支持国际化进行格式化显示
 *
 * 目前JS可以解析的范围是[-2^53, 2^53]，即16位数字。当超过16位整数时，此时数字范围已经超过JS解析方位，不能精确表示。
 *
 */
@Directive({
  // 指令元数据 注意：该指令和数字校验指令重复，后期开发tiny4需要修改组件名
  selector: '[tiNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiInputNumberDirective),
      multi: true
    }
  ],
  host: {
    '(input)': 'handleInput($event.target.value)',
    '(focus)': 'focusFn();',
    '(blur)': 'blurFn()'
  }
})
// The default ControlValueAccessor for writing a value and listening to changes on input elements.
// The accessor is used by the FormControlDirective, FormControlName, and NgModel directives.
export class TiInputNumberDirective extends DefaultValueAccessor {
  /**
   * 是否开启国际化
   */
  @Input() localeable: boolean = true;
  /**
   * 小数保留位数。使用 n +'数字' 形式，例如：'n4'，代表保留4位小数。spinner 保持一致。
   *
   * 不设置时，小数保留位数最少 0 位，最多 3 位
   */
  @Input() format: string;
  private numberFormat: string = '1.0-3';
  private oldInputValue: string = ''; // 没有千位分隔符的input中的值
  private onChangeFn: (_: any) => void;
  private element: HTMLInputElement;
  private oldModel: number;
  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(DOCUMENT) private document) {
    super(renderer, elementRef, true);
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (!TiLocaleFormat.isInvalidFormat(this.format)) {
      const precision: number = parseInt(this.format.slice(1), 10);
      this.numberFormat = '1.' + precision + '-' + precision;
    }
  }

  // 检测当前值是否合法 如果合法 返回true；否则返回false.
  private isValidInput(value: string): boolean {
    const decimalSep: string = this.localeable ? TiLocaleFormat.getNumberSymbol('Decimal') : '.'; // 当前局点小数点的形式
    let regex: any; // regex是正则表达式，不明其类型，所以
    if (decimalSep === ',') {
      regex = /^\-{0,1}\d{0,},{0,1}\d{0,}$/;
    } else if (decimalSep === '.') {
      regex = /^\-{0,1}\d{0,}\.{0,1}\d{0,}$/;
    }

    return regex.test(value);
  }
  /**
   * 功能描述：当该值合法，直接返回. 如果不合法，则返回之前保存的有效值。
   * @memberOf TiInputNumberDirective
   */
  private getCorrectValue(value: string): string {
    if (!this.isValidInput(value)) {
      return this.oldInputValue;
    }

    return value;
  }
  // 根据精度和是否支持国际化，格式化数字
  private formatValue(value: number): string {
    if (Number.isNaN(value)) {
      return;
    }
    // https://angular.cn/api/common/DecimalPipe
    // digitsInfo: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
    // minIntegerDigits: 小数点前最小位数 默认为1
    // minFractionDigits: 小数点后最小位数 默认0
    // maxFractionDigits: 小数点后最大位数 默认3
    const localeValue: string = TiLocaleFormat.formatNumber(value, this.numberFormat);
    if (this.localeable) {
      return this.document.activeElement === this.element ? TiLocaleFormat.deleteGroupSep(localeValue) : localeValue;
    } else {
      // 不支持国际化时，也可利用TiLocaleFormat.formatNumber精度处理能力
      return TiLocaleFormat.parseNumber(localeValue).toString();
    }
  }
  // 将国际化数字转换为标准化数字
  private parseValue(value: string): number {
    return this.localeable ? TiLocaleFormat.parseNumber(value) : parseFloat(value);
  }
  // 将国际化数字的千位分隔符去掉(输入框聚焦状态需要)
  private deleteGroupSepValue(formatValue: string): string {
    return this.localeable ? TiLocaleFormat.deleteGroupSep(formatValue) : formatValue;
  }
  /**
   * @ignore
   * 实现继承来自父类的方法
   * Sets the "value" property on the input element.
   * model->view
   */
  writeValue(value: any): void {
    // writeValue()方法会执行两遍。第一遍为null, 第二遍为用户配置的数据。
    if (value === null) {
      return;
    }

    // 旧版本中开发者只能给ngModel传入空字符串时才能清空值，但是该组件ngModel应该是传入number类型，所以要清空时应该设置undefined。
    // 为了进行纠正，为了兼容旧版本，设置空字符串时也能清空。
    if (value === undefined || value === '') {
      super.writeValue('');
      this.oldInputValue = '';
      this.oldModel = undefined;
      return;
    }

    let normalValue: number;
    if (Number.isNaN(parseFloat(value))) {
      if (this.oldModel === undefined) {
        super.writeValue('');
        this.oldInputValue = '';
      } else {
        const formatValue: string = this.formatValue(this.oldModel);
        super.writeValue(formatValue);
        this.oldInputValue = this.deleteGroupSepValue(formatValue);
      }
      normalValue = this.oldModel;
    } else {
      const formatValue: string = this.formatValue(value);
      super.writeValue(formatValue);
      this.oldInputValue = this.deleteGroupSepValue(formatValue);
      normalValue = this.parseValue(formatValue);
    }

    if (normalValue !== value) {
      if (Util.isUndefined(this.onChangeFn)) {
        // 在reactive-form中使用，初始化赋值调用writeValue时，
        // 此时registerOnChange还未被调用，onChangeFn还未被赋值，
        // 所以要使用setTimeout等onChangeFn被赋值后再调用
        setTimeout(() => {
          this.changeModel(normalValue);
        }, 0);
      } else {
        this.changeModel(normalValue);
      }
    } else {
      this.oldModel = normalValue;
    }
  }
  /**
   * @ignore
   * Registers a function called when the control value changes
   * @param fn The callback function
   * 注册当控件接收到change事件之后，调用的函数fn
   * viewValue和model value值的同步
   */
  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  /**
   * @ignore
   * view -> model
   * 非法字符不能输入。如果是合法则更新，如果是非法，则设置为oldInputValue...
   */
  public handleInput(value: string): void {
    // IE9 cut delete backspace下支持这三种方式引起的改变。
    // text组件针对这三种方式做了兼容性处理，并且触发input事件
    // 所以 inputnumber无需再做兼容性处理
    this.parser(value);
  }

  private parser(value: string): void {
    const validationValue: string = this.getCorrectValue(value);
    if (!this.isValidInput(value)) {
      let cursorPos: number = this.element.selectionStart;
      const diff: number = value.length - validationValue.length;
      cursorPos = cursorPos - diff;
      this.renderer.setProperty(this.element, 'value', this.oldInputValue); // Sets the "value" property on the input element.
      this.element.setSelectionRange(cursorPos, cursorPos);
    } else {
      this.oldInputValue = validationValue;
      const parseValue: number = this.parseValue(validationValue);
      this.changeModel(Number.isNaN(parseValue) ? undefined : parseValue);
    }
  }

  /**
   * @ignore
   * 得到焦点数据标准化处理
   * @memberOf TiInputNumberDirective
   * renderer.setProperty: Implement this callback to set the value of a property of an element in the DOM.
   */
  public focusFn(): void {
    if (this.element.value === '') {
      return;
    }
    // 为了得到各个浏览器下正确的光标位置，所以添加延时处理
    if (this.localeable) {
      setTimeout(() => {
        const start: number = this.element.selectionStart;
        const end: number = this.element.selectionEnd;
        if (end - start === this.element.value.length) {
          this.renderer.setProperty(this.element, 'value', TiLocaleFormat.deleteGroupSep(this.element.value));
          this.element.setSelectionRange(0, this.element.value.length);
        } else {
          const groupSep: string = TiLocaleFormat.getNumberSymbol('Group');
          const old: string = this.element.value;
          const sub: string = old.substr(0, start);
          const groupSepNum: number = sub.split(groupSep).length - 1;

          this.renderer.setProperty(this.element, 'value', TiLocaleFormat.deleteGroupSep(this.element.value));
          this.element.setSelectionRange(start - groupSepNum, start - groupSepNum);
        }
      }, 0);
    }
  }

  /**
   * @ignore
   * 失去焦点数字国际化处理
   * @memberOf TiInputNumberDirective
   */
  public blurFn(): void {
    const value: number = this.parseValue(this.element.value);
    if (Number.isNaN(value)) {
      this.renderer.setProperty(this.element, 'value', '');
      this.oldInputValue = '';
      return;
    }
    const formatValue: string = this.formatValue(value);
    this.renderer.setProperty(this.element, 'value', formatValue);
    this.oldInputValue = this.deleteGroupSepValue(formatValue);
    const normalValue: number = this.parseValue(formatValue);
    if (value !== normalValue) {
      this.changeModel(normalValue);
    }
  }

  private changeModel(model: number): void {
    if (model !== this.oldModel) {
      this.onChangeFn(model);
      this.oldModel = model;
    }
  }
}
