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
import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { TiTableComponent } from './TiTableComponent';
/**
 * TiColspan 表格跨列数colspan 计算，
 *
 * 根据表头第一行tr中th的数目，同步colspan数。
 *
 * 主要配合表格详情展开功能使用，用于表格详情展示行的的列合并。
 *
 */
@Directive({
  selector: 'td[tiColspan]'
})
export class TiColspanDirective implements AfterViewInit, OnDestroy {
  private firstTrObserver: MutationObserver;
  constructor(private table: TiTableComponent, private renderer: Renderer2, private elementRef: ElementRef) {}
  ngAfterViewInit(): void {
    // 获取thead中第一行tr
    const tableFirstTr = (this.table.nativeElement as HTMLElement).querySelector('table>thead>tr');
    if (!tableFirstTr) {
      return;
    }
    // 初始化设置一次colspan
    this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', String(tableFirstTr.children.length));
    // 修复SSR报错：ERROR ReferenceError: MutationObserver is not defined
    if (typeof MutationObserver === 'undefined') {
      return;
    }
    this.firstTrObserver = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', String(tableFirstTr.children.length));
        }
      }
    });
    // 只需要处理tr中th的增删，所以只配置 childList为true,
    this.firstTrObserver.observe(tableFirstTr, { childList: true });
  }
  ngOnDestroy(): void {
    if (this.firstTrObserver) {
      this.firstTrObserver.disconnect();
    }
  }
}
