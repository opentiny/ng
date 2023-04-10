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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { Params } from '@angular/router';
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

export interface TiLink {
  /**
   * 必选，导航项文本
   */
  label: string;
  /**
   * 导航项链接地址
   */
  href?: string;
  /**
   * 导航项链接打开方式
   * @default '_self'
   */
  target?: '_self' | '_blank' | '_parent' | '_top';
  /**
   * 导航项跳转路由
   */
  routerLink?: string | Array<any>;
  /**
   * 导航项跳转路由参数
   */
  queryParams?: Params;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}

/**
 *  crumb锚点组件
 *
 * 锚点组件除最后一级外，其余几级一般都为可跳转的链接，链接地址可以通过href属性设置;
 * 用户也可通过添加事件，实现业务逻辑。
 *
 */

@Component({
  selector: 'ti-crumb',
  templateUrl: './crumb.html',
  styleUrls: ['./crumb.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiCrumbComponent extends TiBaseComponent {
  protected versionInfo: string = super.getVersion(packageInfo);
  /**
   * 必选，导航项数据集
   */
  @Input() items: Array<TiLink>;
  /**
   * 选中非最后一级导航项时触发的回调，参数：当前选中项数据
   */
  @Output() readonly select: EventEmitter<TiLink> = new EventEmitter<TiLink>();

  constructor(private elementRef: ElementRef, private renderer2: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, renderer2);
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    this.changeDetectorRef.markForCheck();
  }

  /**
   * @ignore
   */
  public onClick(item: TiLink): boolean {
    this.select.emit(item);
    // 不设置链接时，阻止跳转（a标签在click事件返回值为false时，会阻止默认行为）
    if (!item.href) {
      return false;
    }
  }
}
