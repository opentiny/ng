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
 * TiGuideHeaderComponent 是单个引导模块组件的标题头
 */
@Component({
  selector: 'ti-guide-header',
  template: `<span><ng-content></ng-content></span>`,
  styleUrls: ['./guide-header.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiGuideHeaderComponent {}
