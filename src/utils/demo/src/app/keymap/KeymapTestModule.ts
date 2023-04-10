import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiTextModule } from '@opentiny/ng';

import { KeymapUsageComponent } from './KeymapUsageComponent';

@NgModule({
  imports: [CommonModule, TiTextModule, RouterModule.forChild(KeymapTestModule.ROUTES)],
  declarations: [KeymapUsageComponent]
})
export class KeymapTestModule {
  static readonly LINKS: Array<object> = [{ href: 'classes/TiKeymap.html', label: 'TiKeymap' }];
  static readonly ROUTES: Routes = [
    {
      path: 'keymap/keymap-usage',
      component: KeymapUsageComponent
    }
  ];
}
