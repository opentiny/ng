import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VarsComponent } from './VarsComponent';

@NgModule({
  imports: [RouterModule.forChild(VarsTestModule.ROUTES)],
  declarations: [VarsComponent]
})
export class VarsTestModule {
  static readonly ROUTES: Routes = [
    {
      path: 'vars/vars-basic',
      component: VarsComponent,
      data: { label: '换肤基础变量' }
    }
  ];
}
