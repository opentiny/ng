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
import { TiPositionType } from '../../utils/Position';
/**
 * MenuItem是item项的数据接口
 */
export interface TiMenuItem {
  /**
   * 菜单项文本
   */
  label?: string;
  /**
   * 菜单项 tip 提示内容
   */
  tip?: string;
  /**
   * 菜单项 tip 提示方向，默认值为‘right’
   */
  tipPosition?: TiPositionType;
  /**
   * 菜单项是否禁用
   */
  disabled?: boolean;
  /**
   * 菜单项的子菜单项，最多支持 3 级菜单
   */
  children?: Array<TiMenuItem>;
  /**
   * 分组 id，当 id 不同时在当前菜单项上方增加分割线
   */
  groupId?: string;
  /**
   * 菜单项 id
   */
  id?: any;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
