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
  EventEmitter,
  Injector,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TiLocale, TiLocaleFormat } from '@opentiny/ng-locale';
import { TiKeymap, TiPositionType, Util } from '@opentiny/ng-utils';
import { TiFormComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
import { NgControl, NgModel } from '@angular/forms';
/**
 * 数字微调组件
 *
 */
@Component({
  selector: 'ti-spinner',
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiSpinnerComponent)]
})
export class TiSpinnerComponent extends TiFormComponent {
  /**
   * @ignore
   */
  public method: any = {
    METHOD_ADD: 'add',
    METHOD_SUB: 'sub'
  };
  /**
   * 小数保留位数。使用 n + '数字' 形式，例如：'n4'，代表保留4位小数。
   *
   * 不设置时小数保留位数最少 0 位，最多 3 位
   */
  @Input() format: string;
  /**
   * 最大值，支持整数和小数
   */
  @Input() max: number = Math.pow(2, 53);
  /**
   * 最小值，支持整数和小数
   */
  @Input() min: number = -Math.pow(2, 53);
  /**
   * 步长，按键盘上、下键或点击 + 、- 按钮增减的数值
   */
  @Input() step: number = 1;
  /**
   * 输入框的占位文本
   */
  @Input() placeholder: string = '';
  /**
   * @ignore
   *
   * 该接口不再开放。如果不想要组件根据最大最小值进行强制转换，那么不要设置最大最小值即可。
   *
   * 失去焦点是否支持根据最大最小值进行强制转换（默认值为 true, 支持强转; 当用户配置为 false 时，不支持强制转换）
   */
  @Input() correctable: boolean = true;
  /**
   * 是否开启国际化
   */
  @Input() localeable: boolean = true;
  /**
   * 输入框允许的最大字符数
   */
  @Input() maxlength: number = 20;
  /**
   * @ignore
   *
   * 此处做兼容性处理，添加该接口判断服务是否使用指令实现
   *
   */
  @Input() tiTip: string;
  /**
   * tip 提示内容，当值为空字符串，则不显示 tip。
   *
   * 同时设置最大、最小值时，默认提示文本是：输入值必须在 { 0 } 到 { 1 } 之间。；
   * 只设置最大值，默认提示文本是：输入值不能超过 { 0 }。
   * 只设置最小值，默认提示文本是：输入值不能小于 { 0 }
   */
  @Input() tipContent: string;
  /**
   * tip 提示方向
   */
  @Input() tipPosition: TiPositionType = 'top';
  /**
   * 动态改变步长，参数为当前输入框值、是否点击加号或者键盘上键，返回值：新步长
   */
  @Input() stepFn: (value: number, isAdd: boolean) => number;
  /**
   * @ignore
   * 当数据发生改变时，触发change事件
   */
  @Output() readonly stepChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('input', { static: true }) private inputEle: ElementRef;

  private numberFormat: string = '1.0-3'; // 整数位保留最小位数.小数位保留最小位数-小数位最大保留位置
  /**
   * @ignore
   */
  public inputValue: number;
  /**
   * @ignore
   */
  public inputTip: string;
  protected versionInfo: string = super.getVersion(packageInfo);
  private spinnerWords = TiLocale.getLocaleWords().tiSpinner;
  /**
   * 对最大最小值进行合法性校验
   */
  private static validateMaxAndMin(key: string, value: any): number {
    if (!Number.isNaN(parseFloat(value))) {
      return value;
    }

    if (key === 'max') {
      return Math.pow(2, 53);
    }

    if (key === 'min') {
      return -Math.pow(2, 53);
    }
  }

  constructor(
    protected hostRef: ElementRef,
    protected renderer2: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    private injector: Injector
  ) {
    super(hostRef, renderer2, changeDetectorRef);
  }

  // 组件声明周期钩子--start ↓
  ngOnInit(): void {
    super.ngOnInit();
    this.setFocusableElems([this.inputEle.nativeElement]);
    this.init();
  }

  private init(): void {
    if (!TiLocaleFormat.isInvalidFormat(this.format)) {
      const precision: number = parseInt(this.format.slice(1), 10);
      this.numberFormat = '1.' + precision + '-' + precision;
    }

    this.max = TiSpinnerComponent.validateMaxAndMin('max', this.max);
    this.min = TiSpinnerComponent.validateMaxAndMin('min', this.min);
    this.setInputTip();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.setChanges(changes, 'max');
    this.setChanges(changes, 'min');
  }

  /**
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.setInputTip();
    // 响应式表单场景，onpush策略下需要更新视图
    this.changeDetectorRef.markForCheck();
  }

  // 输入属性发生改变
  private setChanges(changes: SimpleChanges, key: string): void {
    if (changes[key] && !changes[key].isFirstChange()) {
      this[key] = parseFloat(changes[key].currentValue);
      if (Number.isNaN(this[key]) || this.min > this.max) {
        this[key] = TiSpinnerComponent.validateMaxAndMin(key, changes[key].previousValue);
      }
      if (this.correctable && this.model !== undefined) {
        // 这里如果去除了setTimeout，在OnPush环境并不会报错。但是在default环境不能去除setTimeout。综合是不去除
        // error: Expression has changed after it was checked.
        setTimeout(() => {
          const model: number = this.getModelByMinMax(this.inputValue);
          if (model !== this.model) {
            this.inputValue = model;
            this.model = model;
            // onpush策略 响应式表单中使用组件值更改后视图不更新，需要手动标记
            this.changeDetectorRef.markForCheck();
          }
        }, 0);
      }

      this.setInputTip();
    }
  }

  // 组件声明周期钩子--end
  // 实现ControlValueAccessor接口
  /**
   * @ignore
   * model --> view
   */
  writeValue(value: any): void {
    if (value === null) {
      return;
    }

    if (!Util.isUndefined(value)) {
      if (Number.isNaN(parseFloat(value))) {
        super.writeValue(value);
        this.model = this.inputValue;

        return;
      }

      if (this.correctable) {
        // 此处添加延时是由于动态修改value的同时修改max或min时，响应式表单场景输入框值显示异常
        // 此处判断是否是模板式表单，决定是否延时处理
        const spinnerControl: any = this.injector.get(NgControl);
        const changeModel: () => void = (): void => {
          super.writeValue(value);
          const val: any = this.getModelByMinMax(value);
          this.model = val;
          this.inputValue = val;
        };
        if (spinnerControl instanceof NgModel) {
          changeModel();

          return;
        }
        setTimeout(() => {
          changeModel();
          this.changeDetectorRef.markForCheck();
        }, 0);

        return;
      }
    }

    super.writeValue(value);
    this.inputValue = value;
  }
  // 实现ControlValueAccessor接口--end
  /**
   * @ignore
   */
  public blurFn(): void {
    let correctValue: number = this.inputValue;
    if (this.correctable && this.inputValue !== undefined) {
      correctValue = this.getModelByMinMax(this.inputValue);
    }
    const parseFormatValue: number = correctValue === undefined ? correctValue : parseFloat(this.formatValue(correctValue));
    if (parseFormatValue !== this.model) {
      this.model = parseFormatValue;
    }
    this.inputValue = this.model;
    this.onModelTouched(); // 校验 初次聚焦 后续聚焦失焦
  }
  /**
   * @ignore
   * description: Event emitter for producting the `ngModelChange` event after the view model updates.
   * ngModelChange 是ngModel指令的@Output.
   * 它在viewToModelUpdate函数中触发
   *
   */
  public inputChange(value: number): void {
    if (value !== undefined && (value < this.min || value > this.max)) {
      return;
    }
    const parseFormatValue: number = value === undefined ? value : parseFloat(this.formatValue(value));
    if (parseFormatValue !== this.model) {
      this.model = parseFormatValue;
    }
  }
  /**
   * 键盘上下键操作
   * @ignore
   */
  public keydownFn(event: any): void {
    if (this.disabled) {
      return;
    }
    if (event.keyCode === TiKeymap.KEY_ARROW_UP) {
      // 阻止input默认事件，防止按上键时光标移动到内容前面
      event.preventDefault();
      this.stepNumber(this.method.METHOD_ADD);
    } else if (event.keyCode === TiKeymap.KEY_ARROW_DOWN) {
      this.stepNumber(this.method.METHOD_SUB);
    }
  }
  /**
   * @ignore
   */
  public stepNumberMousedown(e: any, method: string): void {
    if (e.button === TiKeymap.MOUSE_MIDDLE_BUTTON || e.button === TiKeymap.MOUSE_RIGHT_BUTTON || this.disabled) {
      return;
    }
    // 如果是鼠标按下向下btn，输入框需要做获得光标的处理
    this.inputEle.nativeElement.focus();
    e.preventDefault(); // 目的是防止input失去焦点
    this.stepNumber(method);
  }

  private stepNumber(method: string): void {
    if (
      (this.inputValue >= this.max && method === this.method.METHOD_ADD) ||
      (this.inputValue <= this.min && method === this.method.METHOD_SUB)
    ) {
      return;
    }
    this.stepChange.emit(method);

    if (this.stepFn && Util.isFunction(this.stepFn)) {
      const isAdd: boolean = method === 'add' ? true : false;
      this.step = this.stepFn(this.inputValue, isAdd);
    }

    // 当输入框中的值为空时，点击+,-，显示最小值。
    if (this.inputValue === undefined) {
      this.model = this.min;
      this.inputValue = this.model;

      return;
    }
    if (method === this.method.METHOD_ADD) {
      if (this.inputValue > this.max - this.step) {
        this.model = this.max;
        this.inputValue = this.model;

        return;
      }
      if (this.inputValue < this.min) {
        this.model = this.min;
        this.inputValue = this.model;

        return;
      }
    } else if (method === this.method.METHOD_SUB) {
      if (this.inputValue < this.min + this.step) {
        this.model = this.min;
        this.inputValue = this.model;

        return;
      }
      if (this.inputValue > this.max) {
        this.model = this.max;
        this.inputValue = this.model;

        return;
      }
    }
    this.model = this.accOperate(this.inputValue, this.step, method);
    this.inputValue = this.model;
  }
  // 组件交互方法集合--end

  // 根据最大最小值得到model值
  private getModelByMinMax(curValue: number): number {
    if (curValue < this.min) {
      return this.min;
    }

    if (curValue > this.max) {
      return this.max;
    }

    return curValue;
  }

  private formatValue(value: number): string {
    if (value === undefined) {
      return;
    }
    // https://angular.cn/api/common/DecimalPipe
    // digitsInfo: {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
    // minIntegerDigits: 小数点前最小位数 默认为1
    // minFractionDigits: 小数点后最小位数 默认0
    // maxFractionDigits: 小数点后最大位数 默认3
    const localeValue: string = TiLocaleFormat.formatNumber(value, this.numberFormat);

    return TiLocaleFormat.parseNumber(localeValue).toString();
  }

  // 根据步长、+/-进行数值计算
  private accOperate(value: number, step: number, method: string): number {
    let r1: number;
    let r2: number;
    let c: number;
    let m: number;
    let _value: number;
    let _step: number;
    // 计算 val 小数点后数字的位数
    const getLength: (value: string | number) => number = (val: string): number => {
      return String(val).split('.')[1] ? String(val).split('.')[1].length : 0;
    };
    // 去除 val 中的 ‘.’
    const replacePeriod: (value: string | number) => number = (val: string): number => {
      return Number(String(val).replace('.', ''));
    };
    r1 = getLength(value);
    r2 = getLength(step);
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));

    if (c > 0) {
      const cm: number = Math.pow(10, c);
      if (r1 > r2) {
        _value = replacePeriod(value);
        _step = replacePeriod(step) * cm;
      } else {
        _value = replacePeriod(value) * cm;
        _step = replacePeriod(step);
      }
    } else {
      _value = replacePeriod(value);
      _step = replacePeriod(step);
    }

    if (method === this.method.METHOD_ADD) {
      return (_value + _step) / m;
    }

    if (method === this.method.METHOD_SUB) {
      return (_value - _step) / m;
    }

    return undefined;
  }

  /**
   * 设置tip提示内容
   */
  private setInputTip(): void {
    // 兼容使用tiTip指令实现的tip提示
    if (this.disabled || this.tiTip) {
      this.inputTip = '';

      return;
    }

    if (Util.isString(this.tipContent)) {
      this.inputTip = this.tipContent;

      return;
    }

    if (this.max !== Math.pow(2, 53) && this.min !== -Math.pow(2, 53)) {
      this.inputTip = Util.formatEntry(this.spinnerWords.rangeValue, [this.min, this.max]);

      return;
    }

    if (this.min !== -Math.pow(2, 53)) {
      this.inputTip = Util.formatEntry(this.spinnerWords.minValue, [this.min]);

      return;
    }

    if (this.max !== Math.pow(2, 53)) {
      this.inputTip = Util.formatEntry(this.spinnerWords.maxValue, [this.max]);

      return;
    }
  }

  // 内部公共方法集合--end
}
