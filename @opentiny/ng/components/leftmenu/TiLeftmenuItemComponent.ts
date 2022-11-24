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
  ChangeDetectionStrategy
} from '@angular/core';
/**
 * TiLeftmenuItem 是一级菜单文本内容组件，嵌在 TiLeftmenuLevel1Component组件中使用，其包裹的元素会作为 leftmenu 的一级菜单的菜单项内容显示
 */
@Component({
  selector: 'ti-leftmenu-item',
  templateUrl: './leftmenu-item.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-leftmenu-level1-label]': 'element.textContent!==""'
  }
})
export class TiLeftmenuItemComponent {
  /**
   * @ignore
   */
  public element: any;
  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }
}
