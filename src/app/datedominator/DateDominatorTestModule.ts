import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiDateDominatorModule } from '@opentiny/ng';

import { DateDominatorComponent } from './DateDominatorComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiDateDominatorModule,
    RouterModule.forChild(DateDominatorTestModule.ROUTES)
  ],
  declarations: [DateDominatorComponent]
})
export class DateDominatorTestModule {
  static readonly LINKS: Array<object> = [
    {
      href: 'components/TiDateDominatorComponent.html',
      label: 'DateDominator'
    }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'datedominator/datedominator-basic',
      component: DateDominatorComponent
    }
  ];
}
