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
/**
 * @ignore
 * TiHighlightPipe 替换搜索的值并高亮显示
 */
@Pipe({
  name: 'tiHighlight',
  pure: true
})
export class TiHighlightPipe implements PipeTransform {
  transform(value: string, keyword: string) {
    if (!keyword) {
      return value;
    }
    const regx: RegExp = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/gi;
    const keywords: string = keyword.replace(regx, (item) => {
      return `\\${item}`;
    });
    const reg: RegExp = new RegExp(keywords, 'ig');
    const result = value.replace(reg, (word) => {
      return `<span class="ti3-font-highlight">${word}</span>`;
    });
    return result;
  }
}
