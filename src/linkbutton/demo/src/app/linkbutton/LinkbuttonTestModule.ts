import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TiLinkbuttonModule } from '@opentiny/ng';

import { LinkbuttonBasicComponent } from './LinkbuttonBasicComponent';
@NgModule({
  imports: [CommonModule, TiLinkbuttonModule, RouterModule.forChild(LinkbuttonTestModule.ROUTES)],
  declarations: [LinkbuttonBasicComponent]
})
export class LinkbuttonTestModule {
  public static readonly ROUTES: Routes = [{ path: 'linkbutton/linkbutton-basic', component: LinkbuttonBasicComponent }];
}
