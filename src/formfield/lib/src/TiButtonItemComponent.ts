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
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { TiFormfieldComponent } from './TiFormfieldComponent';

/**
 * 本组件嵌在 tiFormfield 中使用，包裹着表单按钮
 */
@Component({
  selector: 'ti-button-item',
  templateUrl: './formfield-btn-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiButtonItemComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * 每一个ti-item占4个td。第一个td用来显示“*”，第二个td用来显示label，
   * 第三个td用来显示content, 第四个td是item间距。
   */
  private static readonly TD_NUM_PER_ITEM: number = 4;
  /**
   * 表单项是否显示
   */
  @Input() show: boolean = true;
  /**
   * 表单项在垂直方向的对齐方式，纵向布局表单不支持，优先级高于 ti-formfield 中的 verticalAlign 属性
   */
  @Input() verticalAlign: 'top' | 'middle' | 'bottom';
  /**
   * @ignore
   */
  public verticalAlignObj: { 'vertical-align'?: string } = {};
  /**
   * @ignore
   */
  public btnContent: Node;
  /**
   * @ignore
   */
  public btnColspan: number;
  constructor(private formfield: TiFormfieldComponent, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.btnContent = this.elementRef.nativeElement;
    this.btnColspan = (this.formfield.colsNum - 1) * TiButtonItemComponent.TD_NUM_PER_ITEM + 2;
    if (this.verticalAlign) {
      this.verticalAlignObj['vertical-align'] = this.verticalAlign;
    }

    if (this.show) {
      this.formfield.addBtnItem(this);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const showObj: SimpleChange = changes['show'];

    if (showObj && !showObj.firstChange) {
      if (showObj.currentValue) {
        this.formfield.addBtnItem(this);
      } else {
        this.formfield.removeBtnItem(this);
      }
    }
  }

  ngOnDestroy(): void {
    this.formfield.removeBtnItem(this);
  }
}
