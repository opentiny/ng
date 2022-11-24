import { Component } from '@angular/core';
import { TiNotificationService, TiNotificationPosition } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-position.html',
  styles: [
    '.demo-notify-position-container {width: 320px; display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px;}',
    '.demo-notify-position-container > div {width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;}',
  ]
})
export class NotificationPositionComponent {
  constructor(private tiNotification: TiNotificationService) {}
  private static content: string = 'TinyNG 为 Web 应用提供了丰富的基础 UI 组件'

  onClickTopLeft(): void {
    this.tiNotification.simple(
      NotificationPositionComponent.content,
      { position: 'top-left' }
    )
  }

  onClickTop(): void {
    this.tiNotification.simple(
      NotificationPositionComponent.content,
      { position: 'top' }
    )
  }

  onClickTopRight(): void {
    this.tiNotification.simple(
      NotificationPositionComponent.content,
      { position: 'top-right' }
    )
  }

  onClickBottomLeft(): void {
    this.tiNotification.simple(
      NotificationPositionComponent.content,
      { position: 'bottom-left' }
    )
  }

  onClickBottom(): void {
    this.tiNotification.simple(
      NotificationPositionComponent.content,
      { position: 'bottom' }
    )
  }

  onClickBottomRight(): void {
    this.tiNotification.simple(
      NotificationPositionComponent.content,
      { position: 'bottom-right' }
    )
  }
}