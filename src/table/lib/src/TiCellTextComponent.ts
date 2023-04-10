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
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiPositionType } from '@opentiny/ng-utils';

/**
 * TiCellText 表格单元格中放置文本的容器组件
 *
 * 提供文本溢出时出省略号...,且hover时出tip的功能。
 *
 * 配合TiCellText组件使用可使表格单元格中内容显示不下时，文本出省略号...,
 * 而文本后的放在TiCellIcons图标始终可以显示出来
 *
 */
@Component({
  selector: 'ti-cell-text',
  templateUrl: './cell-text.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-cell-text-container]': 'true'
  }
})
export class TiCellTextComponent implements AfterViewInit {
  /**
   * 文本超长显示时 tip 内容
   */
  @Input() tipContent: string;
  /**
   * 文本超长显示时 tip 位置
   */
  @Input() tipPosition: TiPositionType;
  @ViewChild('text', { static: true }) private cellTextEle: ElementRef;
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private tiRenderer: TiRenderer) {}

  ngAfterViewInit(): void {
    // 保证有图标时，图标渲染完再计算宽度：可看该测试用例table-cellicons-colsresizable
    setTimeout(() => {
      this.setMaxWidth();
    }, 0);
  }

  private setMaxWidth(): void {
    let otherWidth: number = 0;
    const parent: Element = this.renderer.parentNode(this.elementRef.nativeElement);
    const iconsContainer: Element = this.tiRenderer.findChildrenByClassName(parent, 'ti3-cell-icons-container')[0];
    const sortContainer: Element = this.tiRenderer.findChildrenByClassName(parent, 'ti3-sort-container')[0];
    const headFilterContainer: Element = this.tiRenderer.findChildrenByClassName(parent, 'ti3-head-filter-container')[0];
    const renameContainer: Element = this.tiRenderer.findChildrenByTagName(parent, 'TP-RENAME')[0];

    // 修复SSR报错：ERROR TypeError: sortContainer.getBoundingClientRect is not a function
    if (typeof parent.getBoundingClientRect !== 'function') {
      return;
    }
    // 修复SSR报错：ERROR TypeError: Cannot read property 'getBoundingClientRect' of undefined
    if (iconsContainer) {
      const iconsContainerWidth: number = parseFloat(iconsContainer.getBoundingClientRect().width.toFixed(1));
      otherWidth += iconsContainerWidth;
    }

    if (sortContainer) {
      const sortContainerWidth: number = parseFloat(sortContainer.getBoundingClientRect().width.toFixed(1));
      otherWidth += sortContainerWidth;
    }

    if (headFilterContainer) {
      const headFilterContainerWidth: number = parseFloat(headFilterContainer.getBoundingClientRect().width.toFixed(1));
      otherWidth += headFilterContainerWidth;
    }

    if (renameContainer) {
      const renameContainerWidth: number = parseFloat(renameContainer.getBoundingClientRect().width.toFixed(1));
      otherWidth += renameContainerWidth;
    }

    this.renderer.setStyle(this.cellTextEle.nativeElement, 'max-width', `calc(100% - ${otherWidth}px)`);
  }
}
