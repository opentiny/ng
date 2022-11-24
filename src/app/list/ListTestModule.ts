import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TiListModule } from '@opentiny/ng';

import { ListGroupComponent } from './ListGroupComponent';
import { ListMultiComponent } from './ListMultiComponent';
import { ListTipComponent } from './ListTipComponent';
import { ListSelectallComponent } from './ListSelectallComponent';
import { ListDefaultComponent } from './ListDefaultComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiListModule,
    RouterModule.forChild(ListTestModule.ROUTES)
  ],
  declarations: [
    ListDefaultComponent,
    ListGroupComponent,
    ListMultiComponent,
    ListTipComponent,
    ListSelectallComponent
  ]
})
export class ListTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiListComponent.html', label: 'List' }
  ];
  static readonly ROUTES: Routes = [
    { path: 'list', component: ListDefaultComponent },
    { path: 'list/group', component: ListGroupComponent },
    { path: 'list/multi', component: ListMultiComponent },
    { path: 'list/tip', component: ListTipComponent },
    { path: 'list/selectall', component: ListSelectallComponent }
  ];
}
