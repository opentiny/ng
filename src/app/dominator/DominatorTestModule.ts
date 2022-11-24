import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiDominatorModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { DominatorDefaultComponent } from './DominatorDefaultComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiDominatorModule,
    DemoLogModule,
    RouterModule.forChild(DominatorTestModule.ROUTES)
  ],
  declarations: [DominatorDefaultComponent]
})
export class DominatorTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiDominatorComponent.html', label: 'Dominator' }
  ];
  static readonly ROUTES: Routes = [
    { path: 'dominator/dominator-basic', component: DominatorDefaultComponent }
  ];
}
