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
import { Component, DoCheck, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { TiTableComponent } from './TiTableComponent';
import { Util } from '@opentiny/ng-utils';
/**
 * TiHeadSort 表头排序(上下箭头)组件
 *
 * 嵌在表头的th中使用，点击该组件时表格数据按该列的排序规则进行升序/降序排序
 *
 * 组件有默认的排序规则，也可支持自定义排序规则
 */
@Component({
  selector: 'ti-head-sort',
  templateUrl: './head-sort.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-sort-container]': 'true',
    '(click)': 'onClick()'
  }
})
export class TiHeadSortComponent implements OnInit, DoCheck {
  /**
   * 必选，排序时依据的数据属性
   *
   */
  @Input() sortKey: string;
  /**
   * 初始默认是否为升序，默认值 null 表示不排序
   */
  @Input() asc: boolean = null;
  /**
   * 排序函数(参考 Array.sort 的 compareFunction)
   */
  @Input() compareFn: (a: any, b: any, sortKey?: string) => number;
  /**
   * @ignore
   * 排序状态，也是图标名
   */
  public sortState: string = 'sort';

  private hostElement: HTMLElement;
  /**
   * @ignore
   */
  public table: TiTableComponent;
  constructor(private elementRef: ElementRef, table: TiTableComponent) {
    this.hostElement = this.elementRef.nativeElement;
    this.table = table;
  }
  ngOnInit(): void {
    // 更新TiTableComponent的enableSort，表示启用了排序。
    this.table.enableSort = true;
    // 修复SSR报错：ERROR TypeError: Cannot read property 'sort' of undefined
    // 表格记忆
    if (this.table?.storageId && this.table?.storageConfig?.sort && this.table?.sessionStorageState?.sort) {
      this.asc = this.sortKey === this.table.sessionStorageState.sort.sortKey ? this.table.sessionStorageState.sort.asc : null;
    }
    if (Util.isUndefined(this.asc)) {
      // 初始无序时(默认为null)兼容传入 undefined
      this.asc = null;
    }
    if (this.asc !== null) {
      // 如果有默认排序，即排序的初始化，将排序初始化的各个值赋给 tiTable 的 tableState 对应的 sort 属性
      this.sort(true);
    }
  }

  ngDoCheck(): void {
    this.asc = this.table.dataState.sort.sortKey === this.sortKey ? this.table.dataState.sort.asc : null;
    if (this.sortKey === this.table.dataState.sort.sortKey && this.asc === true) {
      this.sortState = 'sort-ascent';
    } else if (this.sortKey === this.table.dataState.sort.sortKey && this.asc === false) {
      this.sortState = 'sort-descent';
    } else {
      this.sortState = 'sort';
    }
  }

  /**
   * @ignore
   */
  public onClick(): void {
    if (!this.sortKey) {
      return;
    }
    // =》 无序  =》 升序 =》 降序 =》 无序
    if (this.asc === null) {
      this.asc = true;
    } else if (this.asc) {
      this.asc = false;
    } else {
      this.asc = null;
    }
    this.sort(false);
  }

  private sort(isDefaultSort: boolean): void {
    this.table.updateSort(this.sortKey, this.asc, isDefaultSort, this.compareFn);
  }
}
