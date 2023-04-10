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
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { Util } from '@opentiny/ng-utils';
import { TiLocale, TiLocaleFormat } from '@opentiny/ng-locale'; // 获取词条
import { TiFormComponent } from '@opentiny/ng-base';
import { TiTableComponent } from '@opentiny/ng-table';
import { TiSelectComponent } from '@opentiny/ng-select';
import { Subscription } from 'rxjs';
import packageInfo from '../package.json';

/**
 * 实现每页显示条数的相关配置的数据类型
 */
export interface TiPageSizeConfig {
  /**
   * 每页显示条数选项列表
   */
  options?: Array<number>;
  /**
   * 默认每页显示条数
   */
  size?: number;
  /**
   * 每页显示条数选项列表宽度
   */
  width?: string;
  /**
   * 是否隐藏每页显示条数选项列表。
   */
  hide?: boolean;
}

/**
 * 当分页更新时触发事件通知出去的参数
 *
 * 更新场景包括：1.当前页码改变，2.每页显示条数改变，3.总条数改变。
 */
export interface TiPaginationEvent {
  /**
   * 当前页码数
   */
  currentPage: number;
  /**
   * 每页显示条数
   */
  size: number;
  /**
   * 总条数
   */
  totalNumber: number;
}

/**
 * @ignore
 * 页码的数据类型
 */
export interface TiPageItem {
  id: string;
  label: any;
}

/**
 * Pagination分页组件
 *
 * 分页组件一般情况下与表格组件配合使用，实现对表格数据的分页显示。
 *
 */
@Component({
  selector: 'ti-pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.less', '../../../text/lib/src/text.less'], // 引用text的less文件
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-page-container]': 'true',
    '[class.ti3-pag-container-disable]': 'this.disabled',
    '[attr.unselectable]': '"on"',
    '[class.ti3-page-container-fixed]': 'fixed'
  }
})
export class TiPaginationComponent extends TiFormComponent {
  private static readonly MIN_PAGE: number = 1;
  /**
   * 分页的类型
   */
  @Input() type: 'default' | 'simple' | 'mini' = 'default';
  /**
   * 必选，数据总条数
   */
  @Input() totalNumber: number;
  /**
   * 组件内部改变总条数时触发的回调，参数：总条数。
   */
  @Output() readonly totalNumberChange: EventEmitter<number> = new EventEmitter<number>();
  /**
   * 当前页码数
   */
  @Input() currentPage: number = 1;
  /**
   * 组件内部改变当前页码时触发的回调，参数：当前页码数。
   */
  @Output() readonly currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  /**
   * 必选，每页展示条数的配置
   */
  @Input() pageSize: TiPageSizeConfig;
  /**
   * 是否显示总条数
   */
  @Input() showTotalNumber: boolean = true;
  /**
   * 是否显示页码跳转按钮
   */
  @Input() showGotoLink: boolean = false;
  /**
   * 是否开启自动隐藏
   */
  @Input() autoHide: boolean = false;
  /**
   * 是否禁用
   */
  @Input() disabled: boolean = false;
  /**
   * 是否显示最后一页
   */
  @Input() showLastPage: boolean = true;
  /**
   * 每页展示条数是否使用大数据配置：[20, 50, 100]；默认每页显示20条
   */
  @Input() largeData: boolean = false;
  /**
   * 是否开启分页吸底
   */
  @Input() fixed: boolean = false;
  /**
   * mini类型分页的下拉框宽度
   */
  @Input() pageSelectWidth: string = '70px';
  /**
   * mini类型分页的下拉是否开启虚拟滚动
   */
  @Input() pageSelectVirtual: boolean = false;
  /**
   * 是否处于加载态
   */
  @Input() loading: boolean = false;
  /**
   * 当操作下拉框改变每页显示条数时触发的回调，参数：当前页码、每页显示条数和总条数。
   */
  @Output() readonly pageNumChange: EventEmitter<TiPaginationEvent> = new EventEmitter<TiPaginationEvent>();
  /**
   * 当操作下拉框改变每页显示条数或操作页码改变当前页码时触发的回调，参数：当前页码、每页显示条数和总条数。
   */
  @Output() readonly pageUpdate: EventEmitter<TiPaginationEvent> = new EventEmitter<TiPaginationEvent>();
  /**
   * @ignore
   */
  @ViewChild('mini', { static: true }) mini: TemplateRef<any> = undefined;
  /**
   * @ignore
   */
  @ViewChild('input') inputRef: ElementRef;
  /**
   * @ignore
   * 非mini类型：select下拉组件
   */
  public itemsPerPage: any;
  /**
   * @ignore
   * mini类型：select下拉组件
   */
  public itemsMini: any;
  /**
   * @ignore
   * 用户输入即将跳转的页码
   */
  public gotoPage: { page?: any } = {};
  /**
   * @ignore
   * 页码列表
   */
  public pages: Array<{ key: any; active: boolean }>;
  protected versionInfo: string = super.getVersion(packageInfo);
  private hidePage: boolean = false;
  private totalPageNum: number;
  private oldCurrentPage: number;
  private oldTotalNumber: number;
  private oldSelected: number;
  private oldSize: number;
  private subscription: Subscription;
  private updateFocusableElems: boolean;
  private defaultPageSize: TiPageSizeConfig = {
    options: [10, 20, 50], // 下拉选项列表
    size: 10, // 默认每页显示10条
    width: '60px', // select宽度
    hide: false // 设置是否在页面上隐藏每页显示条数选项：下拉列表
  };
  private largePageSize: TiPageSizeConfig = {
    options: [20, 50, 100], // 下拉选项列表
    size: 20 // 默认每页显示20条
  };
  private unlistenTiReLayoutX: () => void;
  constructor(
    protected render: Renderer2,
    protected hostRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional() private table: TiTableComponent,
    @Optional() private select: TiSelectComponent,
    private zone: NgZone
  ) {
    super(hostRef, render, changeDetectorRef);
  }

  /**
   * @description 创建每一个页码对应的数据
   * @params key 页码显示，为数字或者是"···"
   * @params isActive 是否为当前激活页
   */
  private static makePage(key: any, isActive: boolean): { key: any; active: boolean } {
    return {
      key,
      active: isActive
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    // 组件对外各个接口的初始化处理
    this.initData();
    this.renderPage();

    if (this.isWithTable()) {
      this.subscription = this.table.paginationSubject.subscribe((value: { totalNumber?: number; currentPage?: number }) => {
        if (!Util.isUndefined(value.totalNumber) && value.totalNumber !== this.totalNumber) {
          this.totalNumber = value.totalNumber;
          this.verifyCurrentPage(this.itemsPerPage.selected, true);
          this.totalNumberChange.emit(this.totalNumber);
        }

        if (!Util.isUndefined(value.currentPage) && value.currentPage !== this.currentPage) {
          this.currentPage = value.currentPage;
          this.currentPageChange.emit(this.currentPage);
        }
      });
      // 表格记忆
      this.updateFromStorage();
    }

    // select下拉面板（dropsearch）中使用分页
    if (this.select) {
      this.select.dropsearchCom.pagination = this;
    }

    // 分页吸底
    if (this.fixed && this.isWithTable()) {
      this.zone.runOutsideAngular(() => {
        this.unlistenTiReLayoutX = this.renderer.listen(document, 'tiReLayoutX', () => {
          this.setFixedStyle();
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentPageObj: SimpleChange = changes['currentPage'];
    const totalNumberObj: SimpleChange = changes['totalNumber'];
    const loadingObj: SimpleChange = changes['loading'];
    if (loadingObj && !loadingObj.firstChange) {
      this.renderPage();
    }
    if ((currentPageObj && !currentPageObj.firstChange) || (totalNumberObj && !totalNumberObj.firstChange)) {
      this.verifyCurrentPage(this.itemsPerPage.selected, true);
    }
  }

  ngAfterViewInit(): void {
    // 初始化设置
    if (this.fixed && this.isWithTable()) {
      this.setFixedStyle();
    }
  }

  ngDoCheck(): void {
    let isPageSizeChange: boolean = false;
    // 监听开发者设置的 pageSize.options 的改变
    if (this.pageSize?.options && this.pageSize.options !== this.itemsPerPage.options) {
      this.itemsPerPage.options = this.pageSize.options;
      isPageSizeChange = true;
    }
    // 监听设置的 pageSize.size 的改变
    if (!Util.isUndefined(this.pageSize) && this.pageSize.size !== this.oldSize) {
      this.itemsPerPage.selected = this.pageSize.size;
      this.oldSize = this.pageSize.size;
      isPageSizeChange = true;
    }

    if (isPageSizeChange) {
      const index: number = this.itemsPerPage.options.indexOf(this.itemsPerPage.selected);
      if (index === -1) {
        this.itemsPerPage.selected = this.itemsPerPage.options[0];
        this.syncPageSize(this.itemsPerPage.selected);
        this.oldSize = this.pageSize.size;
      }
      this.verifyCurrentPage(this.itemsPerPage.selected, true);
      this.changeDetectorRef.markForCheck();
    }

    if (
      this.oldTotalNumber !== this.totalNumber ||
      this.itemsPerPage.selected !== this.oldSelected ||
      this.oldCurrentPage !== this.currentPage
    ) {
      this.renderPage();
      this.oldTotalNumber = this.totalNumber;
      this.oldSelected = this.itemsPerPage.selected;
      this.oldCurrentPage = this.currentPage;
      this.updateFocusableElems = true; // select使用过这个变量后，会重置为false
    }
  }
  ngAfterViewChecked(): void {
    // select中使用的分页为default类型且不带左边select，所以此处限定type === 'default'
    if (this.type === 'default' && this.updateFocusableElems) {
      // 修复SSR报错：ERROR TypeError: this.nativeElement.querySelectorAll(...) is not a function or its return value is not iterable
      this.setFocusableElems(Array.prototype.slice.call(this.nativeElement.querySelectorAll('a')));
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.unlistenTiReLayoutX) {
      this.unlistenTiReLayoutX();
    }
  }

  // 数据初始化
  private initData(): void {
    // 总条数数字国际化处理，拼接成 ---> 总条数: 条数
    this.setTotalNumberFormat();

    // 初始化获取itemsPerPage：select组件所需的属性
    this.itemsPerPage = this.getFormatedSize();

    this.verifyCurrentPage(this.itemsPerPage.selected, true);

    this.oldCurrentPage = this.currentPage;
    this.oldTotalNumber = this.totalNumber;
    this.oldSize = this.itemsPerPage.selected;
    this.oldSelected = this.itemsPerPage.selected;
  }

  // 是否有表格当前页记忆
  private isStorageCurrentPage(): boolean {
    return (
      this.table.storageId &&
      (this.table.storageConfig.pagination === true ||
        (this.table.storageConfig.pagination && this.table.storageConfig.pagination['currentPage'] === true))
    );
  }

  // 是否有表格每页个数记忆
  private isStorageItemsPerPage(): boolean {
    return (
      this.table.storageId &&
      (this.table.storageConfig.pagination === true ||
        (this.table.storageConfig.pagination && this.table.storageConfig.pagination['itemsPerPage'] === true))
    );
  }
  // 处理表格记忆
  private updateFromStorage(): void {
    // 修复SSR报错：ERROR TypeError: Cannot read property 'currentPage' of undefined
    // 当前页
    if (this.isStorageCurrentPage()) {
      const currentPage: number = this.table.sessionStorageState && this.table.sessionStorageState.currentPage;
      if (currentPage > 0) {
        // 此处异步为处理ExpressionChangedAfterItHasBeenCheckedError报错问题，onpush正常default报错；
        Promise.resolve().then(() => {
          this.currentPage = currentPage;
          this.currentPageChange.emit(currentPage);
        });
      }
    }
    // 修复SSR错误：ERROR TypeError: Cannot read property 'itemsPerPage' of undefined
    // 每页条数
    if (this.isStorageItemsPerPage()) {
      const itemsPerPage: number = this.table.localStorageState && this.table.localStorageState.itemsPerPage;
      if (itemsPerPage > 0) {
        this.pageSize.size = itemsPerPage;
        const pagination: TiPaginationEvent = {
          currentPage: this.currentPage,
          size: itemsPerPage,
          totalNumber: this.totalNumber
        };
        this.pageNumChange.emit(pagination);
      }
    }
  }

  /**
   * 根据接口配置来渲染页面
   */
  private renderPage(): void {
    if (this.type === 'mini') {
      this.configMini();
    } else {
      // goto页码与当前页码保持一致
      this.gotoPage = {
        page: this.currentPage
      };

      // 页码列表
      this.pages = this.getPages();
    }

    // 用户开启自动隐藏功能且无需显示分页(若总条数 =< 最小的每页显示条数)时，则不需要显示分页时，隐藏分页
    // 初始化totalNumber undefined
    this.hidePage =
      this.autoHide && (Util.isUndefined(this.totalNumber) || Math.min.apply(null, this.itemsPerPage.options) >= this.totalNumber);
    if (this.hidePage) {
      this.render.setStyle(this.hostRef.nativeElement, 'display', 'none');
    } else {
      this.render.setStyle(this.hostRef.nativeElement, 'display', 'inline-block');
    }

    // 若分页与ti-table配合使用，则当分页更新时，触发ti-table的updatePagination
    // 进而触发表格更新回调
    if (this.isWithTable()) {
      this.table.updatePagination(this.currentPage, this.itemsPerPage.selected);
    }
  }

  /**
   * @ignore
   * 对总页数进行数字国际化处理
   */
  public setTotalNumberFormat(): string {
    // 数字国际化格式：整数位保留最小位数.小数位保留最小位数-小数位最大保留位置
    const formatTotalNumber: string = Util.isUndefined(this.totalNumber) ? '0' : TiLocaleFormat.formatNumber(this.totalNumber, '1.0-0');

    return TiLocale.getLocaleWords().tiPagination['totalLabel'] + formatTotalNumber;
  }

  private getFormatedSize(): any {
    if (!this.pageSize) {
      this.pageSize = this.largeData ? this.largePageSize : this.defaultPageSize;
    }
    const sizeConfig: TiPageSizeConfig = this.largeData
      ? { ...this.defaultPageSize, ...this.largePageSize, ...this.pageSize }
      : { ...this.defaultPageSize, ...this.pageSize };
    let index: number = sizeConfig.options.indexOf(sizeConfig.size);
    if (index === -1) {
      index = 0;
      this.syncPageSize(sizeConfig.options[index]);
    }

    return {
      selected: sizeConfig.options[index], // select选中项
      options: sizeConfig.options, // 每页显示条数选项
      hide: sizeConfig.hide, // 是否显示
      style: {
        width: sizeConfig.width // 宽度设置
      }
    };
  }

  /**
   * 同步变化开发者的pageSize数据
   */
  private syncPageSize(pageSizeNum: number): void {
    if (this.pageSize instanceof Object) {
      this.pageSize.size = pageSizeNum;
    }
  }

  /**
   * @ignore
   * 当前页码是否为最小页码
   */
  public noPrevious(): boolean {
    return this.currentPage === TiPaginationComponent.MIN_PAGE;
  }

  /**
   * @ignore
   * 当前页码是否为最大页码
   */
  public noNext(): boolean {
    return this.currentPage === this.totalPageNum;
  }

  /**
   * @ignore
   * 当前页码是否为'···' 不可被聚焦
   */
  public isEllipse(page: any): boolean {
    return page.key === '···';
  }

  /**
   * @ignore
   * 操作pageSize选择框,每页显示条数改变时触发
   */
  public onSizeChange(pageSizeNum: number): void {
    this.syncPageSize(pageSizeNum);
    // pageSize变化时，默认跳转到第1页，并触发currentPageChange事件
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.currentPageChange.emit(this.currentPage);
    }
    const pagination: TiPaginationEvent = {
      currentPage: this.currentPage,
      size: pageSizeNum,
      totalNumber: this.totalNumber
    };
    this.pageNumChange.emit(pagination);
    this.pageUpdate.emit(pagination);
  }

  // 通过操作选择某一页
  private selectPage(page: any, evt?: Event): void {
    // tiny2中此处阻止a标签浏览器默认事件
    if (!Util.isUndefined(evt)) {
      evt.preventDefault();
    }

    if (this.disabled) {
      return;
    }

    const selectedPage: number = parseInt(page, 10);
    if (selectedPage !== this.currentPage) {
      this.currentPage = selectedPage;
      this.currentPageChange.emit(this.currentPage);
      this.pageUpdate.emit({
        currentPage: this.currentPage,
        size: this.itemsPerPage.selected,
        totalNumber: this.totalNumber
      });
    }
  }

  /**
   * 计算总页数
   */
  private calculateTotalPages(pageSizeNum: number): number {
    const totalPages: number = Math.ceil(this.totalNumber / pageSizeNum);

    return Math.max(totalPages || 0, 1); // 当totalPages是undefined时，取0
  }

  /**
   * 组装mini类型时模板需要的数据
   */
  private configMini(): void {
    const options: Array<TiPageItem> = [];
    for (let i: number = 1; i <= this.totalPageNum; i++) {
      options.push({
        id: `${i}`,
        label: `${i}/${this.totalPageNum}`
      });
    }
    this.itemsMini = {
      options,
      selected: options[this.currentPage - 1],
      change: (option: TiPageItem): void => {
        // 选项改变时，修改选中页
        this.selectPage(option.id);
      }
    };
  }

  /**
   * @description 根据每页显示条数及数据总条数获取页码列表
   */
  private getPages(): Array<{ key: any; active: boolean }> {
    if (this.loading) {
      return this.getLoadingPages();
    }
    const startAndEndPage: Array<number> = this.getInterval(); // 获得显示的起始和结束页
    const startPagNum: number = startAndEndPage[0];
    const endPagNum: number = startAndEndPage[1];
    const pages: Array<{ key: any; active: boolean }> = [];
    const restPageNum: number = this.totalPageNum - this.currentPage; // 剩余页数

    // 只有1页的情况
    if (this.totalPageNum === 1) {
      pages.push(TiPaginationComponent.makePage(1, true));

      return pages;
    }

    // 当总页数大于8，并且中间连续按钮的起始位置没有和第1页相连时，创建第1页按钮和省略号
    if (startPagNum > 2 && this.totalPageNum > 8) {
      pages.push(TiPaginationComponent.makePage(1, this.currentPage === 1));
      pages.push(TiPaginationComponent.makePage('···', false));
    }

    // 创建中间页按钮
    for (let i: number = startPagNum; i <= endPagNum; i++) {
      pages.push(TiPaginationComponent.makePage(i, this.currentPage === i));
    }

    // 当总页数大于8，并且中间连续按钮的结束位置没有和最后一页按钮相连时，创建省略号
    // 当总页数大于8，并且最后一页隐藏且不是后四页时，创建省略号
    if (this.totalPageNum > 8 && ((this.showLastPage && endPagNum < this.totalPageNum - 1) || (!this.showLastPage && restPageNum > 3))) {
      pages.push(TiPaginationComponent.makePage('···', false));
    }

    // 最后一页隐藏：如果中间连续按钮的结束位置为总页数的前一页且当前页是后四页时，创建最后一页
    // 最后一页不隐藏：如果中间连续按钮的结束位置，不是最后一页按钮时，创建最后一页按钮
    if (
      (!this.showLastPage && endPagNum === this.totalPageNum - 1 && restPageNum <= 3) ||
      (this.showLastPage && endPagNum < this.totalPageNum)
    ) {
      pages.push(TiPaginationComponent.makePage(this.totalPageNum, this.currentPage === this.totalPageNum));
    }

    return pages;
  }

  /**
   * @description 根据当前页码和要显示的数目，计算分页链接的起始页
   */
  private getInterval(): Array<number> {
    let start: number;
    let end: number;
    // 1.根据Agile规范：页数小于等于8，起、始按钮值分别设为1和最大页数：1 - 总数
    if (this.totalPageNum <= 8) {
      start = 1;
      end = this.totalPageNum;

      return [start, end];
    }

    // 2.总页数大于8，当前项为前三页：1 - 5 / 1 - 6
    if (this.currentPage <= 3) {
      start = 1;
      end = 5;
      if (!this.showLastPage) {
        end = 6;
      }

      return [start, end];
    }

    // 3.总页数大于8，当前项是后4页：总数-4 - 总数
    if (this.currentPage > this.totalPageNum - 3) {
      start = this.totalPageNum - 4;
      end = this.totalPageNum;

      return [start, end];
    }

    // 4.总页数大于8，当前项不在前三页，后三页：显示中间4个按钮
    start = this.currentPage - 1;
    end = this.currentPage + 2;

    // 一般数据量比较大的场景隐藏最后一页时，显示中间5个按钮
    if (!this.showLastPage) {
      end = this.currentPage + 3;
    }

    return [start, end];
  }

  /**
   * @description 获取加载态页码列表
   */
  private getLoadingPages(): Array<{ key: string; active: boolean }> {
    const pages: Array<{ key: string; active: boolean }> = [];
    // 总页数小于8 或 当前页小于等于4的情况
    // 1 2 3 4 5 6 7 ...
    if (this.totalPageNum < 8 || this.currentPage <= 4) {
      // 结尾页取 总页数 和 7 中间的最小值
      const endPage: number = Math.min(this.totalPageNum, 7);
      for (let i: number = 1; i <= endPage; i++) {
        // 循环生成中间页
        pages.push(TiPaginationComponent.makePage(i, i === this.currentPage));
      }
      // 添加结尾...表示加载态
      pages.push(TiPaginationComponent.makePage('···', false));
    } else {
      // 当前页大于4且总页数大于等于8的情况
      // 1 ... 5 6 7 8 9 ...
      // 添加1和...
      pages.push(TiPaginationComponent.makePage(1, false));
      pages.push(TiPaginationComponent.makePage('···', false));
      // 结尾页取 当前页+2 和 总页数 之间的最小值
      const endPage: number = Math.min(this.currentPage + 2, this.totalPageNum);
      // 起始页取 结尾页-4 故共渲染5页
      const startPage: number = endPage - 4;
      for (let i: number = startPage; i <= endPage; i++) {
        // 循环生成中间页
        pages.push(TiPaginationComponent.makePage(i, i === this.currentPage));
      }
      // 添加结尾...表示加载态
      pages.push(TiPaginationComponent.makePage('···', false));
    }
    // 返回页码列表
    return pages;
  }

  /**
   * 设置合法的新页码
   */
  private verifyCurrentPage(pageSizeNum: number, triggerPageUpdate: boolean): void {
    this.totalPageNum = this.calculateTotalPages(pageSizeNum);
    if (this.currentPage > this.totalPageNum || this.currentPage < TiPaginationComponent.MIN_PAGE) {
      this.currentPage = this.currentPage > this.totalPageNum ? this.totalPageNum : TiPaginationComponent.MIN_PAGE;
      if (triggerPageUpdate) {
        this.pageUpdate.emit({
          currentPage: this.currentPage,
          size: pageSizeNum,
          totalNumber: this.totalNumber
        });
        // 此处异步为处理ExpressionChangedAfterItHasBeenCheckedError报错问题，onpush正常default报错；
        Promise.resolve().then(() => {
          this.currentPageChange.emit(this.currentPage);
        });
      } else {
        this.currentPageChange.emit(this.currentPage);
      }
    }
  }

  /**
   * @ignore
   * 输入跳转页码enter快捷键处理
   */
  public enterPageHandler(e: KeyboardEvent): void {
    this.gotoPageHandler(e);
  }

  /**
   * @ignore
   * 根据要跳转的页码，同步修改当前页码
   */
  public gotoPageHandler(event: KeyboardEvent): void {
    // 当输入值为不合法时处理
    if (this.gotoPage.page < TiPaginationComponent.MIN_PAGE || this.gotoPage.page > this.totalPageNum) {
      this.gotoPage.page = this.currentPage;

      return;
    }

    if (this.gotoPage.page !== this.currentPage) {
      this.currentPage = this.gotoPage.page;
      this.currentPageChange.emit(this.currentPage);
      this.pageUpdate.emit({
        currentPage: this.currentPage,
        size: this.itemsPerPage.selected,
        totalNumber: this.totalNumber
      });
    }
  }

  /**
   * @ignore
   * 上一页按钮的点击事件
   */
  public onPrevClick(event: Event): any {
    return !this.noPrevious() && this.selectPage(this.currentPage - 1, event);
  }

  /**
   * @ignore
   * 页码点击事件
   */
  public onPageClick(page: any, event: Event): any {
    return !this.isEllipse(page) && this.selectPage(page.key, event);
  }

  /**
   * @ignore
   * 下一页按钮的点击事件
   */
  public onNextClick(event: Event): any {
    return !this.noNext() && this.selectPage(this.currentPage + 1, event);
  }

  /**
   * @ignore
   * input输入框modelchange事件
   */
  public ngModelChange(value: any): void {
    if (value === '') {
      this.gotoPage.page = '';

      return;
    }

    const newPage: number = parseInt(value, 10);
    if (isNaN(newPage)) {
      this.render.setProperty(this.inputRef.nativeElement, 'value', this.gotoPage.page);

      return;
    }

    this.gotoPage.page = newPage;
    this.render.setProperty(this.inputRef.nativeElement, 'value', this.gotoPage.page);
  }

  /**
   * @ignore
   */
  public trackByFn(index: number, item: any): number {
    return item.key;
  }

  private isWithTable(): boolean {
    return this.table && this.render.parentNode(this.nativeElement).tagName === 'TI-TABLE';
  }

  /**
   * 设置分页吸底组件样式
   */
  private setFixedStyle(): void {
    if (typeof this.table.nativeElement.getBoundingClientRect !== 'function') {
      return;
    }

    const left: number = this.table.nativeElement.getBoundingClientRect().left;
    // 组件要与tp-layout-section左侧对齐，此处需要减去tp-layout-section左侧间距 24px
    this.renderer.setStyle(this.nativeElement, 'left', `calc(${left}px - 24px)`);
    this.renderer.setStyle(this.nativeElement, 'width', `calc(100% - ${left}px)`);
  }
}
