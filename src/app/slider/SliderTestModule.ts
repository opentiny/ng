import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiIconModule, TiSliderModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { SliderLimitsComponent } from './SliderLimitsComponent';
import { SliderFormcontrolComponent } from './SliderFormcontrolComponent';
import { SliderScalesComponent } from './SliderScalesComponent';
import { SliderTemplateComponent } from './SliderTemplateComponent';
import { SliderRatiosComponent } from './SliderRatiosComponent';
import { SliderTipComponent } from './SliderTipComponent';
import { SliderEventComponent } from './SliderEventComponent';
import { SliderHiddenComponent } from './SliderHiddenComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiSliderModule,
    TiIconModule,
    DemoLogModule,
    RouterModule.forChild(SliderTestModule.ROUTES)
  ],
  declarations: [
    SliderLimitsComponent,
    SliderFormcontrolComponent,
    SliderScalesComponent,
    SliderTemplateComponent,
    SliderRatiosComponent,
    SliderTipComponent,
    SliderEventComponent,
    SliderHiddenComponent
  ]
})
export class SliderTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiSliderComponent.html', label: 'Slider' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'slider/slider-limits',
      component: SliderLimitsComponent
    },
    {
      path: 'slider/slider-fromcontrol',
      component: SliderFormcontrolComponent
    },
    {
      path: 'slider/slider-scales',
      component: SliderScalesComponent
    },
    {
      path: 'slider/slider-template',
      component: SliderTemplateComponent
    },
    {
      path: 'slider/slider-ratios',
      component: SliderRatiosComponent
    },
    {
      path: 'slider/slider-tip',
      component: SliderTipComponent
    },
    {
      path: 'slider/slider-event',
      component: SliderEventComponent
    },
    { path: 'slider/slider-hidden',
      component: SliderHiddenComponent
    }
  ];
}
