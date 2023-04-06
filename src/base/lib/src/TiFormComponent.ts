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
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  Type
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TiBaseComponent } from './TiBaseComponent';
import { TiBrowser } from '@opentiny/ng-utils';

// SSR环境需要
declare let global: any;

// TODO: aria-label
/**
 * 表单基类，已实现autofocus tabindex disabled focus() blur() focus/blur/change事件 ControlValueAccessor
 */
@Component({
  // lib编译要求@Component
  selector: 'ti-form',
  template: ''
})
export class TiFormComponent extends TiBaseComponent implements ControlValueAccessor {
  /**
   * HTML 属性 tabindex
   */
  @Input() tabindex: string = '0';
  /**
   * 是否禁用
   */
  @Input() disabled: boolean; // 因为Angualr原生[disabled]->setDisabledState机制在单选多选没有生效。所以，这里接管了。
  /**
   * HTML 事件 focus
   */
  // TODO：ip组件等是触发原生HTML的focus事件，便于校验？
  @Output('focus') readonly focusEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /**
   * HTML 事件 blur
   */
  @Output('blur') readonly blurEvent: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /**
   * @ignore
   * HTML 事件 change
   */
  // blur时model值改变触发change
  @Output('change') readonly changeEvent: EventEmitter<any> = new EventEmitter<any>();

  private unlistenMap: Map<HTMLElement, () => void> = new Map<HTMLElement, () => void>(); // 执行此函数，可以取消监听focus和blur

  private focusModel: any; // 落焦点时，记录model值

  protected focusElem: any; // autofocus focus()将要聚焦的元素。默认是宿主元素，子类设置focusableElems后，为第一个非disabled可聚焦元素。
  /**
   * 整体focus/blur事件参与的元素，和disabled设置。
   * 组件具有多个input输入框:
   * 1)无元素聚焦->任一元素聚焦=整体聚焦事件。
   * 2)任一元素失焦->其他元素无焦点=整体失焦事件。
   */
  private focusableElems: Array<any> = [];
  // 实现表单4接口1注册
  private _model: any; // 传入模型值
  private ngAfterViewCheckedFirst: boolean = true; // 是否第一次执行初始化

  constructor(protected hostRef: ElementRef, protected renderer: Renderer2, protected changeDetectorRef: ChangeDetectorRef) {
    super(hostRef, renderer);
  }

  protected onModelChange: (model: any) => void; // 模型change回调函数，触发模型值改变
  protected onModelTouched: () => void; // 模型blur回调函数，触发校验
  protected focusedElem: any; // 已聚焦元素, 在子组件中有使用
  /**
   * @ignore
   * 实现表单注册接口
   * @param type 类型
   * @returns 对象
   */
  public static getValueAccessor(type: Type<any>): any {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => type),
      multi: true
    };
  }
  /**
   * 是否组件整体聚焦
   */
  public get focused(): boolean {
    return this.nativeElement.attributes.tiFocused !== undefined;
  }
  /**
   * 为Dom元素添加/移除属性，此处用于disabled和focused属性的操作
   * @param  element 需要操作的Dom元素
   * @param  attr 操作的属性
   * @param  value 属性值，为true时属性值即为属性值,为false时，移除属性
   */
  protected setAttr(element: any, attr: string, value: boolean): void {
    // 如果可聚焦元素是原生input等，[disabled]属性会生效。
    // this.renderer.setProperty(this.focusElem, 'disabled', isDisabled); // 参照angular官方设置disabled源码，true和fasle都考虑了
    // 如果可聚焦元素是组件、div，[disabled]属性不会生效。但setAttribute会增加一项html属性。setProperty不增加。
    if (value) {
      this.renderer.setAttribute(element, attr, attr);
    } else {
      this.renderer.removeAttribute(element, attr);
    }
  }
  ngOnInit() {
    super.ngOnInit();
    // 表单中统一加该属性，用于表单校验中的样式选择器
    this.renderer.setAttribute(this.nativeElement, 'tiForm', '');
  }
  /**
   * 监听disabled变化
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['disabled']) {
      this.setDisabledState(changes['disabled'].currentValue);
    }
  }
  /**
   * 注意：子类继承自Form基类，如果有this.setFocusableElems([xxx]), 那么要更晚调用super.ngAfterViewChecked()。
   * 子类ngAfterViewChecked(): void {
   *      this.setFocusableElems([xxx]);
   *      // 更晚调用super
   *      super.ngAfterViewChecked();
   * }
   */
  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    if (this.ngAfterViewCheckedFirst) {
      this.ngAfterViewCheckedFirst = false;
      // 尽量延迟autoFocus的执行。因为有些组件在ngAfterViewInit才拿得到ngFor ngIf内的元素作为可聚焦元素。
      this.autoFocus();
    }
  }
  /**
   * 当做生命周期用吧，监听模型值变化。包括writeValue和this.model=赋值 这两个时刻。
   * @param model 模型值
   */
  protected ngOnModelChange(model: any): void {}
  /**
   * 设置tab键/点击时的聚焦元素，会顺便设置组件focus()聚焦时可聚焦元素（第一个非disabled的可聚焦元素）。
   * 当可聚焦元素变动，或者单一元素disabled状态变动，都要重新调用此方法设置。
   * 建议一般在ngOnInit生命周期调用，如果ngFor/ngIf内元素在ngOnInit找不到那么可在ngAfterViewInit生命周期调用。
   * 注意：所有生命周期，都要调用类似super.ngOnInit()
   *
   * @param elems 可聚焦元素数组Array<Element>，第一个非disabled元素为整个组件的可聚焦元素。
   *
   * 目前使用分为几种情况：
   * 1）一般表单组件，含有可聚焦子元素。
   * 组件主动设置可聚焦元素数组this.setFocusableElems([xxxElement, yyyElement]);
   * 2）有的表单组件，永远不聚焦。
   * slider/list/menulist/droplist，统一不调用此接口。
   * a.不调用接口时，@Input() tabindex: string = '0';未生效。但用户在html标签上设置的属性tabindex="0"等，会生效。
   * b.调用了this.setFocusableElems([]);时，强制清除了标签属性tabindex。用户设置的属性tabindex="1"，会无效，不出现在标签上。
   * 3）少量组件，内部没有可聚焦元素。但是皮儿需要聚焦，ti-dominator。
   * 需要设置this.setFocusableElems([this.nativeElement]);
   */
  protected setFocusableElems(elems: Array<any>): void {
    if (!elems) {
      // 不支持组件传入 null 和undefined，支持传入[]
      return;
    }
    // TODO: 第二次调用时，如果焦点元素减少，那么需要处理tabindex
    // TODO: 支持用户动态第二次设置setFocusableElems。其实，actionmenu会动态设置
    this.focusableElems = elems;
    // 将要上焦点的元素
    this.setFocusElem();
    // 给所有子元素添加tabindex。
    this.setElemsTabindex();
    // 设置宿主标签上的focus()/blur()方法
    this.setNativeElementFocusFn();
    // 设置focus/blur事件监听
    this.setFocusListen();
  }
  /**
   *  调用focus()函数，会触发组件整体聚焦，此时焦点元素。
   */
  private setFocusElem(): void {
    this.focusElem = undefined;
    // 寻找第一个非disabled元素，作为可聚焦元素
    for (const elem of this.focusableElems) {
      // 正常态选取第一个非禁用元素落焦点。禁用态选第一个元素即可。
      if (elem && (elem.attributes.disabled === undefined || this.disabled)) {
        this.focusElem = elem;
        break;
      }
    }
  }
  /**
   * 去除皮上的tabindex，给内部可聚焦子元素添加tabindex
   * 当然，特殊情况：this.setFocusableElems([this.nativeElement]);时，又会给皮上补上tabindex
   * 本来此方法，可以合入setFocusEvents()，减少遍历循环。但为了清晰，依然单独为函数。
   */
  private setElemsTabindex(): void {
    // 去除组件标签上的tabindex属性。
    this.renderer.removeAttribute(this.nativeElement, 'tabindex');
    this.focusableElems.forEach((elem: any) => {
      // 给每一个元素添加tabindex
      this.setTabindex(elem);
    });
  }
  /**
   * @ignore
   */
  public getFocusableElems(): Array<any> {
    return this.focusableElems;
  }
  /**
   * 宿主元素标签上添加类似原生focus()方法。
   * 用户调用方法: document.getElementById('ti-xxx').focus();
   * 其实，更推荐调用组件实例上的方法tiXxxComp.focus();
   */
  private setNativeElementFocusFn(): void {
    // 注意：这里必须用箭头函数，以保证运行时this变量不变。
    if (this.focusElem !== this.nativeElement) {
      // 避免无限循环调用，所以要有此条件限制
      // SSR环境直接返回，是因为SSR环境报错：Cannot assign to read only property 'focus' of object
      // 采用['nativeElement']['focus']也解决不了
      if (typeof global !== 'undefined') {
        return;
      }
      this.nativeElement.focus = (): void => {
        this.focus();
      };
      this.nativeElement.blur = (): void => {
        this.blur();
      };
    }
  }
  /**
   * 设置组件中的可聚焦元素并监听事件
   */
  private setFocusListen(): void {
    // 原来：先取消所有旧监听，再建立所有新监听。在onpush select分页有问题，select没有监听到focus事件。
    // 原因不明，貌似js执行了多线程一般，A线程setFocusElems取消监听再建立监听，B线程就没有监听到。
    // 改为：如果这个元素，新旧监听都有，那么就不取消监听了，直接保留原监听。

    // 先遍历去除监听。
    this.unlistenMap.forEach((value: () => void, key: HTMLElement, map: Map<HTMLElement, () => void>) => {
      if (!this.focusableElems.includes(key)) {
        // 解除监听
        value();
        // 从map中移除
        this.unlistenMap.delete(key);
      }
    });

    // 再遍历添加监听。
    this.focusableElems.forEach((elem: HTMLElement) => {
      // 如果不存在，则添加到map
      if (!this.unlistenMap.has(elem)) {
        // 监听focus,并获得取消监听句柄
        const unlistenFocusFn: () => void = this.renderer.listen(elem, 'focus', this.focusCallbackFn);
        // 监听blur,并获得取消监听句柄
        const unlistenBlurFn: () => void = this.renderer.listen(elem, 'blur', this.blurCallbackFn);
        // 取消监听focus和blur的函数
        const unlistenFocusBlurFn: () => void = () => {
          unlistenFocusFn();
          unlistenBlurFn();
        };
        // 存入map，按照元素和取消监听函数。
        this.unlistenMap.set(elem, unlistenFocusBlurFn);
      }
    });
  }
  /**
   * focus回调函数
   */
  private focusCallbackFn: (event: FocusEvent) => void = (event: FocusEvent) => {
    this.focusedElem = event.target;
    // 非IE浏览器支持event.relatedTarget，使用event.relatedTarget进行处理
    if (!TiBrowser.isIE()) {
      // 当为内部焦点转移，不做处理
      if (this.focusableElems.length > 1 && this.focusableElems.includes(event.relatedTarget)) {
        return;
      }
    } else {
      // IE浏览器的处理：浏览器不支持relatedTarget情况下的处理，参见blur中的说明
      if ((event.target as any).tiFocusFrom) {
        // return;
        // 情况一：失焦后强制聚焦
        if (event.target === (event.target as any).tiFocusFrom) {
          // 面板滚动条IE兼容：在focusin中，让失焦元素强制聚焦，会走到这里。

          return;
        }
        // 情况二：内部焦点转移
        if (this.focusableElems.length > 1 && this.focusableElems.includes((event.target as any).tiFocusFrom)) {
          return;
        }
        // 情况三：较难理解：外部焦点转移时，(event.target as any).tiFocusFrom也是有值的。
        // 这种情况，是因为组件嵌套使用，此聚焦元素分别从属于多个组件。
        // 对于A组件来说，是焦点内部转移。对于B组件来说，是焦点外部转移。
      }
    }
    // 设置宿主元素的聚焦属性，用于标识该组件处于聚焦状态，该属性可用于css选择器：在宿主元素上增加属性focused
    this.setAttr(this.nativeElement, 'tiFocused', true);
    // dateDominator需要根据是否聚焦来判断显示日期图标还是叉号图标，若不做标记，无法识别此变更点。
    this.changeDetectorRef.markForCheck();
    // 触发整体聚焦事件
    this.focusEvent.emit(event);
    // 保存focus时model值，blur时如果model值改变，则发送change事件
    this.focusModel = this.model;
  };
  /**
   * blur 回调函数
   */
  private blurCallbackFn: (event: FocusEvent) => void = (event: FocusEvent) => {
    // 非IE浏览器支持event.relatedTarget，使用event.relatedTarget进行处理
    if (!TiBrowser.isIE()) {
      // 当为内部焦点转移，不做处理
      if (this.focusableElems.length > 1 && this.focusableElems.includes(event.relatedTarget)) {
        return;
      }
    } else {
      // 已经失焦的元素，清除记录焦点从哪里而来。
      (event.target as any).tiFocusFrom = undefined;

      // 如果失焦元素强制聚焦，不触发整体失焦事件。
      if (event.target === document.activeElement) {
        // 面板滚动条IE兼容：在focusin中，让失焦元素强制聚焦，会走到这里。
        // 即将聚焦（实际上已经聚焦）的元素，记录一下焦点从哪儿来：从自己来的
        (document.activeElement as any).tiFocusFrom = event.target;

        return;
      }

      // 浏览器不支持relatedTarget:IE下不支持
      // 判断是否为内部焦点转移通过元素方法：
      // 两个元素的焦点切换时，会先触发a元素的失焦，再触发b元素的聚焦
      // a失焦处理：当前聚焦元素为该元素的可聚焦元素时，则认为是内部焦点转移，并且将聚焦元素的relatedTarget赋值为当前失焦元素，方便blur时的处理；
      // b聚焦处理：判断当前聚焦元素的relatedTarget是否为内部可聚焦元素，如果是的话，则判定其为内部焦点转移
      if (this.focusableElems.length > 1 && this.focusableElems.includes(document.activeElement)) {
        // 即将聚焦（实际上已经聚焦）的元素，记录一下焦点从哪儿来。
        (document.activeElement as any).tiFocusFrom = event.target; // element setAttribute赋值不支持对象形式，因此使用该方式

        return;
      }
    }
    this.focusedElem = undefined;
    // 取消宿主元素的聚焦属性
    this.setAttr(this.nativeElement, 'tiFocused', false);
    // dateDominator需要根据是否聚焦来判断显示日期图标还是叉号图标，若不做标记，无法识别此变更点。
    this.changeDetectorRef.markForCheck();
    // 触发整体失焦事件
    this.blurEvent.emit(event);
    // blur时如果model值改变，则发送change事件
    if (this.model !== this.focusModel) {
      this.changeEvent.emit(this.model);
    }
    // 触发组件的touched回调，标志其已被touch过
    if (this.onModelTouched) {
      this.onModelTouched();
    }
  };
  /**
   * 给元素设置焦点
   */
  public focus(): void {
    if (this.focusElem) {
      this.focusElem.focus();
    }
  }
  /**
   * 给元素移除焦点
   */
  public blur(): void {
    if (this.focusedElem) {
      this.focusedElem.blur(); // 只对当前聚焦元素进行失焦处理
    }
  }
  /**
   * Tiny组件各种行为，尽量和原生一致。 autofocus也许可以做成一个指令
   */
  private autoFocus(): void {
    if (this.nativeElement.attributes.autofocus) {
      this.focus();
    }
  }
  /**
   * 实现类表单组件的set和get方法
   */
  get model(): any {
    return this._model;
  }
  /**
   * 设置model值，如果有变化，则触发ngModelChange
   */
  set model(model: any) {
    if (this._model === model) {
      return;
    }
    this._model = model;
    if (this.onModelChange) {
      this.onModelChange(model);
    }
    this.ngOnModelChange(model);
  }
  /* 表单4接口start */
  /**
   * @ignore
   * 如果用户改变了[ngModel]绑定的变量，那么Angular会通知到这里
   * 子类如果没有特殊需求，都需要首行调用super.writeValue（xxx）
   *
   * super.writeValue 和 this.model=xxx的区别：
   * super.writeValue不会触发ngModelChange
   * this.model=xxx会触发ngModelChange
   * @param model any类型
   */
  writeValue(model: any): void {
    this._model = model;
    this.ngOnModelChange(model);

    // Onpush模式，强制刷新
    this.changeDetectorRef.markForCheck();
    // OnPush模式仅监测四种变化：
    // @Input引用变化
    // 本组件和子组件的事件
    // markForCheck/detectChanges
    // 异步Pipe

    // OnPush模式缺陷:没有监测ngmodel变化，也没有检测setTimeout等异步
  }
  /**
   * @ignore
   * Angular将(ngModelChange)绑定的函数，通知到这里。
   * 当组件内部model值改变，需要调用这个函数向外通知。
   * @param fn 回调函数
   */
  registerOnChange(fn: (model: any) => void): void {
    this.onModelChange = fn;
  }
  /**
   * @ignore
   * Blur时，或者需要校验时，需要调用此函数。（可能描述不准确，需要再查资料）
   * @param fn 回调函数
   */
  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }
  /**
   * @ignore
   * 用户绑定在[disabled]上的变量变化，会通知到这里。
   * ti-xxx组件皮上设置[disabled]，会给皮上设置disabled属性，也会给所有可聚焦元素设置disabled属性。
   * 如有特殊需求，子类可以不使用super.setDisabledState(), 而是直接覆盖。
   * Angular原生[disabled]机制：checkbox/radio走不进原生setDisabledState()。原生[disabled][id]等取值也很晚。
   * 注意: Form基类@Input() disabled已经接管了Angular原生[disabled]机制。
   * ngOnChanges监听到disabled值（第一次和后续改变），会通知到这里。
   * @param isDisabled 是否禁用
   */
  setDisabledState?(isDisabled: boolean): void {
    // 表单this.form.controls.myselect.disable();会直接通知到这里，但不会通知到ngOnChanges。所以要设置this.disabled =
    this.disabled = isDisabled;
    // 给宿主添加disabled属性
    this.setAttr(this.nativeElement, 'disabled', isDisabled);
    // 给聚焦事件元素添加disabled属性
    this.focusableElems.forEach((element: any) => {
      this.setAttr(element, 'disabled', isDisabled);
      // 如果可聚焦元素是自定义组件、div等，那么标签上的disabled属性不生效。
      // 需要借助于tabindex控制是否允许焦点。
      // 控制禁用样式，方案一：（推荐）less里[disabled]属性模仿伪类，ti-xxx皮上的[disabled]更可靠
      // 方案二：html的ngClass用Form基类disabled变量。
      this.setTabindex(element);
    });
  }
  /**
   * 设置tabindex
   * @param element 原生标签元素
   */
  private setTabindex(element: any): void {
    // 整体禁用，或者小元素被禁用。
    if (element.attributes.disabled) {
      // 禁用时
      this.renderer.removeAttribute(element, 'tabindex');
      // A和input已经有disabled属性了，不需要加tabindex
      // 普通元素，也不需要加tabindex

      // A标签禁用时想要点击和tab都不落焦点，唯一方法是去除href
      if (element.tagName === 'A') {
        this.renderer.removeAttribute(element, 'href');
      }
    } else {
      if (element.tagName === 'A') {
        // 特例：A标签不设置tabindex='0'。Chrome浏览器不设置tabindex效果：点击时无蓝框，tab时有蓝框。
        if (this.tabindex === '0') {
          this.renderer.removeAttribute(element, 'tabindex');
        } else {
          this.renderer.setAttribute(element, 'tabindex', this.tabindex);
        }
        // disabled时去除的href，添加回来
        if (!element.attributes.href) {
          // 默认所有的A标签都是tiny使用的标签，href都是javascript:void(0)
          this.renderer.setAttribute(element, 'href', 'javascript:void(0)');
        }
      } else {
        this.renderer.setAttribute(element, 'tabindex', this.tabindex);
      }
    }
  }
  /* 表单4接口end */
}
/**
 * tabindex相关知识：
 * 所有已设置tabindex的元素，都会点击聚焦。哪怕<div tabindex="-1">test</div>也会点击聚焦。
 * Tab键，会按照顺序聚焦：1,2,3,4，...0，按照此顺序聚焦。
 * tabindex='-1'不参与Tab键, 但是可以点击聚焦。
 * A标签不设置tabindex效果：Chrome浏览器点击时无蓝框，tab时有蓝框。其他浏览器有差异。
 * A标签禁用时想要点击和tab都不落焦点，唯一方法是去除href
 * input标签不设置tabindex效果：Chrome浏览器点击时/tab时都有蓝框。
 * 如果设置tabindex='',或者tabindex='tabindex'，这样非法设置，Chrome相当于没有设置。其他浏览器有差异
 */
