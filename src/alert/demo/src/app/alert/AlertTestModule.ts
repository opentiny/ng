import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiAlertModule, TiButtonModule, TiSelectModule } from '@opentiny/ng';
// import { TiAlertModule } from '@opentiny/ng-alert';
// import { TiButtonModule } from '@opentiny/ng-button';
// import { TiSelectModule } from '@opentiny/ng-select';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { AlertTypeComponent } from './AlertTypeComponent';
import { AlertDismissComponent } from './AlertDismissComponent';
import { AlertIconComponent } from './AlertIconComponent';
import { AlertOpenComponent } from './AlertOpenComponent';
import { AlertOpenTestComponent } from './AlertOpenTestComponent';
import { AlertTriggerScrollComponent } from './AlertTriggerScrollComponent';
import { AlertBoxshadowComponent } from './AlertBoxshadowComponent';
import { AlertEventComponent } from './AlertEventComponent';
import { AlertSizeComponent } from './AlertSizeComponent';
import { AlertDarkthemeComponent } from './AlertDarkthemeComponent';
import { AlertMessagesComponent } from './AlertMessagesComponent';

@NgModule({
  imports: [CommonModule, TiAlertModule, TiSelectModule, TiButtonModule, DemoLogModule, RouterModule.forChild(AlertTestModule.ROUTES)],
  declarations: [
    AlertTypeComponent,
    AlertDismissComponent,
    AlertIconComponent,
    AlertOpenComponent,
    AlertOpenTestComponent,
    AlertTriggerScrollComponent,
    AlertBoxshadowComponent,
    AlertEventComponent,
    AlertSizeComponent,
    AlertDarkthemeComponent,
    AlertMessagesComponent
  ]
})
export class AlertTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiAlertComponent.html', label: 'Alert' }];
  static readonly ROUTES: Routes = [
    {
      path: 'alert/alert-type',
      component: AlertTypeComponent
    },
    {
      path: 'alert/alert-darktheme',
      component: AlertDarkthemeComponent
    },
    {
      path: 'alert/alert-dismiss',
      component: AlertDismissComponent
    },
    {
      path: 'alert/alert-icon',
      component: AlertIconComponent
    },
    {
      path: 'alert/alert-open',
      component: AlertOpenComponent
    },
    {
      path: 'alert/alert-event',
      component: AlertEventComponent
    },
    {
      path: 'alert/alert-trigger-scroll',
      component: AlertTriggerScrollComponent
    },
    {
      path: 'alert/alert-size',
      component: AlertSizeComponent
    },
    {
      path: 'alert/alert-messages',
      component: AlertMessagesComponent
    },
    { path: 'alert/alert-boxshadow', component: AlertBoxshadowComponent },
    { path: 'alert/alert-open-test', component: AlertOpenTestComponent }
  ];
}
