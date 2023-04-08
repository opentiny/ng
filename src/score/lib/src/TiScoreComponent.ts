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

import { Component, ElementRef, Input, Renderer2, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiLocale } from '@opentiny/ng-locale';

/**
 * NPS评分组件
 */
@Component({
  selector: 'ti-score',
  templateUrl: './score.html',
  styleUrls: ['./score.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiScoreComponent)]
})
export class TiScoreComponent extends TiFormComponent {
  /**
   * 最小评分值文本
   */
  @Input() minText: string;
  /**
   * 最大评分值文本
   */
  @Input() maxText: string;

  /**
   * @ignore
   * 选块内间距，主要用于调查问卷组件完成页场景
   */
  @Input() padding: string;

  /**
   * @ignore
   * 定义含有11项成员的数组
   */
  public scoreArray: Array<any> = new Array(11);

  constructor(protected hostRef: ElementRef, protected renderer: Renderer2, protected changeDetectorRef: ChangeDetectorRef) {
    super(hostRef, renderer, changeDetectorRef);
    this.minText = this.minText || TiLocale.getLocaleWords().tiNpsscore.minText;
    this.maxText = this.maxText || TiLocale.getLocaleWords().tiNpsscore.maxText;
  }
  /**
   * @ignore
   * 选择评分时，触发事件
   */
  public onClick(value: number): void {
    this.model = value;
  }
}
