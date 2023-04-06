import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiFoldtextModule, TiTableModule, TiButtonModule } from '@opentiny/ng';

import { FoldtextBasicComponent } from './FoldtextBasicComponent';
import { FoldtextTableComponent } from './FoldtextTableComponent';

@NgModule({
  imports: [CommonModule, TiFoldtextModule, TiTableModule, TiButtonModule, RouterModule.forChild(FoldtextTestModule.ROUTES)],
  declarations: [FoldtextBasicComponent, FoldtextTableComponent]
})
export class FoldtextTestModule {
  public static readonly ROUTES: Routes = [
    { path: 'foldtext/foldtext-basic', component: FoldtextBasicComponent },
    { path: 'foldtext/foldtext-table', component: FoldtextTableComponent }
  ];
}
