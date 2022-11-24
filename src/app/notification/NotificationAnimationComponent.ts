import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-animation.html'
})
export class NotificationAnimationComponent {
  constructor(private tiNotification: TiNotificationService) {}

  onClickAnimation(): void {
    this.tiNotification.simple(
      'TinyNG 为 Web 应用提供了丰富的基础 UI 组件'
    )
  }

  onClickWithoutAnimation(): void {
    this.tiNotification.simple(
      '这是一个关闭进场、出场动画的通知',
      { animation: false }
    )
  }
}