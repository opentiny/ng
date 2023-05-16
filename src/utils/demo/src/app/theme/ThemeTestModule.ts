import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiSwitchModule } from '@opentiny/ng';

import { ThemeBasicComponent } from './ThemeBasicComponent';
import { ThemePaletteComponent } from './ThemePaletteComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiButtonModule, TiSwitchModule, RouterModule.forChild(ThemeTestModule.ROUTES)],
  declarations: [ThemeBasicComponent, ThemePaletteComponent]
})
export class ThemeTestModule {
  static readonly LINKS: Array<object> = [{ href: 'classes/TiThemeUtil.html', label: 'Theme' }];
  static readonly ROUTES: Routes = [
    {
      path: 'theme/theme-basic',
      component: ThemeBasicComponent
    },
    {
      path: 'theme/theme-palette',
      component: ThemePaletteComponent
    }
  ];
}
