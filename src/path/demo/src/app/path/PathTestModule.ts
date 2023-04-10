import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';

import {
  TiButtonModule,
  TiCheckboxModule,
  TiIconModule,
  TiModalModule,
  TiPaginationModule,
  TiPathModule,
  TiTableModule
} from '@opentiny/ng';
import { PathfieldItemsComponent } from './PathfieldItemsComponent';
import { PathfieldIspanelComponent } from './PathfieldIspanelComponent';
import { PathfieldPanelwidthComponent } from './PathfieldPanelwidthComponent';
import { PathfieldEditableComponent } from './PathfieldEditableComponent';
import { PathfieldEventComponent } from './PathfieldEventComponent';
import { PathListComponent } from './PathListComponent';
import { PathSelectComponent } from './PathSelectComponent';

@NgModule({
  imports: [
    CommonModule,
    TiButtonModule,
    TiModalModule,
    TiTableModule,
    TiCheckboxModule,
    TiPaginationModule,
    TiIconModule,
    TiPathModule,
    DemoLogModule,
    RouterModule.forChild(PathTestModule.ROUTES)
  ],
  declarations: [
    PathfieldItemsComponent,
    PathfieldIspanelComponent,
    PathfieldPanelwidthComponent,
    PathfieldEditableComponent,
    PathfieldEventComponent,
    PathListComponent,
    PathSelectComponent
  ]
})
export class PathTestModule {
  static readonly ROUTES: Routes = [
    { path: 'path/pathfield-items', component: PathfieldItemsComponent },
    { path: 'path/pathfield-ispanel', component: PathfieldIspanelComponent },
    { path: 'path/pathfield-panelwidth', component: PathfieldPanelwidthComponent },
    { path: 'path/pathfield-editable', component: PathfieldEditableComponent },
    { path: 'path/pathfield-pathchange', component: PathfieldEventComponent },
    { path: 'path/path-list', component: PathListComponent },
    { path: 'path/path-select', component: PathSelectComponent }
  ];
}
