import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiGuidestepsModule } from '@opentiny/ng';

import { GuidestepsBasicComponent } from './GuidestepsBasicComponent';
import { GuidestepsIscompleteComponent } from './GuidestepsIscompleteComponent';
import { GuidestepsLargeComponent } from './GuidestepsLargeComponent';

@NgModule({
  imports: [CommonModule, TiGuidestepsModule, RouterModule.forChild(GuidestepsTestModule.ROUTES)],
  declarations: [GuidestepsBasicComponent, GuidestepsIscompleteComponent, GuidestepsLargeComponent]
})
export class GuidestepsTestModule {
  static readonly ROUTES: Routes = [
    { path: 'guidesteps/guidesteps-basic', component: GuidestepsBasicComponent },
    { path: 'guidesteps/guidesteps-iscomplete', component: GuidestepsIscompleteComponent },
    { path: 'guidesteps/guidesteps-large', component: GuidestepsLargeComponent }
  ];
}
