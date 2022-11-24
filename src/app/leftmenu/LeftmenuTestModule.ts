import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {
  TiButtonModule,
  TiLeftmenuModule,
  TiModalModule,
  TiSelectModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { LeftmenuNoRouterComponent } from './LeftmenuNoRouterComponent';
import { LeftmenuBasicWebsiteViewComponent } from './website-views/LeftmenuBasicWebsiteViewComponent';
import { LeftmenuRouterlistWebsiteViewComponent } from './website-views/LeftmenuRouterlistWebsiteViewComponent';
import { LeftmenuParamsWebsiteViewComponent } from './website-views/LeftmenuParamsWebsiteViewComponent';
import { LeftmenuHrefWebsiteViewComponent } from './website-views/LeftmenuHrefWebsiteViewComponent';
import { LeftmenuGroupWebsiteViewComponent } from './website-views/LeftmenuGroupWebsiteViewComponent';
import { LeftmenuFootWebsiteViewComponent } from './website-views/LeftmenuFootWebsiteViewComponent';
import { LeftmenuDividingWebsiteViewComponent } from './website-views/LeftmenuDividingWebsiteViewComponent';
import { LeftmenuNoRouterWebsiteViewComponent } from './website-views/LeftmenuNoRouterWebsiteViewComponent';
import { LeftmenuReloadStateWebsiteViewComponent } from './website-views/LeftmenuReloadStateWebsiteViewComponent';
import { LeftmenuDisabledWebsiteViewComponent } from './website-views/LeftmenuDisabledWebsiteViewComponent';
import { LeftmenuActiveChangeWebsiteViewComponent } from './website-views/LeftmenuActiveChangeWebsiteViewComponent';
import { LeftmenuCollapsedWebsiteViewComponent } from './website-views/LeftmenuCollapsedWebsiteViewComponent';
import { LeftmenuToggleableWebsiteViewComponent } from './website-views/LeftmenuToggleableWebsiteViewComponent';

import { LeftmenuBasicComponent } from './LeftmenuBasicComponent';
import { LeftmenuRouterlistComponent } from './LeftmenuRouterlistComponent';
import { LeftmenuParamsComponent } from './LeftmenuParamsComponent';
import { LeftmenuReloadStateComponent } from './LeftmenuReloadStateComponent';
import { LeftmenuHrefComponent } from './LeftmenuHrefComponent';
import { LeftmenuGroupComponent } from './LeftmenuGroupComponent';
import { LeftmenuFootComponent } from './LeftmenuFootComponent';
import { LeftmenuDividingComponent } from './LeftmenuDividingComponent';
import { LeftmenuIdComponent } from './LeftmenuIdComponent';
import { LeftmenuSecurityComponent } from './LeftmenuSecurityComponent';
import { LeftmenuScrollComponent } from './LeftmenuScrollComponent';
import { LeftmenuCollapsedComponent } from './LeftmenuCollapsedComponent';
import { LeftmenuToggleableComponent } from './LeftmenuToggleableComponent';
import { LeftmenuActiveChangeComponent } from './LeftmenuActiveChangeComponent';
import { LeftmenuDisabledComponent } from './LeftmenuDisabledComponent';
import { LeftmenuCandeactivateComponent } from './LeftmenuCandeactivateComponent';

import { Router11Component } from './Router11Component';
import { Router12Component } from './Router12Component';
import { Router2Component } from './Router2Component';
import { Router31Component } from './Router31Component';
import { Router32Component } from './Router32Component';

import { RouterAComponent } from './RouterAComponent';
import { RouterBComponent } from './RouterBComponent';
import { RouterCComponent } from './RouterCComponent';
import { RouterDComponent } from './RouterDComponent';
import { OpenerComponent } from './OpenerComponent';
import { RouterparamsComponent } from './RouterparamsComponent';

import { UnsaveGuard } from './unsave';
@NgModule({
  imports: [
    CommonModule,
    TiLeftmenuModule,
    TiModalModule,
    TiButtonModule,
    TiSelectModule,
    DemoLogModule,
    RouterModule.forChild(LeftmenuTestModule.ROUTES)
  ],
  providers: [UnsaveGuard],
  declarations: [
    LeftmenuBasicComponent,
    LeftmenuBasicWebsiteViewComponent,
    LeftmenuRouterlistWebsiteViewComponent,
    LeftmenuParamsWebsiteViewComponent,
    LeftmenuHrefWebsiteViewComponent,
    LeftmenuGroupWebsiteViewComponent,
    LeftmenuFootWebsiteViewComponent,
    LeftmenuDividingWebsiteViewComponent,
    LeftmenuNoRouterWebsiteViewComponent,
    LeftmenuReloadStateWebsiteViewComponent,
    LeftmenuDisabledWebsiteViewComponent,
    LeftmenuActiveChangeWebsiteViewComponent,
    LeftmenuCollapsedWebsiteViewComponent,
    LeftmenuToggleableWebsiteViewComponent,
    LeftmenuNoRouterComponent,
    Router11Component,
    Router12Component,
    Router2Component,
    Router31Component,
    Router32Component,
    RouterAComponent,
    RouterBComponent,
    RouterCComponent,
    RouterDComponent,
    LeftmenuRouterlistComponent,
    LeftmenuParamsComponent,
    LeftmenuReloadStateComponent,
    LeftmenuCollapsedComponent,
    LeftmenuToggleableComponent,
    LeftmenuHrefComponent,
    LeftmenuGroupComponent,
    LeftmenuFootComponent,
    LeftmenuDividingComponent,
    LeftmenuCandeactivateComponent,
    LeftmenuIdComponent,
    LeftmenuSecurityComponent,
    OpenerComponent,
    RouterparamsComponent,
    LeftmenuScrollComponent,
    LeftmenuActiveChangeComponent,
    LeftmenuDisabledComponent
  ]
})
export class LeftmenuTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiLeftmenuComponent.html', label: 'Leftmenu' },
    { href: 'components/TiLeftmenuHeadComponent.html', label: 'LeftmenuHead' },
    { href: 'components/TiLeftmenuItemComponent.html', label: 'LeftmenuItem' },
    {
      href: 'components/TiLeftmenuLevel1Component.html',
      label: 'LeftmenuLevel1'
    },
    {
      href: 'components/TiLeftmenuLevel2Component.html',
      label: 'LeftmenuLevel2'
    }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'leftmenu/leftmenu-basic',
      component: LeftmenuBasicComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerD', component: RouterDComponent },
        { path: 'routerC', component: RouterCComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-routerlist',
      component: LeftmenuRouterlistComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerA', component: RouterAComponent },
        { path: 'routerB', component: RouterBComponent },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-params',
      component: LeftmenuParamsComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31/:id', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerA', component: RouterAComponent },
        { path: 'routerB', component: RouterBComponent },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent },
        { path: 'Routerparams/:id', component: RouterparamsComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-href',
      component: LeftmenuHrefComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router31', component: Router31Component },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-group',
      component: LeftmenuGroupComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-foot',
      component: LeftmenuFootComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-dividing',
      component: LeftmenuDividingComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-no-router',
      component: LeftmenuNoRouterComponent
    },
    {
      path: 'leftmenu/leftmenu-id',
      component: LeftmenuIdComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/leftmenu-candeactivate',
      component: LeftmenuCandeactivateComponent,
      children: [
        {
          path: 'router11',
          component: Router11Component,
          canDeactivate: [UnsaveGuard]
        },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent },
      ]
    },
    {
      path: 'leftmenu/leftmenu-security',
      component: LeftmenuSecurityComponent,
      children: [
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component },
        { path: 'routerC', component: RouterCComponent },
        { path: 'routerD', component: RouterDComponent }
      ]
    },
    {
      path: 'leftmenu/opener',
      component: OpenerComponent
    },
    {
      path: 'leftmenu/leftmenu-scroll',
      component: LeftmenuScrollComponent,
      children: [
        { path: 'router11', component: Router11Component },
        { path: 'router12', component: Router12Component },
        { path: 'router2', component: Router2Component },
        { path: 'router31', component: Router31Component },
        { path: 'router32', component: Router32Component }
      ]
    }
  ];
}
