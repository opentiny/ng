import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiCrumbModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { CrumbBasicComponent } from './CrumbBasicComponent';
import { CrumbEventsComponent } from './CrumbEventsComponent';
import { CrumbRouterComponent } from './CrumbRouterComponent';
import { Router1Component } from './Router1Component';
import { Router2Component } from './Router2Component';
import { Router3Component } from './Router3Component';
import { CrumbHrefComponent } from './CrumbHrefComponent';
import { CrumbRouterTestComponent } from './CrumbRouterTestComponent';

@NgModule({
  imports: [CommonModule, TiCrumbModule, DemoLogModule, RouterModule.forChild(CrumbTestModule.ROUTES)],
  declarations: [
    CrumbBasicComponent,
    CrumbEventsComponent,
    CrumbRouterComponent,
    Router1Component,
    Router2Component,
    Router3Component,
    CrumbHrefComponent,
    CrumbRouterTestComponent
  ]
})
export class CrumbTestModule {
  static readonly LINKS: Array<object> = [{ label: 'Crumb' }];
  static readonly ROUTES: Routes = [
    {
      path: 'crumb/crumb-basic',
      component: CrumbBasicComponent
    },
    {
      path: 'crumb/crumb-events',
      component: CrumbEventsComponent
    },
    {
      path: 'crumb/crumb-router-test',
      component: CrumbRouterTestComponent,
      children: [
        { path: 'router1', component: Router1Component },
        { path: 'router2', component: Router2Component },
        { path: 'router3', component: Router3Component }
      ]
    },
    {
      path: 'crumb/crumb-href',
      component: CrumbHrefComponent
    },
    {
      path: 'crumb/crumb-router',
      component: CrumbRouterComponent
    }
  ];
}
