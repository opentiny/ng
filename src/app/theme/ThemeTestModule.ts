import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiSwitchModule } from '@opentiny/ng';

import { ThemeBasicComponent } from './ThemeBasicComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiSwitchModule,
    RouterModule.forChild(ThemeTestModule.ROUTES),
  ],
  declarations: [ThemeBasicComponent]
})
export class ThemeTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'classes/TiThemeUtil.html', label: 'Theme' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'theme/theme-basic',
      component: ThemeBasicComponent
    }
  ];
}
