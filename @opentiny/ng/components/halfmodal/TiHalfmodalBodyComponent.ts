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
import { TiBaseComponent } from '../base/TiBaseModule';

/**
 * 右侧半屏弹窗内容区域
 *
 */
@Component({
    selector: 'ti-halfmodal-body',
    template: '<ng-content></ng-content>',
    styleUrls: ['./halfmodal-body.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TiHalfmodalBodyComponent extends TiBaseComponent {}
