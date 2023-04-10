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
import { Directive, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TiBrowser, Util } from '@opentiny/ng-utils';
/**
 * TiMask 格式化数字指令
 *
 * 该指令主要用于输入框中，限制用户只能输入数字，可以通过设置tiMask属性接口设置其数字的格式：身份证，手机号码等形式输入。
 *
 * 输入框中呈现的是格式化后的数字，但是通过ngModel取得的值为纯数字的值，如输入框中呈现的值为'123 456 789'，通过ngModel取得的值为'123456789'
 *
 */
@Directive({
  selector: '[tiMask]',
  providers: [
    {
      // MASK_INPUT_VALUE_ACCESSOR, 原本是外部变量或者static变量，lib编译不通过
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TiMaskDirective),
      multi: true
    }
  ],
  host: {
    '(input)': 'handleInput($event.target.value)',
    '(compositionstart)': 'handleCompositionStart()',
    '(compositionend)': 'handleCompositionEnd($event.target.value)',
    '(blur)': 'blur()'
  }
})
export class TiMaskDirective extends DefaultValueAccessor {
  private static readonly NUM_SIGN: string = '0';
  /**
   * 设置数字格式
   */
  @Input('tiMask') format: string = '000 0000 0000';
  private element: HTMLInputElement;
  private ctxPos: any;
  private valueCharPosOffset: any;
  private composing: boolean = false; // 是否正在拼写拼音
  private onChangeFn: Function; // 需要在registerOnChange中注册，用于改变模型值时调用
  private modelValue: any;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    // super中第三个参数是DefaultValueAccessor中对文本段落(例如中文)输入的处理的一个标志位,
    // 表示是否为非安卓系统，在PC端此参数为true。后续如果要处理移动端，则可能需要动态根据此参数对
    // 文本段落(例如中文)输入做处理。
    super(renderer, elementRef, true);
    this.element = this.elementRef.nativeElement;
  }

  // 获取在format范围内的有效字符串
  private static getClearValue(value: any, format: string): void {
    const formatNumLen: number = format.replace(/[^0]/g, '').length;
    let clearValue: any = value.replace(/\D/g, '');
    clearValue = clearValue.slice(0, formatNumLen);

    return clearValue;
  }

  private static formatValue(value: any, format: string): any {
    if (!value) {
      return '';
    }
    const clearValue: any = TiMaskDirective.getClearValue(value, format);
    const clearValueLen: number = clearValue.length; // value长度
    let valueCharPosOffset: number = 0; // value字符位置增量
    let valueCharPos: number; // 循环中的value字符位置
    let newValue: any = '';
    let formatChar: string;
    for (let i: number = 0, len: number = format.length; i < len; i++) {
      valueCharPos = i - valueCharPosOffset;
      if (valueCharPos >= clearValueLen) {
        // value内容循环完成情况下,不进行处理
        break;
      }
      formatChar = format[i];
      if (formatChar === TiMaskDirective.NUM_SIGN) {
        // format字符为数字情况下的处理
        newValue += clearValue[valueCharPos];
      } else {
        // format字符非数字情况下的处理,此时value字段中增加format字符
        valueCharPosOffset++;
        newValue += formatChar;
      }
    }

    return newValue;
  }

  // model => view
  /**
   * @ignore
   */
  writeValue(value: any): void {
    // 使用ngModel时，初始赋值第一次传入的value为null
    if (value === null) {
      return;
    }
    // format modelValue
    const formatValue: any = TiMaskDirective.formatValue(value, this.format);
    // Write formatted modelValue to view
    super.writeValue(formatValue);
    // 格式化后也需要通知修改模型值
    this.modelValue = this.getAntiFormatValue(formatValue);
    if (this.modelValue !== value) {
      if (Util.isUndefined(this.onChangeFn)) {
        // 在reactive-form中使用，初始化赋值调用writeValue时，
        // 此时registerOnChange还未被调用，onChangeFn还未被赋值，
        // 所以要使用setTimeout等onChangeFn被赋值后再调用
        setTimeout(() => {
          this.onChangeFn(this.modelValue);
        }, 0);
      } else {
        this.onChangeFn(this.modelValue);
      }
    }
  }
  /**
   * @ignore
   */
  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  /**
   * @ignore
   * view => model
   */
  public handleInput(value: any): void {
    if (!this.composing) {
      // 在parser()中对view值进行格式化处理，再重写view的值；
      this.parser(value);
    }
  }

  /**
   * @ignore
   * 中文输入之前(在输入拼音前)
   */
  public handleCompositionStart(): void {
    // 在IE和FF下中文输入法下，输入拼音时不会触发input事件，
    // 但是在Chrome下，输入拼音时会触发input事件，所以针对Chrome要做特殊处理，
    // 使其在输入拼音时不做格式化处理
    if (TiBrowser.isChrome()) {
      this.composing = true;
    }
  }

  /**
   * @ignore
   * 文本段完成输入或取消输入
   */
  public handleCompositionEnd(value: any): void {
    if (TiBrowser.isChrome()) {
      this.composing = false;
      // 在Chrome下compositionend比input执行滞后，
      this.parser(value);
    }
  }

  /**
   * @ignore
   */
  public blur(): void {
    // 此处的onTouched继承于DefaultValueAccessor
    this.onTouched();
  }

  private parser(value: any): void {
    const formattedValue: any = TiMaskDirective.formatValue(value, this.format);
    this.setCtxPos(value, this.format);
    const ctxPos: number = this.ctxPos;

    // 设置viewValue及光标位置
    if (value !== formattedValue) {
      this.renderer.setProperty(this.element, 'value', formattedValue);
      // 设置光标位置：value非法及输入数字后需要变换位置情况下，需要设置光标位置
      if (this.element === document.activeElement) {
        this.element.setSelectionRange(ctxPos, ctxPos);
      }
    }
    const modelValue: any = this.getAntiFormatValue(formattedValue);
    if (modelValue !== this.modelValue) {
      this.onChangeFn(modelValue);
      this.modelValue = modelValue;
    }
  }

  // 获取反格式化后的value
  private getAntiFormatValue(formattedValue: any): any {
    return formattedValue.replace(/\D/g, '');
  }

  private setCtxPos(value: any, format: string): void {
    // 元素有光标情况下，设置元素光标位置
    this.initCtxPos();

    if (!value) {
      return;
    }

    // value非空情况下的处理
    this.valueCharPosOffset = 0; // value字符位置增量
    const ctxPos: number = this.ctxPos; // 初始化ctxPos，后续循环中会以此为光标位置作为对比值
    for (let i: number = 0, len: number = format.length; i < len; i++) {
      if (i - this.valueCharPosOffset >= value.length) {
        // value字符循环完成情况下,不进行后续处理
        break;
      }
      this.setCharPos(i, value, format, ctxPos);
    }
  }

  private setCharPos(pos: number, value: any, format: string, ctxPos: number): void {
    const valueCharPos: number = pos - this.valueCharPosOffset; // 循环中的value字符位置
    const valueChar: any = value[valueCharPos]; // 当前value字符
    const formatChar: string = format[pos]; // 当前format字符
    if (formatChar === TiMaskDirective.NUM_SIGN) {
      // format为数字情况下的处理
      this.setPosWithNum(value, valueChar, valueCharPos, ctxPos);
    } else {
      // format非数字情况处理
      this.setPosWithoutNum(valueChar, valueCharPos, formatChar, ctxPos);
    }
  }

  private setPosWithNum(value: any, valueChar: any, valueCharPos: number, ctxPos: number): void {
    if (valueChar.match(/\d/)) {
      // value字符相匹配情况下,不做处理
      return;
    }

    // value字符不匹配情况下,光标前移，直到找到下一个数字为止
    let valueCharNew: any;
    for (let j: number = valueCharPos, valueLen: number = value.length; j < valueLen; j++) {
      valueCharNew = value[j];
      if (valueCharNew.match(/\d/)) {
        // 找到value字符为数字的情况下，结束循环
        return;
      }

      // 找到value字符非数字情况下，过滤掉该字符，光标前移，value偏移量后移，下次循环跳过该字符的检索
      if (ctxPos && ctxPos >= j + 1) {
        this.ctxPos--;
      }
      this.valueCharPosOffset--;
    }
  }

  private setPosWithoutNum(valueChar: any, valueCharPos: number, formatChar: string, ctxPos: number): void {
    // value为数字情况下,value偏移量前移,确保下次循环依然为该value字符
    if (valueChar.match(/\d/)) {
      this.valueCharPosOffset++;
      if (ctxPos && ctxPos >= valueCharPos + 1) {
        this.ctxPos++;
      }

      return;
    }

    // value非数字且不匹配format字符情况下,过滤掉该字符,下次继续循环下个value字符
    if (valueChar !== formatChar && ctxPos && ctxPos >= valueCharPos + 1) {
      this.ctxPos--;
    }
  }

  private initCtxPos(): void {
    let ctxPositon: number;
    if (this.element === document.activeElement) {
      ctxPositon = this.element.selectionStart;
    }
    this.ctxPos = ctxPositon;
  }
}
