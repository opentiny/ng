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
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { TiFormfieldComponent } from './TiFormfieldComponent';
import { Util } from '@opentiny/ng-utils';
import { Subscription } from 'rxjs';

/**
 * 本组件嵌在 tiFormfield 中使用，包裹着单个表单条目的所有内容
 */
@Component({
  selector: 'ti-item',
  templateUrl: './formfield-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiItemComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * 表单项是否必填
   */
  @Input() required: boolean = false;
  /**
   * 表单项在垂直方向的对齐方式，纵向布局表单不支持，优先级高于 ti-formfield 中的 verticalAlign 属性
   */
  @Input() verticalAlign: 'top' | 'middle' | 'bottom';
  /**
   * 表单项是否显示
   */
  @Input() show: boolean = true;
  /**
   * 合并行数
   */
  @Input() rowspan: number = 1;
  /**
   * 合并列数
   */
  @Input() colspan: number = 1;
  /**
   * 表单项在 ti-formfield 中的展示顺序，数值越大越靠后展示
   */
  @Input() index: number;
  /**
   * @ignore
   * tiItem的索引值，用于控制其显示时的位置顺序
   */
  public itemIndex: number;
  /**
   * @ignore
   */
  public verticalAlignObj: { 'vertical-align'?: string };
  /**
   * @ignore
   */
  public itemStyle: { 'grid-area'?: string };
  /**
   * @ignore
   */
  public labelStyle: {
    'vertical-align'?: string;
    width?: string;
    'line-height'?: string;
  };
  /**
   * @ignore
   */
  public contentStyle: {
    'vertical-align'?: string;
    'line-height'?: string;
    width?: string;
  };
  /**
   * @ignore
   */
  public element: HTMLElement;
  /**
   * @ignore
   */
  public itemLabel: string | Node;
  /**
   * @ignore
   */
  public hasLabel: boolean = false;
  /**
   * @ignore
   */
  public gapWidth: string = '0px';
  private subscription: Subscription;
  constructor(public formfield: TiFormfieldComponent, private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) {}

  // 有两处改变label
  // 1. label接口传入的值
  // 2. 在ti-item-label组件中修改label的值
  /**
   * 表单项的 Label 内容
   */
  @Input()
  set label(labelParm: string | Node) {
    this.setItemLabel(labelParm);
  }

  ngOnInit(): void {
    this.formfield.itemTotal++;
    this.decorateItem();
    if (this.show) {
      this.formfield.addCntItem(this);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const showObj: SimpleChange = changes['show'];
    const requiredObj: SimpleChange = changes['required'];
    if (showObj && !showObj.firstChange) {
      if (showObj.currentValue) {
        this.formfield.addCntItem(this);
      } else {
        this.formfield.removeCntItem(this);
      }
    }

    if (requiredObj && !requiredObj.firstChange) {
      // onpush策略 tiItem 的required改变时无法触发 tiFormfield 的变化检测，需要手动给formfiled标志一下本次变化检测tiFormfield需要进行变化检测
      this.formfield.changeDetector.markForCheck();
    }
  }

  ngOnDestroy(): void {
    // 在外部将ti-iem销毁时，应将此item从items数组中去掉
    this.formfield.removeCntItem(this);
    this.changeDetector.detach();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private decorateItem(): void {
    this.itemIndex = Util.isNumber(this.index) ? this.index : this.formfield.itemTotal - 1;
    this.element = this.elementRef.nativeElement;
    this.verticalAlignObj = Util.isUndefined(this.verticalAlign) ? {} : { 'vertical-align': this.verticalAlign };

    // item-label的自定义的样式（垂直对齐方式、宽度）
    this.labelStyle = {
      'vertical-align': this.verticalAlign,
      width: this.formfield.labelWidth
    };

    this.subscription = this.formfield.labelWidthSubject.subscribe((value: string) => {
      this.labelStyle.width = value;
    });

    // item-content的自定义的样式（垂直对齐方式）
    this.contentStyle = {
      'vertical-align': this.verticalAlign
    };
    // 为纯文本描述类表单时，可设置 item 的行高
    if (this.formfield.type === this.formfield.textType && !Util.isUndefined(this.formfield.textLineHeight)) {
      const customLineStyle = {
        'line-height': this.formfield.textLineHeight,
        'padding-top': 0,
        'padding-bottom': 0
      };
      this.labelStyle = { ...(this.labelStyle || {}), ...customLineStyle };
      this.contentStyle = { ...(this.labelStyle || {}), ...customLineStyle };
    }

    // item 自定义行列合并样式
    if (this.formfield.useGrid) {
      this.itemStyle = {
        'grid-area': `span ${this.rowspan} / span ${this.colspan}`
      };
    }
  }

  private setItemLabel(label: string | Node): void {
    if (label) {
      this.hasLabel = true;
      this.itemLabel = label;
    } else {
      this.hasLabel = false;
    }
    // onpush策略 无法通知formfiled值变更，需要手动使formfiled强制变更检测一次
    this.formfield.changeDetector.detectChanges();
    this.changeDetector.detectChanges();
  }
}
