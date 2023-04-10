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
import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '@opentiny/ng-utils';
/**
 * @ignore
 * TiColumnsPipe 过滤掉columns中的title为空的数据项
 *
 */
@Pipe({ name: 'tiColumns' })
export class TiColumnsPipe implements PipeTransform {
  transform(value: Array<any>): Array<any> {
    return value.filter((item: any) => !Util.isEmptyString(item.title));
  }
}
