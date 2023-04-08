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
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiTableFixedHeadServiceModule } from './TiTableFixedHeadServiceModule';
import { ResizableOpts, TiColsResizableDirective } from './TiColsResizableDirective';
import { TiTableComponent } from './TiTableComponent';
/**
 * @ignore
 * 提供表头锁定功能
 */
@Injectable({
  providedIn: TiTableFixedHeadServiceModule
})
export class TiTableFixedHeadService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2, private tiRenderer: TiRenderer) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public getTheadContainer(hostEle: any): any {
    return this.tiRenderer.findChildrenByClassName(hostEle, 'ti3-table-fixed-head')[0];
  }

  public getTbodyContainer(theadContainer: any): any {
    const tbodyContainer: any = theadContainer.nextElementSibling;
    if (tbodyContainer && this.tiRenderer.hasClass(tbodyContainer, 'ti3-table-container')) {
      return tbodyContainer;
    }

    return;
  }

  public processOverflowY(theadContainer: any, tbodyContainer: any, tableCom: TiTableComponent): void {
    const headTable: any = theadContainer.children[0];
    const scrollBarWidth: number = this.getScrollBarWidth('Y');
    const isOverflowedY: boolean = this.overflowedResult(tbodyContainer, 'Y');
    const isOverflowedX: boolean = this.overflowedResult(tbodyContainer, 'X');
    // 根据表体的宽度来设置表头的宽度
    if (isOverflowedY && !isOverflowedX) {
      this.renderer.setStyle(headTable, 'width', `calc(100% - ${scrollBarWidth}px)`);
    } else {
      this.renderer.setStyle(headTable, 'width', '100%');
    }

    const fixheadFiller: any = this.tiRenderer.findChildrenByClassName(theadContainer, 'ti3-table-fixed-head-filler')[0];
    // 1px为经验值，避免计算的误差导致填充块和表头之间有一点空白间隔
    const fillerWidth: number = scrollBarWidth + 1;
    // 根据Y轴是否有滚动条来控制表头右侧的填充块的有无
    if (isOverflowedY) {
      if (tableCom.fixedColumnInfo.thFixedRight) {
        this.renderer.setStyle(tableCom.fixedColumnInfo.thFixedRight, 'right', `${scrollBarWidth}px`);
      }

      if (fixheadFiller) {
        this.renderer.setStyle(fixheadFiller, 'width', fillerWidth + 'px');

        return;
      }

      const headerFiller: any = document.createElement('div');
      this.renderer.addClass(headerFiller, 'ti3-table-fixed-head-filler');
      this.renderer.setStyle(headerFiller, 'width', fillerWidth + 'px');
      theadContainer.appendChild(headerFiller);
    } else if (fixheadFiller) {
      this.renderer.removeChild(theadContainer, fixheadFiller);
      if (tableCom.fixedColumnInfo.thFixedRight) {
        this.renderer.setStyle(tableCom.fixedColumnInfo.thFixedRight, 'right', 0);
      }
    }
  }

  public removeTbodyContainerBorderBottom(tbodyContainer: any, displayedData: Array<Object>): void {
    const tbody: any = tbodyContainer.children[0].children[1];
    const hasNodataTbody: any = this.tiRenderer.findChildrenByClassName(tbody, 'ti3-table-nodata').length > 0;
    const hasNodataGuideTbody: any = this.tiRenderer.findChildrenByClassName(tbody, 'ti3-table-nodata-guide').length > 0;
    const hasLoadfailTbody: any = this.tiRenderer.findChildrenByClassName(tbody, 'ti3-table-loadfail').length > 0;
    const hasNodataSimpleTbody: any = this.tiRenderer.findChildrenByClassName(tbody, 'ti3-table-nodata-simple').length > 0;
    // 判断是否包含表格无数据，有图片是大间距，其他场景全部为单行文字样式，包括以下四种情况；
    // 1、表格无数据：ti-table-nodata（有图片）；
    // 2、查询内容为空，提示用户'购买商品'：ti-table-nodata-guide；
    // 3、加载不成功，提示'重新加载'：ti-table-loadfail。
    // 4. 表格无数据：ti-table-nodata-simple，只有文字提示（无图片）
    const noBorderTerm: any = hasNodataTbody || hasNodataGuideTbody || hasLoadfailTbody || hasNodataSimpleTbody;

    if (displayedData.length === 0 && noBorderTerm) {
      this.renderer.setStyle(tbodyContainer, 'border-bottom', 'none');
    } else {
      this.renderer.setStyle(tbodyContainer, 'border-bottom', '');
    }
  }

  // 由于用scrollHeight计算在IE和火狐下偶尔有1px的误差，
  // 所以此处直接获取表格更准确的高度和容器的clientHeight作对比
  public overflowedResult(tbodyContainer: any, direction: string, isNum?: boolean): any {
    let containerSize: number = 0;
    let tbodySize: number = 0;
    const tbodyTable: any = tbodyContainer.children[0];
    if (direction === 'X') {
      containerSize = tbodyContainer.clientWidth;
      // 修复SSR错误：ERROR TypeError: tbodyTable.getBoundingClientRect is not a function
      if (typeof tbodyTable.getBoundingClientRect !== 'function') {
        return;
      }
      tbodySize = this.numRound(tbodyTable.getBoundingClientRect().width, 0);
    } else {
      containerSize = tbodyContainer.clientHeight;
      // 修复SSR错误：ERROR TypeError: tbodyTable.getBoundingClientRect is not a function
      if (typeof tbodyTable.getBoundingClientRect !== 'function') {
        return;
      }
      tbodySize = this.numRound(tbodyTable.getBoundingClientRect().height, 0);
    }

    // 若isNum为true，返回差值，否则返回布尔值
    return isNum ? tbodySize - containerSize : tbodySize > containerSize;
  }

  public processYScrollStateChange(colsResizableDire: TiColsResizableDirective): void {
    const options: ResizableOpts = colsResizableDire.resizableOpts;
    // 主要处理 columns 初始异步的场景
    if (!options.ths || options.ths.length === 0) {
      return;
    }
    const tbodyContainer: any = colsResizableDire.tableCom.tbodyContainer;
    const theadContainer: any = colsResizableDire.tableCom.theadContainer;
    const newYScrollState: boolean = this.overflowedResult(tbodyContainer, 'Y');
    if (newYScrollState === options.yScrollState) {
      this.processOverflowY(theadContainer, tbodyContainer, colsResizableDire.tableCom);

      return;
    }

    const newXScrollState: boolean = this.overflowedResult(tbodyContainer, 'X');
    let lastColIndex: number = options.ths.length - 1;
    let lastTh: any = options.ths[lastColIndex];
    let lastThWidth: number = options.storedSizes[lastColIndex];
    const scrollBarWidth: number = this.getScrollBarWidth('Y');
    // 纵向滚动条由无到有
    if (newYScrollState) {
      if (newXScrollState && newXScrollState === options.xScrollState) {
        options.storeTableWidthChange += scrollBarWidth;
      } else {
        // 第一次纵向滚动条状态发生变化要减小表格宽度时，去减小非特殊列中宽度最大的一列的宽度
        // 这样处理是为了避免最后一列的宽度变小
        if (colsResizableDire.isfirstYScrollStateChange) {
          lastTh = this.getMaxWidthTh(colsResizableDire);
          if (lastTh) {
            lastColIndex = parseInt(lastTh.getAttribute('ti-visible-index'), 10);
            lastThWidth = options.storedSizes[lastColIndex];
          }
        }
        options.storedSizes[lastColIndex] = lastThWidth - scrollBarWidth;
      }

      // 纵向滚动条由有到无
    } else {
      if (newXScrollState === options.xScrollState) {
        if (newXScrollState) {
          options.storeTableWidthChange -= scrollBarWidth;
        } else {
          options.storedSizes[lastColIndex] = lastThWidth + scrollBarWidth;
        }
      } else if (!newXScrollState) {
        options.storedSizes[lastColIndex] = lastThWidth + (scrollBarWidth - options.storeTableWidthChange);
        options.storeTableWidthChange = 0;
      }
    }
    if (lastTh) {
      colsResizableDire.setWidth(lastTh, options.storedSizes[lastColIndex]);
      colsResizableDire.setWidth(options.secondThs[lastColIndex], options.storedSizes[lastColIndex]);
    }

    this.processOverflowY(theadContainer, tbodyContainer, colsResizableDire.tableCom);
    colsResizableDire.isfirstYScrollStateChange = false;
    options.xScrollState = this.overflowedResult(tbodyContainer, 'X');
    options.yScrollState = this.overflowedResult(tbodyContainer, 'Y');

    // 纵向滚动条状态改变时可能会引起列宽改变和横向滚动条状态改变，所以要处理列固定
    if (colsResizableDire.tableCom.fixedColumnInfo.hasFixedColumn) {
      colsResizableDire.tableCom.processFixedColumn();
    }
  }

  private getMaxWidthTh(colsResizableDire: TiColsResizableDirective): any {
    const options: ResizableOpts = colsResizableDire.resizableOpts;
    colsResizableDire.updateStoredSizes();

    const ths: Array<any> = options.ths.filter((th: any) => {
      // 排除最后一列和不可拖动的列
      return !th.hasAttribute(colsResizableDire.notResizableAttr) && !colsResizableDire.isLastColumn(th);
    });

    // 按列宽从小到大排序
    const sortedThs: Array<any> = ths.sort((a: any, b: any) => {
      const indexA: number = parseInt(a.getAttribute('ti-visible-index'), 10);
      const indexB: number = parseInt(b.getAttribute('ti-visible-index'), 10);

      return options.storedSizes[indexA] - options.storedSizes[indexB];
    });

    // 返回宽度最大的列
    return sortedThs[sortedThs.length - 1];
  }

  // 处理在列拖动过程中横向滚动条的出现引起纵向滚动条出现时的账本(storeColsWidthChange)的变化
  public handleYOverflowedWithX(resizableOpts: ResizableOpts, tbodyContainer: any): void {
    const newYScrollState: boolean = this.overflowedResult(tbodyContainer, 'Y');

    if (newYScrollState === resizableOpts.yScrollState) {
      return;
    }

    const scrollBarWidth: number = this.getScrollBarWidth('Y');
    const newXScrollState: boolean = this.overflowedResult(tbodyContainer, 'X');
    if (newYScrollState) {
      resizableOpts.storeTableWidthChange += scrollBarWidth;
      resizableOpts.isYOverflowedWithX = true;
    }

    resizableOpts.xScrollState = newXScrollState;
    resizableOpts.yScrollState = newYScrollState;
  }

  public handleYNotOverflowedWithX(resizableOpts: ResizableOpts, tbodyContainer: any): void {
    const scrollBarWidthX: number = this.getScrollBarWidth('X');
    const scrollBarWidthY: number = this.getScrollBarWidth('Y');
    const overflowedHeight: number = this.overflowedResult(tbodyContainer, 'Y', true);
    const overflowedWidth: number = this.overflowedResult(tbodyContainer, 'X', true);
    // 当列拖动横向滚动条出现导致纵向滚动条出现后，再缩小列宽时，由于无法准确获得横向滚动条消失的时刻去对表格
    // 宽度做补偿，所以当表格列宽到达容器边界附近时，用临时将overflow-x设为hidden的方式使横向滚动条消失。
    if (
      resizableOpts.isYOverflowedWithX &&
      overflowedHeight > 0 &&
      overflowedHeight <= scrollBarWidthX &&
      overflowedWidth > 0 &&
      overflowedWidth <= scrollBarWidthY
    ) {
      this.renderer.setStyle(tbodyContainer, 'overflow-x', 'hidden');
      // 对账本(storeTableWidthChange)清零
      resizableOpts.storeTableWidthChange = 0;
      resizableOpts.isYOverflowedWithX = false;

      setTimeout(() => {
        this.renderer.setStyle(tbodyContainer, 'overflow-x', 'auto');
      }, 0);
    }
  }

  // 获取滚动条宽度
  public getScrollBarWidth(direction: string): number {
    const temporaryDiv: any = document.createElement('div');
    this.tiRenderer.setStyles(temporaryDiv, {
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      width: '100px',
      height: '100px',
      overflow: 'hidden'
    });
    const nestDiv: any = document.createElement('div');
    this.tiRenderer.setStyles(nestDiv, { width: '100%', height: '100%' });
    temporaryDiv.appendChild(nestDiv);
    document.body.appendChild(temporaryDiv);
    const noScrollWidth: number = nestDiv.getBoundingClientRect().width;
    const noScrollHeight: number = nestDiv.getBoundingClientRect().height;
    this.renderer.setStyle(temporaryDiv, 'overflow', 'scroll');
    const scrollWidth: number = nestDiv.getBoundingClientRect().width;
    const scrollHeight: number = nestDiv.getBoundingClientRect().height;
    this.renderer.removeChild(document.body, temporaryDiv);
    const scrollBarWidthX: number = this.numRound(noScrollHeight - scrollHeight, 1);
    const scrollBarWidthY: number = this.numRound(noScrollWidth - scrollWidth, 1);

    return direction === 'X' ? scrollBarWidthX : scrollBarWidthY;
  }

  // 对浮点数四舍五入保留指定小数位数的数字
  public numRound(num: number, decimal: number): number {
    return parseFloat(num.toFixed(decimal));
  }
}
