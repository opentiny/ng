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

import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TiFormComponent } from '@opentiny/ng-base';
/**
 * 组件描述
 */
@Component({
  selector: 'ti-iconaction',
  templateUrl: 'iconaction.html',
  styleUrls: ['iconaction.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiIconactionComponent extends TiFormComponent {
  /**
   * 图标名称
   */
  @Input() iconName: string;
  /**
   * 显示的文本
   */
  @Input() label: string;
  /**
   * 跳转链接
   */
  @Input() href: string;
  /**
   * 跳转方式
   */
  @Input() target: string = '_blank';
  /**
   * @ignore
   */
  @ViewChild('a', { static: true }) aRef: ElementRef;
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {
    // 基类中做了设置宿主id的操作
    super.ngOnInit();
    this.setFocusableElems([this.aRef.nativeElement]);
  }
  /**
   * @ignore
   */
  public onClickFn(event: Event): void {
    if (!this.href) {
      event.preventDefault();
    }
  }
  /**
   * @ignore
   * 不传href时，禁用右键打开新窗口功能
   */
  public oncontextmenu(): boolean {
    return !!this.href;
  }
}
