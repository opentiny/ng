import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiCollapsebuttonModule, TiButtonModule, TiFormfieldModule, TiIconModule, TiSearchboxModule } from '@opentiny/ng';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';

import { CollapsebuttonBasicComponent } from './CollapsebuttonBasicComponent';
import { CollapsebuttonCustomtextComponent } from './CollapsebuttonCustomtextComponent';
import { CollapsebuttonSearchcountComponent } from './CollapsebuttonSearchcountComponent';
import { CollapsebuttonEventComponent } from './CollapsebuttonEventComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiCollapsebuttonModule,
    TiButtonModule,
    TiIconModule,
    TiSearchboxModule,
    TiFormfieldModule,
    DemoLogModule,
    RouterModule.forChild(CollapsebuttonTestModule.ROUTES)
  ],
  declarations: [
    CollapsebuttonBasicComponent,
    CollapsebuttonCustomtextComponent,
    CollapsebuttonSearchcountComponent,
    CollapsebuttonEventComponent
  ]
})
export class CollapsebuttonTestModule {
  public static readonly ROUTES: Routes = [
    {
      path: 'collapsebutton/collapsebutton-basic',
      component: CollapsebuttonBasicComponent,
      data: { label: '基本使用' }
    },
    {
      path: 'collapsebutton/collapsebutton-customtext',
      component: CollapsebuttonCustomtextComponent,
      data: { label: '按钮自定义文本' }
    },
    {
      path: 'collapsebutton/collapsebutton-searchcount',
      component: CollapsebuttonSearchcountComponent,
      data: { label: '高级搜索条件计数' }
    },
    {
      path: 'collapsebutton/collapsebutton-event',
      component: CollapsebuttonEventComponent,
      data: { label: '事件' }
    }
  ];
}
