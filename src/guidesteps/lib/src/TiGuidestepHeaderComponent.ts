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

import { ChangeDetectionStrategy, Component, ElementRef, Renderer2 } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';

import { TiGuidestepComponent } from './TiGuidestepComponent';

@Component({
  selector: 'ti-guidestep-header',
  template: `<span><ng-content></ng-content></span>`,
  styleUrls: ['./guidestep-header.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti-guidestep-dot-complete]': 'guidestepComp.isComplete'
  }
})
export class TiGuidestepHeaderComponent extends TiBaseComponent {
  constructor(private elementRef: ElementRef, private renderer2: Renderer2, public guidestepComp: TiGuidestepComponent) {
    super(elementRef, renderer2);
  }
}
