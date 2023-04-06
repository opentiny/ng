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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Util } from '@opentiny/ng-utils';
import { TiItemComponent } from './TiItemComponent';
import { TiButtonItemComponent } from './TiButtonItemComponent';
import { TiBaseComponent } from '@opentiny/ng-base';
import { Subject } from 'rxjs';
import packageInfo from '../package.json';
/**
 * 本组件实现对多个表单元素的布局，支持单列和多列布局。
 * 其中包含了tiFormfield、tiItem、tiItemLabel和tiButtonItem几个组件。
 *
 */
@Component({
  selector: 'ti-formfield',
  templateUrl: './formfield.html',
  styleUrls: ['./formfield.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiFormfieldComponent extends TiBaseComponent {
  /**
   * 默认两列的间距
   */
  private static readonly COLS_GAP: string = '70px';
  /**
   * 表单类型，不设置时默认为带输入控件类表单;当为 text 时，为纯文本描述类表单
   */
  @Input() type: 'default' | 'text' = 'default';
  /**
   * 表单标题
   */
  @Input() title: string;
  /**
   * 表单项标签宽度
   */
  @Input() labelWidth: string;
  /**
   * 表单展示的列数
   */
  @Input() colsNumber: number = 1;
  /**
   * 相邻两列的间距，仅多列表单支持
   */
  @Input() colsGap: Array<string> = [];
  /**
   * @ignore
   *
   * 设置列宽且是带输入控件类表单时，相邻两行的间距
   *
   * 目前仅有一个服务（CRM）场景需求，暂不对外开放
   */
  @Input() rowGap: Array<string> = ['20px'];
  /**
   * 表单项在垂直方向的对齐方式，纵向布局表单不支持
   */
  @Input() verticalAlign: 'top' | 'middle' | 'bottom' = 'top';
  /**
   * 纯文本表单中表单项的行高，默认为'40px'
   */
  @Input() textLineHeight: string;
  /**
   * 各列宽度, 设置该属性后: 1.各列间距为 colsGap 中第一个元素的值; 2.不支持行合并列合并
   */
  @Input() colsWidth: Array<string> = [];

  /**
   * 必填图标是否占用空间
   */
  @Input() requiredSpace: boolean = false;

  /**
   * @ignore
   * 纯文本描述类表单的type的值
   */
  public readonly textType: string = 'text';
  /**
   * @ignore
   * ti-formfield中包含的所有ti-item的集合
   */
  public items: Array<TiItemComponent> = [];
  /**
   * @ignore
   * ti-formfield中包含的所有ti-btn-item的集合
   */
  public btnItems: Array<TiButtonItemComponent> = [];
  /**
   * @ignore
   * 根据colsNum对 items 分组后的数据
   */
  public groupedItems: Array<any> = [];
  /**
   * @ignore
   * 表单的列数
   */
  public colsNum: number = 1;
  /**
   * @ignore
   */
  public containterObj: {
    'vertical-align'?: string;
    'grid-template-columns'?: string;
    'grid-column-gap'?: string;
    'grid-row-gap'?: string;
  } = {};
  /**
   * @ignore
   * 当前formfield下ti-item的总个数
   */
  public itemTotal: number = 0;
  /**
   * @ignore
   * 表单是否为上下布局
   */
  public isVertical: boolean = false;
  /**
   * @ignore
   * button样式
   */
  public buttonStyle: { 'margin-left'?: string };
  /**
   * @ignore
   */
  public labelWidthSubject: Subject<string> = new Subject<string>();

  protected versionInfo: string = super.getVersion(packageInfo);
  // 浏览器是否支持grid布局
  private isSupportGrid: boolean =
    typeof window !== 'undefined' && (window as any).CSS && (window as any).CSS.supports && (window as any).CSS.supports('(display: grid)');
  /**
   * @ignore
   * 表单是否使用grid布局
   */
  public useGrid: boolean;
  constructor(protected hostRef: ElementRef, protected renderer: Renderer2, public changeDetector: ChangeDetectorRef) {
    super(hostRef, renderer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const labelWidthObj: SimpleChange = changes['labelWidth'];
    const colsNumberObj: SimpleChange = changes['colsNumber'];

    if (labelWidthObj && !labelWidthObj.isFirstChange()) {
      if (this.useGrid) {
        this.labelWidth = this.labelWidth ? this.labelWidth : '80px';
        this.buttonStyle = this.isVertical ? {} : { 'margin-left': `calc(${this.labelWidth} + 20px)` }; // 20px padding
      }
      this.labelWidthSubject.next(this.labelWidth);
    }

    if (colsNumberObj && !colsNumberObj.isFirstChange()) {
      this.setColsNumber();
      this.groupedItems = this.chunkArray(this.items, this.colsNum);
    }

    if (changes['colsWidth']) {
      this.setColsWidth();
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.isVertical = this.nativeElement.hasAttribute('vertical');
    this.setColsNumber();
    // 统一设置表单内容的垂直对齐方式;
    // tbody、tr、td的verticalAlign继承于此(table),所以此处可以
    // 统一设置表单内容的垂直对齐方式
    this.setFieldStyle();
  }

  private setColsNumber(): void {
    if (this.colsNumber) {
      const colsNumber: number = parseInt(String(this.colsNumber), 10);
      if (!Number.isNaN(colsNumber) && colsNumber >= 1) {
        this.colsNum = colsNumber;
      }
    }
  }

  private setFieldStyle(): void {
    if (!Util.isEmptyString(this.verticalAlign)) {
      this.containterObj['vertical-align'] = this.verticalAlign;
    }
  }

  private setColsWidth(): void {
    // 设置width接口时，配置grid，IE下不支持grid布局，存在兼容性问题
    this.useGrid = this.colsWidth && this.colsWidth.length > 0 && this.isSupportGrid;

    if (this.useGrid) {
      this.labelWidth = this.labelWidth ? this.labelWidth : '80px'; // 给定宽度，确保content对齐；
      for (let i: number = 0; i < this.colsWidth.length; i++) {
        // 各列设置百分比且设置列间距时，需要重新计算各列宽度，设置宽度-各列间距总和
        const calcWidth: string = `calc( ${this.colsWidth[i]} - ${
          (parseFloat(this.colsGap[0]) * (this.colsWidth.length - 1)) / this.colsWidth.length
        }px)`;
        this.colsWidth[i] = /%$/.test(this.colsWidth[i]) && this.colsGap[0] ? calcWidth : this.colsWidth[i];
      }

      this.containterObj['grid-template-columns'] = `${this.colsWidth.join(' ')}`;
      this.containterObj['grid-column-gap'] = this.colsGap[0]; // 列间距 grid-column-gap属性只支持一个值，取首项作为列间距
      this.containterObj['grid-row-gap'] = this.type === this.textType ? '0' : this.rowGap[0]; // 行间距
      this.buttonStyle = this.isVertical ? {} : { 'margin-left': `calc(${this.labelWidth} + 20px)` }; // 20px padding
    }
  }

  /**
   * @ignore
   * 需要在TiItemComponent.ts中调用
   */
  public addCntItem(item: TiItemComponent): void {
    this.items.push(item);
    this.items.sort((a: TiItemComponent, b: TiItemComponent) => {
      return a.itemIndex - b.itemIndex;
    });
    this.groupedItems = this.chunkArray(this.items, this.colsNum);
    // 强制变检一次，消除报错(Expression has changed after it was checked)
    this.changeDetector.detectChanges();
  }
  /**
   * @ignore
   * 需要在 TiItemComponent.ts 中调用
   */
  public removeCntItem(item: TiItemComponent): void {
    const itemIndex: number = this.items.indexOf(item);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      this.groupedItems = this.chunkArray(this.items, this.colsNum);
      // 强制变检一次，消除报错(Expression has changed after it was checked)
      // ti-item和ti-formfiled组件都销毁时，视图也已销毁，不需要再强制变检;
      // 因此，强制变检需要在一定的条件下执行，消除服务报错（Attempt to use a destroyed view: detectChanges）
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    }
  }
  /**
   * @ignore
   * 需要在 TiButtonItemComponent.ts 中调用
   */
  public addBtnItem(item: TiButtonItemComponent): void {
    this.btnItems.push(item);
    // 绑定在模板上的变量变更后，需要强制变更检测
    this.changeDetector.markForCheck();
  }
  /**
   * @ignore
   * 需要在 TiButtonItemComponent.ts 中调用
   */
  public removeBtnItem(item: TiButtonItemComponent): void {
    const itemIndex: number = this.btnItems.indexOf(item);
    if (itemIndex !== -1) {
      this.btnItems.splice(itemIndex, 1);
      // 绑定在模板上的变量变更后，需要强制变更检测
      this.changeDetector.markForCheck();
    }
  }

  private chunkArray(array: Array<TiItemComponent>, size: number): Array<any> {
    const length: number = array ? array.length : 0;
    if (!length || size < 1) {
      return [];
    }

    const result: Array<Array<TiItemComponent>> = [];
    // 单列
    if (size === 1) {
      array.forEach((item: TiItemComponent) => {
        result.push([item]);
        item.gapWidth = '0px';
      });
      // 多列
    } else {
      const rowspanNums: Array<number> = new Array(size); // 记录每一列的行合并的信息
      let onegroup: Array<TiItemComponent> = [];
      let colIndex: number = 0;
      array.forEach((item: TiItemComponent, index: number) => {
        while (rowspanNums[colIndex] > 0) {
          rowspanNums[colIndex] = rowspanNums[colIndex] - 1;
          colIndex++;
          if (colIndex === size) {
            result.push(onegroup);
            onegroup = [];
            colIndex = 0;
          }
        }

        onegroup.push(item);
        // 如果该单元是行合并，则影响后续行
        if (item.rowspan > 1) {
          rowspanNums[colIndex] = item.rowspan - 1;
        }
        // 如果该单元是列合并，则影响当前行
        if (item.colspan > 1) {
          colIndex += item.colspan - 1;
        }

        // 设置列间距
        if (colIndex < size - 1) {
          // 设置宽度时，为使IE下有良好的呈现，取首项作为各列间距
          const gridColsGap: string = this.colsWidth && this.colsWidth.length > 0 && this.colsGap[0];
          item.gapWidth = gridColsGap ? this.colsGap[0] : this.colsGap[colIndex] || TiFormfieldComponent.COLS_GAP;
        } else if (item.gapWidth !== '0px') {
          // 动态更改colspan时需重置列间距，最后一列无需间距
          item.gapWidth = '0px';
        }

        colIndex++;

        if (colIndex === size || index === array.length - 1) {
          result.push(onegroup);
          onegroup = [];
          colIndex = 0;
        }
      });
    }

    return result;
  }
  /**
   * @ignore
   * 需要在html模板中使用
   */
  public trackByFn(index: number, item: TiItemComponent): number {
    return item.itemIndex;
  }

  /**
   * @ignore
   * 每项图标是否占位，设置按钮及content样式
   */
  public getRequire(item: TiItemComponent, index: number): boolean {
    let hasRequire: boolean;

    for (let i = 0; i < this.groupedItems.length; i++) {
      const groupedItem: TiItemComponent = this.groupedItems[i];
      if (groupedItem[index % this.colsNum] && (groupedItem[index % this.colsNum].required || this.requiredSpace)) {
        hasRequire = true;
      }
    }

    if (index === 0 && hasRequire) {
      this.buttonStyle = { 'margin-left': `calc(${this.labelWidth} + 36px)` }; // 20 padding + 16 图标
    }

    if (hasRequire) {
      item.contentStyle['width'] = item.hasLabel ? `calc(100% - ${this.labelWidth} - 36px)` : `calc(100% - 16px)`;
    } else {
      // TiItemComponent 初始化时，ti-item-label指令无法获取到label，导致宽度设置不正确，因此在此处设置宽度
      item.contentStyle['width'] = item.hasLabel ? `calc(100% - ${this.labelWidth} - 20px)` : '100%';
    }

    return hasRequire;
  }
}
