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
import { TiPwdConfig } from './checkHandle/TiPwdConfig';
import { TiPositionType } from '../../utils/Position';
// 定义组件默认配置参数
/**
 * @ignore
 */
export class TiValidationDefaultConfig extends TiPwdConfig {
    // 默认校验方式
    public static type: 'change'|'blur'|'password' = 'change';
    public static tipPosition: TiPositionType = 'right';
}
