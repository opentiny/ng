import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-type.html'
})
export class NotificationTypeComponent {
  constructor(private tiNotification: TiNotificationService) {}
  private static content: string = 'TinyNG 为 Web 应用提供了丰富的基础 UI 组件'

  onClickSuccess(): void {
    this.tiNotification.success(NotificationTypeComponent.content)
  }
  onClickPrompt(): void {
    this.tiNotification.prompt(NotificationTypeComponent.content)
  }
  onClickWarn(): void {
    this.tiNotification.warn(NotificationTypeComponent.content)
  }
  onClickError(): void {
    this.tiNotification.error(NotificationTypeComponent.content)
  }
  onClickSimple(): void {
    this.tiNotification.simple(NotificationTypeComponent.content)
  }
}