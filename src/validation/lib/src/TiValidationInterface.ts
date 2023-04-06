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
/**
 * @ignore
 */
export type TiValidationType = 'change' | 'blur' | 'password' | 'radiobase';
/**
 * tiValidation指令接口类型
 */
export interface TiValidationConfig {
  /**
   * 校验方式，包括'change' 、 'blur' 、 'password'
   *
   * @default 'change'
   */
  type?: TiValidationType;
  /**
   *
   * 自定义已封装的校验规则的错误提示信息
   */
  errorMessage?: any;
  /**
   * tip 提示内容，在表单元素聚焦且没有错误提示信息显示
   */
  tip?: string;
  /**
   * tip 提示方向，默认为 'right'
   *
   * @default 'right'
   */
  tipPosition?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-top'
    | 'left-bottom'
    | 'right'
    | 'right-top'
    | 'right-bottom'
    | 'center';
  /**
   * tip 最大宽度，默认为 '276px'
   *
   * @default '276px'
   */
  tipMaxWidth?: string;
  /**
   * 失焦校验或密码校验时，自定义错误信息展示区域
   */
  errorMessageWrapper?: Element;
  /**
   *  密码校验配置项，支持两个可选参数：<br>
   *  validator?: TiPasswordValidator。关于 TiPasswordValidator，请查看下方对 TiPasswordValidator 接口的说明。<br>
   *  levelFn?: (value:string, validator: TiPasswordValidator) => number。value 为用户输入的内容；关于 TiPasswordValidator，请查看下方对 TiPasswordValidator 接口的说明；返回值为当前输入内容对应的强度等级，0：弱、1：中、2：强
   */
  passwordConfig?: {
    validator?: TiPasswordValidatorConfig;
    levelFn?(value: string, validator: TiPasswordValidatorConfig): number;
  };
}
/**
 * 密码校验规则定义接口
 */
export interface TiPasswordValidatorConfig {
  /**
   * 校验规则名称
   */
  rule?: string;
  /**
   * 自定义校验规则的参数。key 值支持：rangeSize、minCharType 以及自定义规则；value 为需要向校验规则中传递的参数。<br>
   * rangeSize：定义长度范围；
   * minCharType：至少需要的类型数量，类型包括数字、小写字母、大写字母、特殊字符。
   */
  params?: {
    [propName: string]: Array<any>;
  };
  /**
   *  自定义规则对应的提示信息。key 值支持：rangeSize、minCharType 以及自定义规则；value 为对应的提示信息内容。<br>
   * 支持在提示信息中通过<code>{index: number}</code>获取校验规则中的参数，如<code>{0}</code>代表第1个参数，<code>{1}</code>代表第2个参数
   */
  message?: {
    [propName: string]: string;
  };
}

/**
 *
 * check方法内部使用的校验方法是AbstractControl的updateValueAndValidity方法
 * 此处将方法参数开放给开发者，onlySelf和emitEvent属性意义具体可参考https://angular.io/api/forms/AbstractControl#updatevalueandvalidity
 */
export interface TiValidationCheckConfig {
  /**
   * 应用更新和有效性检查后如何传递状态。值为 false 标记所有直系祖先，值为 true 只标记当前控件。默认为 false
   */
  onlySelf?: boolean;
  /**
   * 应用更新和有效性检查后是否回调相关函数。当值为 false 时不会回调 statusChanges、valueChanges 函数。默认为 true
   */
  emitEvent?: boolean;
  /**
   * 指定要忽略校验的表单项键值
   */
  ignoreNames?: Array<string>;
  /**
   * 是否对错误信息数据结构做扁平化处理。默认为 false。
   */
  errorsFlatted?: boolean;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}
