import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiActionmenuModule, TiIconModule, TiTableModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ActionmenuBasicComponent } from './ActionmenuBasicComponent';
import { ActionmenuDataComponent } from './ActionmenuDataComponent';
import { ActionmenuItemsComponent } from './ActionmenuItemsComponent';
import { ActionmenuTipsComponent } from './ActionmenuTipsComponent';
import { ActionmenuData2Component } from './ActionmenuData2Component';
import { ActionmenuFocusComponent } from './ActionmenuFocusComponent';
import { ActionmenuTableComponent } from './ActionmenuTableComponent';
import { ActionmenuEventComponent } from './ActionmenuEventComponent';
import { ActionmenuDividerComponent } from './ActionmenuDividerComponent';
import { ActionmenuIdComponent } from './ActionmenuIdComponent';
import { ActionmenuItemsChangeComponent } from './ActionmenuItemsChangeComponent';
import { ActionmenuManyComponent } from './ActionmenuManyComponent';
import { ActionmenuLabelkeyComponent } from './ActionmenuLabelkeyComponent';
import { ActionmenuDisabledComponent } from './ActionmenuDisabledComponent';
import { ActionmenuShownumComponent } from './ActionmenuShownumComponent';
import { ActionmenuSpaceComponent } from './ActionmenuSpaceComponent';
import { ActionmenuTipsTestComponent } from './ActionmenuTipsTestComponent';
import { ActionmenuMenutextComponent } from './ActionmenuMenutextComponent';
import { ActionmenuTempleteTestComponent } from './ActionmenuTempleteTestComponent';
import { ActionmenuTempleteComponent } from './ActionmenuTempleteComponent';
import { ActionmenuPanelstyleComponent } from './ActionmenuPanelstyleComponent';

@NgModule({
  imports: [
    CommonModule,
    TiActionmenuModule,
    TiTableModule,
    TiIconModule,
    DemoLogModule,
    RouterModule.forChild(ActionmenuTestModule.ROUTES)
  ],
  declarations: [
    ActionmenuBasicComponent,
    ActionmenuDataComponent,
    ActionmenuData2Component,
    ActionmenuEventComponent,
    ActionmenuItemsComponent,
    ActionmenuTipsComponent,
    ActionmenuFocusComponent,
    ActionmenuTableComponent,
    ActionmenuIdComponent,
    ActionmenuDividerComponent,
    ActionmenuItemsChangeComponent,
    ActionmenuManyComponent,
    ActionmenuLabelkeyComponent,
    ActionmenuDisabledComponent,
    ActionmenuShownumComponent,
    ActionmenuSpaceComponent,
    ActionmenuTipsTestComponent,
    ActionmenuMenutextComponent,
    ActionmenuTempleteTestComponent,
    ActionmenuTempleteComponent,
    ActionmenuPanelstyleComponent
  ]
})
export class ActionmenuTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiActionmenuComponent.html', label: 'Actionmenu' }];
  static readonly ROUTES: Routes = [
    {
      path: 'actionmenu/actionmenu-basic',
      component: ActionmenuBasicComponent
    },
    {
      path: 'actionmenu/actionmenu-items',
      component: ActionmenuItemsComponent
    },
    {
      path: 'actionmenu/actionmenu-divider',
      component: ActionmenuDividerComponent
    },
    {
      path: 'actionmenu/actionmenu-tips',
      component: ActionmenuTipsComponent
    },
    {
      path: 'actionmenu/actionmenu-event',
      component: ActionmenuEventComponent
    },
    {
      path: 'actionmenu/actionmenu-data',
      component: ActionmenuDataComponent
    },
    {
      path: 'actionmenu/actionmenu-id',
      component: ActionmenuIdComponent
    },
    {
      path: 'actionmenu/actionmenu-data2',
      component: ActionmenuData2Component
    },
    {
      path: 'actionmenu/actionmenu-items-change',
      component: ActionmenuItemsChangeComponent
    },
    {
      path: 'actionmenu/actionmenu-table',
      component: ActionmenuTableComponent
    },
    {
      path: 'actionmenu/actionmenu-focus',
      component: ActionmenuFocusComponent
    },
    { path: 'actionmenu/actionmenu-many', component: ActionmenuManyComponent },
    {
      path: 'actionmenu/actionmenu-labelkey',
      component: ActionmenuLabelkeyComponent
    },
    {
      path: 'actionmenu/actionmenu-shownum',
      component: ActionmenuShownumComponent
    },
    {
      path: 'actionmenu/actionmenu-space',
      component: ActionmenuSpaceComponent
    },
    {
      path: 'actionmenu/actionmenu-disabled',
      component: ActionmenuDisabledComponent
    },
    {
      path: 'actionmenu/actionmenu-menutext',
      component: ActionmenuMenutextComponent
    },
    {
      path: 'actionmenu/actionmenu-panelstyle',
      component: ActionmenuPanelstyleComponent
    },
    {
      path: 'actionmenu/actionmenu-templete',
      component: ActionmenuTempleteComponent
    },
    {
      path: 'actionmenu/actionmenu-tips-test',
      component: ActionmenuTipsTestComponent
    },
    {
      path: 'actionmenu/actionmenu-templete-test',
      component: ActionmenuTempleteTestComponent
    }
  ];
}
