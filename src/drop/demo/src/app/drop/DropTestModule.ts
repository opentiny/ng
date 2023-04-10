import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiDropModule } from '@opentiny/ng';

import { DropDefaultComponent } from './DropDefaultComponent';
import { DropAppendtobodyComponent } from './DropAppendtobodyComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiDropModule, RouterModule.forChild(DropTestModule.ROUTES)],
  declarations: [DropDefaultComponent, DropAppendtobodyComponent]
})
export class DropTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiDropComponent.html', label: 'Drop' }];
  static readonly ROUTES: Routes = [
    { path: 'drop/drop-basic', component: DropDefaultComponent },
    { path: 'drop/drop-appendtobody', component: DropAppendtobodyComponent }
  ];
}
