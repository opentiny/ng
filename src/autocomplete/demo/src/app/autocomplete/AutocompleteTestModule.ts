import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  TiAutocompleteModule,
  TiFormfieldModule,
  TiSearchboxModule,
  TiSelectModule,
  TiTreeselectModule,
  TiValidationModule
} from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { AutocompleteBasicComponent } from './AutocompleteBasicComponent';
import { AutocompletePanelSizeComponent } from './AutocompletePanelSizeComponent';
import { AutocompleteLabelkeyComponent } from './AutocompleteLabelkeyComponent';
import { AutocompleteEventsComponent } from './AutocompleteEventsComponent';
import { AutocompleteClearableComponent } from './AutocompleteClearableComponent';
import { AutocompleteDisabledComponent } from './AutocompleteDisabledComponent';
import { AutocompleteMaxlengthComponent } from './AutocompleteMaxlengthComponent';
import { AutocompleteValidComponent } from './AutocompleteValidComponent';
import { AutocompleteTipComponent } from './AutocompleteTipComponent';
import { AutocompleteTestComponent } from './AutocompleteTestComponent';
import { AutocompleteAppendtobodyComponent } from './AutocompleteAppendtobodyComponent';
import { AutocompleteTemplateComponent } from './AutocompleteTemplateComponent';
import { AutocompleteGroupComponent } from './AutocompleteGroupComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiAutocompleteModule,
    TiFormfieldModule,
    TiSelectModule,
    TiTreeselectModule,
    TiSearchboxModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(AutocompleteTestModule.ROUTES)
  ],
  declarations: [
    AutocompleteBasicComponent,
    AutocompletePanelSizeComponent,
    AutocompleteLabelkeyComponent,
    AutocompleteEventsComponent,
    AutocompleteClearableComponent,
    AutocompleteDisabledComponent,
    AutocompleteMaxlengthComponent,
    AutocompleteTipComponent,
    AutocompleteValidComponent,
    AutocompleteAppendtobodyComponent,
    AutocompleteTestComponent,
    AutocompleteTemplateComponent,
    AutocompleteGroupComponent
  ]
})
export class AutocompleteTestModule {
  static readonly LINKS: Array<object> = [{ href: 'component/TiAutocompleteComponent.html', label: 'Autocomplete' }];
  static readonly ROUTES: Routes = [
    {
      path: 'autocomplete/autocomplete-basic',
      component: AutocompleteBasicComponent
    },
    {
      path: 'autocomplete/autocomplete-panel-size',
      component: AutocompletePanelSizeComponent
    },
    {
      path: 'autocomplete/autocomplete-labelkey',
      component: AutocompleteLabelkeyComponent
    },
    {
      path: 'autocomplete/autocomplete-events',
      component: AutocompleteEventsComponent
    },
    {
      path: 'autocomplete/autocomplete-disabled',
      component: AutocompleteDisabledComponent
    },
    {
      path: 'autocomplete/autocomplete-clearable',
      component: AutocompleteClearableComponent
    },
    {
      path: 'autocomplete/autocomplete-maxlength',
      component: AutocompleteMaxlengthComponent
    },
    {
      path: 'autocomplete/autocomplete-tip',
      component: AutocompleteTipComponent
    },
    {
      path: 'autocomplete/autocomplete-appendtobody',
      component: AutocompleteAppendtobodyComponent
    },
    {
      path: 'autocomplete/autocomplete-valid',
      component: AutocompleteValidComponent
    },
    {
      path: 'autocomplete/autocomplete-group',
      component: AutocompleteGroupComponent
    },
    {
      path: 'autocomplete/autocomplete-test',
      component: AutocompleteTestComponent
    }
  ];
}
