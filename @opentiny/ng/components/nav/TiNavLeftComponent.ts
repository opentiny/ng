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
 * NavLeft 顶部导航logo区域组件
 *
 * 提供顶部导航logo区域，由logo图片和文本标题组成，可以监听click点击事件
 */
@Component({
  selector: 'ti-nav-left',
  templateUrl: './navleft.html',
  styleUrls: ['./navleft.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ti3-nav-left',
  },
})
export class TiNavLeftComponent {}
