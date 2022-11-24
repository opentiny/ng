import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  TiButtonModule,
  TiCheckboxModule,
  TiIconModule,
  TiIntroServiceModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { IntroBasicComponent } from './IntroBasicComponent';
import { IntroTipComponent } from './IntroTipComponent';
import { IntroEventComponent } from './IntroEventComponent';
import { IntroModalComponent } from './IntroModalComponent';
import { IntroTemplateComponent } from './IntroTemplateComponent';
import { IntroTiscrollComponent } from './IntroTiscrollComponent';
import { IntroSkipableComponent } from './IntroSkipableComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiCheckboxModule,
    TiIntroServiceModule,
    TiIconModule,
    DemoLogModule,
    RouterModule.forChild(IntroTestModule.ROUTES)
  ],
  declarations: [
    IntroBasicComponent,
    IntroTipComponent,
    IntroEventComponent,
    IntroModalComponent,
    IntroTemplateComponent,
    IntroTiscrollComponent,
    IntroSkipableComponent
  ]
})
export class IntroTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiIntroComponent.html', label: 'Intro' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'intro/intro-basic',
      component: IntroBasicComponent
    },
    {
      path: 'intro/intro-tip',
      component: IntroTipComponent
    },
    {
      path: 'intro/intro-modal',
      component: IntroModalComponent
    },
    {
      path: 'intro/intro-template',
      component: IntroTemplateComponent
    },
    {
      path: 'intro/intro-skipable',
      component: IntroSkipableComponent
    },
    {
      path: 'intro/intro-event',
      component: IntroEventComponent
    },
    { path: 'intro/intro-tiscroll',
      component: IntroTiscrollComponent
    }
  ];
}
