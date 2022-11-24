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
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseModule';
/**
 * Loading组件用于加载场景，提供了两种类型
 *
 *
 */
@Component({
  selector: 'ti-loading',
  templateUrl: './loading.html',
  styleUrls: ['./loading.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TiLoadingComponent extends TiBaseComponent {
  /**
   * @ignore
   * 弱类型有4个圈
   */
  public items: Array<any> = [];

  @Input() type: 'default' | 'weak' = 'default'; // 加载类型
  @Input() size: 'small' | 'middle' | 'large' | string = 'small'; // 加载尺寸

  ngOnInit(): void {
    super.ngOnInit();
    this.items.length = 4;
  }

  /**
   * @ignore
   * 根据用户传入尺寸获取border的宽度
   */
  getBorderWidth(size: string): string {
    return parseInt(size, 10) * 0.3 / 2 + 'px';
  }
}
