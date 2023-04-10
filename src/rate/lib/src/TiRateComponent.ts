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
import { Component } from '@angular/core';
import { TiFormComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

@Component({
  selector: 'ti-rate',
  templateUrl: './rate.html',
  styleUrls: ['./rate.less'],
  providers: [TiFormComponent.getValueAccessor(TiRateComponent)]
})
export class TiRateComponent extends TiFormComponent {
  /**
   * @ignore 数组长度为5
   */
  public items: Array<number> = new Array(5);

  /**
   * @ignore 记录鼠标移入时的索引
   */
  public hoverIndex: number = -1;
  protected versionInfo: string = super.getVersion(packageInfo);

  ngOnInit(): void {
    this.setDefalutModel(this.model);
  }

  /**
   * @ignore 当做钩子函数使用
   */
  ngOnModelChange(model: any): void {
    this.setDefalutModel(model);
  }

  /**
   * @ignore 设置model的默认值，在ngOnInit和ngOnModelChange中被调用
   * @param model 模型
   */
  setDefalutModel(model: any): void {
    if (typeof this.model !== 'number' || this.model < 0 || model > this.items.length) {
      this.model = 0;
    }
  }

  /**
   * @ignore 鼠标进入时，设置hoverIndex
   * @param index 图标索引，取值0 ~ this.items.length-1
   */
  onMouseEnter(index: number): void {
    if (this.disabled) {
      return;
    }

    this.hoverIndex = index;
  }

  /**
   * @ignore 鼠标离开时，设置hoverIndex为-1
   */
  onMouseLeave(): void {
    if (this.disabled) {
      return;
    }

    this.hoverIndex = -1;
  }

  /**
   * @ignore 点击图标时，设置model
   * @param index 图标索引，取值0 ~ this.items.length-1
   */
  onClick(index: number): void {
    if (this.disabled) {
      return;
    }

    this.model = index + 1;
  }

  /**
   * @ignore 判断当前图标是否需要点亮
   * @param index 图标索引，取值0 ~ this.items.length-1
   */
  isActive(index: number): boolean {
    // 当鼠标移入时（this.hoverIndex > -1），hoverIndex及其坐标的图标需要点亮
    // 当鼠标移走后（this.hoverIndex = -1），当前评分值左边的图标需要点亮
    return this.hoverIndex > -1 ? index <= this.hoverIndex : index < this.model;
  }

  /**
   * @ignore ngFor遍历的trackBy函数，防止数据更新导致所有DOM重新渲染
   * @param index 图标索引，取值0 ~ this.items.length-1
   * @returns 图标索引
   */
  public trackByFn(index: any): any {
    return index;
  }
}
