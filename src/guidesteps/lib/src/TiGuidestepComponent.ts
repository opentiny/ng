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

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';

/**
 * TiGuidestepComponent 是单个小步骤模块组件
 */
@Component({
  selector: 'ti-guidestep',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./guidestep.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiGuidestepComponent extends TiBaseComponent {
  /**
   * 当前步骤是否已经完成
   */
  @Input() isComplete: boolean = false;
}
