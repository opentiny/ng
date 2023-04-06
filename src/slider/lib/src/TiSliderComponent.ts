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
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  Output,
  Renderer2,
  SecurityContext,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '@opentiny/ng-utils';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiFormComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
/**
 * @ignore
 */
export interface TiDragConfig {
  helper: any;
  position: {
    left: number;
    top: number;
  };
}

/**
 * Slider滑块组件
 *
 * 滑块组件，通过操作组件选择指示范围
 *
 */
@Component({
  selector: 'ti-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-slider-container]': 'true',
    '[class.ti3-slider-disable]': 'disabled',
    '(mousedown)': 'hostMousedownEvent($event)'
  },
  providers: [TiFormComponent.getValueAccessor(TiSliderComponent)]
})
export class TiSliderComponent extends TiFormComponent {
  /**
   * 最小范围值
   */
  @Input() min: number = 0;
  /**
   * 最大范围值
   */
  @Input() max: number = 10;

  /**
   * 步长
   */
  @Input() step: number = 1;
  /**
   * 刻度标记
   *
   * 1.当刻度标记为数组时，数组中各元素依次对应各刻度显示值；当刻度标记为 Function 时，返回刻度显示值;
   * 参数：value (当前刻度)、max (最大值)、min (最小值)。
   *
   * 2.当刻度标记为空字符串，只有刻度没有标记；当刻度标记为 undefined / null，没有刻度标记；其他情况，有刻度且有标记。
   */
  @Input() scales: Array<any> | Function;
  /**
   * 滑块 tip 提示的显示方式
   */
  @Input() tipMode: 'auto' | 'always' = 'auto';
  /**
   * tip 提示内容的函数，返回值是 tip 中显示的文本
   */
  @Input() tipFormatterFn: (value: any) => string;
  /**
   * 刻度比，依次设置 scales 中两个相邻刻度间的长度占比，总和为 1
   */
  @Input() ratios: Array<number>;
  /**
   * 滑动停止并且值发生改变时触发的回调
   */
  @Output() readonly changeStop: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 获取到用户自定义的刻度
   */
  @ContentChild(TemplateRef, { static: true })
  public labelTemplate: TemplateRef<any>;
  /**
   * @ignore
   * 存放用户传入的刻度值
   */
  public ticks: Array<any>;
  /**
   * @ignore
   * 对于双滑块，左滑块是否处于变化状态
   */
  public isMinPointerActive: boolean;
  /**
   * @ignore
   * 拖动配置参数
   */
  public dragOptions: any;
  protected versionInfo: string = super.getVersion(packageInfo);
  private ticksArr: Array<any>; // 存放合法的刻度值
  private isDouble: boolean = false; // 判断是否是双滑块，默认是单滑块 false
  private isTipAutoShow: boolean = true; // 判断tip提示是否是自动显示（鼠标操作才显示）,默认true
  private decimalDigit: number; // ratios中最大的小数位数
  private scalesDiffer: IterableDiffer<any>; // scales 变化检查
  private dragStartModel: any;
  private pointerMaxEleWidth: number; // 滑块的宽度

  // 获取模板上DOM变量
  @ViewChild('trackEle', { static: true }) private trackRef: ElementRef;
  @ViewChild('selection', { static: true }) private selectionRef: ElementRef;
  @ViewChild('pointerMin', { static: true }) private pointerMinRef: ElementRef;
  @ViewChild('pointerMax', { static: true }) private pointerMaxRef: ElementRef;
  @ViewChild('tipMin', { static: true }) private tipMinRef: ElementRef;
  @ViewChild('tipMax', { static: true }) private tipMaxRef: ElementRef;
  // 定义DOM变量
  private trackELe: any;
  private selectionEle: any;
  private pointerMinEle: any;
  private pointerMaxEle: any;
  private tipMinEle: any;
  private tipMaxEle: any;
  private isVisibleInit: boolean; // 标识初始化时组件是否可见

  /**
   * @description: 将value值处理成数组
   * @param: value 需要切割的数组
   */
  private static splitValueToArray(value: string): {
    valueMin: number;
    valueMax: number;
  } {
    const arr: Array<string> = `${value}`.split(';'); // value为number时强转为字符串

    return {
      valueMin: parseFloat(arr[0]),
      valueMax: arr[1] && parseFloat(arr[1])
    };
  }

  /**
   * @description: value值是否超限制
   * @param: value: 判断的value值
   * @param: minValue: 最大值
   * @param: maxValue: 最小值
   */
  private static isLimitExceed(value: number, minValue: number, maxValue: number): boolean {
    return value < minValue || value > maxValue;
  }

  /**
   * @description: 当this.scales为函数情况下，转换为ticks数组
   * @param: scaleFormat 被转换的函数
   * @param: minValue 刻度限制的最大值
   * @param: maxValue 刻度限制的最小值
   * @param: step 刻度步长
   */
  private static translateScales(scaleFormat: Function, minValue: number, maxValue: number, step: number): Array<any> {
    const valueLen: number = (maxValue - minValue) / step;
    const tickArray: Array<any> = [];
    for (let i: number = 0; i <= valueLen; i++) {
      const stepNValue: number = step * i + minValue;
      const formatRet: any = scaleFormat(stepNValue, minValue, maxValue);
      if (Util.isUndefined(formatRet) || Util.isNull(formatRet)) {
        // 为undefined或null情况下，不打点不显示label
        tickArray.push(null);
      } else {
        // 包含为""（打点不显示label）和非""情况（打点且显示label）
        tickArray.push(formatRet);
      }
    }

    return tickArray;
  }

  /**
   * @description: 在范围内限制value数值
   * @param: value 校验的value值
   * @param: min 最小值
   * @param: max 最大值
   * @return: 有效value值
   */
  private static limitValue(value: number, min: number, max: number): number {
    // 小于min取min，大于max取max，其他不变。
    const res: number = value < min ? min : value > max ? max : value;

    return res;
  }

  /**
   * @description: 将样式数值转化为calc形式的css样式（设置为百分比形式，确保缩放的支持）
   * @param: percent calc百分比
   * @param: subValue calc减去值
   */
  private static parseToCalcStyle(percent: number, subValue?: number): string {
    if (Number.isNaN(subValue) || Util.isUndefined(subValue)) {
      return `calc(${percent * 100}%)`;
    }

    return `calc(${percent * 100}% - ${subValue}px)`; // calc中运算符合2边一定要空格
  }

  constructor(
    protected hostRef: ElementRef,
    protected renderer2: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    private tiRenderer: TiRenderer,
    private iterableDiffers: IterableDiffers,
    private domSanitizer: DomSanitizer
  ) {
    super(hostRef, renderer2, changeDetectorRef);
  }

  /**
   * @ignore
   */
  @HostListener('window:resize') onResize(): void {
    this.updateValuePosition(this.model);
  }

  // 组件声明周期钩子--start
  ngOnInit(): void {
    super.ngOnInit();
    this.initDom();
    this.initVars();
  }
  /**
   * @ignore
   */
  public initDom(): void {
    this.trackELe = this.trackRef.nativeElement;
    this.selectionEle = this.selectionRef.nativeElement;
    this.pointerMinEle = this.pointerMinRef.nativeElement;
    this.pointerMaxEle = this.pointerMaxRef.nativeElement;
    this.tipMinEle = this.tipMinRef.nativeElement;
    this.tipMaxEle = this.tipMaxRef.nativeElement;
  }
  /**
   * @ignore
   */
  public initVars(): void {
    this.step = Number.isNaN(parseFloat(`${this.step}`)) ? 1 : parseFloat(`${this.step}`);
    this.setMinMax();
    // ratios中最大的小数位数
    this.decimalDigit = this.getDecimalDigit();

    // 处理用戶未设置scales或者scales為function情況
    if (!this.scales || !Array.isArray(this.scales)) {
      this.setScales();
    }

    this.setTipConfig();
    // 给tip添加事件（tipMode是 'auto'的场景）
    this.addTipEvent();

    this.dragOptions = {
      axis: 'x',
      start: this.dragStartHandle,
      drag: this.dragHandle,
      stop: this.dragStopHandle
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scales'] && !changes['scales'].firstChange && !Array.isArray(this.scales)) {
      this.setScales();
      this.updateValuePosition(this.model);
    }

    // 监听最大值最小值变化
    if ((changes['min'] && !changes['min'].firstChange) || (changes['max'] && !changes['max'].firstChange)) {
      this.setMinMax();
    }
  }
  ngAfterViewInit(): void {
    this.pointerMaxEleWidth = this.pointerMaxEle.offsetWidth;
    this.isVisibleInit = this.pointerMaxEleWidth !== 0;
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    // 监听滑块的宽度：处理组件从隐藏到显示定位问题
    if (!this.isVisibleInit) {
      const pointerMaxWidth: number = this.pointerMaxEle.offsetWidth;
      if (pointerMaxWidth !== 0) {
        this.isVisibleInit = true;
        this.pointerMaxEleWidth = pointerMaxWidth;
        this.updateValuePosition(this.model);
        this.changeDetectorRef.detectChanges();
      }
    }
  }
  ngDoCheck(): void {
    if (!Array.isArray(this.scales)) {
      return;
    }
    if (!this.scalesDiffer) {
      this.scalesDiffer = this.iterableDiffers.find(this.scales).create();
    }

    const scalesDiffer: IterableChanges<any> = this.scalesDiffer.diff(this.scales);
    if (scalesDiffer) {
      this.setScales();
      // 初始化的updateValuePosition在writeValue中执行（writeValue迟于docheck执行）
      if (!Util.isUndefined(this.model)) {
        this.updateValuePosition(this.model);
      }
    }
  }
  // 组件声明周期钩子--end

  // 实现ControlValueAccessor接口
  /**
   * @ignore
   */
  writeValue(value: any): void {
    // TODO: 接口设计重新调整
    // ngModel => value: string | number; // 滑块对应的value值 exp： 单滑块: 15 OR '15' 双滑块 '15;34';
    super.writeValue(value);
    if (!Util.isNull(value) && !Util.isUndefined(value)) {
      // 1.判断是否是双滑块
      this.isDouble = !Util.isUndefined(TiSliderComponent.splitValueToArray(value).valueMax); // 根据value形式确定单滑块/双滑块
      if (Util.isUndefined(this.onModelChange)) {
        // 在reactive-form中使用，初始化赋值调用writeValue时，
        // 此时registerOnChange还未被调用，onChangeFn还未被赋值，
        // 所以要使用promise(异步)等onChangeFn被赋值后再调用
        Promise.resolve(undefined).then(() => {
          this.writeValueHandle(value);
        });
      } else {
        this.writeValueHandle(value);
      }
    }
  }
  private writeValueHandle(value: any): void {
    if (this.isDouble) {
      this.show(this.pointerMinEle);
    } else {
      this.hide(this.pointerMinEle);
    }
    // 赋值操作 && 更新位置
    this.updateValuePosition(value);
  }
  // 实现ControlValueAccessor接口--end

  // 组件交互方法集合--start
  /**
   * @ignore
   * 不存在下面的问题，用click和mousedown事件都可以（统一使用mousedown事件）
   * 使用mousedown替代click，用于防止拖拽过程中触发click事件导致的滑块滑动
   * 问题场景：min滑块拖动与max滑块重合后，鼠标继续向右移动，此时鼠标抬起，触发click事件，导致max发生移动
   */
  public hostMousedownEvent = (event: MouseEvent): void => {
    // 灰化状态或点击pointer时不做处理
    if (
      this.disabled ||
      this.tiRenderer.hasClass(event.target, 'ti3-slider-pointer') ||
      this.tiRenderer.hasClass(event.target, 'ti3-slider-tip')
    ) {
      return;
    }
    this.stepSliderFromClick(event);
  };

  /**
   * @description: 添加tip的事件监听
   */
  private addTipEvent(): void {
    if (this.isTipAutoShow) {
      this.renderer2.listen(this.pointerMaxEle, 'mouseover', this.tipMouseoverHandle);
      this.renderer2.listen(this.pointerMinEle, 'mouseover', this.tipMouseoverHandle);
      this.renderer2.listen(this.pointerMaxEle, 'mouseleave', this.tipMouseleaveHandle);
      this.renderer2.listen(this.pointerMinEle, 'mouseleave', this.tipMouseleaveHandle);
    }
  }

  /**
   * @description: 滑块元素的mouseover事件处理函数
   */
  private tipMouseoverHandle = (event: any): void => {
    if (!this.disabled) {
      const sliderTip: Element = event.target.querySelector('.ti3-slider-tip');
      if (sliderTip) {
        this.show(sliderTip);
      }
    }
  };

  /**
   * @description: 滑块元素的mouseleave事件处理函数
   */
  private tipMouseleaveHandle = (event: any): void => {
    if (this.disabled) {
      return;
    }
    this.hide(event.target.querySelector('.ti3-slider-tip'));
  };

  /**
   * @description: 宿主元素的mousedown事件处理函数
   */
  private stepSliderFromClick = (event: MouseEvent): void => {
    const firstTickX: number = this.trackELe.getBoundingClientRect().left + this.pointerMaxEleWidth / 2;
    const oldModel: any = this.model;
    let pointerX: number = event.clientX - firstTickX;
    pointerX = TiSliderComponent.limitValue(pointerX, 0, this.getBarWidth());
    let value: number = this.positionToValue(pointerX); // 获取value绝对比例值，用于确定滑块移动位置
    // 确定滑动哪个滑块
    let pointer: any = this.pointerMaxEle;
    if (this.isDouble) {
      const valueMin: number = TiSliderComponent.splitValueToArray(this.model).valueMin;
      const valueMax: number = TiSliderComponent.splitValueToArray(this.model).valueMax;
      // 以value中间值为界，在最小值及中间值之间=》左滑块移动；否则=》右滑块移动
      const midValue: number = (valueMax + valueMin) / 2;
      if (value >= this.min && value < midValue) {
        pointer = this.pointerMinEle;
        this.isMinPointerActive = true;
      } else {
        this.isMinPointerActive = false;
      }
    }
    value = this.getStepValue(value);
    this.setValue(value); // 向外部通知value值
    this.valueToPosition(value, pointer); // 跳至value对应的坐标位置（与step对应）
    if (this.model !== oldModel) {
      this.changeStop.emit(this.model);
    }
  };

  /**
   * @description 拖拽开始执行的事件
   * @param: ui 拖拽助手 {helper：表示被拖拽的助手（helper）, position: 助手（helper）的当前 CSS 位置}
   */
  private dragStartHandle = (ui: TiDragConfig): void => {
    this.dragStartModel = this.model;
    if (this.isDouble) {
      this.isMinPointerActive = !this.tiRenderer.hasClass(ui.helper, 'ti3-slider-pointer-max');
    }
  };

  /**
   * @description 根据拖拽位置更新value值并改变位置呈现
   * @param: ui 拖拽助手 {helper：表示被拖拽的助手（helper）, position: 助手（helper）的当前 CSS 位置}
   */
  private dragHandle = (ui: TiDragConfig): void => {
    // 设置value值
    const value: number = this.dragCommonHandle(ui);
    this.setValue(value); // 向外部通知value值
    // 设置tip提示
    if (this.isTipAutoShow) {
      // 拖拽过程中显示tip提示
      this.show(ui.helper.querySelector('.ti3-slider-tip'));
    }
    this.setTip(ui.helper.querySelector('.ti3-slider-tip'), value); // 设置tip提示值及位置
  };

  /**
   * @description: 鼠标弹起之后：根据拖拽位置跳至step对应的值并设置slider
   * @param: ui 拖拽助手 {helper：表示被拖拽的助手（helper）, position: 助手（helper）的当前 CSS 位置}
   */
  private dragStopHandle = (ui: TiDragConfig): void => {
    // 设置value值
    const value: number = this.dragCommonHandle(ui);

    if (this.isTipAutoShow) {
      // 拖拽停止隐藏tip提示
      this.hide(ui.helper.querySelector('.ti3-slider-tip'));
    }
    this.valueToPosition(value, ui.helper); // 跳至value对应的坐标位置
    if (this.model !== this.dragStartModel) {
      this.changeStop.emit(this.model);
    }
  };

  // 组件交互方法集合--end

  // 内部公共方法集合--start
  /**
   * @description: 拖拽公共处理
   * @param: ui 拖拽助手 {helper：表示被拖拽的助手（helper）, position: 助手（helper）的当前 CSS 位置}
   */
  private dragCommonHandle(ui: TiDragConfig): number {
    const pointerX: number = this.limitDragPosition(ui); // 限制指针在合理的位置范围内
    const value: number = this.positionToStepValue(pointerX); // 获取当前位置对应的value值

    return value;
  }

  /**
   * @description: 限制滑块移动位置并设置对应的选择区域宽度
   * @param: pointerX 鼠标点击位置（x方向）
   */
  private limitDragPosition(ui: TiDragConfig): number {
    let pointerX: number = ui.position.left; // 当前滑块中心距离tick第一个坐标位置
    const barWidth: number = this.getBarWidth();
    let pointerWidthHalf: number = this.pointerMaxEleWidth / 2;
    let pointerMinLeft: number;
    let pointerMaxLeft: number;
    if (this.isDouble) {
      if (!this.isMinPointerActive) {
        // max对应滑块情况的处理
        pointerMinLeft = parseFloat(getComputedStyle(this.pointerMinEle).left);
        pointerX = TiSliderComponent.limitValue(pointerX, pointerMinLeft, barWidth); // 限制滑块在最小和右边界之间
        pointerMaxLeft = pointerX;
      } else {
        pointerMaxLeft = parseFloat(getComputedStyle(this.pointerMaxEle).left);
        pointerX = TiSliderComponent.limitValue(pointerX, 0, pointerMaxLeft); // 限制滑块在左边界和最大之间
        pointerMinLeft = pointerX;
      }
      const styles: { width: string; left: string } = {
        width: `${pointerMaxLeft - pointerMinLeft}px`,
        left: `${pointerMinLeft + pointerWidthHalf}px`
      };
      this.tiRenderer.setStyles(this.selectionEle, styles);
    } else {
      pointerX = TiSliderComponent.limitValue(pointerX, 0, barWidth);
      this.renderer2.setStyle(this.selectionEle, 'width', `${pointerX + pointerWidthHalf}px`);
    }

    ui.position.left = pointerX; // 限制滑块的位置显示

    return pointerX;
  }

  /**
   * @description: 根据滑块位置获取value值(和step对应) (拖拽公共函数中用)
   * @param: pointerX 鼠标点击位置（x方向）
   */
  private positionToStepValue(pointerX: number): number {
    const value: number = this.positionToValue(pointerX); // 获取指针对应的value绝对比例值(和step无关)

    return this.getStepValue(value); // 转化value为与step对应的值;
  }

  /**
   * @description: 获取位置对应的value值
   * @param: pointerX 鼠标点击位置（x方向）
   */
  private positionToValue(pointerX: number): number {
    const barWidth: number = this.getBarWidth();
    const percent: number = pointerX / barWidth;
    if (!Util.isUndefined(this.ratios)) {
      return this.unequalPositionToValue(pointerX, barWidth, percent);
    }

    return this.min + percent * (this.max - this.min);
  }

  /**
   * @description: 设置组件的model值，用于向外通知
   * @param: value 当前指针的值
   */
  private setValue(value: number): void {
    if (this.isDouble) {
      const valueMin: number = TiSliderComponent.splitValueToArray(this.model).valueMin;
      const valueMax: number = TiSliderComponent.splitValueToArray(this.model).valueMax;
      if (!this.isMinPointerActive && value !== valueMax) {
        this.model = `${valueMin};${value}`;
      } else if (this.isMinPointerActive && value !== valueMin) {
        this.model = `${value};${valueMax}`;
      }
    } else {
      if (value !== this.model) {
        this.model = value;
      }
    }
  }

  /**
   * @description: 获取对应的step值(根据step修正value值)
   * @param: value 当前点击的绝对值
   */
  private getStepValue(value: number): number {
    const min: number = this.min;
    const step: number = this.step;
    let stepValue: number;
    const stepN: number = Math.round((value - min) / step); // value值变化几个步长
    if (step.toString().indexOf('.') !== -1) {
      const n: number = step.toString().split('.').length;
      stepValue = parseFloat((min + stepN * step).toFixed(n));
    } else {
      stepValue = min + stepN * step;
    }

    return TiSliderComponent.limitValue(stepValue, min, this.max);
  }

  /**
   * @description: 在不等分条件下获取位置对应的value值
   * @param: pointerX 鼠标点击位置（x方向）
   * @param: barWidth 指针宽度
   * @param: percent pointerX占滑动轴百分比
   */
  private unequalPositionToValue(pointerX: number, barWidth: number, percent: number): number {
    let limitWidth: number = 0; // 每一段的宽度
    let selectLength: number = 0; // 已被选中区域段的宽度
    let ratiosWidth: number = 0; // 已被选中区域段长度和占总长的比例
    const c: number = this.decimalDigit;
    const ticksLen: number = this.ticksArr.length;
    for (let i: number = 0; i < ticksLen - 1; i++) {
      limitWidth = barWidth * this.ratios[i];
      if (i === 0) {
        selectLength = 0;
        ratiosWidth = 0;
      } else {
        ratiosWidth = Number((ratiosWidth + this.ratios[i - 1]).toFixed(c));
        selectLength = barWidth * ratiosWidth;
      }
      const pointerWidth: number = pointerX - selectLength;
      if (percent <= Number((ratiosWidth + this.ratios[i]).toFixed(c)) && percent >= ratiosWidth) {
        return this.ticksArr[i] + (pointerWidth / limitWidth) * (this.ticksArr[i + 1] - this.ticksArr[i]);
      }
    }
  }

  /**
   * @description: 当前组件写入新值 || min || max || scales发生变化 时更新value对应的位置
   * @param: newValue 需要处理的value的值
   */
  private updateValuePosition(newValue: string): void {
    let valueTmp: string;
    if (this.isDouble) {
      valueTmp = this.restrictDoubleValue(newValue);
      const valueMax: number = TiSliderComponent.splitValueToArray(valueTmp).valueMax;
      const valueMin: number = TiSliderComponent.splitValueToArray(valueTmp).valueMin;
      // 当设置value均为最大值情况下，设置最小滑块层级，确保滑块可被拖动
      // 最小值的情况左右滑块zIndex相等，但是右滑块DOM在左滑块之后，因此根据zIndex规则，右滑块可以覆盖左滑块
      if (valueMin === valueMax && valueMin === this.max) {
        this.isMinPointerActive = true;
      }
      // 设置滑块的位置
      this.valueToPosition(valueMin, this.pointerMinEle);
      this.valueToPosition(valueMax, this.pointerMaxEle);
    } else {
      valueTmp = this.restrictSingleValue(newValue);
      this.valueToPosition(valueTmp, this.pointerMaxEle);
    }

    if (newValue !== valueTmp) {
      this.model = valueTmp;
    }
  }

  /**
   * @description: 限定双滑块value的值
   * @param: value 需要处理的value的值
   */
  private restrictDoubleValue(value: string): string {
    const valueMin: number = TiSliderComponent.splitValueToArray(value).valueMin; // 双滑块的小值
    const valueMax: number = TiSliderComponent.splitValueToArray(value).valueMax; // 双滑块的大值
    // 非法情况：非数字，超过限制，value大小顺序不正确情况
    const isInvalidValueMin: boolean =
      isNaN(valueMin) || TiSliderComponent.isLimitExceed(valueMin, this.min, this.max) || valueMin > valueMax;
    // 非法情况：非数字，超过限制，value大小顺序不正确情况
    const isInvalidValueMax: boolean =
      isNaN(valueMax) || TiSliderComponent.isLimitExceed(valueMax, this.min, this.max) || valueMin > valueMax;

    return `${isInvalidValueMin ? this.min : valueMin};${isInvalidValueMax ? this.max : valueMax}`;
  }

  /**
   * @description: 限定单滑块value的值
   * @param: value 需要处理的value的值
   */
  private restrictSingleValue(value: any): any {
    if (isNaN(parseFloat(value)) || value < this.min) {
      // value不是数字或者小于最小值point定位到最小值
      return this.min;
    }
    if (value > this.max) {
      // value大于最大值point定位到最大值
      return this.max;
    }

    return value;
  }

  /**
   * @description: 处理tip
   */
  private setTipConfig(): void {
    const defaultTipShow: 'auto' | 'always' = 'auto';
    const defaultTipFormatter: (value: any) => string = (value: any): any => {
      return value;
    };

    this.tipMode = Util.isUndefined(this.tipMode) ? defaultTipShow : this.tipMode;
    this.tipFormatterFn = Util.isUndefined(this.tipFormatterFn) ? defaultTipFormatter : this.tipFormatterFn;
    this.isTipAutoShow = this.tipMode !== 'always';
    if (this.isTipAutoShow) {
      this.hide(this.tipMaxEle);
      this.hide(this.tipMinEle);
    } else {
      this.show(this.tipMaxEle);
      this.show(this.tipMinEle);
    }
  }

  /**
   * @description: 处理限制
   */
  private setMinMax(): void {
    const defaultMin: number = 0;
    const defaultMax: number = 10;
    const min: number = parseFloat(`${this.min}`);
    const max: number = parseFloat(`${this.max}`);
    this.min = isNaN(min) || min >= max ? defaultMin : min;
    this.max = isNaN(max) || min >= max ? defaultMax : max;
  }

  /**
   * @description: 处理刻度
   */
  private setScales(): void {
    const step: number = this.step;
    const min: number = this.min;
    const max: number = this.max;
    let ticks: Array<any> = [];
    if (typeof this.scales === 'function') {
      this.ticks = TiSliderComponent.translateScales(this.scales, min, max, step);
    } else if (Array.isArray(this.scales)) {
      // 为Array情况下，直接使用数值
      this.ticks = this.scales.concat();
    } else {
      // 未传scale(包含非法)的情况下，只显示最小和最大值
      const ticksLen: number = (max - min) / step;
      ticks.push(min);
      for (let i: number = 0; i < ticksLen - 1; i++) {
        // 除最小最大值外，其余只打点不显示label
        ticks.push('');
      }
      ticks.push(max);
      this.ticks = ticks;
    }
    if (!Util.isUndefined(this.ratios)) {
      let ratiosSum: number = 0; // 将ratios中每一项与之前的求和
      const sumArray: Array<number> = []; //  由ratiosSum组成的数组
      const ratiosLen: number = this.ratios.length;
      for (let i: number = 0; i < ratiosLen; i++) {
        ratiosSum = Number((ratiosSum + Number(this.ratios[i])).toFixed(this.decimalDigit));
        sumArray.push(ratiosSum);
      }
      ticks = this.getTicks(sumArray, this.decimalDigit);
      this.ticks = ticks;
    }
  }

  /**
   * @description: 非均匀情况下确定打点的位置
   * @param: arr 由ratiosSum组成的数组
   * @param: num ratios中最大的小数位数
   */
  private getTicks(arr: Array<number>, num: number): Array<any> {
    const minScale: number = Number(Math.pow(0.1, num).toFixed(num)); //  判断是否打点的基数
    let k: number = 1;
    let p: number = 0;
    const ticks: Array<number> = [this.ticks[0]];
    const length: number = parseInt(`${1 / minScale}`, 10);
    for (let i: number = 0; i < length; i++) {
      p = Number((p + minScale).toFixed(num));
      if (arr.indexOf(p) === -1) {
        // 判断每次相加基数后是否在数组中，不在不打点不显示label
        ticks.push(null);
      } else {
        // 否则打点显示label
        ticks.push(this.ticks[k]);
        k++;
      }
    }

    return ticks;
  }

  /**
   * @description: 显示隐藏的元素
   * @param: ele: 要显示的DOM对象
   */
  private show(ele: any): void {
    // 注：此处未使用ng-show方式控制滑块显示是因为有延迟，造成后续方法获取pointer宽度为0，显示错乱
    this.renderer2.setStyle(ele, 'display', 'block');
  }

  /**
   * @description: 隐藏显示的元素
   * @param: ele: 要隐藏的DOM对象
   */
  private hide(ele: any): void {
    // 注：此处未使用ng-show方式控制滑块显示是因为有延迟，造成后续方法获取pointer宽度为0，显示错乱
    this.renderer2.setStyle(ele, 'display', 'none');
  }

  /**
   * @ignore
   * @description: 获取ticks的最大显示宽度，一行显示不下情况下，换行显示
   * @param: index 刻度下标
   */
  public calcTickMaxWidth(index: number): string {
    const ticksLen: number = this.ticks.length;
    const spacePercent: number = 1 / (ticksLen - 1); // 两个刻度点间隔宽度百分百（小数）
    if (index === 0 || index === ticksLen - 1) {
      // 第一个和最后一个刻度
      return TiSliderComponent.parseToCalcStyle(spacePercent, this.pointerMaxEleWidth / 2);
    }

    return TiSliderComponent.parseToCalcStyle(spacePercent);
  }

  /**
   * @ignore
   * @description: 获取 ticks 的left位置
   * @param: index 刻度下标
   */
  public calcTickLeftPosition(index: number): string {
    return `${(index / (this.ticks.length - 1)) * 100}%`;
  }

  // TODO: 看这个方法在模板上调用添加的样式类没有什么实际作用，是不是可以删除？
  /**
   * @ignore
   * @description: 确定滑动轴打点是否为选中点，根据函数返回值设置选中样式 (是否是selection区域的点)
   * @param: index 刻度下标
   */
  public isSelectTick(index: number): boolean {
    const ticksLen: number = this.ticks.length;
    // 双滑块情况下,位于最大最小值之间为选中状态
    if (this.isDouble) {
      const value: Array<string> = this.model.split(';');
      const isLargeThanValMin: boolean = index / ticksLen >= (parseFloat(value[0]) - this.min) / (this.max - this.min);
      const isSmallThanValMax: boolean = index / ticksLen <= (parseFloat(value[1]) - this.min) / (this.max - this.min);

      return isLargeThanValMin && isSmallThanValMax;
    }

    // 单滑块情况下,小于选中值为选中状态
    return index / ticksLen <= parseFloat(this.model) - this.min;
  }

  /**
   * @description:  获取滑动轴的宽度(涉及到屏幕缩放，所以需要实时获取)
   */
  private getBarWidth(): number {
    return this.trackELe.getBoundingClientRect().width - this.pointerMaxEleWidth;
  }

  /**
   * @description: 获取ratios中最大的小数位数
   */
  private getDecimalDigit(): number {
    const decimalArr: Array<number> = [];
    if (Array.isArray(this.ratios)) {
      this.ratios.forEach((item: number) => {
        const decimal: string = item.toString().split('.')[1];
        if (decimal) {
          decimalArr.push(decimal.length);
        }
      });
    }

    return Math.max.apply(null, decimalArr);
  }

  /**
   * @description: 获取当前value所在的区域以及当前value对应的长度占总长的百分比(小数)
   * @param: value 指针对应的value值
   * @param: paragraph 当前打点的段数
   */
  private getValuePercent(value: number, paragraph: number): number {
    let ratiosSum: number = 0; // 当前打点的段数下ratios的总和
    for (let i: number = 0; i < paragraph; i++) {
      ratiosSum = Number((ratiosSum + this.ratios[i]).toFixed(this.decimalDigit));
    }

    return (
      ratiosSum + ((value - this.ticksArr[paragraph]) / (this.ticksArr[paragraph + 1] - this.ticksArr[paragraph])) * this.ratios[paragraph]
    );
  }

  /**
   * @description: 设置pointerDOM位置
   * @param: value 指针对应的value值
   * @param: pointer 被设置的DOM对象
   */
  private setPointerPos(value: number, pointer: any): void {
    let valuePercent: number;
    if (!Util.isUndefined(this.ratios)) {
      if (Util.isUndefined(this.ticks)) {
        return;
      }
      this.ticksArr = [];
      this.ticks.forEach((tick: string) => {
        if (!Util.isNull(tick)) {
          this.ticksArr.push(tick);
        }
      });
      const ticksArrLen: number = this.ticksArr.length;
      for (let i: number = 0; i < ticksArrLen - 1; i++) {
        if (value >= this.ticksArr[i] && value <= this.ticksArr[i + 1]) {
          valuePercent = this.getValuePercent(value, i);
        }
      }
    } else {
      valuePercent = (value - this.min) / (this.max - this.min);
    }
    // 计算value对应的百分比位置,并以tick中心点居中显示
    const pointerLeft: string = TiSliderComponent.parseToCalcStyle(valuePercent);
    this.renderer2.setStyle(pointer, 'left', pointerLeft);
  }

  /**
   * @description: 改变某一指针value值对应的指示位置
   * @param: value 指针对应的value值
   * @param: pointer 被设置的DOM对象
   */
  private valueToPosition(value: any, pointer: any): void {
    this.setPointerPos(value, pointer); // 设置pointer位置
    let styles: object; // 滑动轴有效区域背景 样式对象
    // 修复SSR报错：ERROR { Error: Uncaught (in promise): TypeError: this.pointerMaxEle.getBoundingClientRect is not a function
    if (typeof this.pointerMaxEle.getBoundingClientRect !== 'function') {
      return;
    }
    // 设置滑动轴有效区域背景
    const pointerMaxLeft: number = this.pointerMaxEle.getBoundingClientRect().left;
    const pointerMinLeft: number = this.pointerMinEle.getBoundingClientRect().left;
    const barWidth: number = this.getBarWidth();
    const barLeft: number = this.trackELe.getBoundingClientRect().left;
    const pointerWidthHalf: number = this.pointerMaxEleWidth / 2;
    if (this.isDouble) {
      styles = {
        width: `${((pointerMaxLeft - pointerMinLeft) * 100) / barWidth}%`,
        left: `${((pointerMinLeft - barLeft + pointerWidthHalf) * 100) / barWidth}%`
      };
    } else {
      styles = {
        width: `${((pointerMaxLeft - barLeft + pointerWidthHalf) * 100) / barWidth}%`,
        left: 0
      };
    }
    this.tiRenderer.setStyles(this.selectionEle, styles);
    this.setTip(pointer.querySelector('.ti3-slider-tip'), value);
  }

  /**
   * @description:设置Tip提示内容及位置
   * @param: curTipEle 要设置tip的元素
   * @param: value 设置tip内容对应的value值
   */
  private setTip(curTipEle: any, value: number): void {
    // 设置tip内容
    const tipContent: string = this.tipFormatterFn(value);
    curTipEle.innerHTML = this.domSanitizer.sanitize(SecurityContext.HTML, tipContent);

    // 设置当前tip位置
    const tipDisplay: string = getComputedStyle(curTipEle).display;
    this.show(curTipEle); // 先把tip显示出来 才能获取宽度
    const tipContentWidth: number = curTipEle.getBoundingClientRect().width;
    const styles: { left: string; display: string } = {
      left: `${-(tipContentWidth - this.pointerMaxEleWidth) / 2 - 1}px`, // 定位受border的影响，需要减去border的宽度 1px
      display: tipDisplay // 设置回原来的display
    };
    this.tiRenderer.setStyles(curTipEle, styles);
    // tip重合情况处理  (双滑块并且tip是一直显示出来那种场景)
    if (this.isDouble && !this.isTipAutoShow) {
      /**
       * @description: 渲染当前的tip样式 （移除一个class并且添加一个class）
       * @param: tipEle 当前tipDOM
       * @param: removeClass 要移除的class名字
       * @param: addClass 要添加的class名字
       */
      const renderTipStyle: (tipEle: any, removeClass: string, addClass: string) => void = (
        tipEle: any,
        removeClass: string,
        addClass: string
      ): void => {
        this.renderer2.removeClass(tipEle, removeClass);
        this.renderer2.addClass(tipEle, addClass);
      };
      // 重置tip样式，防止之前样式设置造成的影响  ti3-slider-tip-top
      renderTipStyle(this.tipMaxEle, 'ti3-slider-tip-bottom', 'ti3-slider-tip-top');
      renderTipStyle(this.tipMinEle, 'ti3-slider-tip-bottom', 'ti3-slider-tip-top');
      this.show(this.tipMaxEle);
      this.show(this.tipMinEle);

      // 最大最小值重合情况下，只显示当前tip
      const selectionWidth: number = this.selectionEle.getBoundingClientRect().width;
      if (selectionWidth === 0) {
        if (this.tiRenderer.hasClass(curTipEle, 'ti3-slider-tip-max')) {
          // 当前tip是最大值的 隐藏最小值tip
          this.hide(this.tipMinEle);
        } else {
          // 当前tip是最小值的 隐藏最大值tip
          this.hide(this.tipMaxEle);
        }

        return;
      }
      // tip重合情况下，当前tip向下显示
      const tipMaxWidth: number = this.tipMaxEle.getBoundingClientRect().width;
      const tipMinWidth: number = this.tipMinEle.getBoundingClientRect().width;
      if ((tipMaxWidth + tipMinWidth) / 2 >= selectionWidth) {
        renderTipStyle(curTipEle, 'ti3-slider-tip-top', 'ti3-slider-tip-bottom');
      }
    }
  }
}
