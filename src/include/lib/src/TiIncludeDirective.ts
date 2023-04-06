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
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

import { Util } from '@opentiny/ng-utils';

/**
 * @ignore
 * 此指令功能:清空宿主元素的子元素，将传入的string或Node放入(append)
 *
 * 类似angular.js的ng-bind-html功能
 */
@Directive({
  selector: '[tiInclude]'
})
export class TiIncludeDirective implements OnChanges {
  @Input() tiInclude: string | Node; // 只支持string和Node两种类型
  private element: HTMLElement;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tiInclude'] && !Util.isUndefined(this.tiInclude)) {
      // 清空宿主元素的子节点
      if (this.element.childNodes.length > 0) {
        this.element.innerHTML = '';
      }
      // 如果 tiInclude 为字符串，则当作文本节点处理
      const node: Node = Util.isString(this.tiInclude) ? this.renderer.createText(this.tiInclude as string) : this.tiInclude;
      this.renderer.appendChild(this.element, node);
    }
  }
}
