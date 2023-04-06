import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiIconModule, TiSwitchModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { SwitchDisabledComponent } from './SwitchDisabledComponent';
import { SwitchBasicComponent } from './SwitchBasicComponent';
import { SwitchExplanationComponent } from './SwitchExplanationComponent';
import { SwitchBeforeComponent } from './SwitchBeforeComponent';
import { SwitchEventComponent } from './SwitchEventComponent';
import { SwitchFocusComponent } from './SwitchFocusComponent';
import { SwitchIdComponent } from './SwitchIdComponent';
import { SwitchLoadComponent } from './SwitchLoadComponent';
import { SwitchTemplateComponent } from './SwitchTemplateComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiIconModule,
    TiSwitchModule,
    DemoLogModule,
    RouterModule.forChild(SwitchTestModule.ROUTES)
  ],
  declarations: [
    SwitchBasicComponent,
    SwitchDisabledComponent,
    SwitchExplanationComponent,
    SwitchTemplateComponent,
    SwitchBeforeComponent,
    SwitchEventComponent,
    SwitchFocusComponent,
    SwitchIdComponent,
    SwitchLoadComponent
  ]
})
export class SwitchTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiSwitchComponent.html', label: 'Switch' }];
  static readonly ROUTES: Routes = [
    {
      path: 'switch/switch-basic',
      component: SwitchBasicComponent
    },
    {
      path: 'switch/switch-disabled',
      component: SwitchDisabledComponent
    },
    {
      path: 'switch/switch-explanation',
      component: SwitchExplanationComponent
    },
    {
      path: 'switch/switch-template',
      component: SwitchTemplateComponent
    },
    {
      path: 'switch/switch-before',
      component: SwitchBeforeComponent
    },
    { path: 'switch/switch-focus', component: SwitchFocusComponent },
    { path: 'switch/switch-id', component: SwitchIdComponent },
    { path: 'switch/switch-load', component: SwitchLoadComponent },
    { path: 'switch/switch-event', component: SwitchEventComponent }
  ];
}
