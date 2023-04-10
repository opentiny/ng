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
import { Injectable } from '@angular/core';
import { TiNotificationMapperItem } from './TiNotificationInterface';

/**
 * 全局容器字典，用来存储外层容器
 */
@Injectable({
  providedIn: 'root'
})
export class TiNotificationMapper {
  private mapper: Map<string, TiNotificationMapperItem> = new Map<string, TiNotificationMapperItem>();

  private static readonly KEY: string = 'ti-notification';

  setItem(target: any): void {
    const item: TiNotificationMapperItem = { target };
    this.mapper.set(TiNotificationMapper.KEY, item);
  }

  getItem<T>(): T | null {
    if (this.mapper.has(TiNotificationMapper.KEY)) {
      return this.mapper.get(TiNotificationMapper.KEY)!.target as T;
    }
    return;
  }
}
