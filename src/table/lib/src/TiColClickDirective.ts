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
import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
/**
 * 根据规范：“单/复选框”关联表格使用时，为了提升选中效率，点击热区为“单/复选框”按钮所在单元格，点击即可选中。
 */
@Directive({
  selector: 'td[checkbox-column], th[checkbox-column], td[radio-column]'
})
export class TiColClickDirective implements AfterViewInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    this.renderer.listen(this.elementRef.nativeElement, 'click', (event: MouseEvent): void => {
      // 全选复选框右侧有下拉操作图标时，不能做热区放大
      if (this.elementRef.nativeElement.tagName === 'TH' && this.elementRef.nativeElement.querySelector('ti-head-menu')) {
        return;
      }
      const inputEle: any = this.elementRef.nativeElement.querySelector('input');
      const checkboxLabelEle: any = this.elementRef.nativeElement.querySelector('.ti3-checkbox');
      const radioLabelEle: any = this.elementRef.nativeElement.querySelector('.ti3-radio');
      // 点击单/复选空白区域时，触发input点击事件
      // 表格和单/复选联用时，checkboxLabelEle和radioLabelEle不会同时出现，所以需要分别进行判断
      // inputEle和checkboxLabelEle/radioLabelEle是兄弟元素
      // event.target !== inputEle阻止在firefox下因为inputEle.click()产生的冒泡循环
      if (
        event.target !== inputEle &&
        ((checkboxLabelEle && !(event.target === checkboxLabelEle || checkboxLabelEle.contains(event.target))) ||
          (radioLabelEle && !(event.target === radioLabelEle || radioLabelEle.contains(event.target))))
      ) {
        inputEle.click();
      }
    });
  }
}
