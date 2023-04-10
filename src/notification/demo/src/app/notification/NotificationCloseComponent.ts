import { Component } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';

@Component({
  templateUrl: 'notification-close.html'
})
export class NotificationCloseComponent {
  constructor(private tiNotification: TiNotificationService) {}
  private static noticName: string = 'notification-close-demo';
  target: any;
  noticeCount: number = 0;

  onClickOpen(): void {
    this.tiNotification.simple(`${this.noticeCount++}: TinyNG 为 Web 应用提供了丰富的基础 UI 组件`);
  }
  onClickCloseAll(): void {
    this.tiNotification.closeAll();
  }
  onClickOpenSingle(): void {
    let notice: any = this.tiNotification.simple('NotificationService 返回一个通知实例，通过调用实例的 close 方法来关闭它', {
      duration: 0,
      name: NotificationCloseComponent.noticName
    });
    this.target = notice;
  }
  onClickCloseSingle(): void {
    this.target.close();
  }
}
