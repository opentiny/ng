import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiFormfieldModule, TiSwitchModule, TiTextareaModule, TiValidationModule } from '@opentiny/ng';

import { TextareaResizeComponent } from './TextareaResizeComponent';
import { TextareaMaxlengthComponent } from './TextareaMaxlengthComponent';
import { TextareaAutofocusComponent } from './TextareaAutofocusComponent';
import { TextareaDisabledComponent } from './TextareaDisabledComponent';
import { TextareaValidComponent } from './TextareaValidComponent';
import { TextareaNoneComponent } from './TextareaNoneComponent';
import { TextareaWidthComponent } from './TextareaWidthComponent';
import { TextareaScrollComponent } from './TextareaScrollComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiTextareaModule,
    TiValidationModule,
    TiFormfieldModule,
    TiSwitchModule,
    RouterModule.forChild(TextareaTestModule.ROUTES)
  ],
  declarations: [
    TextareaResizeComponent,
    TextareaMaxlengthComponent,
    TextareaAutofocusComponent,
    TextareaDisabledComponent,
    TextareaValidComponent,
    TextareaWidthComponent,
    TextareaNoneComponent,
    TextareaScrollComponent
  ]
})
export class TextareaTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiTextareaComponent.html', label: 'Textarea' }];
  static readonly ROUTES: Routes = [
    {
      path: 'textarea/textarea-resize',
      component: TextareaResizeComponent
    },
    {
      path: 'textarea/textarea-maxlength',
      component: TextareaMaxlengthComponent
    },
    {
      path: 'textarea/textarea-autofocus',
      component: TextareaAutofocusComponent
    },
    {
      path: 'textarea/textarea-disabled',
      component: TextareaDisabledComponent
    },
    { path: 'textarea/textarea-width', component: TextareaWidthComponent },
    { path: 'textarea/textarea-valid', component: TextareaValidComponent },
    { path: 'textarea/textarea-none', component: TextareaNoneComponent },
    { path: 'textarea/textarea-scroll', component: TextareaScrollComponent }
  ];
}
