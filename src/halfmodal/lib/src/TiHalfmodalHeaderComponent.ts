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
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

/**
 * 右侧半屏弹窗头部区域
 *
 */
@Component({
  selector: 'ti-halfmodal-header',
  template: `<ng-content></ng-content>
    <div class="ti3-halfmodal-header-line"></div>`,
  styleUrls: ['./halfmodal-header.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiHalfmodalHeaderComponent extends TiBaseComponent {
  protected versionInfo: string = super.getVersion(packageInfo);
}
