import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {
  TiButtonModule,
  TiFormfieldModule,
  TiScrollModule,
  TiSelectModule,
  TiTextareaModule,
  TiTextModule,
  TiValidationModule
} from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ValidationBasicDirectiveComponent } from './ValidationBasicDirectiveComponent';
import { ValidationBasicControlComponent } from './ValidationBasicControlComponent';
import { ValidationFormGroupComponent } from './ValidationFormGroupComponent';
import { ValidationFormGroupConfigComponent } from './ValidationFormGroupConfigComponent';
import { ValidationBlurCheckComponent } from './ValidationBlurCheckComponent';
import { ValidationRulesCustomComponent } from './ValidationRulesCustomComponent';
import { ValidationPwdCheckComponent } from './ValidationPwdCheckComponent';
import { ValidationTipComponent } from './ValidationTipComponent';
import { ValidationErrorMsgComponent } from './ValidationErrorMsgComponent';
import { ValidationRulesTestComponent } from './ValidationRulesTestComponent';
import { ValidationFormGroupTestComponent } from './ValidationFormGroupTestComponent';
import { ValidationTiscrollComponent } from './ValidationTiscrollComponent';
import { ValidationParamChangeComponent } from './ValidationParamChangeComponent';
import { ValidationAsyncCheckComponent } from './ValidationAsyncCheckComponent';
import { ValidationAsyncCheckTestComponent } from './ValidationAsyncCheckTestComponent';
import { CustomValidatorsDirective, ValidationRulesCustomDirectiveComponent } from './ValidationRulesCustomDirectiveComponent';
import {
  CustomChild1TestComponent,
  CustomChild2TestComponent,
  ValidationTemplateFormNestedComponent
} from './ValidationTemplateFormNestedComponent';

@NgModule({
  imports: [
    CommonModule,
    TiFormfieldModule,
    TiValidationModule,
    TiTextareaModule,
    TiTextModule,
    TiScrollModule,
    TiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TiButtonModule,
    DemoLogModule,
    RouterModule.forChild(ValidationTestModule.ROUTES)
  ],
  declarations: [
    ValidationBasicDirectiveComponent,
    ValidationBasicControlComponent,
    ValidationBlurCheckComponent,
    ValidationFormGroupComponent,
    ValidationFormGroupConfigComponent,
    ValidationRulesCustomComponent,
    ValidationPwdCheckComponent,
    ValidationTipComponent,
    ValidationErrorMsgComponent,
    ValidationRulesTestComponent,
    ValidationFormGroupTestComponent,
    ValidationTiscrollComponent,
    ValidationParamChangeComponent,
    ValidationAsyncCheckComponent,
    ValidationAsyncCheckTestComponent,
    ValidationTemplateFormNestedComponent,
    CustomChild1TestComponent,
    CustomChild2TestComponent,
    ValidationRulesCustomDirectiveComponent,
    CustomValidatorsDirective
  ]
})
export class ValidationTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiErrorMsgComponent.html', label: 'ErrorMsg' },
    { href: 'components/TiPwdMsgComponent.html', label: 'PwdMsg' },
    { href: 'directives/TiValidationDirective.html', label: 'Validation' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'validation/validation-basic-directive',
      component: ValidationBasicDirectiveComponent
    },
    {
      path: 'validation/validation-basic-control',
      component: ValidationBasicControlComponent
    },
    {
      path: 'validation/validation-form-group',
      component: ValidationFormGroupComponent
    },
    {
      path: 'validation/validation-form-group-config',
      component: ValidationFormGroupConfigComponent
    },
    {
      path: 'validation/validation-blur-check',
      component: ValidationBlurCheckComponent
    },
    {
      path: 'validation/validation-pwd-check',
      component: ValidationPwdCheckComponent
    },
    {
      path: 'validation/validation-tip',
      component: ValidationTipComponent
    },
    {
      path: 'validation/validation-error-msg',
      component: ValidationErrorMsgComponent
    },
    {
      path: 'validation/validation-rules-custom',
      component: ValidationRulesCustomComponent
    },
    {
      path: 'validation/validation-rules-custom-directive',
      component: ValidationRulesCustomDirectiveComponent
    },
    {
      path: 'validation/validation-async-check',
      component: ValidationAsyncCheckComponent
    },
    {
      path: 'validation/validation-tiscroll',
      component: ValidationTiscrollComponent
    },
    {
      path: 'validation/validation-rules-test',
      component: ValidationRulesTestComponent
    },
    {
      path: 'validation/validation-form-group-test',
      component: ValidationFormGroupTestComponent
    },
    {
      path: 'validation/validation-param-change',
      component: ValidationParamChangeComponent
    },
    {
      path: 'validation/validation-async-check-test',
      component: ValidationAsyncCheckTestComponent
    },
    {
      path: 'validation/validation-template-form-nested',
      component: ValidationTemplateFormNestedComponent
    }
  ];
}
