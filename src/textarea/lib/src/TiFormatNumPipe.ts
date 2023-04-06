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
import { TiLocaleFormat } from '@opentiny/ng-locale';

/**
 * @ignore
 * TiFormatNumPipe 对textarea字数统计的数字进行国际化处理
 *
 */
@Pipe({ name: 'tiFormatNum' })
export class TiFormatNumPipe implements PipeTransform {
  private numberFormat: string = '1.0-0'; // 整数位保留最小位数.小数位保留最小位数-小数位最大保留位置
  transform(value: number): string {
    return TiLocaleFormat.formatNumber(value, this.numberFormat);
  }
}
