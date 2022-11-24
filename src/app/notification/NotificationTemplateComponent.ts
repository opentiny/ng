import { Component, TemplateRef } from '@angular/core';
import { TiNotificationService } from '@opentiny/ng';
@Component({
  templateUrl: 'notification-template.html'
})
export class NotificationTemplateComponent {
  constructor(private tiNotification: TiNotificationService) {}

  value: number = 5;

  onClickOpen(template: TemplateRef<any>): void {
    this.tiNotification.template(template, { duration: 0 })
  }
}