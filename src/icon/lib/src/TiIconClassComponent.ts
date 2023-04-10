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
import { Component, ElementRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
/**
 * @ignore
 * ti-icon组件，为了防止多个组件重复使用字体图标文件，导致最终用户打包文件成倍增大，因此封装该组件，确保最终打包只引用一份字体图标样式及文件
 * TODO：考虑逐步去除这个i封装组件，采用ti-icon封装
 */
@Component({
  selector: ':not(ti-icon).ti3-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TiIconClassComponent {
  public nativeElement: any; // 宿主元素
  constructor(protected hostRef: ElementRef) {
    this.nativeElement = this.hostRef.nativeElement;
  }
}
