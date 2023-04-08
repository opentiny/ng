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
import { Component, ChangeDetectionStrategy } from '@angular/core';
/**
 * TiLeftmenuHead是菜单头部组件，其包裹的元素会作为leftmenu的菜单头部
 */
@Component({
  selector: 'ti-leftmenu-head',
  templateUrl: './leftmenu-head.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-leftmenu-head]': 'true'
  }
})
export class TiLeftmenuHeadComponent {}
