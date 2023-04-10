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
  EventEmitter,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Params } from '@angular/router';

import { TiBaseComponent } from '@opentiny/ng-base';
import { TiListScrollLoad } from '@opentiny/ng-list';
import { TiSelectComponent } from '@opentiny/ng-select';
import { TiPositionType } from '@opentiny/ng-utils';
import { Util } from '@opentiny/ng-utils';
import packageInfo from '../package.json';
/**
 * items接口item项的数据接口
 */
export interface TiSubtitleItem {
  label: string;
  [propName: string]: any;
}

/**
 * scrollToBottom 事件回调参数
 *
 */
export interface TiSubtitleListScrollLoad extends TiListScrollLoad {
  /**
   * subtile 中 下拉选择部分 select 组件实例
   */
  selectInstance?: TiSelectComponent;
}

@Component({
  selector: 'ti-subtitle',
  templateUrl: './subtitle.html',
  styleUrls: ['./subtitle.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * 返回标题组件
 *
 */
export class TiSubtitleComponent extends TiBaseComponent {
  /**
   * 后退按钮链接
   */
  @Input() href: string = '';
  /**
   * 标题数据集，如果选项大于 1 个，标题是下拉的形式
   */
  @Input() items: Array<TiSubtitleItem> = [];
  /**
   * 下拉面板中是否有搜索框
   */
  @Input() searchable: boolean = false;
  /**
   * 指定在何处打开链接, 即 a 标签的 target 属性
   */
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_blank';
  // select组件选中项模板引用名为#selected, 两个名字冲突，所以使用了别名
  /**
   * 选中项，items 的条数大于 1 时才生效
   */
  @Input('selected') selectedItem: TiSubtitleItem;
  /**
   * 后退按钮点击后的跳转路由, 设置后 href 和 target 失效
   */
  @Input() backRouterLink: string | Array<any>;
  /**
   * 后退按钮点击后的跳转路由参数
   */
  @Input() queryParams: Params;
  /**
   * 下拉面板宽度
   */
  @Input() panelWidth: string;
  /**
   * 最大宽度
   */
  @Input() maxWidth: string = '250px';
  /**
   * 标题溢出提示的方向
   */
  @Input() tipPosition: TiPositionType = 'top';
  /**
   * @ignore
   *
   * idKey指定的属性的值相等时即认为select的 option 选项是选中的。选中项 ngModel 中的数据(modelOption对象)跟 options 数据集中的选项(option对象)之间对应相等关系的依据属性。当
   * modelOption中的 idKey 设置的属性的值 与 option 中的 idKey 设置的属性的值相等时，则认为 modelOption 和 option 是对应的相等关系，即认为 option 选项是选中的。
   *
   * 默认当 modelOption === option 或者 modelOption 中的 labelKey 设置的属性的值 与 option 中的 labelKey 设置的属性的值相等时，则认为 option 选项是选中的。
   */

  /**
   * 设置数据唯一标识的键值，默认为 labelKey 的接口值
   */
  @Input() idKey: string;
  /**
   * 选中项变更时触发的回调，items 的条数大于 1 时才生效
   */
  @Output() readonly selectedChange: EventEmitter<TiSubtitleItem> = new EventEmitter();
  /**
   * 点击后退按钮时触发的回调
   */
  @Output() readonly back: EventEmitter<Event> = new EventEmitter();
  /**
   *
   * 必须搭配 scrollToBottom 事件接口使用。后台搜索，传出下拉中搜索框的值。
   *
   * 一旦使用该事件接口，组件内部将不再进行搜索，搜索需由业务在该事件时回调中进行(后台搜索)，将搜索后的数据传给 items 接口。
   */
  @Output() readonly beforeSearch: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 下拉列表滚动到底部的回调
   */
  @Output() readonly scrollToBottom: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @ignore
   */
  @ViewChild(TiSelectComponent, { static: false })
  selectComRef: TiSelectComponent;
  private hasSelectCom: boolean = false;
  /**
   * @ignore
   */
  public originalItems: Array<TiSubtitleItem>; // 后台搜索时需要该变量
  /**
   * @ignore
   *
   * items最大宽度
   */
  public itemsMaxWidth: string = '';
  protected versionInfo: string = super.getVersion(packageInfo);
  constructor(private element: ElementRef, private renderer2: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    super(element, renderer2);
  }
  ngOnInit(): void {
    super.ngOnInit();
    // 左侧图标的宽度
    const iconWidth: string = getComputedStyle(this.nativeElement).getPropertyValue('--ti3-subtitle-icon-width');
    // 右侧items的最大宽度
    this.itemsMaxWidth = `calc(${this.maxWidth} - ${iconWidth})`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // 如果没有传入选中项，且items 条目数大于1 则默认选中第一项
    if (changes['items'] && Util.isUndefined(this.selectedItem) && this.items?.length > 1) {
      this.selectedItem = this.items[0];
    }

    if (this.searchable && this.beforeSearch.observers.length > 0 && !this.originalItems && this.items?.length > 1) {
      this.originalItems = this.items;
    }
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    this.changeDetectorRef.markForCheck();
  }

  /**
   * @ignore
   * 触发back 事件
   */
  public onClick($event: Event): void {
    this.back.emit($event);
  }
  /**
   * @ignore
   * select选中项改变，触发subtitle selectedChange事件
   */
  public onSelectedOptionChange(option: any): void {
    this.selectedChange.emit(option as TiSubtitleItem);
  }
  /**
   * @ignore
   */
  public isMoreThanOneItem(): boolean {
    let result: boolean = false;
    // 后台搜索时，业务会将后台搜索结果赋值给items，如果搜索结果数据条数小于1条，不能认为是实际原有的数据总数就小于1条
    if ((this.searchable && this.beforeSearch.observers.length > 0 && this.originalItems?.length > 1) || this.items?.length > 1) {
      result = true;
      if (!this.hasSelectCom) {
        setTimeout(() => {
          // 暗色背景，给ti-select 添加dark属性
          if (this.selectComRef?.nativeElement && !Util.isUndefined(this.hostRef?.nativeElement?.attributes?.['dark'])) {
            this.renderer.setAttribute(this.selectComRef.nativeElement, 'dark', '');
          }
        }, 0);
      }
      this.hasSelectCom = true;
    } else {
      this.hasSelectCom = false;
    }

    return result;
  }
  /**
   * @ignore
   */
  public onBeforeSearch(event: TiSelectComponent): void {
    this.beforeSearch.emit(event);
  }
  /**
   * @ignore
   * select下拉列表滚动条滚动到底部时，触发 subtitle 的 scrollToBottom 事件
   */
  public onScrollToBottom(info: TiListScrollLoad, selectCom: TiSelectComponent): void {
    info['selectInstance'] = selectCom;
    this.scrollToBottom.emit(info);
  }
}
