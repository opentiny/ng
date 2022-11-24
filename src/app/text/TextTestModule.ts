import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiTextModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextBasicComponent } from './TextBasicComponent';
import { TextClearComponent } from './TextClearComponent';
import { TextPasswordComponent } from './TextPasswordComponent';
import { TextReadonlyComponent } from './TextReadonlyComponent';
import { TextFocusComponent } from './TextFocusComponent';
import { TextDisabledComponent } from './TextDisabledComponent';
import { TextEventsComponent } from './TextEventsComponent';
import { TextNoborderTestComponent } from './TextNoborderTestComponent';
import { TextReactiveComponent } from './TextReactiveComponent';
import { TextPasswordVisibleComponent } from './TextPasswordVisibleComponent';
import { TextMaskinputComponent } from './TextMaskinputComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiButtonModule,
    TiTextModule,
    DemoLogModule,
    RouterModule.forChild(TextTestModule.ROUTES)
  ],
  declarations: [
    TextBasicComponent,
    TextClearComponent,
    TextPasswordComponent,
    TextReadonlyComponent,
    TextFocusComponent,
    TextDisabledComponent,
    TextEventsComponent,
    TextNoborderTestComponent,
    TextReactiveComponent,
    TextPasswordVisibleComponent,
    TextMaskinputComponent
  ]
})
export class TextTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiTextComponent.html', label: 'Text' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'text/text-basic',
      component: TextBasicComponent
    },
    {
      path: 'text/text-clear',
      component: TextClearComponent
    },
    {
      path: 'text/text-password',
      component: TextPasswordComponent
    },
    {
      path: 'text/text-password-visible',
      component: TextPasswordVisibleComponent
    },
    {
      path: 'text/text-readonly',
      component: TextReadonlyComponent
    },
    {
      path: 'text/text-focus',
      component: TextFocusComponent
    },
    {
      path: 'text/text-disabled',
      component: TextDisabledComponent
    },
    {
      path: 'text/text-events',
      component: TextEventsComponent
    },
    {
      path: 'text/text-reactive',
      component: TextReactiveComponent
    },
    { path: 'text/text-noborder-test',
      component: TextNoborderTestComponent
    },
    {
      path: 'text/text-maskinput',
      component: TextMaskinputComponent
    }
  ];
}
