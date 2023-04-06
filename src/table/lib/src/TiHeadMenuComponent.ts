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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiDropComponent } from '@opentiny/ng-drop';
import { TiLocale } from '@opentiny/ng-locale';
import packageInfo from '../package.json';
/**
 * TiHeadMenu 表头下拉菜单组件，搭配表头复选 tiCheckGroup 组件使用
 *
 *
 * 嵌在表头的th中使用，点击该组件时打开下拉操作菜单项面板
 *
 * 组件有默认下拉菜单项，也可支持自定义下拉菜单项
 */
@Component({
  selector: 'ti-head-menu',
  templateUrl: './head-menu.html',
  styleUrls: ['./head-menu.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TiHeadMenuComponent extends TiBaseComponent {
  /**
   * 下拉菜单项的数据集合
   */
  @Input() options: Array<any>;
  /**
   * 选中菜单项时触发的回调，参数为该菜单项数据
   */
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  /**
   * @ignore
   */
  @ViewChild(TiDropComponent, { static: true }) dropCom: TiDropComponent;
  /**
   * @ignore
   */
  public dominatorSpace: string = '8px';
  /**
   * @ignore
   */
  public selected: any;
  protected versionInfo: string = super.getVersion(packageInfo);

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.options) {
      // 默认菜单项
      this.options = [
        {
          key: 'checkAll',
          label: TiLocale.getLocaleWords().tiTable.headMenuSelectAll
        },
        {
          key: 'uncheckAll',
          label: TiLocale.getLocaleWords().tiTable.headMenuClearAll
        }
      ];
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const parent: any = this.nativeElement.parentElement; // 表头单元格th
    if (parent?.hasAttribute('checkbox-column')) {
      this.renderer.addClass(parent, 'ti3-head-menu-cell');
    }
  }

  /**
   * @ignore
   * 触发select事件
   */
  public onSelect(option: any): void {
    this.dropCom.hide();
    this.select.emit(option);
    setTimeout(() => {
      this.selected = undefined;
    }, 0);
  }

  /**
   * @ignore
   */
  onBlur(): void {
    this.dropCom.hide();
  }
}
