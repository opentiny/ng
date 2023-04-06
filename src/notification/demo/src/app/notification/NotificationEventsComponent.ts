import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';

@Component({
  templateUrl: 'notification-events.html'
})
export class NotificationEventsComponent {
  constructor(private tiNotification: TiNotificationService) {}

  myLogs: Array<string> = [];

  onClickCloseCallback(): void {
    this.tiNotification.simple('通过 onClose 方法定义通知关闭时的回调函数，布尔类型的入参表示是否为用户点击关闭按钮关闭', {
      onClose: () => {
        this.myLogs = [...this.myLogs, `通知弹窗关闭了`];
      }
    });
  }
}
