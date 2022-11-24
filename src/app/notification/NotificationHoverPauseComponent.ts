import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-hover-pause.html'
})
export class NotificationHoverPauseComponent {
  constructor(private tiNotification: TiNotificationService) {}

  onClickPause(): void {
    this.tiNotification.simple('TinyNG 为 Web 应用提供了丰富的基础 UI 组件')
  }

  onClickContinue(): void {
    this.tiNotification.simple(
      'TinyNG 为 Web 应用提供了丰富的基础 UI 组件',
      {hoverPause: false}
    )
  }
}