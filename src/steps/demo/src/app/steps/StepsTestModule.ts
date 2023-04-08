import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiIconModule, TiStepsModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { StepsActiveComponent } from './StepsActiveComponent';
import { StepsClickableComponent } from './StepsClickableComponent';
import { StepsBeforeComponent } from './StepsBeforeComponent';
import { StepsBaseComponent } from './StepsBaseComponent';
import { StepsMaxwidthComponent } from './StepsMaxwidthComponent';
import { StepsLabelComponent } from './StepsLabelComponent';
import { StepsAdaptiveComponent } from './StepsAdaptiveComponent';
import { StepsAdaptiveTestComponent } from './StepsAdaptiveTestComponent';
import { StepsTemplateComponent } from './StepsTemplateComponent';
import { StepsEventsComponent } from './StepsEventsComponent';

@NgModule({
  imports: [CommonModule, TiStepsModule, TiIconModule, DemoLogModule, RouterModule.forChild(StepsTestModule.ROUTES)],
  declarations: [
    StepsBaseComponent,
    StepsActiveComponent,
    StepsClickableComponent,
    StepsBeforeComponent,
    StepsMaxwidthComponent,
    StepsAdaptiveComponent,
    StepsLabelComponent,
    StepsAdaptiveTestComponent,
    StepsTemplateComponent,
    StepsEventsComponent
  ]
})
export class StepsTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiStepsComponent.html', label: 'Steps' }];
  static readonly ROUTES: Routes = [
    {
      path: 'steps/steps-base',
      component: StepsBaseComponent
    },
    {
      path: 'steps/steps-clickable',
      component: StepsClickableComponent
    },
    {
      path: 'steps/steps-active',
      component: StepsActiveComponent
    },
    {
      path: 'steps/steps-before',
      component: StepsBeforeComponent
    },
    {
      path: 'steps/steps-maxwidth',
      component: StepsMaxwidthComponent
    },
    {
      path: 'steps/steps-label',
      component: StepsLabelComponent
    },
    {
      path: 'steps/steps-adaptive',
      component: StepsAdaptiveComponent
    },
    {
      path: 'steps/steps-events',
      component: StepsEventsComponent
    },
    {
      path: 'steps/steps-template',
      component: StepsTemplateComponent
    },
    {
      path: 'steps/steps-adaptive-test',
      component: StepsAdaptiveTestComponent
    }
  ];
}
