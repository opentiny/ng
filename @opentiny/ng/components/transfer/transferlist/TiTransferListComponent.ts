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
import { ChangeDetectionStrategy, Component, Input, SimpleChanges, Output, EventEmitter,
  ElementRef, Renderer2, ChangeDetectorRef, TemplateRef, ContentChild } from '@angular/core';
import { TiFormComponent } from '../../base/TiFormComponent';
import { TiTableRowData, TiTableSrcData } from '../../table/TiTableModule';
import { Util } from '../../../utils/Util';
import { TiTransferColumn } from '../TiTransferColumn';
import { TiTransferUtil } from '../transferUtil';

@Component({
  selector: 'ti-transfer-list',
  templateUrl: './transfer-list.html',
  styleUrls: ['./transfer-list.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiTransferListComponent)]
})
export class TiTransferListComponent extends TiFormComponent {
    /**
     * 穿梭框的源数据
     *
     * 默认值 : []
     */
    @Input() options: Array<any> = [];
    /**
     * 穿梭框列表要显示的字段
     *
     * 默认值 : label
     */
    @Input() labelKey: string = 'label';
    /**
     * @ignore
     * 列表数据中的唯一标识属性，该接口暂不对外开放，后续如果业务场景labelKey对应的值确实有重复时，再对外开放该接口。
     *
     * 默认值 : label
     */
    @Input() idKey: string;
    /**
     * 设置面板头部标题
     */
    @Input() title: string;
     /**
      * 无数据时的显示文本
      */
    @Input() noDataText: string;
    /**
     * 设置面板的高度
     *
     * 缺省值 : 300px
     */
    @Input() height: string;
    /**
     * 设置面板的宽度
     *
     * 缺省值 : 200px
     */
    @Input() width: string;
    /**
     * 设置是否添加搜索框
     *
     * 缺省值 : false
     */
    @Input() searchable: boolean = false;
    /**
     * 输入框的placeholder
     */
    @Input() placeholder: string;
    /**
     *  要搜索的字段数组
     *
     * 缺省值 : labelKey
     */
    @Input() searchKeys: Array<string>;
    /**
     * 设置是否开启分页
     *
     * 缺省值 : false
     */
    @Input() pageable: boolean = false;
    /**
     * 分页数据大小
     */
    @Input() pageSize: number = 10;
    /**
     * 表格类型 默认为list
     */
    @Input() type: 'list'|'table' = 'list';
    /**
     *  table类型表格表头
     */
    @Input() columns: Array<TiTransferColumn> = [];
    /**
     * @ignore
     * 选中事件，向外通知option数据
     */
    @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
    @ContentChild(TemplateRef, { static: false }) itemTemplate: TemplateRef<any>;
    /**
     * @ignore
     * 面板左上角options总数显示
     */
    public selectedNumber: number =  0;
    /**
     * @ignore
     * 面板左上角选中项个数显示
     */
    public totalNumber: number = 0;
    /**
     * @ignore
     * 全选按钮的选中状态
     */
    public selectAllState: boolean;
    /**
     * @ignore
     * 搜索框内单词
     */
    public searchWord: string;
    /**
     * @ignore
     * 搜索结果数组
     */
    public searchResult: Array<any> = new Array<any>();
    /**
     * @ignore
     * list展示数据数组
     */
    public dispalyData: Array<any> = new Array<any>();
    /**
     * @ignore
     * 分页当前页数
     */
    public currentPage: number = 1;
    /**
     * @ignore
     * 分页数据总数
     */
    public total: number;
    /**
     * @ignore
     * table类型下数据总数
     */
    public tableTotalNumber: number;
    /**
     * @ignore
     * table类型下选中项列表
     */
    public checkedList: Array<any> = [];
    /**
     * @ignore
     * table类型实际展示的数据
     */
    public displayed: Array<TiTableRowData> = [];
    /**
     * @ignore
     * table类型表个配置项
     */
    public srcData: TiTableSrcData;

    constructor(hostRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef) {
      super(hostRef, renderer, changeDetectorRef);
    }
    /**
     * 监听选中项的变化
     * @param model 选中项
     */
    protected ngOnModelChange(model: any): void {
      // 更新选中项的总数
      this.selectedNumber = model ? model.length : 0;
      // 点击option，设置全选按钮的选中状态
      this.setSelectedAllState();
    }

    // 监听options的变化，在options改变时，改变右上角数字总数的值
    ngOnChanges(changes: SimpleChanges): void {
      super.ngOnChanges(changes);
      /**
       * 如果有搜索框，options改变时，在页面上显示的searchResult，
       * 此处需要将改变的options重新赋给searchResult
       */
      if (changes?.options) {
        if (this.searchable) {
          this.searchResult = this.options;
          this.searchWord = '';
        }
        // 更新options总数和选中项总数
        this.totalNumber = changes.options.currentValue ? changes.options.currentValue.length : 0;
        this.selectedNumber = this.model ? this.model.length : 0;
        if (this.type === 'list') {
          // options改变时，设置全选按钮的选中状态
          this.setSelectedAllState();
          this.changePagination(this.currentPage);
        }
        if (this.type === 'table') {
          this.srcData = {
            data: this.options,
            state: {
                searched: false,
                sorted: false,
                paginated: false
            }
          };
          this.tableTotalNumber = this.options.length;
        }
      }
    }

    // 触发分页修改总数的展示数据
    public changePagination(event: number): void {
      if (this.pageable) {
        this.total = this.searchable ? this.searchResult.length : this.options.length;
        this.dispalyData = this.searchable ? this.searchResult.slice(this.pageSize * (event - 1),
                                                      this.pageSize * event)
                              : this.options.slice(this.pageSize * (event - 1), this.pageSize * event);
      } else {
        this.dispalyData = this.searchable ? this.searchResult : this.options;
      }
    }

    // list列表选中/取消选项事件
    public onSelect(option: any): void {
      this.select.emit(option);
    }

    public onClickSelectAll(): void {
      this.changeModel(this.selectAllState === false || this.selectAllState === null);
    }

    private changeModel(state: boolean): void {
      this.model = state ? this.options.filter((option) => {
          return !option.disabled;
      }) : this.model.filter((option: any) => {
          return option.disabled;
      });
      this.selectAllState = state;
    }

    // 设置全选按钮的选中状态
    public setSelectedAllState(): void {
      if (this.isValidData()) {
          this.selectAllState = false;
          return;
      }

      const selectedOptions: Array<any> = this.getSelectedOptions();

      if (selectedOptions.length === 0) {
        this.selectAllState = false;
        return;
      }

      const selectableOptions: Array<any> = this.getSelectableOptions();

      this.selectAllState = selectedOptions.length === selectableOptions.length ? true : null;
    }

    // 判断数据有效性
    private isValidData(): boolean {
       return !this.model || this.model.length === 0 || !this.options || this.options.length === 0;
    }

    private getSelectedOptions(): Array<any> {
     return this.options.filter((item: any) => {
        return this.isSelectable(item) && this.isSelected(item);
      });
    }

    private getSelectableOptions(): Array<any> {
     return this.options.filter((item: any) => {
        return this.isSelectable(item);
      });
    }

    // 是否为可选数据项
    protected isSelectable(item: any): boolean {
      return !this.isDisabled(item);
    }

    // 当前元素是否为禁用状态
    private isDisabled(item: any): boolean {
      return item && item.disabled;
    }

    // 是已选中数据项
    public isSelected(item: any): boolean {
        if (!this.model) {
            return false;
        }

        return this.getIndex(item, this.model) !== -1;
    }

    private getIndex(item: any, arr: Array<any>): number {
      if (!arr || !item) {
          return -1;
      }
      for (let i: number = 0; i < arr.length; i++) {
          if (TiTransferUtil.isEqualOption(this.idKey, this.labelKey, arr[i], item)) {
              return i;
          }
      }

      return -1;
  }
    // 在searchword进行变化时，进行前台搜索相关处理
    public searchWordChange(searchWord: string): void {
      if (this.type === 'table') {
        return;
      }
      this.filterSearchReslut(searchWord);
    }

    /**
     * 前台搜索时使用，查找搜索结果
     */
    private filterSearchReslut(searchWord: string): void {
      if (this.options?.length >= 0) {
          // 搜索结果临时值。结果默认值，是原数据
          let searchResult: Array<any> = this.options;
          // 如果搜索词存在
          if (!Util.isEmptyString(searchWord)) {
              // 在集合中搜索
              searchResult = searchResult.filter((option: any) => {
                  if (!this.searchKeys) {
                    // 没有定义searchKeys时，取labelKey
                    return this.isMatchbWithSWord(option, this.labelKey, searchWord);
                  } else {
                    //  已定义searchKeys，任一条目匹配即可
                    return this.isMatchBySearchkeys(option, searchWord);
                  }
              });
          }
          this.searchResult = searchResult;
          this.changePagination(this.currentPage);
      }
  }

    // 已定义searchKeys，任一条目匹配即可
    private isMatchBySearchkeys(option: any, searchWord: string): boolean {
      for (const searchKey of this.searchKeys) {
        if (this.isMatchbWithSWord(option, searchKey, searchWord)) {
            return true;
        }
      }

      return false;
    }

    // 下拉项中的searchKey字段是否和搜索字段相匹配
    private isMatchbWithSWord(option: any, searchKey: string, searchWord: string): boolean {
      return Util.isString(option[searchKey]) && option[searchKey].toLowerCase()
      .indexOf(searchWord.toLowerCase()) >= 0;
    }

  /**
   * 问题：搜索框无法聚焦
   * 原因：在list组件中为了避免domintor失焦，在mousedown中,阻止了默认行为。
   * 方案：
   * 在transfer中不涉及domintor失焦场景，不需要阻止默认行为,
   * 给list组件绑定mousedown事件
   * 使用event.stopImmediatePropagation() 阻止同一元素绑定相同事件，后续的执行的相同事件不会被触发
   * 此处mousedown的执行顺序：先执行transfer中的mousedown,再执行list中的mousedown。
   * 通过stopImmediatePropagation方法，从而阻止了list组件中ousedown事件的触发
   */
  public onListMousedown(event: MouseEvent): void {
    event.stopImmediatePropagation();
  }

  // 将表格选中项通知给model
  public onCheckedsChange(checkeds: Array<any>): void {
    this.model = [...checkeds];
  }

  // 将model更改后值的通知给表格选中项
  writeValue(model: any): void {
    super.writeValue(model);
    if (this.type === 'table' && model !== null) {
      this.checkedList = model;
    }
  }
}
