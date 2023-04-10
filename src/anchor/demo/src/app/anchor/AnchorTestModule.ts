import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiAnchorModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { AnchorBasicComponent } from './AnchorBasicComponent';
import { AnchorIdComponent } from './AnchorIdComponent';
import { AnchorOffsettopComponent } from './AnchorOffsettopComponent';
import { AnchorSpeedComponent } from './AnchorSpeedComponent';
import { AnchorEventsComponent } from './AnchorEventsComponent';
import { AnchorTemplateComponent } from './AnchorTemplateComponent';
import { AnchorItemsComponent } from './AnchorItemsComponent';
import { AnchorTestComponent } from './AnchorTestComponent';
import { AnchorScrolltargetComponent } from './AnchorScrolltargetComponent';

@NgModule({
  imports: [CommonModule, TiAnchorModule, DemoLogModule, RouterModule.forChild(AnchorTestModule.ROUTES)],
  declarations: [
    AnchorBasicComponent,
    AnchorIdComponent,
    AnchorOffsettopComponent,
    AnchorSpeedComponent,
    AnchorEventsComponent,
    AnchorTemplateComponent,
    AnchorItemsComponent,
    AnchorTestComponent,
    AnchorScrolltargetComponent
  ]
})
export class AnchorTestModule {
  static readonly LINKS: Array<object> = [{ label: 'Anchor' }];
  static readonly ROUTES: Routes = [
    {
      path: 'anchor/anchor-basic',
      component: AnchorBasicComponent
    },
    {
      path: 'anchor/anchor-id',
      component: AnchorIdComponent
    },
    {
      path: 'anchor/anchor-offsettop',
      component: AnchorOffsettopComponent
    },
    {
      path: 'anchor/anchor-speed',
      component: AnchorSpeedComponent
    },
    {
      path: 'anchor/anchor-template',
      component: AnchorTemplateComponent
    },
    {
      path: 'anchor/anchor-events',
      component: AnchorEventsComponent
    },
    { path: 'anchor/anchor-items', component: AnchorItemsComponent },
    {
      path: 'anchor/anchor-scrolltarget',
      component: AnchorScrolltargetComponent
    },
    { path: 'anchor/anchor-test', component: AnchorTestComponent }
  ];
}
