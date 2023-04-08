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
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  Inject,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiDroplistComponent } from '@opentiny/ng-droplist';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiKeymap } from '@opentiny/ng-utils';

/**
 * pathField组件路径中单项的数据格式
 */
export interface TiPathFieldItem {
  /**
   * 路径内容
   */
  label: string;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}

/**
 * pathField组件路径变化时change事件的参数
 */
export interface TiPathChangeEvent {
  type: 'dropdownSelect' | 'goUpperSelect';
}

/**
 * pathField组件用于显示路径操作
 */
@Component({
  selector: 'ti-path-field',
  templateUrl: 'path-field.html',
  styleUrls: ['path-field.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiPathFieldComponent extends TiBaseComponent implements OnChanges, AfterViewInit {
  /**
   * 路径数据项
   */
  @Input() items: Array<TiPathFieldItem>;
  /**
   * 点击返回按钮时是否展开下拉面板
   */
  @Input() isPanel: boolean = true;
  /**
   * 是否支持编辑路径
   */
  @Input() editable: boolean = true;
  /**
   * 编辑状态时敲击回车是否保持编辑状态
   */
  @Input() keepEditState: boolean = false;
  /**
   * 下拉面板的宽度
   */
  @Input() panelWidth: 'auto' | string = 'auto';
  /**
   * 路径内容变化时触发的回调
   */
  @Output() readonly pathChange: EventEmitter<TiPathChangeEvent | Event> = new EventEmitter<TiPathChangeEvent | Event>();
  /**
   * @ignore
   */
  @ViewChild('items', { static: true }) itemsRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('backBtn', { static: true }) backBtnRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('droplist', { static: true }) dropListComp: TiDroplistComponent;
  /**
   * @ignore
   */
  @ViewChild('input', { static: false }) inputRef: ElementRef;

  /**
   * @ignore
   * 显示在路径框中的项目
   */
  public showItems: Array<TiPathFieldItem> = [];
  /**
   * @ignore
   * 隐藏在下拉菜单中的项目
   */
  public menuItems: Array<TiPathFieldItem> = [];
  /**
   * @ignore
   * 下拉菜单选中项
   */
  public menuSelected: TiPathFieldItem | null = null;
  /**
   * @ignore
   * 路径框内容是否溢出
   */
  public isOverflow: boolean = false;
  /**
   * @ignore
   * 是否处于编辑路径模式
   */
  public isEditState: boolean = false;
  /**
   * @ignore
   * 编辑模式下路径内容
   */
  public pathValue: string = '';
  /**
   * 编辑模式下路径内容
   */
  private pathValueOld: string = '';
  // 页面点击事件
  private onDocumentClick: () => void;

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private zone: NgZone,
    private tiRenderer: TiRenderer,
    @Inject(DOCUMENT) private document
  ) {
    super(elementRef, renderer2);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // items动态变化时，重新设置显示项
    if (changes['items']) {
      this.setShowItems();
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // 设置显示的项目
    this.setShowItems();
    this.zone.runOutsideAngular(() => {
      // 点击页面空白处下拉列表关闭
      this.onDocumentClick = this.renderer2.listen(this.document, 'click', () => {
        this.dropListComp.hide();
      });
    });
  }

  /**
   * @ignore
   * 点击路径框
   */
  public onItemsClick(): void {
    // 若不可编辑，直接返回
    if (!this.editable) {
      return;
    }
    // 进入编辑模式
    this.isEditState = true;
    setTimeout(() => {
      this.inputRef.nativeElement.focus();
    }, 0);
  }

  /**
   * @ignore
   * 点击某项
   */
  public onItemClick(item: TiPathFieldItem, event: Event): void {
    const index: number = this.items.indexOf(item);
    // 若点击的为最后一项时，不做处理
    if (index === this.items.length - 1) {
      return;
    }
    this.items.splice(index + 1);
    // 设置显示的项目
    this.setShowItems();
    this.dropListComp.hide();
    // 触发pathChange事件
    this.pathChange.emit(event);
    event.stopPropagation();
  }

  /**
   * @ignore
   * 点击返回按钮
   */
  public onBackBtnClick(event: Event): void {
    if (this.isPanel) {
      // 展开面板选择路径模式
      this.dropListComp.show();
    } else {
      // 直接返回上级模式
      if (this.items.length) {
        this.items.pop();
        this.setShowItems();
        const pathChangeEvent: TiPathChangeEvent = {
          type: 'goUpperSelect'
        };
        // 触发pathChange事件
        this.pathChange.emit(pathChangeEvent);
      }
    }
    event.stopPropagation();
  }

  /**
   * @ignore
   * 改变下拉列表选中项
   */
  public onDroplistChange(selected: TiPathFieldItem): void {
    const index: number = this.menuItems.findIndex((item: TiPathFieldItem) => {
      return item === selected;
    });
    // 由于menuItems中项目顺序是倒序，故删除items项目时须用长度减除
    this.items.splice(this.menuItems.length - index);
    this.setShowItems();
    const pathChangeEvent: TiPathChangeEvent = {
      type: 'dropdownSelect'
    };
    // 触发pathChange事件
    this.pathChange.emit(pathChangeEvent);
  }

  /**
   * @ignore
   * 编辑模式下input框按键按下
   */
  public onEditorKeydown(event: KeyboardEvent): void {
    if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
      // 当路径内容发生变化时
      if (this.pathValue !== this.pathValueOld) {
        // 设置路径项目
        this.setItems();
        // 触发pathChange事件
        this.pathChange.emit(event);
      }
      // 路径编辑模式下敲击回车不保持编辑模式
      if (!this.keepEditState) {
        // 退出编辑模式
        this.isEditState = false;
      }
    }
  }

  /**
   * @ignore
   * 编辑模式下input框失焦
   */
  public onEditorBlur(): void {
    // 恢复之前备份的pathValueOld路径内容
    this.pathValue = this.pathValueOld;
    // 退出编辑模式
    this.isEditState = false;
  }

  /**
   * 设置路径项目
   */
  private setItems(): void {
    // 通过当前pathValue路径值重新设置路径项目
    const array: Array<string> = this.pathValue.split('/');
    // 重置items路径项目
    this.items.splice(0);
    array.forEach((value) => {
      const item: TiPathFieldItem = {
        label: value
      };
      this.items.push(item);
    });
    // 设置显示的项目
    this.setShowItems();
  }

  /**
   * 设置显示的项目
   */
  private setShowItems(): void {
    // 生成路径条父容器的临时DOM，将其放入body中
    const eleStyles: CSSStyleDeclaration = getComputedStyle(this.itemsRef.nativeElement);
    const itemsNode: HTMLDivElement = document.createElement('div');
    this.renderer.appendChild(document.body, itemsNode);
    // 为临时DOM添加必要的宽度相关的样式，便于宽度计算
    this.tiRenderer.setStyles(itemsNode, {
      display: 'inline-flex',
      padding: eleStyles.padding,
      paddingLeft: eleStyles.paddingLeft, // 处理在IE和火狐下获取padding为空问题：在火狐和IE下只能用只能用padding+[方位]的方式来获取元素的padding值
      paddingRight: eleStyles.paddingRight,
      visibility: 'hidden', // 元素隐藏但做占位处理
      position: 'absolute', // 避免克隆元素影响页面高度，导致出滚动条
      left: '-9999px',
      top: '-9999px'
    });

    // 获取当前路径条父容器的最大宽度
    const maxWidth: number = this.itemsRef.nativeElement.getBoundingClientRect().width;
    // 重置是否溢出标志
    this.isOverflow = false;
    // 重置路径框数组和下拉数组
    this.showItems = [];
    this.menuItems = [];
    for (let i: number = this.items.length - 1; i >= 0; i--) {
      // 已经超出最大显示宽度了，直接将当前item放入menuItems中
      if (this.isOverflow) {
        this.pushMenuItems(i);
        continue;
      }

      const itemNode: HTMLDivElement = document.createElement('div');
      this.tiRenderer.setStyles(itemNode, { display: 'flex' });
      this.tiRenderer.prepend(itemsNode, itemNode);

      const itemLabelNode: HTMLDivElement = document.createElement('div');
      itemLabelNode.innerText = this.items[i].label;

      const itemDividNode: HTMLDivElement = document.createElement('div');
      itemDividNode.innerText = '/';
      this.tiRenderer.setStyles(itemDividNode, { margin: '0 4px' });

      this.renderer.appendChild(itemNode, itemLabelNode);
      if (i !== this.items.length - 1) {
        this.tiRenderer.insertAfter(itemDividNode, itemLabelNode);
        this.tiRenderer.setStyles(itemLabelNode, { maxWidth: '160px' });
      }

      // 放入当前item的DOM后，没有超出最大显示宽度时
      if (itemsNode.getBoundingClientRect().width <= maxWidth) {
        // 将当前item放入showItems中
        this.showItems.unshift(this.items[i]);
      } else {
        // 超出最大显示宽度时
        // 若当前为最后一个item时，直接将其放入showItems中，否则将其放入menuItems中
        if (i === this.items.length - 1) {
          this.showItems.unshift(this.items[i]);
        } else {
          this.pushMenuItems(i);
        }

        // 将是否溢出标志置为true
        this.isOverflow = true;
      }
    }
    // 移除临时DOM
    itemsNode.remove();
    // 设置编辑模式下的路径内容
    this.setPathValue();
  }

  /**
   * 向menuItems数组中push项目
   */
  private pushMenuItems(index: number) {
    this.menuItems.push({
      label: this.items[index].label
    });
  }

  /**
   * 设置编辑模式下的路径内容
   */
  private setPathValue(): void {
    const pathArray: Array<string> = [];
    this.items.forEach((item, index) => {
      pathArray.push(item.label);
    });
    this.pathValue = pathArray.join('/');
    // 备份当前pathValue路径内容
    this.pathValueOld = this.pathValue;
  }
}
