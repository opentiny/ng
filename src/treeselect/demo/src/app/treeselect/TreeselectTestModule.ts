import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiModalModule, TiSelectModule, TiTreeselectModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { TreeselectBasicComponent } from './TreeselectBasicComponent';
import { TreeselectMultiComponent } from './TreeselectMultiComponent';
import { TreeselectEventComponent } from './TreeselectEventComponent';
import { TreeselectSearchComponent } from './TreeselectSearchComponent';
import { TreeselectDisabledComponent } from './TreeselectDisabledComponent';
import { TreeselectSelectallComponent } from './TreeselectSelectallComponent';
import { TreeselectNodataComponent } from './TreeselectNodataComponent';
import { TreeselectValidationComponent } from './TreeselectValidationComponent';
import { TreeselectLazyloadComponent } from './TreeselectLazyloadComponent';
import { TreeselectLoadComponent } from './TreeselectLoadComponent';
import { TreeselectFocusComponent } from './TreeselectFocusComponent';
import { TreeselectDropmaxheightComponent } from './TreeselectDropmaxheightComponent';
import { TreeselectOptionsChangeComponent } from './TreeselectOptionsChangeComponent';
import { ModalTestComponent, TreeselectModalComponent } from './TreeselectModalComponent';
import { TreeselectBeforeExpandComponent } from './TreeselectBeforeExpandComponent';
import { TreeselectBeforeMoreComponent } from './TreeselectBeforeMoreComponent';
import { TreeselectClearableComponent } from './TreeselectClearableComponent';
import { TreeselectMaxlineComponent } from './TreeselectMaxlineComponent';
import { TreeselectPanelwidthComponent } from './TreeselectPanelwidthComponent';
import { TreeselectLabelkeyComponent } from './TreeselectLabelkeyComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTreeselectModule,
    TiValidationModule,
    TiModalModule,
    TiButtonModule,
    TiSelectModule,
    DemoLogModule,
    RouterModule.forChild(TreeselectTestModule.ROUTES)
  ],
  declarations: [
    TreeselectBasicComponent,
    TreeselectMultiComponent,
    TreeselectEventComponent,
    TreeselectSearchComponent,
    TreeselectDisabledComponent,
    TreeselectSelectallComponent,
    TreeselectNodataComponent,
    TreeselectValidationComponent,
    TreeselectLazyloadComponent,
    TreeselectLoadComponent,
    TreeselectFocusComponent,
    TreeselectDropmaxheightComponent,
    TreeselectOptionsChangeComponent,
    TreeselectModalComponent,
    TreeselectBeforeExpandComponent,
    TreeselectBeforeMoreComponent,
    TreeselectClearableComponent,
    TreeselectMaxlineComponent,
    TreeselectPanelwidthComponent,
    TreeselectLabelkeyComponent,
    ModalTestComponent
  ],
  entryComponents: [ModalTestComponent]
})
export class TreeselectTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiTreeselectComponent.html', label: 'Treeselect' }];
  static readonly ROUTES: Routes = [
    {
      path: 'treeselect/treeselect-basic',
      component: TreeselectBasicComponent
    },
    {
      path: 'treeselect/treeselect-multi',
      component: TreeselectMultiComponent
    },
    {
      path: 'treeselect/treeselect-selectall',
      component: TreeselectSelectallComponent
    },
    {
      path: 'treeselect/treeselect-clearable',
      component: TreeselectClearableComponent
    },
    {
      path: 'treeselect/treeselect-event',
      component: TreeselectEventComponent
    },
    {
      path: 'treeselect/treeselect-search',
      component: TreeselectSearchComponent
    },
    {
      path: 'treeselect/treeselect-labelkey',
      component: TreeselectLabelkeyComponent
    },
    {
      path: 'treeselect/treeselect-disabled',
      component: TreeselectDisabledComponent
    },
    {
      path: 'treeselect/treeselect-nodata',
      component: TreeselectNodataComponent
    },
    {
      path: 'treeselect/treeselect-validation',
      component: TreeselectValidationComponent
    },
    {
      path: 'treeselect/treeselect-lazyload',
      component: TreeselectLazyloadComponent
    },

    {
      path: 'treeselect/treeselect-dropmaxheight',
      component: TreeselectDropmaxheightComponent
    },

    {
      path: 'treeselect/treeselect-before-expand',
      component: TreeselectBeforeExpandComponent
    },
    {
      path: 'treeselect/treeselect-before-more',
      component: TreeselectBeforeMoreComponent
    },
    {
      path: 'treeselect/treeselect-modal',
      component: TreeselectModalComponent
    },
    {
      path: 'treeselect/treeselect-options-change',
      component: TreeselectOptionsChangeComponent
    },
    {
      path: 'treeselect/treeselect-load',
      component: TreeselectLoadComponent
    },
    {
      path: 'treeselect/treeselect-focus',
      component: TreeselectFocusComponent
    },
    {
      path: 'treeselect/treeselect-maxline',
      component: TreeselectMaxlineComponent
    },
    {
      path: 'treeselect/treeselect-panelwidth',
      component: TreeselectPanelwidthComponent
    }
  ];
}
