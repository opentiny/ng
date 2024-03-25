import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiLeftmenuthinModule, TiSvgComponent } from '@opentiny/ng';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { LeftmenuthinBasicWebsiteViewsComponent } from './website-views/LeftmenuthinBasicWebsiteViewsComponent';
import { LeftmenuthinRouterlistComponent } from './LeftmenuthinRouterlistComponent';
import { LeftmenuthinParamsComponent } from './LeftmenuthinParamsComponent';

import { Router1Component } from './Router1Component';
import { Router2Component } from './Router2Component';
import { Router3Component } from './Router3Component';
import { Router4Component } from './Router4Component';
import { LeftmenuthinBasicComponent } from './LeftmenuthinBasicComponent';
import { LeftmenuthinWebsiteModule } from './website-lib/LeftmenuthinWebsiteModule';
import { LeftmenuthinParamsWebsiteViewsComponent } from './website-views/LeftmenuthinParamsWebsiteViewsComponent';
import { LeftmenuthinRouterlistWebsiteViewsComponent } from './website-views/LeftmenuthinRouterlistWebsiteViewsComponent';
import { RouterEComponent } from './RouterEComponent';
import { RouterFComponent } from './RouterFComponent';
import { Router1WebsiteViewsComponent } from './website-views/Router1Component';
import { Router2WebsiteViewsComponent } from './website-views/Router2Component';
import { Router3WebsiteViewsComponent } from './website-views/Router3Component';
import { Router4WebsiteViewsComponent } from './website-views/Router4Component';
import { RouterEWebsiteViewsComponent } from './website-views/RouterEComponent';
import { RouterFWebsiteViewsComponent } from './website-views/RouterFComponent';

@NgModule({
  imports: [
    CommonModule,
    LeftmenuthinWebsiteModule,
    DemoLogModule,
    TiLeftmenuthinModule,
    RouterModule.forChild(LeftmenuthinTestModule.ROUTES)
  ],
  declarations: [
    LeftmenuthinBasicComponent,
    LeftmenuthinParamsComponent,
    LeftmenuthinRouterlistComponent,
    LeftmenuthinBasicWebsiteViewsComponent,
    LeftmenuthinParamsWebsiteViewsComponent,
    LeftmenuthinRouterlistWebsiteViewsComponent,
    Router1Component,
    Router2Component,
    Router3Component,
    Router4Component,
    RouterEComponent,
    RouterFComponent,
    Router1WebsiteViewsComponent,
    Router2WebsiteViewsComponent,
    Router3WebsiteViewsComponent,
    Router4WebsiteViewsComponent,
    RouterEWebsiteViewsComponent,
    RouterFWebsiteViewsComponent
  ]
})
export class LeftmenuthinTestModule {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  constructor() {
    TiSvgComponent.setPath(`${this.baseUrl}assets/ionicons/`);
  }
  static childrenRouter: Routes = [
    { path: 'home', component: Router1Component },
    { path: 'cart', component: Router2Component },
    { path: 'favorite', component: Router3Component },
    { path: 'setting', component: Router4Component },
    { path: 'routerE', component: RouterEComponent },
    { path: 'routerF', component: RouterFComponent }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'leftmenuthin/leftmenuthin-basic-test',
      component: LeftmenuthinBasicComponent,
      children: LeftmenuthinTestModule.childrenRouter
    },
    {
      path: 'leftmenuthin/leftmenuthin-params-test',
      component: LeftmenuthinParamsComponent,
      children: LeftmenuthinTestModule.childrenRouter
    },
    {
      path: 'leftmenuthin/leftmenuthin-routerlist-test',
      component: LeftmenuthinRouterlistComponent,
      children: LeftmenuthinTestModule.childrenRouter
    },
    {
      path: 'leftmenuthin/leftmenuthin-basic',
      component: LeftmenuthinBasicWebsiteViewsComponent
    },
    {
      path: 'leftmenuthin/leftmenuthin-params',
      component: LeftmenuthinParamsWebsiteViewsComponent
    },
    {
      path: 'leftmenuthin/leftmenuthin-routerlist',
      component: LeftmenuthinRouterlistWebsiteViewsComponent
    }
  ];
}
