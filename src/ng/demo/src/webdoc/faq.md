---
title: 常见问题 | TinyNG
---

# 常见问题
## 1. 运行报错：Can't bind to 'ngModel' since it isn't a known property of 'ti-xxxxx'？

使用 `ngModel`，需要引入`FormsModule`

```typescript
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ...
    FormsModule,
    ...
  ],
})
```

## 2. 编译报错：Can't bind to 'yyyyy' since it isn't a known property of 'ti-xxxxx'？
```
 If 'ti-xxxxx' is an Angular component and it has 'options' input, then verify that it is part of this module.
 If 'ti-xxxxx' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
 To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.
```
导入组件对应的`Module`即可。

## 3. 怎样找到`TinyNG`组件对应的模块名？

在查看具体组件的示例时，页面顶部会显示该组件依赖的`Module`。

## 4. 运行报错：ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked？

这是 Angular 调试环境在提示：Angular 已经绘制完模板了，但是在`ngAfterViewInit()`或之后，业务代码又去改变模板变量了。

两种解决方案：一、优化代码组织方式，提前更改模板变量。二、更改模板变量之后，去强制刷新模板（参考此文）。

## 5. 使用`TinyNG`库开发业务时，如何单步调试呢？

TinyNG 库内置了 soucemap，很方便单步调试。单步调试方法：

目前 Angular CLI 7.0 版，`ng serve --vendor-source-map`（官方已废弃此参数）

Angular CLI 7.2 版，`ng serve --source-map=true`

## 6. 我写的跟官网一模一样，为什么我这里出错了？

请使用`Angular CLI`新建一个项目，复制官网代码，查看组件表现是否和官网一致。

## 7. 页面局部有滚动条，滚动该滚动条时其内部的下拉框错位？

下拉框组件内部在 document 上注册了`tiScroll`事件，当监听到该事件时，组件会使下拉框消失。

开发者需要在对应的局部容器的滚动条滚动事件回调中触发 document上的`tiScroll`事件，使下拉框在拖动局部滚动条时消失。

```typescript
const event: Event = document.createEvent('HTMLEvents');
event.initEvent('tiScroll', false, true);
element.dispatchEvent(event);
```

## 8. 运行报错： can't bind 'fromGroup'？

使用响应式表单指令，需要引入`ReactiveFormsModule`, 可参考：[响应式表单](https://angular.io/guide/reactive-forms)

```typescript
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
imports: [
...
ReactiveFormsModule,
...
],
```

## 9. 部分组件接口支持传入 html 片段字符串，但是 html 中标签上的 style 样式设置不生效是为什么?

为了防止`XSS`攻击，组件内部用的是 Angular 提供的`DomSanitizer.sanitize`方法做防`XSS`攻击安全处理的，它会把`style`设置会过滤掉，所以建议使用`class`的方式添加样式，如果一定要使用`style`方式，且能确保传入的`html`字符串片段是安全的，可以使用 Angular 提供的`DomSanitizer`上的`bypassSecurityTrustHtml`方法去掉 angular 的安全过滤处理，具体可参考：`message/message-security`。
