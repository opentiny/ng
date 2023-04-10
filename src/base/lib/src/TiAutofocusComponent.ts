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
import { Component } from '@angular/core';
import { TiBaseComponent } from './TiBaseComponent';

/**
 * @ignore
 * 该基类用于组件设置autofocsu时获取焦点，涉及组件button、text、textarea
 */

@Component({
  selector: 'ti-autofocus',
  template: ''
})
export class TiAutofocusComponent extends TiBaseComponent {
  /**
   * 此处在ngAfterViewInit生命周期内调用focus方法，因为textarea组件较为特殊
   * textarea组件在ngAfterViewInit会将宿主元素包裹在一层dom中，在此之前调用focus方法，获取不到焦点
   */
  ngAfterViewInit(): void {
    if (this.nativeElement.attributes.autofocus) {
      this.nativeElement.focus();
    }
  }
}
