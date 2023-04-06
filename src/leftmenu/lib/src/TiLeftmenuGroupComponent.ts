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
import { TiLeftmenuLevel1Component } from './TiLeftmenuLevel1Component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
/**
 * TiLeftmenuGroup 是分组菜单组件，嵌在 TiLeftmenu组件中使用。
 *
 *
 */
@Component({
  selector: 'ti-leftmenu-group',
  templateUrl: './leftmenu-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiLeftmenuGroupComponent extends TiBaseComponent {
  /**
   * @ignore
   * 设置当前分组菜单项是否展开
   */
  @Input() expanded: boolean = false;
  /**
   * @ignore
   * 当前TiLeftmenuGroup下的所有TiLeftmenuLevel1的集合
   */
  public children: Array<TiLeftmenuLevel1Component> = [];
  protected versionInfo: string = super.getVersion(packageInfo);

  constructor(elementRef: ElementRef, renderer2: Renderer2, public changeRef: ChangeDetectorRef) {
    super(elementRef, renderer2);
  }

  ngAfterViewInit(): void {
    if (this.nativeElement.parentNode.parentNode.nodeName === 'TI-LEFTMENU-LEVEL1') {
      this.renderer.addClass(this.nativeElement, 'ti3-leftmenu-level2-group');
    }
  }

  /**
   * @ignore
   * 在模板中使用，当前分组中的子项是否有激活项
   */
  public hasActivedChild(): boolean {
    if (!this.children || this.children.length <= 0) {
      return false;
    }

    for (const level1 of this.children) {
      if (level1.isActived || level1.hasActivedChildren()) {
        return true;
      }
    }

    return false;
  }
}
