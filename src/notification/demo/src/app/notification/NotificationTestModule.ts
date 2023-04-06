import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TiButtonModule, TiNotificationModule, TiCardModule, TiRateModule, TiNotificationService } from '@opentiny/ng';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { NotificationBasicComponent } from './NotificationBasicComponent';
import { NotificationCloseComponent } from './NotificationCloseComponent';
import { NotificationPositionComponent } from './NotificationPositionComponent';
import { NotificationDurationComponent } from './NotificationDurationComponent';
import { NotificationNameComponent } from './NotificationNameComponent';
import { NotificationAnimationComponent } from './NotificationAnimationComponent';
import { NotificationTemplateComponent } from './NotificationTemplateComponent';
import { NotificationTypeComponent } from './NotificationTypeComponent';
import { NotificationEventsComponent } from './NotificationEventsComponent';
import { NotificationConfigComponent } from './NotificationConfigComponent';

@NgModule({
  imports: [
    DemoLogModule,
    CommonModule,
    FormsModule,
    TiNotificationModule,
    TiButtonModule,
    TiCardModule,
    TiRateModule,
    RouterModule.forChild(NotificationTestModule.ROUTES)
  ],
  declarations: [
    NotificationBasicComponent,
    NotificationCloseComponent,
    NotificationPositionComponent,
    NotificationDurationComponent,
    NotificationNameComponent,
    NotificationAnimationComponent,
    NotificationTemplateComponent,
    NotificationTypeComponent,
    NotificationEventsComponent,
    NotificationConfigComponent
  ]
})
export class NotificationTestModule {
  constructor(private tiNotification: TiNotificationService) {
    this.tiNotification.config({ top: '84px' });
  }

  static readonly ROUTES: Routes = [
    {
      path: 'notification/notification-basic',
      component: NotificationBasicComponent,
      data: { label: 'basic' }
    },
    {
      path: 'notification/notification-position',
      component: NotificationPositionComponent,
      data: { label: 'position' }
    },
    {
      path: 'notification/notification-duration',
      component: NotificationDurationComponent,
      data: { label: 'duration' }
    },
    {
      path: 'notification/notification-name',
      component: NotificationNameComponent,
      data: { label: 'name' }
    },
    {
      path: 'notification/notification-animation',
      component: NotificationAnimationComponent,
      data: { label: 'animation' }
    },
    {
      path: 'notification/notification-template',
      component: NotificationTemplateComponent,
      data: { label: 'template' }
    },
    {
      path: 'notification/notification-type',
      component: NotificationTypeComponent,
      data: { label: 'type' }
    },
    {
      path: 'notification/notification-events',
      component: NotificationEventsComponent,
      data: { label: 'events' }
    },
    {
      path: 'notification/notification-close',
      component: NotificationCloseComponent,
      data: { label: 'close' }
    },
    {
      path: 'notification/notification-config',
      component: NotificationConfigComponent,
      data: { label: 'config' }
    }
  ];
}
