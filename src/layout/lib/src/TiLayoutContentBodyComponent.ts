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
 * 布局组件，提供整个页面内容区域的布局
 *
 * 内容主体
 *
 */
@Component({
  selector: 'ti-layout-content-body',
  template: '<ng-content></ng-content>',
  styleUrls: ['./layout-content-body.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiLayoutContentBodyComponent {}
