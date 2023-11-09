import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiTagsInputModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { TagsinputDisabledComponent } from './TagsinputDisabledComponent';
import { TagsinputSuggestionComponent } from './TagsinputSuggestionComponent';
import { TagsinputBasicComponent } from './TagsinputBasicComponent';
import { TagsinputPanelwidthComponent } from './TagsinputPanelwidthComponent';
import { TagsinputValidComponent } from './TagsinputValidComponent';
import { TagsinputLabelkeyComponent } from './TagsinputLabelkeyComponent';
import { TagsinputEventsComponent } from './TagsinputEventsComponent';
import { TagsinputValuekeyComponent } from './TagsinputValuekeyComponent';
import { TagsinputNullComponent } from './TagsinputNullComponent';
import { TagsinputReactiveComponent } from './TagsinputReactiveComponent';
import { TagsinputTemplateComponent } from './TagsinputTemplateComponent';
import { TagsinputMaxlengthComponent } from './TagsinputMaxlengthComponent';
import { TagsinputSeparatorsComponent } from './TagsinputSeparatorsComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTagsInputModule,
    TiValidationModule,
    ReactiveFormsModule,
    DemoLogModule,
    RouterModule.forChild(TagsinputTestModule.ROUTES)
  ],
  declarations: [
    TagsinputDisabledComponent,
    TagsinputSuggestionComponent,
    TagsinputBasicComponent,
    TagsinputPanelwidthComponent,
    TagsinputValidComponent,
    TagsinputLabelkeyComponent,
    TagsinputEventsComponent,
    TagsinputValuekeyComponent,
    TagsinputNullComponent,
    TagsinputReactiveComponent,
    TagsinputTemplateComponent,
    TagsinputMaxlengthComponent,
    TagsinputSeparatorsComponent
  ]
})
export class TagsinputTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiTagsInputComponent.html', label: 'TagsInput' }];
  static readonly ROUTES: Routes = [
    {
      path: 'tagsinput/tagsinput-basic',
      component: TagsinputBasicComponent
    },
    {
      path: 'tagsinput/tagsinput-suggestion',
      component: TagsinputSuggestionComponent
    },
    {
      path: 'tagsinput/tagsinput-panelwidth',
      component: TagsinputPanelwidthComponent
    },
    {
      path: 'tagsinput/tagsinput-labelkey',
      component: TagsinputLabelkeyComponent
    },
    {
      path: 'tagsinput/tagsinput-valid',
      component: TagsinputValidComponent
    },
    {
      path: 'tagsinput/tagsinput-disabled',
      component: TagsinputDisabledComponent
    },
    {
      path: 'tagsinput/tagsinput-events',
      component: TagsinputEventsComponent
    },
    {
      path: 'tagsinput/tagsinput-valuekey',
      component: TagsinputValuekeyComponent
    },
    {
      path: 'tagsinput/tagsinput-reactive',
      component: TagsinputReactiveComponent
    },
    {
      path: 'tagsinput/tagsinput-template',
      component: TagsinputTemplateComponent
    },
    {
      path: 'tagsinput/tagsinput-null',
      component: TagsinputNullComponent
    },
    {
      path: 'tagsinput/tagsinput-maxlength',
      component: TagsinputMaxlengthComponent
    },
    {
      path: 'tagsinput/tagsinput-separators',
      component: TagsinputSeparatorsComponent
    }
  ];
}
