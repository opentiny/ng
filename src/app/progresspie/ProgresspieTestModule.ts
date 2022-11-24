import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiProgresspieModule } from '@opentiny/ng';

import { ProgresspieTestComponent } from './ProgresspieTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiProgresspieModule,
    RouterModule.forChild(ProgresspieTestModule.ROUTES)
  ],
  declarations: [ProgresspieTestComponent]
})
export class ProgresspieTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiProgresspieComponent.html', label: 'Progresspie' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'progresspie/progresspie-basic',
      component: ProgresspieTestComponent
    }
  ];
}
