import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiDroplistModule } from '@opentiny/ng';

import { DroplistDefaultComponent } from './DroplistDefaultComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiDroplistModule,
    RouterModule.forChild(DroplistTestModule.ROUTES)
  ],
  declarations: [DroplistDefaultComponent]
})
export class DroplistTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiDropListComponent.html', label: 'TiDropList' }
  ];
  static readonly ROUTES: Routes = [
    { path: 'droplist/droplist-basic', component: DroplistDefaultComponent }
  ];
}
