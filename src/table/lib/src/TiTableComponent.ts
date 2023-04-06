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
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { TiRenderer } from '@opentiny/ng-renderer';
import { Util } from '@opentiny/ng-utils';
import { Subject } from 'rxjs';
import { TiTableFixedHeadService } from './TiTableFixedHeadService';
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

/**
 * TiTable 组件上 srcData 输入接口中 state 属性值的类型接口
 */
export interface TiTableSrcState {
  /**
   * 传给组件的表格源数据是否已经过搜索处理
   */
  searched: boolean;
  /**
   * 传给组件的表格源数据是否已经过排序处理
   */
  sorted: boolean;
  /**
   * 传给组件的表格源数据是否已经过分页处理
   */
  paginated: boolean;
}
/**
 * 表格当前数据的搜索、排序、分页状态值接口
 */
export interface TiTableDataState {
  /**
   * 搜索状态，其包含两个属性：
   *
   * searchWords：类型为Array<string>，搜索字符串集合
   *
   * searchKeys：类型为Array，搜索指定的字段范围
   *
   * searchStrictKeys: 类型为Array，搜索指定进行严格搜索的字段范围。
   *
   */
  search: {
    searchWords: Array<string>;
    searchKeys?: Array<string>;
    searchStrictKeys?: Array<string>;
  };
  /**
   * 排序状态，其包含两个属性：
   *
   * sortKey：类型为 String，进行排序的数据属性
   *
   * asc：类型为 boolean，是否为升序
   *
   */
  sort: { sortKey: string; asc: boolean };
  /**
   * 分页状态，其包含两个属性：
   *
   * currentPage：类型Number，表示当前页
   *
   * itemsPerPage：类型为Number，每页显示条数
   *
   */
  pagination: { currentPage: number; itemsPerPage: number };
}

/**
 * 表格行数据类型接口
 */
export interface TiTableRowData {
  /**
   * 控制当前详情行是否展开
   *
   */
  showDetails?: boolean;
  /**
   * 允许有多余的属性字段
   *
   */
  [propName: string]: any;
}
/**
 * TiTable 组件上 srcData 输入接口的数据类型接口
 */
export interface TiTableSrcData {
  /**
   * 源数据
   */
  data: Array<TiTableRowData>;
  /**
   * 源数据状态(是否已经过排序 sorted、过滤 searched、分页 paginated 处理)。比如，远程加载数据的分页场景下，从远程获取传入给 data 的数据为当前页数据，
   * 即源数据已经进行了分页，因此应将 state.paginated 设置为true
   *
   */
  state: TiTableSrcState;
}

/**
 * 表格的各列信息
 *
 */
export interface TiTableColumns {
  /**
   * 表头文本内容，当某一列的 title 为空字符串时，当前列一直在表格中显示，但是不出现在控制列动态
   * 隐藏/显示 设置面板中，例如单选列、多选列、详情展开图标列
   *
   */
  title?: string;
  /**
   * 设置列宽，支持百分比和px值;
   */
  width?: string;
  /**
   * 此属性只有在表格具有列设置功能时才需要设置，show 可以分别设置如下值：
   *
   *  true： 表示该列默认显示，用户可以通过列设置下拉面板操作切换其显示/隐藏状态。
   *
   *  false : 表示该列默认隐藏，用户可以通过列设置下拉面板操作切换其显示/隐藏状态。
   *
   *  undefined : 表示该列不具备动态显示/隐藏功能，固定显示。
   *
   * 注意：设置show属性值时，title为空字符串时，该列固定显示，但不出现在列操作面板中。
   */
  show?: boolean;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}

/**
 * 表格当前页、每页个数记忆开关
 */
export interface TiPaginationStorageConfig {
  currentPage?: boolean;
  itemsPerPage?: boolean;
}
/**
 * 表格记忆各项开关
 */
export interface TiTableStorageConfig {
  /**
   * 排序
   */
  sort: boolean;
  /**
   * 分页
   */
  pagination: boolean | TiPaginationStorageConfig;
  /**
   * 列宽
   */
  colsWidth: boolean;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
/**
 * TiTable 表格组件
 *
 * 支持以表格的形式展示多条数据
 *
 * 支持前后台分页、搜索、排序、详情展开、列拖动（调整列宽）、控制列动态隐藏/显示、行复选、行单选、
 * 表格单元格(th, td)智能tip、树表、列文本对齐方式、表头固定等功能
 *
 */
@Component({
  selector: 'ti-table',
  templateUrl: './table.html',
  styleUrls: ['./table.less', './table-nodata-small-nest-resize.less', './table-toggle-sort-details.less', './table-tree-fix.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ti3-table]': 'true'
  }
})
export class TiTableComponent extends TiBaseComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  private static DEFAULT_SRC_DATA: TiTableSrcData = {
    data: [],
    state: {
      searched: false,
      sorted: false,
      paginated: false
    }
  };
  /**
   * 必选，源数据及其状态，srcData.data 是源数据，srcData.state 是数据状态(是否已经过排序 sorted、过滤 searched、分页 paginated 处理)
   */
  @Input() srcData: TiTableSrcData = TiTableComponent.DEFAULT_SRC_DATA;
  /**
   * 必选，表格呈现的数据, 只需在初始化时将其设置为空数组即可，组件内部会对其赋值和更新
   *
   */
  @Input() displayedData: Array<TiTableRowData>; // 表格中实时展示的数据集
  /**
   * 缓存表格状态的唯一标志值
   */
  @Input() storageId: string;
  /**
   * 配置表格各状态是否进行缓存
   */
  @Input() storageConfig: TiTableStorageConfig = {
    sort: true,
    pagination: true,
    colsWidth: true
  };
  /**
   * 表格呈现的数据改变时触发的回调， 参数为呈现的数据集合
   */
  @Output() readonly displayedDataChange: EventEmitter<Array<TiTableRowData>> = new EventEmitter();
  /**
   * 表格各列信息
   */
  @Input() columns: Array<TiTableColumns> = [];
  /**
   * 被搜索的字符串的集合
   *
   *  当 searchWords 长度为 1 时，在 searchKeys 指定的字段下搜索 searchWords[0] 指定的字符串, 在指定字段中的任一字段中搜索到时即满足条件(并集)。如：searchWords: ['b'],
   *  searchKeys: ['firstName', 'lastName'], 则在 firstName 字段包含 'b'，或在 lastName 字段包含 'b' 时本行数据即满足搜索条件。
   *
   *  当 searchWords 长度大于 1 且 searchKeys 与 searchWords 长度相等时，在 searchKeys 指定的字段下搜索 searchWords 对应(按索引顺序)指定的字符串，在指定字段中的所有字段
   *  搜索到对应字符串时才满足条件(交集)。如：searchWords: ['b', '18'], searchKeys: ['firstName', 'age'], 则在 firstName 字段包含 'b' 且在 age 字段包含 '18' 时本行数据才满足搜索条件。
   */
  @Input() searchWords: Array<string> = null;
  /**
   * 搜索的字段范围
   */
  @Input() searchKeys: Array<string> = null; // 是否使用null
  /**
   * 搜索时精确匹配(等于)的字段范围, 其值必须是属性 searchKeys 指定字段的范围的子集，不设置时默认按 searchKeys 指定字段范围进行模糊搜索
   *
   */
  @Input() searchStrictKeys: Array<string> = null;
  /**
   * 是否在展开当前行时关闭其他行
   */
  @Input() closeOtherDetails: boolean = false;
  /**
   * 分页、排序和搜索状态改变时触发的回调，参数为 ti-table 组件实例，一般用于远程加载数据
   *
   */
  @Output() readonly stateUpdate: EventEmitter<TiTableComponent> = new EventEmitter();
  /**
   * @ignore
   */
  public hostEle: Element;
  protected versionInfo: string = super.getVersion(packageInfo);
  private srcDataDiffer: IterableDiffer<object>;
  private data: Array<TiTableRowData>;
  private promise: Promise<any> = Promise.resolve(null);
  /**
   * @ignore 判断是否使用了ti-head-sort组件
   */
  public enableSort: boolean = false;
  /**
   * @ignore
   */
  public paginationSubject: Subject<any> = new Subject<any>();
  /**
   * @ignore
   */
  public viewInitSubject: Subject<any> = new Subject<any>();
  /**
   * @ignore
   */
  public containerScrollXChangeSubject: Subject<any> = new Subject<any>();
  /**
   * @ignore
   */
  public thResizeSubject: Subject<any> = new Subject<any>();
  /**
   * @ignore
   */
  public updateFixedThLeftSubject: Subject<any> = new Subject<any>();
  /**
   * @ignore
   */
  public updateFixedTdLeftSubject: Subject<any> = new Subject<any>();
  /**
   * @ignore
   */
  public updateColumnsSubject: Subject<Array<TiTableColumns>> = new Subject<Array<TiTableColumns>>();
  /**
   * @ignore
   * 其中包含了sort、search、pagination三个属性，每个属性都描述了当前表格数据的参数状态:
   *
   * sort：object类型，包含了sortKey（类型为string，进行排序的数据属性）、asc（类型为boolean，是否为升序）属性；
   *
   * search: object类型，包含了searchWords（类型为array<string>，搜索字符串集合）、searchKeys（类型为Array，搜索指定的字段范围）属性；
   *
   * pagination: object类型，包含了currentPage（类型number，表示当前页）、itemsPerPage（类型为Number，每页显示条数）属性。
   */
  public dataState: TiTableDataState = {
    search: { searchWords: null, searchKeys: null, searchStrictKeys: null },
    sort: { sortKey: '', asc: null },
    pagination: { currentPage: -1, itemsPerPage: -1 }
  };
  /**
   * @ignore 子元素需要访问，所以public
   */
  public localStorageState: { [propName: string]: any };
  /**
   * @ignore 子元素需要访问，所以public
   */
  public sessionStorageState: { [propName: string]: any };
  private isDataStateChange: boolean = false;
  private oldSearchWords: Array<string> = null;
  private oldSearchKeys: Array<string> = null;
  private oldPagination: { currentPage: number; itemsPerPage: number } = {
    currentPage: -1,
    itemsPerPage: -1
  };
  private oldSort: { sortKey: string; asc: boolean } = {
    sortKey: '',
    asc: null
  };
  /**
   * 触发 stateUpdate 的事件(即引起表格数据状态改变的起因事件)，其有"search", "sort", "pagination"这三个值
   */
  private triggerEvent: 'search' | 'sort' | 'pagination';
  private searchedResult: Array<TiTableRowData> = [];
  private customCompareFn: (a: TiTableRowData, b: TiTableRowData, sortKey?: string) => number;
  /**
   * @ignore
   * 表格是否为表头锁定
   */
  public isFixedHead: boolean = false;
  /**
   * @ignore
   */
  public theadContainer: Element;
  /**
   * @ignore
   */
  public tbodyContainer: Element;
  private oldTbodyHeight: number = 0;
  private tbodyResizeObserver: any;
  private unlistenFixedHeadWindowResize: () => void;
  private unlistenFixedColumnWindowResize: () => void;
  private unlistenWindowBeforeunload: () => void;
  /**
   * @ignore
   */
  public processYScrollStateChangeWithColsResizable: () => void;
  /**
   * @ignore
   */
  public fixedColumnInfo: {
    hasFixedColumn?: boolean;
    container?: any;
    thFixedRight?: any;
    containerWidth?: number;
    fixedColumnLeftValues?: Array<number>;
    columnFixedLeftLastIndex?: number;
  } = {};

  constructor(
    private iterableDiffers: IterableDiffers,
    elementRef: ElementRef,
    private fixedHeadService: TiTableFixedHeadService,
    renderer: Renderer2,
    private zone: NgZone,
    private tiRenderer: TiRenderer,
    private changeRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer);
    this.hostEle = elementRef.nativeElement;
  }

  /**
   * 测试某一字串(testStr)中是否存在子串(key)
   * @param testStr 待检索的字符串或数值
   * @param key 检索的子串
   */
  private static isMatched(testStr: any, keywords: string, isStrict: boolean): boolean {
    if (!Util.isString(testStr) && !Util.isNumber(testStr)) {
      return false;
    }

    if (isStrict) {
      return keywords === '' || String(testStr) === keywords;
    } else {
      return String(testStr).toLowerCase().indexOf(keywords.toLowerCase()) >= 0;
    }
  }

  private static searchByOneWord(
    src: Array<TiTableRowData>,
    searchWords: Array<string>,
    searchKeys: Array<string>,
    searchStrictKeys: Array<string>
  ): Array<TiTableRowData> {
    const output: Array<TiTableRowData> = [];
    src.forEach((item: TiTableRowData) => {
      if (searchKeys && searchKeys.length > 0) {
        for (const key of searchKeys) {
          if (TiTableComponent.isMatched(item[key], searchWords[0], searchStrictKeys?.includes(key))) {
            output.push(item);
            break;
          }
        }
      } else {
        for (const key in item) {
          if (TiTableComponent.isMatched(item[key], searchWords[0], searchStrictKeys?.includes(key))) {
            output.push(item);
            break;
          }
        }
      }
    });

    return output;
  }

  private static searchByMoreThanOneWord(
    src: Array<TiTableRowData>,
    searchWords: Array<string>,
    searchKeys: Array<string>,
    searchStrictKeys: Array<string>
  ): Array<TiTableRowData> {
    const output: Array<TiTableRowData> = [];
    src.forEach((item: TiTableRowData) => {
      let isMatched: boolean = true;
      for (let i: number = 0; i < searchKeys.length; i++) {
        if (!TiTableComponent.isMatched(item[searchKeys[i]], searchWords[i], searchStrictKeys?.includes(searchKeys[i]))) {
          isMatched = false;
          break;
        }
      }
      if (isMatched) {
        output.push(item);
      }
    });

    return output;
  }

  private static getSearchedData(
    inputData: Array<TiTableRowData>,
    searchWords: Array<string>,
    searchKeys: Array<string>,
    searchStrictKeys: Array<string>
  ): Array<TiTableRowData> {
    let outData: Array<TiTableRowData> = [];

    if (searchWords && searchWords.length === 1) {
      outData = TiTableComponent.searchByOneWord(inputData, searchWords, searchKeys, searchStrictKeys);
    } else if (searchWords && searchWords.length > 1 && searchKeys && searchKeys.length === searchWords.length) {
      outData = TiTableComponent.searchByMoreThanOneWord(inputData, searchWords, searchKeys, searchStrictKeys);
    }

    return outData;
  }

  private static doCompare(a: any, b: any): number {
    let result: number = 0;
    if (a.type === b.type) {
      if (a.value !== b.value) {
        result = a.value < b.value ? -1 : 1;
      }
    } else {
      result = a.type < b.type ? -1 : 1;
    }

    return result;
  }

  private static getPredicateValue(value: TiTableRowData, predicate: string): any {
    if (!Util.isEmptyString(predicate) && Object.prototype.hasOwnProperty.call(value, predicate)) {
      return value[predicate];
    }

    return value;
  }

  private static getPredicateValueObj(value: any, index: number): { value: any; type: string } {
    let resultVal: any = value;
    if (value === null) {
      resultVal = 'null';
    } else if (Util.isString(value)) {
      resultVal = value.toLowerCase();
    } else if (Util.isArray(value)) {
      resultVal = value.toString();
    } else if (typeof value === 'object') {
      resultVal = index;
    } else if (Util.isFunction(value)) {
      const resultValue: any = value();

      return TiTableComponent.getPredicateValueObj(resultValue, index);
    }
    const type: string = typeof resultVal;

    return { value: resultVal, type };
  }

  private static safeCopy(data: Array<any>): Array<any> {
    return data ? [].concat(data) : [];
  }

  private static isValueEqual(n: any, o: any): boolean {
    if (!(n instanceof Object) || !(o instanceof Object)) {
      return n === o;
    }

    if (Util.isArray(n) && Util.isArray(o)) {
      if (n.length !== o.length) {
        return false;
      } else {
        for (let i: number = 0; i < o.length; i++) {
          if (n[i] !== o[i]) {
            return false;
          }
        }
      }

      return true;
    }

    if (Object.keys(n).length !== Object.keys(o).length) {
      return false;
    } else {
      for (const key in n) {
        if (!Object.prototype.hasOwnProperty.call(o, key) || n[key] !== o[key]) {
          return false;
        }
      }
    }

    return true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (!this.srcData) {
      this.srcData = TiTableComponent.DEFAULT_SRC_DATA;
    }
    if (!this.srcData.data) {
      this.srcData.data = [];
    }
    this.srcDataDiffer = this.iterableDiffers.find(this.srcData.data).create();

    if (this.searchWords !== null) {
      this.oldSearchWords = TiTableComponent.safeCopy(this.searchWords);
      this.dataState.search.searchWords = this.searchWords;
    }

    if (this.searchKeys !== null) {
      this.oldSearchKeys = TiTableComponent.safeCopy(this.searchKeys);
      this.dataState.search.searchKeys = this.searchKeys;
    }
    if (this.searchStrictKeys !== null) {
      this.dataState.search.searchStrictKeys = this.searchStrictKeys;
    }
    // 表格记忆
    if (this.storageId) {
      this.initStorageDataState();
    }
  }

  ngAfterViewInit(): void {
    this.initFixedHead();
    if (this.fixedColumnInfo.hasFixedColumn) {
      this.addFixedColumnBehavior();
    }
    this.viewInitSubject.next(null);
    if (this.storageId) {
      // 在ngOnDestroy 无法保存，所有使用beforeunload
      // 为什么不用unload? beforeunload 兼容比unload效果好
      // 参考：https://sinaad.github.io/xfe/2016/06/29/beforeunlod-vs-unload/
      // 修复SSR报错：ERROR ReferenceError: window is not defined
      if (typeof window === 'undefined') {
        return;
      }
      this.unlistenWindowBeforeunload = this.renderer.listen(window, 'beforeunload', () => {
        this.updateStorageDataState();
      });
    }
  }

  // 为了确保表格内嵌组件(比如tiHeadSort,tiPagination等)的数据变化在表格组件中能监听到，排序、搜索、分页
  // 的相关数据监听需要放在表格组件的AfterViewChecked周期中。因为表格组件的AfterViewChecked生命周期晚于
  // 内嵌组件(比如tiHeadSort,tiPagination等)的各个checked生命周期。
  // eslint-disable-next-line complexity
  ngAfterViewChecked(): void {
    // 监听srcData.data的变化
    const dataArr: Array<TiTableRowData> = this.srcData && this.srcData.data ? this.srcData.data : [];
    const srcDataDiffer: IterableChanges<TiTableRowData> = this.srcDataDiffer.diff(dataArr);
    if (srcDataDiffer) {
      this.updateSafeCopy();
      this.data2displayed();
    }

    // 监听search相关接口值变化
    if (this.searchWords !== null && !TiTableComponent.isValueEqual(this.searchWords, this.oldSearchWords)) {
      this.oldSearchWords = TiTableComponent.safeCopy(this.searchWords);
      this.isDataStateChange = true;
      this.triggerEvent = 'search';
      this.dataState.search.searchWords = this.searchWords;
      // 搜索时，如果使用分页时，把用于表格内部计算分页的当前页码置为1
      if (this.dataState.pagination.itemsPerPage !== -1 && this.dataState.pagination.currentPage !== 1) {
        this.dataState.pagination.currentPage = 1;
        // 使用Promise是为了解决使用stateUpdate接口做后台分页+后台搜索时，
        // 分页组件ExpressionChangedAfterItHasBeenCheckedError报错问题。
        // 此处不能使用setTimeout来解决，使用setTimeout会导致stateUpdate多次执行。
        this.promise.then(() => {
          this.paginationSubject.next({ currentPage: 1 });
        });
      }
    }

    if (this.searchKeys !== null && this.searchWords.length > 0 && !TiTableComponent.isValueEqual(this.searchKeys, this.oldSearchKeys)) {
      this.oldSearchKeys = TiTableComponent.safeCopy(this.searchKeys);
      this.isDataStateChange = true;
      this.triggerEvent = 'search';
      this.dataState.search.searchKeys = this.searchKeys;
      // 搜索时，如果使用分页时，把用于表格内部计算分页的当前页码置为1
      if (this.dataState.pagination.itemsPerPage !== -1 && this.dataState.pagination.currentPage !== 1) {
        this.dataState.pagination.currentPage = 1;
        this.promise.then(() => {
          this.paginationSubject.next({ currentPage: 1 });
        });
      }
    }

    if (!TiTableComponent.isValueEqual(this.dataState.sort, this.oldSort)) {
      this.oldSort = { ...this.dataState.sort };
      this.isDataStateChange = true;
      this.triggerEvent = 'sort';
    }

    if (
      this.dataState.pagination.currentPage !== -1 &&
      this.dataState.pagination.itemsPerPage !== -1 &&
      !TiTableComponent.isValueEqual(this.dataState.pagination, this.oldPagination)
    ) {
      this.oldPagination = { ...this.dataState.pagination };
      this.isDataStateChange = true;
      this.triggerEvent = 'pagination';
    }

    if (this.isDataStateChange) {
      this.updateTable();
      this.isDataStateChange = false;
    }

    // 表格容器宽度改变时，列宽和横向滚动条状态都可能发生改变，这时需要处理表格列固定
    if (this.fixedColumnInfo.hasFixedColumn) {
      const containerWidth: number = this.fixedColumnInfo.container.clientWidth;
      if (containerWidth !== this.fixedColumnInfo.containerWidth) {
        this.fixedColumnInfo.containerWidth = containerWidth;
        this.processFixedColumn();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.isFixedHead && this.unlistenFixedHeadWindowResize) {
      this.unlistenFixedHeadWindowResize();
    }

    if (this.unlistenFixedColumnWindowResize) {
      this.unlistenFixedColumnWindowResize();
    }

    if (this.tbodyResizeObserver) {
      this.tbodyResizeObserver.disconnect();
    }

    if (this.storageId) {
      // 路由跳转时，页面没有刷新，beforeunload监听不生效，所以要更新一次记忆数据。
      this.updateStorageDataState();
      // 修复SSR错误：TypeError: this.unlistenWindowBeforeunload is not a function
      typeof this.unlistenWindowBeforeunload === 'function' && this.unlistenWindowBeforeunload();
    }
  }
  // 初始化表格记忆
  private initStorageDataState(): void {
    // 修复SSR报错：ERROR ReferenceError: window is not defined
    if (typeof window === 'undefined') {
      return;
    }
    // 缓存在sessionStorage中的数据
    let sessionStorageState = window.sessionStorage.getItem(this.storageId);
    // 缓存在localStorage 中的数据
    let localStorageState = window.localStorage.getItem(this.storageId);

    // 版本发布后，用户第一次访问时，sessionStorageState、localStorageState是null
    this.sessionStorageState = sessionStorageState ? JSON.parse(sessionStorageState) : {};
    this.localStorageState = localStorageState ? JSON.parse(localStorageState) : {};
  }
  // 更新本地存储中的
  private updateStorageDataState() {
    const localStorageState = { ...this.localStorageState };
    const sessionStorageState = { ...this.sessionStorageState };

    // 排序
    if (this.storageConfig.sort && this.dataState.sort.sortKey) {
      sessionStorageState['sort'] = this.dataState.sort;
    }

    // 表格分页
    if (
      (this.storageConfig.pagination === true ||
        (this.storageConfig.pagination && this.storageConfig.pagination['itemsPerPage'] === true)) &&
      this.dataState.pagination.itemsPerPage !== -1
    ) {
      // 每页条数
      localStorageState['itemsPerPage'] = this.dataState.pagination.itemsPerPage;
    }
    // 表格分页
    if (
      (this.storageConfig.pagination === true ||
        (this.storageConfig.pagination && this.storageConfig.pagination['currentPage'] === true)) &&
      this.dataState.pagination.currentPage !== -1
    ) {
      // 当前页
      sessionStorageState['currentPage'] = this.dataState.pagination.currentPage;
    }

    // 表格搜索
    if (this.dataState.search.searchKeys) {
      sessionStorageState['searchKeys'] = this.dataState.search.searchKeys;
    }
    if (this.dataState.search.searchWords) {
      sessionStorageState['searchWords'] = this.dataState.search.searchWords;
    }
    if (this.dataState.search.searchStrictKeys) {
      sessionStorageState['searchStrictKeys'] = this.dataState.search.searchStrictKeys;
    }

    if (Object.keys(sessionStorageState).length > 0) {
      // 修复：SSR报错：ReferenceError: window is not defined
      typeof window !== 'undefined' && window.sessionStorage.setItem(this.storageId, JSON.stringify(sessionStorageState));
    }
    if (Object.keys(localStorageState).length > 0) {
      typeof window !== 'undefined' && window.localStorage.setItem(this.storageId, JSON.stringify(localStorageState));
    }
  }

  /**
   * @ignore
   */
  public updatePagination(currentPage: number, itemsPerPage: number): void {
    if (this.oldPagination.currentPage === -1 && this.oldPagination.itemsPerPage === -1) {
      this.oldPagination = {
        currentPage,
        itemsPerPage
      };
    }
    this.dataState.pagination.currentPage = currentPage;
    this.dataState.pagination.itemsPerPage = itemsPerPage;
  }

  /**
   * @ignore
   * 排序状态更新及处理
   *
   * @param sortKey - 进行排序的数据属性（如对数据的name属性值进行排序，则传入"name"）
   * @param asc - 是否为升序，true表示升序，false表示降序，null表示无序
   * @param isDefaultSort - 是否为默认排序
   */
  public updateSort(
    sortKey: string,
    asc: boolean,
    isDefaultSort: boolean,
    compareFn: (a: TiTableRowData, b: TiTableRowData, sortKey?: string) => number
  ): void {
    if (isDefaultSort) {
      this.oldSort = {
        sortKey,
        asc
      };
    }
    this.dataState.sort.sortKey = sortKey;
    this.dataState.sort.asc = asc;
    this.customCompareFn = compareFn;
  }
  /**
   * 获取表格当前的数据状态(sort、search、pagination)
   * @return TiTableDataState
   */
  public getDataState(): TiTableDataState {
    return this.dataState;
  }

  /**
   * 获取当前触发 stateUpdate 回调的操作(即引起表格数据状态改变的起因操作)，有 "search", "sort", "pagination" 这三个值
   * @return 有"search", "sort", "pagination"这三个值
   */
  public getTriggerEvent(): string {
    return this.triggerEvent;
  }

  /**
   * 使用搜索功能时，获取搜索的结果数据
   * @return 搜索到的数据集合
   *
   */
  public getSearchedResult(): Array<TiTableRowData> {
    return this.searchedResult;
  }

  private updateTable(): void {
    if (this.isFrontPagination() || this.isFrontSort() || this.isFrontSearch()) {
      this.data2displayed();
    }
    // 延时的目的是防止stateUpdate 回调中同步修改数据时报错。
    this.promise.then(() => {
      this.stateUpdate.emit(this);
    });
  }

  /**
   * 根据数据状态(search,sort,pagination)处理数据
   */
  private dataProcessor(data: Array<any>): Array<any> {
    let output = data;
    // 如果存在过滤条件且开发者传递的源数据尚未进行过滤处理，则进行前台过滤处理
    if (this.isFrontSearch()) {
      output = TiTableComponent.getSearchedData(output, this.searchWords, this.searchKeys, this.searchStrictKeys);
      this.searchedResult = [].concat(output);
      const totalNumber: number = output.length;
      // 如果存在分页且开发者传递的源数据尚未进行分页处理，即进行前台分页,
      if (this.isFrontPagination()) {
        this.promise.then(() => {
          this.paginationSubject.next({ totalNumber });
        });
      }
    }
    // 如果存在排序且开发者传递的源数据尚未进行排序处理，则进行前台排序处理（字典排序）
    if (this.isFrontSort()) {
      output = this.getSortedData(output, this.dataState.sort.sortKey, this.dataState.sort.asc);
    }

    // 存在分页且开发者传递的源数据尚未进行分页处理，则进行前台分页
    if (this.isFrontPagination()) {
      const pagination: { currentPage: number; itemsPerPage: number } = this.dataState.pagination;
      const start: number = (pagination.currentPage - 1) * pagination.itemsPerPage;
      output = output.slice(start, start + parseInt(pagination.itemsPerPage.toString(), 10));
    }

    return output;
  }
  /**
   * data => displayedData，处理分3步：
   * 1. 复制data数据
   * 2. 根据 分页、过滤、排序 处理数据
   * 3. 通过displayedDataChange 事件更新到displayedData
   */
  private data2displayed() {
    // 复制源数据
    let output: Array<any> = TiTableComponent.safeCopy(this.data);

    // 处理数据
    output = this.dataProcessor(output);

    // 更新到displayedData
    this.promise.then(() => {
      // 同步修改内部数据
      this.displayedData = output;
      this.displayedDataChange.emit(output);
    });
  }
  private isFrontSearch(): boolean {
    const srcState: TiTableSrcState = this.getSrcState();
    return this.searchWords && this.searchWords.length > 0 && (!srcState || !srcState.searched);
  }
  private isFrontSort(): boolean {
    const srcState: TiTableSrcState = this.getSrcState();
    return this.enableSort && (!srcState || !srcState.sorted);
  }
  private isFrontPagination(): boolean {
    const srcState: TiTableSrcState = this.getSrcState();
    const pagination: { currentPage: number; itemsPerPage: number } = this.dataState.pagination;
    return pagination.currentPage !== -1 && pagination.itemsPerPage !== -1 && (!srcState || !srcState.paginated);
  }

  private getSortedData(data: Array<TiTableRowData>, predicate: string, asc: boolean): Array<TiTableRowData> {
    let resultArr: Array<TiTableRowData> = [];
    if (!Util.isArray(data)) {
      return resultArr;
    }

    // 无序状态
    if (!predicate || asc === null) {
      return data;
    }

    const compareArr: Array<{
      value: TiTableRowData;
      index: number;
      predicateValueObj: { value: any; type: string };
    }> = data.map((value: TiTableRowData, index: number) => {
      const predicateValue: any = TiTableComponent.getPredicateValue(value, predicate);

      return {
        value,
        index,
        predicateValueObj: TiTableComponent.getPredicateValueObj(predicateValue, index)
      };
    });
    compareArr.sort(this.compareTo);
    resultArr = compareArr.map((item: { value: TiTableRowData; index: number; predicateValueObj: { value: any; type: string } }) => {
      return item.value;
    });
    if (!asc) {
      resultArr.reverse();
    }

    return resultArr;
  }

  private compareTo = (
    v1: {
      value: TiTableRowData;
      index: number;
      predicateValueObj: { value: any; type: string };
    },
    v2: {
      value: TiTableRowData;
      index: number;
      predicateValueObj: { value: any; type: string };
    }
  ): number => {
    let result: number = 0;
    if (Util.isFunction(this.customCompareFn)) {
      result = this.customCompareFn(v1.value, v2.value, this.dataState.sort.sortKey);
    } else {
      result = TiTableComponent.doCompare(v1.predicateValueObj, v2.predicateValueObj);
      if (result === 0) {
        result = v1.index - v2.index;
      }
    }

    return result;
  };

  private updateSafeCopy(): void {
    this.data = TiTableComponent.safeCopy(this.srcData && this.srcData.data ? this.srcData.data : []);
  }

  private getSrcState(): TiTableSrcState {
    return this.srcData && this.srcData.state ? this.srcData.state : undefined;
  }

  /**
   * @ignore
   */
  public closeOtherDetailsFn(currentRow: TiTableRowData): void {
    this.displayedData.forEach((row: TiTableRowData) => {
      if (row !== currentRow && row['showDetails']) {
        // 保证其他详情展开能收起
        this.promise.then(() => {
          row['showDetails'] = false;
          this.changeRef.markForCheck(); // onpush模式下手动触发，详情收起
        });
      }
    });
  }

  private initFixedHead(): void {
    this.theadContainer = this.fixedHeadService.getTheadContainer(this.hostEle);
    if (!this.theadContainer) {
      return;
    }
    this.tbodyContainer = this.fixedHeadService.getTbodyContainer(this.theadContainer);
    this.isFixedHead = !Util.isUndefined(this.theadContainer) && !Util.isUndefined(this.tbodyContainer);

    if (this.isFixedHead) {
      this.renderer.listen(this.tbodyContainer, 'scroll', () => {
        const scrollLeft: number = this.tbodyContainer.scrollLeft;
        this.renderer.setStyle(this.theadContainer.children[0], 'marginLeft', -scrollLeft + 'px');
        Util.trigger(document, 'tiScroll');
      });

      this.unlistenFixedHeadWindowResize = this.renderer.listen('window', 'resize', () => {
        this.fixedHeadService.processOverflowY(this.theadContainer, this.tbodyContainer, this);
      });

      if ((window as any).ResizeObserver && this.tbodyContainer.children[0]) {
        // 利用 ResizeObserver 来监听表体的尺寸发生改变的时机。IE不支持 ResizeObserver。
        this.tbodyResizeObserver = new (window as any).ResizeObserver((entries: any): void => {
          if (entries[0] && entries[0].contentRect.height !== this.oldTbodyHeight) {
            // 如果表头锁定+列拖动；在 TiColsResizableDirective 的 oninit 时会对该方法赋值；否则为 undefined
            if (this.processYScrollStateChangeWithColsResizable) {
              this.processYScrollStateChangeWithColsResizable();
            } else {
              this.fixedHeadService.processOverflowY(this.theadContainer, this.tbodyContainer, this);
            }
            this.fixedHeadService.removeTbodyContainerBorderBottom(this.tbodyContainer, this.displayedData);
            this.oldTbodyHeight = entries[0].contentRect.height;
          }
        });
        this.tbodyResizeObserver.observe(this.tbodyContainer.children[0]);
      }
    }
  }
  private addFixedColumnBehavior(): void {
    const container: any = this.tiRenderer.findChildrenByClassName(this.hostEle, 'ti3-table-container')[0];
    if (!container) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      this.renderer.listen(container, 'scroll', () => {
        const scrollLeft: number = container.scrollLeft;
        const isRightColumnFloat: boolean = scrollLeft + container.clientWidth < container.scrollWidth;
        this.containerScrollXChangeSubject.next({
          scrollLeft,
          isRightColumnFloat
        });
      });

      this.unlistenFixedColumnWindowResize = this.renderer.listen('window', 'resize', () => {
        const containerWidth: number = this.fixedColumnInfo.container.clientWidth;
        if (containerWidth !== this.fixedColumnInfo.containerWidth) {
          this.fixedColumnInfo.containerWidth = containerWidth;
          this.processFixedColumn();
        }
      });
    });
  }

  /**
   * @ignore
   */
  public processFixedColumn(): void {
    const scrollLeft: number = this.fixedColumnInfo.container.scrollLeft;
    const isRightColumnFloat: boolean =
      scrollLeft + this.fixedColumnInfo.container.clientWidth < this.fixedColumnInfo.container.scrollWidth;
    this.containerScrollXChangeSubject.next({
      scrollLeft,
      isRightColumnFloat
    });
    this.updateFixedThLeftSubject.next(null);
    this.updateFixedTdLeftSubject.next(null);
  }

  /**
   * @ignore
   */
  public needTr(tr: any): boolean {
    if (!tr) {
      return false;
    }
    const classes: Array<string> = [
      'ti3-details-tr',
      'ti3-table-nodata',
      'ti3-table-loadfail',
      'ti3-table-nodata-guide',
      'ti3-table-nodata-simple'
    ];
    for (const className of classes) {
      if (this.tiRenderer.hasClass(tr, className)) {
        return false;
      }
    }

    return true;
  }
}
