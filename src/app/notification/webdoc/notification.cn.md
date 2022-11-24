---
title: Notification 通知
---
# Notification 通知

<div class="used-tiny">

Notification 是提供通知弹窗的组件。悬浮出现在页面角落，显示全局的通知提醒消息。&nbsp;&nbsp;

+ 弹出框组件提供服务方式供业务使用，使用该服务时需要引入模块`TiNotificationModule`，开发者通过调用`TiNotificationService.simple`方法生成弹出框。

```typescript
import { TiNotificationModule } from '@opentiny/ng';
```

需要在项目中（建议在根模块）中导入`BrowserAnimationsModule`。

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

</div>

<div class="used-config"></div>
