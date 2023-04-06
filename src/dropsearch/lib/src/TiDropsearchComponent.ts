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
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiSearchboxNotsearchComponent } from '@opentiny/ng-searchbox';
import { TiKeymap, Util } from '@opentiny/ng-utils';
import { TiDropComponent } from '@opentiny/ng-drop';
import { TiDroplistComponent } from '@opentiny/ng-droplist';
import { TiLocale } from '@opentiny/ng-locale';
import packageInfo from '../package.json';
/**
 * @ignore
 * 下拉面板带有可搜索的数组组件，主要用于select，表格列设置。
 */
@Component({
  selector: 'ti-dropsearch',
  templateUrl: './dropsearch.html',
  styleUrls: ['./dropsearch.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiDropsearchComponent)]
})
export class TiDropsearchComponent extends TiDroplistComponent {
  @Input() searchable: boolean = false;
  @Input() searchKeys: Array<string>; // 要搜索的字段数组, 默认是labelKey或者全部字段
  @Input() selectAll: boolean = false; // 多选模式下是否有全选功能
  /**
   * 面板对齐方式, drop中的panelAlign接口透传出去
   */
  @Input() panelAlign: 'left' | 'right' = 'left';

  /**
   * @ignore
   * dominator 到drop的距离
   */
  @Input() dominatorSpace: string = TiDropComponent.DOMINATOR_SPACE + 'px';
  /**
   *
   * 搜索时，收起下拉面板后是否保留搜索关键字，
   */
  @Input() reserveSearchword: boolean = false;

  /**
   * @ignore
   *
   * 后台搜索，传出搜索框的值
   */
  @Output() readonly beforeSearch: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TiSearchboxNotsearchComponent)
  searchboxCom: TiSearchboxNotsearchComponent;
  @ViewChild(TiDropComponent, { static: true }) dropCom: TiDropComponent;
  @ContentChild('footer', { static: true }) footerTemplateRef: TemplateRef<any>;

  public searchWord: string; // 搜索框内单词
  /**
   * 搜索结果数组
   */
  public searchResult: Array<any> = new Array<any>();
  private oldSearchable: boolean = null;
  public pagination: any; // 没有指定类型是因为如果引入TiPaginationComponent会因为循环引用导致报错
  public focusableElemsInSearch: Array<any> = [];
  public focusableElemsInPagination: Array<any> = [];
  /**
   * @ignore select的beforeSearch有没有被监听，该值为true，dropsearch的beforeSearch才是真正意义的被监听
   */
  public hasBeforeSearchObservers: boolean;

  public isFocusableElemsInPaginationChange: boolean;

  protected versionInfo: string = super.getVersion(packageInfo);

  private searchwordChangeObserve: Subject<null> = new Subject();
  private searchwordChangeSub: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // 外部修改show属性的处理，初始定义在ngOnInit中处理
    if (changes['options'] && this.options && !changes['options'].firstChange) {
      if (this.searchable && this.isShow) {
        if (this.hasBeforeSearchObservers) {
          this.setSearchResult(this.options); // 后台搜索时会给 options 赋新值
        } else {
          this.filterSearchReslut(this.searchboxCom?.model);
        }
      }
    }

    if (changes['searchable']) {
      this.heightExcludeList = changes['searchable'].currentValue ? TiDroplistComponent.SEARCHBOX_EXCLUDE_HEIGHT : 2;
    }
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.searchResult = this.options;
    if (this.hasBeforeSearchObservers) {
      this.createSearchwordChangeObserve();
    }
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    // 修复问题：OnPush的综合搜索，点击value弹开面板，面板显示值是旧的，移动鼠标到面板可以刷新。
    this.changeDetectorRef.markForCheck();
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    let focusableElemsChange: boolean;
    if (this.searchable !== this.oldSearchable) {
      super.unlistenKendown();
      if (this.searchable) {
        this.focusableElemsInSearch = this.searchboxCom?.getFocusableElems();
        focusableElemsChange = true;
        super.listenKeydown(this.searchboxCom?.getFocusableElems()[0]);
      } else {
        this.focusableElemsInSearch = [];
        super.listenKeydown(this.dominatorElem);
      }
      this.oldSearchable = this.searchable;
    }
    if (this.pagination && this.pagination.updateFocusableElems) {
      this.focusableElemsInPagination = this.pagination.getFocusableElems();
      this.pagination.updateFocusableElems = false;
      this.isFocusableElemsInPaginationChange = true;
      focusableElemsChange = true;
    }

    if (focusableElemsChange) {
      this.setFocusableElems(this.focusableElemsInSearch?.concat(this.focusableElemsInPagination));
    }
  }

  ngOnDestroy(): void {
    this.searchwordChangeSub && this.searchwordChangeSub.unsubscribe();
  }
  private createSearchwordChangeObserve(): void {
    this.searchwordChangeSub = this.searchwordChangeObserve
      .pipe(
        debounceTime(500),
        switchMap(() => {
          this.beforeSearch.emit();

          return 'complete';
        })
      )
      .subscribe();
  }
  /**
   * 覆盖父类show()
   */
  public show(): void {
    if (this.isShow) {
      return;
    }
    // 清空搜索框并处理下拉列表内容
    if (this.searchable) {
      // 更新searchResult的情况是：关闭之前清空搜索词，则后台搜索置为重新请求的数据，前台搜索置为初始值
      if (!this.reserveSearchword) {
        this.searchResult = this.options;
      }
      this.changeDetectorRef.detectChanges();
      super.show();
      // 焦点转移至搜索框
      if (this.searchboxCom) {
        this.searchboxCom.focus();
      }
    } else {
      super.show();
    }
  }
  /**
   * 覆盖父类hide(), 有搜索框时焦点转移
   */
  public hide(): void {
    if (this.isShow) {
      super.hide();
      this.handleSearchOnHide();
      if (this.searchable) {
        this.dominatorElem.focus();
      }
    }
  }
  /**
   * 仅hide，不带焦点转移。
   */
  public hideWithoutFocus(): void {
    super.hide();
    this.handleSearchOnHide();
  }

  public searchWordChange(searchWord: string): void {
    // 1.如果是后台搜索，则对外发送事件，由外部处理
    if (this.hasBeforeSearchObservers) {
      this.searchwordChangeObserve.next(null);

      return;
    }
    // 2.如果是前台搜索，则由内部过滤搜索结果
    this.filterSearchReslut(searchWord);
  }
  /**
   * 前台搜索时使用，查找搜索结果
   */
  private filterSearchReslut(searchWord: string): void {
    if (this.options && this.options.length >= 0) {
      // 搜索结果临时值。结果默认值，是原数据
      let searchResult: Array<any> = this.options;
      // 如果搜索词存在
      if (!Util.isEmptyString(searchWord)) {
        // 如果是分组，则找出第二级item集合
        if (this.options[0] && this.listCom.isGroup(this.options[0])) {
          searchResult = [];
          this.options.forEach((group: any) => {
            searchResult = searchResult.concat(group.children);
          });
        }
        // 在集合中搜索
        searchResult = searchResult.filter((option: any) => {
          if (!this.searchKeys) {
            // 没有定义searchKeys时，取labelKey
            return Util.isString(option[this.labelKey]) && option[this.labelKey].toLowerCase().indexOf(searchWord.toLowerCase()) >= 0;
          } else {
            //  已定义searchKeys，任一条目匹配即可
            for (const searchKey of this.searchKeys) {
              if (Util.isString(option[searchKey]) && option[searchKey].toLowerCase().indexOf(searchWord.toLowerCase()) >= 0) {
                return true;
              }
            }

            return false;
          }
        });
      }

      this.setSearchResult(searchResult);
    }
  }
  /**
   * 搜索后，按需重新定位、设置hoverOption
   */
  public setSearchResult(searchResult: Array<any>): void {
    const oldSearchResultLength: number = this.searchResult?.length;
    this.searchResult = searchResult;
    // list个数不同时，重定位下拉位置
    if (this.searchResult.length !== oldSearchResultLength) {
      setTimeout(() => {
        this.rePosition(true);
        this.changeDetectorRef.markForCheck();
      }, 0);
    }
  }

  private handleSearchOnHide(): void {
    if (this.searchable && this.searchWord && !this.reserveSearchword) {
      this.searchWord = '';
      if (this.hasBeforeSearchObservers) {
        this.searchwordChangeObserve.next(null);
      }
    }
  }
}
