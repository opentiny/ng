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
import { Directive, ElementRef } from '@angular/core';

/**
 * @ignore
 * 指令功能: 悬浮操作按钮场景，提供input框内容选中功能
 */
@Directive({
    selector: '[tiAutoSelect]'
})

export class TiAutoSelectDirective {
    constructor(private elementRef: ElementRef) {}
    ngOnInit(): void {
        setTimeout(() => {
          this.elementRef.nativeElement.select();
        }, 0);
      }
}