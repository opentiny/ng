import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiFormfieldModule, TiTabModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { TabBasicComponent } from './TabBasicComponent';
import { TabLevel2Component } from './TabLevel2Component';
import { TabCustomHeadComponent } from './TabCustomHeadComponent';
import { TabLazyLoadComponent } from './TabLazyLoadComponent';
import { HomeComponent, SchoolComponent, TabRouteComponent } from './TabRouteComponent';
import { TabDefaultTestComponent } from './TabDefaultTestComponent';
import { TabLevel2TestComponent } from './TabLevel2TestComponent';
import { TabOverflowComponent } from './TabOverflowComponent';
import { TabSmallComponent } from './TabSmallComponent';
import { TabBeforeactivechangeComponent } from './TabBeforeactivechangeComponent';
import { TabDarkComponent } from './TabDarkComponent';
import { CompanyComponent, Concert1Component, ConcertComponent, LibaryComponent, TabContentCompComponent } from './TabContentCompComponent';
import { TabScrollComponent } from './TabScrollComponent';

@NgModule({
  imports: [CommonModule, RouterModule, TiTabModule, TiFormfieldModule, DemoLogModule, RouterModule.forChild(TabTestModule.ROUTES)],
  declarations: [
    TabBasicComponent,
    TabBeforeactivechangeComponent,
    TabLevel2Component,
    TabCustomHeadComponent,
    TabLazyLoadComponent,
    TabRouteComponent,
    TabOverflowComponent,
    TabSmallComponent,
    HomeComponent,
    SchoolComponent,
    TabDefaultTestComponent,
    TabLevel2TestComponent,
    TabContentCompComponent,
    CompanyComponent,
    ConcertComponent,
    Concert1Component,
    LibaryComponent,
    TabScrollComponent,
    TabDarkComponent
  ]
})
export class TabTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiTabsComponent.html', label: 'Tabs' },
    { href: 'components/TiTabComponent.html', label: 'Tab' },
    { href: 'components/TiTabHeaderComponent.html', label: 'TabHeader' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'tab/tab-basic',
      component: TabBasicComponent
    },
    {
      path: 'tab/tab-beforeactivechange',
      component: TabBeforeactivechangeComponent
    },
    {
      path: 'tab/tab-dark',
      component: TabDarkComponent
    },
    {
      path: 'tab/tab-level2',
      component: TabLevel2Component
    },
    {
      path: 'tab/tab-custom-head',
      component: TabCustomHeadComponent
    },
    {
      path: 'tab/tab-lazy-load',
      component: TabLazyLoadComponent
    },
    {
      path: 'tab/tab-overflow',
      component: TabOverflowComponent
    },
    {
      path: 'tab/tab-route',
      component: TabRouteComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'school', component: SchoolComponent },
        { path: '', redirectTo: 'school', pathMatch: 'full' }
      ]
    },
    {
      path: 'tab/tab-content-comp',
      component: TabContentCompComponent
    },
    {
      path: 'tab/tab-small',
      component: TabSmallComponent
    },
    { path: 'tab/tab-default-test', component: TabDefaultTestComponent },
    { path: 'tab/tab-level2-test', component: TabLevel2TestComponent },
    { path: 'tab/tab-scroll', component: TabScrollComponent }
  ];
}
