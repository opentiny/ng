import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiRightsModule } from '@opentiny/ng';
import { RightsBasicComponent } from './RightsBasicComponent';
import { RightsTypeComponent } from './RightsTypeComponent';

@NgModule({
  imports: [CommonModule, TiRightsModule, RouterModule.forChild(RightsTestModule.ROUTES)],
  declarations: [RightsBasicComponent, RightsTypeComponent]
})
export class RightsTestModule {
  static readonly ROUTES: Routes = [
    {
      path: 'rights/rights-basic',
      component: RightsBasicComponent
    },
    {
      path: 'rights/rights-type',
      component: RightsTypeComponent
    }
  ];
}
