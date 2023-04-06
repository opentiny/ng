---
title: 表单校验规则 | TinyNG
---

## 说明
本文介绍 TinyNG 实现的 `TiValidators` 的校验规则及校验方法。

## 用法介绍
支持两种方式声明校验：

- 1.静态方法：通过调用`TiValidators.${规则名称}`的方式,适用于响应式表单。如`required`声明为`TiValidators.required`。
- 2.指令方式：通过`ti${规则名称}`指令声明，适用于模板驱动表单。如`required`规则的指令名为`tiRequired`。

## 校验规则

| 规则名称 | 参数类型 | 参数含义 | 规则说明 |
| :------- | -------: | -------: | -------: |
| required | - | - | 非空校验 |
| maxLength | number | 最大字符长度 | 字符长度最大值校验 |
| minLength | number | 最小字符长度 | 字符长度最小值校验 |
| rangeSize | number | 最小长度限制 | 字符长度大小区间校验 |
| maxValue | number | 最大数值 | 数字最大数值校验 |
| minValue | number | 最小数值 | 数字最小数值校验 |
| rangeValue | number | 最小数值限制 | 数字大小区间校验 |
| regExp | RegExp:string | 正则表达式参数 | 不包括正则表达式头尾标识符'^(?:'、')$' |
| email | - | - |	邮箱校验 |
| contains | string/number | 包含的内容 |	包含校验 |
| notContains | string/number | 不包含的内容 | 不包含校验 |
| equal | string/number/boolean | 相等的内容 | 相等校验。|
| notEqual | string/number | 不相等的内容 | 不相等校验 |
| notScript | - | - | 包含script标签校验 |
| port | - | - | 端口号校验，范围为0~65535 |
| date | - | - | 日期类型校验 |
| url | - | - | url校验 |
| integer | - | - | 整数校验 |
| number | - | - | 数字校验 |
| digits | - | - | 自然数校验 |
| ipv4 | - | - | ipv4校验 |
| ipv6 | - | - | ipv6校验 |
| minCharType | number/RegExp:string | 符合要求的字符种类/字符集对象类型<br/>默认的字符种类分别为：大写字母、小写字母、数字、特殊字符\`~!@#$%^&*()-_=+\|[{}];:'",<.>/? 和空格 | 符合最小字符种类校验，默认情况为至少包含2种字符类型 |
| notEqualPosRev | () => AbstractControl | 需要比对的表单formControl对象获取函数 | 不能和表单对象的正序或倒序相同 |
| password | TiPasswordValidatorConfig:Object | 密码校验各项规则参数 | 密码校验 |