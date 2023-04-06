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
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TiModalComponent } from './TiModalComponent';
/**
 * @ignore
 */
@Component({
  selector: 'ti-modal-wrapper-no-animation',
  templateUrl: './TiModalComponentNoAnimation.html',
  styleUrls: ['./modal.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TiModalNoAnimationComponent extends TiModalComponent {
  set showState(value: string) {
    this._showState = value;
    this.onAnimationDone({ toState: value });
  }
}
