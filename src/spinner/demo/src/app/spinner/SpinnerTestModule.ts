import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiSpinnerModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { SpinnerBasicTestComponent } from './SpinnerBasicTestComponent';
import { SpinnerIdComponent } from './SpinnerIdComponent';
import { SpinnerValidationTestComponent } from './SpinnerValidationTestComponent';
import { SpinnerBasicComponent } from './SpinnerBasicComponent';
import { SpinnerFormatComponent } from './SpinnerFormatComponent';
import { SpinnerStepComponent } from './SpinnerStepComponent';
import { SpinnerValidationComponent } from './SpinnerValidationComponent';
import { SpinnerCorrectableComponent } from './SpinnerCorrectableComponent';
import { SpinnerLocaleableComponent } from './SpinnerLocaleableComponent';
import { SpinnerMaxlengthComponent } from './SpinnerMaxlengthComponent';
import { SpinnerEventComponent } from './SpinnerEventComponent';
import { SpinnerLoadComponent } from './SpinnerLoadComponent';
import { SpinnerMaxMinComponent } from './SpinnerMaxMinComponent';
import { SpinnerDisabledComponent } from './SpinnerDisabledComponent';
import { SpinnerStepfnComponent } from './SpinnerStepfnComponent';
import { SpinnerTipComponent } from './SpinnerTipComponent';
import { SpinnerTipTestComponent } from './SpinnerTipTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiValidationModule,
    TiButtonModule,
    TiSpinnerModule,
    DemoLogModule,
    RouterModule.forChild(SpinnerTestModule.ROUTES)
  ],
  declarations: [
    SpinnerBasicTestComponent,
    SpinnerIdComponent,
    SpinnerBasicComponent,
    SpinnerStepComponent,
    SpinnerValidationComponent,
    SpinnerFormatComponent,
    SpinnerValidationTestComponent,
    SpinnerCorrectableComponent,
    SpinnerLocaleableComponent,
    SpinnerMaxlengthComponent,
    SpinnerEventComponent,
    SpinnerLoadComponent,
    SpinnerMaxMinComponent,
    SpinnerDisabledComponent,
    SpinnerStepfnComponent,
    SpinnerTipComponent,
    SpinnerTipTestComponent
  ]
})
export class SpinnerTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiSpinnerComponent.html', label: 'Spinner' }];
  static readonly ROUTES: Routes = [
    {
      path: 'spinner/spinner-basic',
      component: SpinnerBasicComponent
    },
    {
      path: 'spinner/spinner-format',
      component: SpinnerFormatComponent
    },
    {
      path: 'spinner/spinner-step',
      component: SpinnerStepComponent
    },
    {
      path: 'spinner/spinner-validation',
      component: SpinnerValidationComponent
    },
    {
      path: 'spinner/spinner-basic-test',
      component: SpinnerBasicTestComponent
    },
    { path: 'spinner/id', component: SpinnerIdComponent },
    {
      path: 'spinner/spinner-validation-test',
      component: SpinnerValidationTestComponent
    },
    {
      path: 'spinner/spinner-correctable',
      component: SpinnerCorrectableComponent
    },
    {
      path: 'spinner/spinner-localeable',
      component: SpinnerLocaleableComponent
    },
    { path: 'spinner/spinner-maxlength', component: SpinnerMaxlengthComponent },
    {
      path: 'spinner/spinner-disabled',
      component: SpinnerDisabledComponent
    },
    {
      path: 'spinner/spinner-event',
      component: SpinnerEventComponent
    },
    {
      path: 'spinner/spinner-stepfn',
      component: SpinnerStepfnComponent
    },
    {
      path: 'spinner/spinner-tip',
      component: SpinnerTipComponent
    },
    {
      path: 'spinner/spinner-tip-test',
      component: SpinnerTipTestComponent
    },
    { path: 'spinner/spinner-load', component: SpinnerLoadComponent },
    { path: 'spinner/spinner-max-min', component: SpinnerMaxMinComponent }
  ];
}
