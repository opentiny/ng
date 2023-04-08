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
import { TiFormComponent } from '@opentiny/ng-base';
/**
 * 选择组 组件
 */
@Component({
  selector: 'ti-selectgroup',
  templateUrl: './selectgroup.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiSelectgroupComponent)]
})
export class TiSelectgroupComponent extends TiFormComponent {
  /**
   * 是否多选
   */
  @Input() multiple: boolean;
  /**
   * 指定选中项数据的键值
   */
  @Input() valueKey: string;
}
