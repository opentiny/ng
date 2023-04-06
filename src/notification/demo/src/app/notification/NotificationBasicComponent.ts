import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-basic.html'
})
export class NotificationBasicComponent {
  constructor(private tiNotification: TiNotificationService) {}

  onClickOpen(): void {
    this.tiNotification.simple('TinyNG 为 Web 应用提供了丰富的基础 UI 组件');
  }
}
