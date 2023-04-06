import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TiIconModule, TiMenuModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { MenuBorderComponent } from './MenuBorderComponent';
import { MenuBasicComponent } from './MenuBasicComponent';
import { MenuDisabledComponent } from './MenuDisabledComponent';
import { MenuGroupComponent } from './MenuGroupComponent';
import { MenuPanelalignComponent } from './MenuPanelalignComponent';
import { MenuBeforeopenComponent } from './MenuBeforeopenComponent';
import { MenuPanelstyleComponent } from './MenuPanelstyleComponent';
import { MenuTipsComponent } from './MenuTipsComponent';
import { MenuIdComponent } from './MenuIdComponent';
import { MenuLabelkeyComponent } from './MenuLabelkeyComponent';
import { MenuEventComponent } from './MenuEventComponent';
import { MenuTempleteComponent } from './MenuTempleteComponent';
import { MenuTempleteTestComponent } from './MenuTempleteTestComponent';
import { MenuButtoncolorComponent } from './MenuButtoncolorComponent';
import { MenuDefaultComponent } from './MenuDefaultComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiMenuModule, TiIconModule, DemoLogModule, RouterModule.forChild(MenuTestModule.ROUTES)],
  declarations: [
    MenuBorderComponent,
    MenuBasicComponent,
    MenuDisabledComponent,
    MenuGroupComponent,
    MenuPanelalignComponent,
    MenuBeforeopenComponent,
    MenuPanelstyleComponent,
    MenuIdComponent,
    MenuTipsComponent,
    MenuLabelkeyComponent,
    MenuEventComponent,
    MenuTempleteComponent,
    MenuTempleteTestComponent,
    MenuButtoncolorComponent,
    MenuDefaultComponent
  ]
})
export class MenuTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiMenuComponent.html', label: 'Menu' }];
  static readonly ROUTES: Routes = [
    {
      path: 'menu/menu-basic',
      component: MenuBasicComponent
    },
    {
      path: 'menu/menu-labelkey',
      component: MenuLabelkeyComponent
    },
    {
      path: 'menu/menu-disabled',
      component: MenuDisabledComponent
    },
    {
      path: 'menu/menu-group',
      component: MenuGroupComponent
    },
    {
      path: 'menu/menu-panelalign',
      component: MenuPanelalignComponent
    },
    {
      path: 'menu/menu-beforeopen',
      component: MenuBeforeopenComponent
    },
    {
      path: 'menu/menu-panelstyle',
      component: MenuPanelstyleComponent
    },
    {
      path: 'menu/menu-tips',
      component: MenuTipsComponent
    },
    {
      path: 'menu/menu-border',
      component: MenuBorderComponent
    },
    {
      path: 'menu/menu-templete',
      component: MenuTempleteComponent
    },
    {
      path: 'menu/menu-event',
      component: MenuEventComponent
    },
    { path: 'menu/menu-id', component: MenuIdComponent },
    { path: 'menu/menu-templete-test', component: MenuTempleteTestComponent },
    { path: 'menu/menu-buttoncolor', component: MenuButtoncolorComponent },
    {
      path: 'menu/menu-default',
      component: MenuDefaultComponent
    }
  ];
}
