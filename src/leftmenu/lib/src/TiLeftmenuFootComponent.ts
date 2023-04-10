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
import { TiLeftmenuComponent } from './TiLeftmenuComponent';
import { Component, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'ti-leftmenu-foot',
  templateUrl: './leftmenu-foot.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-leftmenu-foot]': 'true'
  }
})
export class TiLeftmenuFootComponent {
  constructor(private renderer2: Renderer2, private elementRef: ElementRef, private tiLeftmenu: TiLeftmenuComponent) {}

  ngAfterViewInit(): void {
    const templateDom: any = this.renderer2.createElement('div');
    const panelDom: any = this.tiLeftmenu.nativeElement.querySelector('.ti3-leftmenu-panel');
    const hostElement: any = this.elementRef.nativeElement;
    // 修复SSR错误：ERROR ReferenceError: getComputedStyle is not defined
    const spaceRight: string =
      typeof getComputedStyle === 'function' ? getComputedStyle(hostElement).getPropertyValue('stroke-width') : '0';

    this.renderer2.setStyle(templateDom, 'height', hostElement.offsetHeight + 'px');
    this.renderer2.appendChild(panelDom, templateDom);

    this.renderer2.setStyle(hostElement, 'width', `calc(100% - ${this.tiLeftmenu.scrollWidth}px)`);
    this.renderer2.setStyle(hostElement, 'marginRight', `${this.tiLeftmenu.scrollWidth}px`);
    this.renderer2.setStyle(hostElement, 'paddingRight', `calc(${spaceRight} - ${this.tiLeftmenu.scrollWidth}px)`);
  }
}
