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
export class TiTransferUtil {
  /**
   * @ignore
   * 对比选中项与option数据的对应关系
   */
    public static isEqualOption(idKey: any, labelKey: any, modelOption: any, option: any): boolean {
      if (idKey) {
        return modelOption[idKey] === option[idKey];
      }

      return modelOption === option || (modelOption[labelKey] !== undefined && option[labelKey] !== undefined
        && modelOption[labelKey] === option[labelKey]);
    }
  }