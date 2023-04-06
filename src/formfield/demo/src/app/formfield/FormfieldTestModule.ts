import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  TiButtongroupModule,
  TiButtonModule,
  TiFormfieldModule,
  TiOverflowModule,
  TiSpinnerModule,
  TiTableModule,
  TiTextareaModule,
  TiTextModule,
  TiCheckboxModule,
  TiSelectModule
} from '@opentiny/ng';

import { FormfieldSingleColumnComponent } from './FormfieldSingleColumnComponent';
import { FormfieldMultiColumnComponent } from './FormfieldMultiColumnComponent';
import { FormfieldTextFormComponent } from './FormfieldTextFormComponent';
import { FormfieldColspanRowspanComponent } from './FormfieldColspanRowspanComponent';
import { FormfieldNgforTestComponent } from './FormfieldNgforTestComponent';
import { FormfieldTestComponent } from './FormfieldTestComponent';
import { FormfieldIndexComponent } from './FormfieldIndexComponent';
import { FormfieldFooComponent } from './FormfieldFooComponent';
import { FormfieldVerticalComponent } from './FormfieldVerticalComponent';
import { FormfieldVerticalAlignComponent } from './FormfieldVerticalAlignComponent';
import { FormfieldLabelComponent } from './FormfieldLabelComponent';
import { FormfieldShowComponent } from './FormfieldShowComponent';
import { FormfieldColswidthComponent } from './FormfieldColswidthComponent';
import { FormfieldRequiredComponent } from './FormfieldRequiredComponent';
import { FormfieldLabelwidthComponent } from './FormfieldLabelwidthComponent';
import { FormfieldNestFormfiledComponent } from './FormfieldNestFormfiledComponent';
import { FormfieldColspanRowspanTestComponent } from './FormfieldColspanRowspanTestComponent';
import { FormfieldRequiredspaceComponent } from './FormfieldRequiredspaceComponent';
import { FormfieldRequiredspaceTestComponent } from './FormfieldRequiredspaceTestComponent';
import { FormfieldRawgapComponent } from './FormfieldRawgapComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiButtonModule,
    TiButtongroupModule,
    TiTextareaModule,
    TiTextModule,
    TiButtonModule,
    TiSpinnerModule,
    TiFormfieldModule,
    TiOverflowModule,
    TiTableModule,
    TiCheckboxModule,
    TiSelectModule,
    RouterModule.forChild(FormfieldTestModule.ROUTES)
  ],
  declarations: [
    FormfieldSingleColumnComponent,
    FormfieldMultiColumnComponent,
    FormfieldTextFormComponent,
    FormfieldColspanRowspanComponent,
    FormfieldNgforTestComponent,
    FormfieldIndexComponent,
    FormfieldFooComponent,
    FormfieldTestComponent,
    FormfieldVerticalComponent,
    FormfieldVerticalAlignComponent,
    FormfieldLabelComponent,
    FormfieldShowComponent,
    FormfieldColswidthComponent,
    FormfieldRequiredComponent,
    FormfieldLabelwidthComponent,
    FormfieldNestFormfiledComponent,
    FormfieldColspanRowspanTestComponent,
    FormfieldRequiredspaceComponent,
    FormfieldRequiredspaceTestComponent,
    FormfieldRawgapComponent
  ]
})
export class FormfieldTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiFormfieldComponent.html', label: 'Formfield' },
    { href: 'components/TiButtonItemComponent.html', label: 'ButtonItem' },
    { href: 'components/TiItemComponent.html', label: 'Item' },
    { href: 'components/TiItemLabelComponent.html', label: 'ItemLabel' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'formfield/formfield-single-column',
      component: FormfieldSingleColumnComponent
    },
    {
      path: 'formfield/formfield-multi-column',
      component: FormfieldMultiColumnComponent
    },
    {
      path: 'formfield/formfield-text-form',
      component: FormfieldTextFormComponent
    },
    {
      path: 'formfield/formfield-colspan-rowspan',
      component: FormfieldColspanRowspanComponent
    },
    {
      path: 'formfield/formfield-index',
      component: FormfieldIndexComponent
    },
    {
      path: 'formfield/formfield-vertical',
      component: FormfieldVerticalComponent
    },
    {
      path: 'formfield/formfield-label',
      component: FormfieldLabelComponent
    },
    {
      path: 'formfield/formfield-labelwidth',
      component: FormfieldLabelwidthComponent
    },
    {
      path: 'formfield/formfield-show',
      component: FormfieldShowComponent
    },
    {
      path: 'formfield/formfield-required',
      component: FormfieldRequiredComponent
    },
    {
      path: 'formfield/formfield-colswidth',
      component: FormfieldColswidthComponent
    },
    {
      path: 'formfield/formfield-nest-formfiled',
      component: FormfieldNestFormfiledComponent
    },
    {
      path: 'formfield/formfield-ngfor-test',
      component: FormfieldNgforTestComponent
    },
    { path: 'formfield/formfield-test', component: FormfieldTestComponent },
    {
      path: 'formfield/formfield-colspan-rowspan-test',
      component: FormfieldColspanRowspanTestComponent
    },
    {
      path: 'formfield/formfield-requiredspace',
      component: FormfieldRequiredspaceComponent
    },
    {
      path: 'formfield/formfield-requiredspace-test',
      component: FormfieldRequiredspaceTestComponent
    },
    { path: 'formfield/formfield-rowgap', component: FormfieldRawgapComponent }
  ];
}
