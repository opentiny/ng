import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TiButtonModule, TiSearchboxModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { SearchboxTestComponent } from './SearchboxTestComponent';
import { SearchboxNotsearchComponent } from './SearchboxNotsearchComponent';
import { SearchboxBasicComponent } from './SearchboxBasicComponent';
import { SearchboxEventComponent } from './SearchboxEventComponent';
import { SearchboxPanelsizeComponent } from './SearchboxPanelsizeComponent';
import { SearchboxTrimmedComponent } from './SearchboxTrimmedComponent';
import { SearchboxValidComponent } from './SearchboxValidComponent';
import { SearchboxDisabledComponent } from './SearchboxDisabledComponent';
import { SearchboxAppendtobodyComponent } from './SearchboxAppendtobodyComponent';
import { SearchboxReactiveComponent } from './SearchboxReactiveComponent';
import { SearchboxOptionsComponent } from './SearchboxOptionsComponent';
import { SearchboxSuggestComponent } from './SearchboxSuggestComponent';
import { SearchboxMaxlengthComponent } from './SearchboxMaxlengthComponent';
import { SearchboxTemplateComponent } from './SearchboxTemplateComponent';
import { SearchboxVirtualscrollComponent } from './SearchboxVirtualscrollComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiButtonModule,
    TiSearchboxModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(SearchboxTestModule.ROUTES)
  ],
  declarations: [
    SearchboxBasicComponent,
    SearchboxSuggestComponent,
    SearchboxPanelsizeComponent,
    SearchboxTrimmedComponent,
    SearchboxValidComponent,
    SearchboxDisabledComponent,
    SearchboxEventComponent,
    SearchboxNotsearchComponent,
    SearchboxAppendtobodyComponent,
    SearchboxTestComponent,
    SearchboxReactiveComponent,
    SearchboxOptionsComponent,
    SearchboxMaxlengthComponent,
    SearchboxTemplateComponent,
    SearchboxVirtualscrollComponent
  ]
})
export class SearchboxTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiSearchboxComponent.html', label: 'Searchbox' }];
  static readonly ROUTES: Routes = [
    {
      path: 'searchbox/searchbox-basic',
      component: SearchboxBasicComponent
    },
    {
      path: 'searchbox/searchbox-template',
      component: SearchboxTemplateComponent
    },
    {
      path: 'searchbox/searchbox-reactive',
      component: SearchboxReactiveComponent
    },
    {
      path: 'searchbox/searchbox-options',
      component: SearchboxOptionsComponent
    },
    {
      path: 'searchbox/searchbox-suggest',
      component: SearchboxSuggestComponent
    },
    {
      path: 'searchbox/searchbox-maxlength',
      component: SearchboxMaxlengthComponent
    },
    {
      path: 'searchbox/searchbox-panelsize',
      component: SearchboxPanelsizeComponent
    },
    {
      path: 'searchbox/searchbox-trimmed',
      component: SearchboxTrimmedComponent
    },
    {
      path: 'searchbox/searchbox-valid',
      component: SearchboxValidComponent
    },
    {
      path: 'searchbox/searchbox-virtualscroll',
      component: SearchboxVirtualscrollComponent
    },
    {
      path: 'searchbox/searchbox-disabled',
      component: SearchboxDisabledComponent
    },
    {
      path: 'searchbox/searchbox-event',
      component: SearchboxEventComponent
    },
    {
      path: 'searchbox/searchbox-appendtobody',
      component: SearchboxAppendtobodyComponent
    },
    {
      path: 'searchbox/searchbox-notsearch',
      component: SearchboxNotsearchComponent
    },
    { path: 'searchbox/searchbox-test', component: SearchboxTestComponent }
  ];
}
