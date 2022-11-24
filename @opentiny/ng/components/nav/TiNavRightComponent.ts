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
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * NavRight 组件
 *
 * 提供顶部导航栏右侧操作区域展示，可添加任意行内元素
 */
@Component({
  selector: 'ti-nav-right',
  templateUrl: './navright.html',
  styleUrls: ['./navright.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TiNavRightComponent {}
