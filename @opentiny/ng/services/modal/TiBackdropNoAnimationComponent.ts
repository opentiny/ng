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
import { TiBackdropComponent } from './TiBackdropComponent';
/**
 * @ignore
 */
@Component({
    selector: 'ti-backdrop-no-animation',
    template: `<div class='ti3-modal-backdrop' #backdrop></div>`,
    styleUrls: ['./backdrop.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
})

export class TiBackdropNoAnimationComponent extends TiBackdropComponent {
    set showState(value: string) {
        this._showState = value;
        this.onAnimationDone({toState: value});
    }
}
