import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SelectgroupBasicComponent } from './SelectgroupBasicComponent';
import { SelectgroupMultipleComponent } from './SelectgroupMultipleComponent';
import { SelectgroupValuekeyComponent } from './SelectgroupValuekeyComponent';
import { SelectgroupTemplateComponent } from './SelectgroupTemplateComponent';
import { SelectgroupSelectComponent } from './SelectgroupSelectComponent';
import { TiSelectgroupModule, TiSelectModule, TiIconModule, TiSvgComponent } from '@opentiny/ng';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiIconModule,
    TiSelectModule,
    TiSelectgroupModule,
    RouterModule.forChild(SelectgroupTestModule.ROUTES)
  ],
  declarations: [
    SelectgroupBasicComponent,
    SelectgroupMultipleComponent,
    SelectgroupValuekeyComponent,
    SelectgroupTemplateComponent,
    SelectgroupSelectComponent
  ]
})
export class SelectgroupTestModule {
  constructor() {
    TiSvgComponent.setPath('/assets/ionicons/');
  }
  static readonly ROUTES: Routes = [
    { path: 'selectgroup/selectgroup-basic', component: SelectgroupBasicComponent, data: { label: '基础' } },
    { path: 'selectgroup/selectgroup-multiple', component: SelectgroupMultipleComponent, data: { label: '多选' } },
    { path: 'selectgroup/selectgroup-valuekey', component: SelectgroupValuekeyComponent, data: { label: '自定义选中值' } },
    { path: 'selectgroup/selectgroup-template', component: SelectgroupTemplateComponent, data: { label: '自定义模板' } },
    { path: 'selectgroup/selectgroup-select', component: SelectgroupSelectComponent, data: { label: '下拉框' } }
  ];
}
