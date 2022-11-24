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
import { TiBaseComponent } from '../../components/base/TiBaseModule';
/**
 * @ignore
 */
@Component({
    selector: 'ti-pending-state',
    templateUrl: './pending-state.html',
    styleUrls: ['./pending-state.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-validation-pending-container]': 'true'
    }
})
export class TiPendingStateComponent extends TiBaseComponent {
    // 校验元素
    @Input() validElement: any;

    ngOnInit(): void {
        this.renderer.addClass(this.validElement, 'ti3-text-input-show-pending');
    }

    ngOnDestroy(): void {
        if (this.validElement) {
            this.renderer.removeClass(this.validElement, 'ti3-text-input-show-pending');
        }
    }
}
