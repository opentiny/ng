import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  TiButtonModule,
  TiIconModule,
  TiOverflowModule,
  TiSearchboxModule,
  TiTreeModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { TreeRadioselectComponent } from './TreeRadioselectComponent';
import { TreeMultiselectComponent } from './TreeMultiselectComponent';
import { TreeUtilComponent } from './TreeUtilComponent';
import { TreeBeforeExpandComponent } from './TreeBeforeExpandComponent';
import { TreeParentcheckableComponent } from './TreeParentcheckableComponent';
import { TreeSearchComponent } from './TreeSearchComponent';
import { TreeLoadComponent } from './TreeLoadComponent';
import { TreeChangedbycheckboxComponent } from './TreeChangedbycheckboxComponent';
import { TreeManyComponent } from './TreeManyComponent';
import { TreeDisabledComponent } from './TreeDisabledComponent';
import { TreeSmallComponent } from './TreeSmallComponent';
import { TreeTemplateComponent } from './TreeTemplateComponent';
import { TreeIconComponent } from './TreeIconComponent';
import { TreeShortcutkeyComponent } from './TreeShortcutkeyComponent';
import { TreeDragComponent } from './TreeDragComponent';
import { TreeOperateComponent } from './TreeOperateComponent';
import { TreeBeforeMoreComponent } from './TreeBeforeMoreComponent';
import { TreeDragBeforedropComponent } from './TreeDragBeforedropComponent';
import { TreeEventComponent } from './TreeEventComponent';
import { TreeCheckRelationComponent } from './TreeCheckRelationComponent';
import { TreeVirtualscrollComponent } from './TreeVirtualscrollComponent';
import { TreeVirtualscrollSmallComponent } from './TreeVirtualscrollSmallComponent';
import { TreeVirtualscrollDragComponent } from './TreeVirtualscrollDragComponent';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTreeModule,
    TiOverflowModule,
    TiSearchboxModule,
    TiIconModule,
    TiButtonModule,
    DemoLogModule,
    RouterModule.forChild(TreeTestModule.ROUTES)
  ],
  declarations: [
    TreeRadioselectComponent,
    TreeMultiselectComponent,
    TreeBeforeExpandComponent,
    TreeParentcheckableComponent,
    TreeUtilComponent,
    TreeSearchComponent,
    TreeLoadComponent,
    TreeChangedbycheckboxComponent,
    TreeManyComponent,
    TreeDisabledComponent,
    TreeSmallComponent,
    TreeTemplateComponent,
    TreeIconComponent,
    TreeShortcutkeyComponent,
    TreeDragComponent,
    TreeDragBeforedropComponent,
    TreeOperateComponent,
    TreeEventComponent,
    TreeBeforeMoreComponent,
    TreeCheckRelationComponent,
    TreeVirtualscrollComponent,
    TreeVirtualscrollSmallComponent,
    TreeVirtualscrollDragComponent
  ]
})
export class TreeTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiTreeComponent.html', label: 'Tree' },
    { href: 'classes/TiTreeUtil.html', label: 'TiTreeUtil' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'tree/tree-radioselect',
      component: TreeRadioselectComponent
    },
    {
      path: 'tree/tree-multiselect',
      component: TreeMultiselectComponent
    },
    {
      path: 'tree/tree-before-expand',
      component: TreeBeforeExpandComponent
    },
    {
      path: 'tree/tree-before-more',
      component: TreeBeforeMoreComponent
    },
    {
      path: 'tree/tree-search',
      component: TreeSearchComponent
    },
    {
      path: 'tree/tree-parentcheckable',
      component: TreeParentcheckableComponent
    },
    {
      path: 'tree/tree-check-relation',
      component: TreeCheckRelationComponent
    },
    {
      path: 'tree/tree-util',
      component: TreeUtilComponent
    },
    {
      path: 'tree/tree-changedbycheckbox',
      component: TreeChangedbycheckboxComponent
    },
    {
      path: 'tree/tree-disabled',
      component: TreeDisabledComponent
    },
    {
      path: 'tree/tree-small',
      component: TreeSmallComponent
    },
    {
      path: 'tree/tree-template',
      component: TreeTemplateComponent
    },
    {
      path: 'tree/tree-shortcutkey',
      component: TreeShortcutkeyComponent
    },
    {
      path: 'tree/tree-drag',
      component: TreeDragComponent
    },
    {
      path: 'tree/tree-drag-beforedrop',
      component: TreeDragBeforedropComponent
    },
    {
      path: 'tree/tree-operate',
      component: TreeOperateComponent
    },
    {
      path: 'tree/tree-event',
      component: TreeEventComponent
    },
    {
      path: 'tree/tree-virtualscroll',
      component: TreeVirtualscrollComponent
    },
    { path: 'tree/tree-load',
      component: TreeLoadComponent
    },
    { path: 'tree/tree-many',
      component: TreeManyComponent
    },
    { path: 'tree/tree-icon',
      component: TreeIconComponent
    },
    {
      path: 'tree/tree-virtualscroll-small',
      component: TreeVirtualscrollSmallComponent
    },
    {
      path: 'tree/tree-virtualscroll-drag',
      component: TreeVirtualscrollDragComponent
    }
  ];
}
