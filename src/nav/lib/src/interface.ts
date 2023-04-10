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
/**
 * TiNavMenuItem 是顶部导航栏一级菜单项数据接口
 */
export interface TiNavMenuItem {
  /**
   * 菜单项文本
   */
  label: string;
  /**
   * 菜单项id值，确保唯一
   *
   * @default 初始化自动生成唯一id
   */
  id?: string;
  /**
   * 是否禁用
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * 是否可选中
   *
   * @default true
   */
  selectable?: boolean;
  /**
   * 子菜单
   */
  children?: TiNavMenuItem[];
  /**
   * 其他参数，可自定义
   */
  [key: string]: any;
}
