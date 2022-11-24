import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-duration.html'
})
export class NotificationDurationComponent {
  constructor(private tiNotification: TiNotificationService) {}

  onClickDeafult(): void {
    this.tiNotification.simple(
      '通知弹窗默认会在 4.5 秒后自动关闭'
    )
  }

  onClickCustomDuring(): void {
    this.tiNotification.simple(
      '将 duration 设置为 6000，通知弹窗将在 6 秒后自动关闭',
      { duration: 6000 }
    )
  }

  onClickWontAutoClose(): void {
    this.tiNotification.simple(
      '如果将 duration 设置为 0，通知弹窗将不自动关闭',
      { duration: 0 }
    )
  }
}