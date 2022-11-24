import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiButtonModule, TiIconModule, TiMenuModule, TiNavModule } from '@opentiny/ng';
import { NavActiveComponent } from './NavActiveComponent';
import { NavAlignComponent } from './NavAlignComponent';
import { NavBasicComponent } from './NavBasicComponent';
import { NavDisabledComponent } from './NavDisabledComponent';
import { NavEventComponent } from './NavEventComponent';
import { NavLeftComponent } from './NavLeftComponent';
import { NavTemplateComponent } from './NavTemplateComponent';
import { NavRightComponent } from './NavRightComponent';
import { NavSelectableComponent } from './NavSelectableComponent';
import { NavSubmenuComponent } from './NavSubmenuComponent';
import { NavThemeComponent } from './NavThemeComponent';
import { NavWidthComponent } from './NavWidthComponent';

@NgModule({
  imports: [
    CommonModule,
    TiNavModule,
    TiMenuModule,
    TiButtonModule,
    TiIconModule,
    RouterModule.forChild(NavTestModule.ROUTES),
  ],
  declarations: [
    NavBasicComponent,
    NavWidthComponent,
    NavThemeComponent,
    NavLeftComponent,
    NavRightComponent,
    NavAlignComponent,
    NavSubmenuComponent,
    NavActiveComponent,
    NavSelectableComponent,
    NavDisabledComponent,
    NavTemplateComponent,
    NavEventComponent,
  ],
})
export class NavTestModule {
  static readonly LINKS: Array<{ href: string; label: string }> = [
    { href: 'components/TiNavComponent.html', label: 'Nav' },
  ];

  static readonly ROUTES: Routes = [
    {
      path: 'nav/nav-basic',
      component: NavBasicComponent,
      data: { label: '基础' },
    },
    {
      path: 'nav/nav-width',
      component: NavWidthComponent,
      data: { label: '自定义宽度' },
    },
    {
      path: 'nav/nav-theme',
      component: NavThemeComponent,
      data: { label: '深色主题' },
    },
    {
      path: 'nav/nav-left',
      component: NavLeftComponent,
      data: { label: '左侧Logo区' },
    },
    {
      path: 'nav/nav-right',
      component: NavRightComponent,
      data: { label: '右侧操作区' },
    },
    {
      path: 'nav/nav-align',
      component: NavAlignComponent,
      data: { label: '菜单区对齐' },
    },
    {
      path: 'nav/nav-submenu',
      component: NavSubmenuComponent,
      data: { label: '子菜单' },
    },
    {
      path: 'nav/nav-active',
      component: NavActiveComponent,
      data: { label: '激活项' },
    },
    {
      path: 'nav/nav-selectable',
      component: NavSelectableComponent,
      data: { label: '可选择项' },
    },
    {
      path: 'nav/nav-disabled',
      component: NavDisabledComponent,
      data: { label: '禁用项' },
    },
    {
      path: 'nav/nav-template',
      component: NavTemplateComponent,
      data: { label: '使用模板渲染标签' },
    },
    {
      path: 'nav/nav-event',
      component: NavEventComponent,
      data: { label: '事件' },
    },
  ];
}
