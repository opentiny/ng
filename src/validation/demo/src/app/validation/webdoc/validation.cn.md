---
title: Validation 表单校验
---
# Validation 表单校验

<div class="used-tiny">

TinyNG 表单校验是基于 Angular 提供的表单校验进行的封装，在使用 TinyNG 组件前，请先了解 <a href="https://angular.cn/guide/form-validation" target="blank">Angular 表单校验</a>。

Angular 提供了两种表单处理方式：响应式表单（Reactive forms）和 模板驱动表单（Template-driven forms）。 关于二者的区别请**务必仔细阅读** <a href="https://angular.cn/guide/forms-overview" target="blank">Angular 表单简介</a>。

- 支持响应式表单和模板表单两种方式驱动表单。
- TinyNG 实现的校验规则及方法见 <a class='api-prop cur-hand' href='../docs/validators' target='blank'>TiValidators</a>，你也可以使用 <a href='https://angular.cn/guide/form-validation#built-in-validator-functions' target='blank'>Angular 表单校验规则</a>或自定义校验规则。

```typescript
import { TiValidationModule } from '@opentiny/ng';
```

如需使用响应式表单，请导入。
```typescript
import { FormControl } from '@opentiny/ng';
```

如需使用 TinyNG 封装的校验方法，请导入。
```typescript
import { TiValidators } from '@opentiny/ng';
```
</div>

<div class="used-config">

TinyNG 表单校验是基于 Angular 提供的表单校验进行的封装，在使用 TinyNG 组件前，请先了解 <a href="https://angular.cn/guide/form-validation" target="blank">Angular表单校验</a>。

Angular 提供了两种表单处理方式：响应式表单（Reactive forms）和 模板驱动表单（Template-driven forms）。 关于二者的区别请**务必仔细阅读** <a href="https://angular.cn/guide/forms-overview" target="blank">Angular 表单简介</a>。

- 支持响应式表单和模板表单两种方式驱动表单。
- TinyNG 实现的校验规则及方法见 <a class='api-prop cur-hand' href='../docs/validators' target='blank'>TiValidators</a>，你也可以使用 <a href='https://angular.cn/guide/form-validation' target='blank'>Angular 表单校验规则</a>或自定义校验规则。

```typescript
import { TiValidationModule } from '@opentiny/ng';
```

如需使用响应式表单，请导入。
```typescript
import { FormControl } from '@opentiny/ng';
```

如需使用 TinyNG 封装的校验方法，请导入。
```typescript
import { TiValidators } from '@opentiny/ng';
```
</div>
