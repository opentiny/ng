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
} from '@angular/core';
import { TiNavMenuItem } from './interface';

/**
 * @ignore
 *
 * 增强菜单项
 *
 * 为一级菜单增加了子菜单展开标记和原始菜单项
 */
interface TiNavMenuItemClone extends TiNavMenuItem {
  /**
   * 是否展开子菜单
   */
  isExpand: boolean;
  /**
   * 展开模式: menu 菜单模式展开， panel 面板模式展开， undefined 不展开
   */
  expandMode?: 'menu' | 'panel' | undefined;
  /**
   * 原始菜单项
   */
  item: TiNavMenuItem;
}

/**
 * NavMenu 顶部导航菜单组件
 *
 * 提供页面顶部导航菜单，包含一级菜单、二级菜单
 */
@Component({
  selector: 'ti-nav-menu',
  templateUrl: './navmenu.html',
  styleUrls: ['./navmenu.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ti3-nav-menu',
  },
})
export class TiNavMenuComponent {
  constructor() {}

  /**
   * 菜单标签占位文本区域的模板
   */
  @ContentChild('item', { static: true }) itemTemplate: TemplateRef<any>;

  /**
   * 菜单项
   */
  @Input() items: Array<TiNavMenuItem> = [];

  /**
   * @ignore
   *
   * 增强的菜单项
   */
  itemsClone: Array<TiNavMenuItemClone> = [];

  /**
   * 传入需要激活的选项的id
   */
  @Input() activeId: string;

  /**
   * @ignore
   *
   * 当前激活项目列表
   */
  activePath: Array<TiNavMenuItem> = [];

  /**
   * 选择菜单项触发回调
   */
  @Output() select = new EventEmitter<{
    item: TiNavMenuItem;
    itemPath: Array<TiNavMenuItem>;
  }>();

  /**
   * @ignore
   *
   * 监听数据变化
   *
   * @param changes 发生变动的数据
   */
  ngOnChanges(changes: SimpleChanges): void {
    // 当出入菜单项列表发生改变时，更新增强菜单项列表
    if (changes.items) {
      // 增强的菜单项，增加了expand表示是否展开子菜单，默认为false，增加了item用来保存原始item
      const itemsClone = JSON.parse(
        JSON.stringify(changes.items.currentValue)
      ) as Array<TiNavMenuItem>;
      this.checkDefault(itemsClone, 'default');
      this.itemsClone = itemsClone.map((item) => {
        return {
          ...item,
          isExpand: false,
          expandMode: this.getExpandMode(item),
          item,
        } as TiNavMenuItemClone;
      });
    }
    if (changes.activeId) {
      this.activePath = this.getPathById(
        this.items,
        changes.activeId.currentValue
      );
    }
  }

  /**
   * @ignore
   *
   * 导航菜单点击事件
   *
   * 点击导航菜单，传入鼠标事件，被点击的原始菜单项 item，激活 id 数组
   *
   * @param event 鼠标点击事件
   * @param item 被点击的项目
   * @param activePath 激活id数组
   * @param isParentDisabled 父级是否被禁用
   */
  onClick(
    event: PointerEvent,
    item: TiNavMenuItem,
    activePath: Array<TiNavMenuItem>,
    isParentDisabled = false
  ): void {
    event.stopPropagation();
    // 禁用项 和 不可选中项 不触发选中回调
    if (!item.disabled && !isParentDisabled && item.selectable) {
      // 触发外部选择菜单事件回调
      this.select.emit({ item, itemPath: activePath });
      this.activePath = activePath;
    }
  }

  /**
   * @ignore
   *
   * 鼠标移入菜单项事件
   *
   * 当鼠标移入时，展开子菜单
   *
   * @param event 鼠标事件
   * @param id 一级菜单id
   */
  onMouseenter(event: MouseEvent, id: string): void {
    // 根据一级菜单 id 值寻找对应项，更新它的 expand 值为 true
    this.handleToggleExpand(id, true);
  }

  /**
   * @ignore
   *
   * 鼠标移出菜单项事件
   *
   * 当鼠标移出时，关闭子菜单
   *
   * @param event 鼠标事件
   * @param id 一级菜单id
   */
  onMouseleave(event: MouseEvent, id: string): void {
    // 根据一级菜单 id 值寻找对应项，更新它的 expand 值为 false
    this.handleToggleExpand(id, false);
  }

  /**
   * 子菜单开关
   *
   * @param id 一级菜单 id 值
   * @param expand 新的展开值
   */
  private handleToggleExpand(id: string, expand: boolean): void {
    const item = this.itemsClone.find(
      (item) => item.id === id && !item.disabled
    );
    // 二级菜单展开和关闭逻辑
    if (item) {
      item.isExpand = expand;
    }
  }

  /**
   * 获取子菜单展开模式
   *
   * @param item
   * @returns
   */
  private getExpandMode(item: TiNavMenuItem): string {
    let res;
    for (let subItem of item.children || []) {
      if (subItem.children && subItem.children.length > 0) {
        return 'panel';
      }
      res = 'menu';
    }
    return res;
  }

  /**
   * 检查默认值，如果没有则进行初始化
   *
   * @param items
   * @param id
   */
  private checkDefault(items: Array<TiNavMenuItem>, id: string): void {
    let count = 0;
    for (const item of items) {
      // 设置唯一id
      if (item.id === undefined) {
        item.id = `${id}-${count}`;
        count += 1;
      }
      // 设置是否可选，默认true
      if (item.selectable === undefined) {
        item.selectable = true;
      }
      // 设置是否禁用，默认false
      if (item.disabled === undefined) {
        item.disabled = false;
      }
      // 遍历子元素
      if (item.children) {
        this.checkDefault(item.children, item.id);
      }
    }
  }

  /**
   * 嵌套遍历获取path
   *
   * @param list 表单对象列表
   * @param id 需要匹配的id
   * @returns 匹配的路径
   */
  private getPathById(
    list: Array<TiNavMenuItem>,
    id: string
  ): Array<TiNavMenuItem> {
    for (const item of list) {
      // 禁用项不能作为默认激活项
      if (item.disabled) {
        continue;
      }
      // 匹配成功返回path
      if (item.id === id) {
        return [item];
      }
      // 匹配子菜单
      const res = this.getPathById(item.children || [], id);
      if (res.length > 0) {
        // 子菜单匹配成功，返回拼接后的path
        return [item, ...res];
      }
    }
    // 匹配失败返回空匹配
    return [];
  }
}
