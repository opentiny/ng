import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: './notification-config.html'
})
export class NotificationConfigComponent {
  constructor(private tiNotification: TiNotificationService) {
    this.tiNotification.config({ top: '100px' });
  }

  onClickOpen(): void {
    this.tiNotification.simple('TinyNG 为 Web 应用提供了丰富的基础 UI 组件', {
      duration: 0
    });
    this.tiNotification.simple('TinyNG 为 Web 应用提供了丰富的基础 UI 组件', {
      position: 'bottom-right',
      duration: 0
    });
  }
  onClickChangeTop(): void {
    this.tiNotification.config({ top: '200px' });
  }
  onClickChangeBottom(): void {
    this.tiNotification.config({ bottom: '100px' });
  }
}
