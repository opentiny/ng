import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TiOverflowModule, TiTableModule, TiTipModule, TiCopyModule } from '@opentiny/ng';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';

import { CopyBasicComponent } from './CopyBasicComponent';
import { CopyDarkComponent } from './CopyDarkComponent';
import { CopyTableComponent } from './CopyTableComponent';
import { CopyTipComponent } from './CopyTipComponent';
import { CopyEventComponent } from './CopyEventComponent';

@NgModule({
  imports: [
    CommonModule,
    TiTipModule,
    TiTableModule,
    TiCopyModule,
    TiOverflowModule,
    DemoLogModule,
    RouterModule.forChild(CopyTestModule.ROUTES)
  ],
  declarations: [CopyBasicComponent, CopyDarkComponent, CopyTableComponent, CopyTipComponent, CopyEventComponent]
})
export class CopyTestModule {
  public static readonly ROUTES: Routes = [
    { path: 'copy/copy-basic', component: CopyBasicComponent, data: { label: '基本使用' } },
    { path: 'copy/copy-dark', component: CopyDarkComponent, data: { label: '深色背景' } },
    { path: 'copy/copy-tip', component: CopyTipComponent, data: { label: '提示信息' } },
    { path: 'copy/copy-table', component: CopyTableComponent, data: { label: '在表格中使用' } },
    { path: 'copy/copy-event', component: CopyEventComponent, data: { label: '事件' } }
  ];
}
