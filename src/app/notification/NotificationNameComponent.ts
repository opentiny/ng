import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-name.html'
})
export class NotificationNameComponent {
  constructor(private tiNotification: TiNotificationService) {}

  private static noticName: string = 'tiny'

  onClickOpen(): void {
    this.tiNotification.simple(
      '我是原来的通知内容',
      {name: NotificationNameComponent.noticName, duration: 0}
    )
  }
  onClickChange(): void {
    this.tiNotification.success(
      '我是被改变后的内容',
      {name: NotificationNameComponent.noticName, duration: 0}
    )
  }
}