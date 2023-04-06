import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';

import { TiPhonenumberModule } from '@opentiny/ng';
import { PhonenumberBasicComponent } from './PhonenumberBasicComponent';
import { PhonenumberDisabledComponent } from './PhonenumberDisabledComponent';
import { PhonenumberEventComponent } from './PhonenumberEventComponent';
import { PhonenumberValidComponent } from './PhonenumberValidComponent';
import { PhonenumberCountryComponent } from './PhonenumberCountryComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiPhonenumberModule, DemoLogModule, RouterModule.forChild(PhonenumberTestModule.ROUTES)],
  declarations: [
    PhonenumberBasicComponent,
    PhonenumberDisabledComponent,
    PhonenumberEventComponent,
    PhonenumberValidComponent,
    PhonenumberCountryComponent
  ]
})
export class PhonenumberTestModule {
  static readonly ROUTES: Routes = [
    { path: 'phonenumber/phonenumber-basic', component: PhonenumberBasicComponent },
    { path: 'phonenumber/phonenumber-disabled', component: PhonenumberDisabledComponent },
    { path: 'phonenumber/phonenumber-event', component: PhonenumberEventComponent },
    { path: 'phonenumber/phonenumber-valid', component: PhonenumberValidComponent },
    { path: 'phonenumber/phonenumber-country', component: PhonenumberCountryComponent }
  ];
}
