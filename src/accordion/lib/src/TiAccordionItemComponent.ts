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
  Inject,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { TiAccordionComponent } from './TiAccordionComponent';
import { TiBaseComponent } from '@opentiny/ng-base';
import { animate, state, style, transition, trigger } from '@angular/animations';
import packageInfo from '../package.json';

export interface TiAccordionHeadClickEvent extends Event {
  /**
   * 当前面板打开状态
   */
  open?: boolean;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
/**
 * @ignore
 */
export const animateStyle: string = '0.15s cubic-bezier(0.645, 0.045, 0.355, 1)';

/**
 * 定义手风琴组件单个折叠面板，该组件包含在ti-accordion标签中
 */
@Component({
  selector: 'ti-accordion-item',
  templateUrl: './accordion-item.html',
  styleUrls: ['./accordion.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('accordionAnimate', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: 0, overflow: 'hidden', borderTopWidth: 0 })),
      transition('expanded => collapsed', animate(animateStyle)),
      transition('collapsed => expanded', animate(animateStyle))
    ])
  ],
  host: {
    '[class.ti3-accordion-panel]': 'true',
    '[class.ti3-accordion-panel-disabled]': 'disabled'
  }
})
export class TiAccordionItemComponent extends TiBaseComponent {
  /**
   * 是否禁用
   */
  @Input() disabled: boolean = false;
  /**
   * 点击面板标题时是否展开、收起面板内容区域。注意：若设置为false，仍可通过属性open实现变更面板状态
   */
  @Input() clickToggle: boolean = true;
  /**
   * 点击面板标题时触发的回调
   */
  @Output() readonly headClick: EventEmitter<TiAccordionHeadClickEvent> = new EventEmitter();

  /**
   * @ignore
   * 头部class,需要显示声明，否则ngClass会报错
   */
  public headClass: string = '';
  /**
   * @ignore
   * body class,需要显示声明，否则ngClass会报错
   */
  public bodyClass: string = '';
  protected versionInfo: string = super.getVersion(packageInfo);
  /**
   * @ignore
   * 依赖注入tiAccordion（后续使用其方法）
   */
  constructor(
    hostRef: ElementRef,
    renderer: Renderer2,
    @Inject(TiAccordionComponent) private accordion: TiAccordionComponent,
    private changeRef: ChangeDetectorRef
  ) {
    super(hostRef, renderer);
  }

  // 面板展开状态获取/设置：此处处理涉及到内部和外部修改，因此此处通过set/get进行处理
  private isOpen: boolean = false;
  /**
   * 单个折叠面板是否处于展开状态，用于初始化设置，默认值为false
   *
   */
  @Input()
  /**
   * @ignore
   */
  get open(): boolean {
    return this.isOpen;
  }
  /**
   * @ignore
   */
  set open(value: boolean) {
    if (value !== this.open) {
      if (value) {
        // open属性更新且open值为true时，处理其它item的关闭状态
        this.accordion.closeOtherItems(this);
      }
      this.isOpen = value;
      // open变化时触发变更检测
      this.changeRef.markForCheck();
    }
  }

  // 初始化处理：添加当前item到列表中,设置该item的id值
  ngOnInit(): void {
    super.ngOnInit();
    this.accordion.addItem(this);
    this.headClass = this.accordion.headClass;
    this.bodyClass = this.accordion.bodyClass;
  }

  // item销毁处理：移除item列表中的该项数据
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.accordion.removeItem(this);
  }

  /**
   * @ignore
   * item头部点击事件逻辑处理
   */
  toggleOpen($event: TiAccordionHeadClickEvent): void {
    if (this.disabled) {
      return;
    }
    if (this.clickToggle) {
      this.open = !this.open;
    }

    $event.open = this.open; // 将当前面板展开状态通知出去
    this.headClick.emit($event);
  }
}
