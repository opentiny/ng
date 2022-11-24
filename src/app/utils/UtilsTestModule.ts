import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserBasicComponent } from './BrowserBasicComponent';
import { KeymapBasicComponent } from './KeymapBasicComponent';
import { LogBasicComponent } from './LogBasicComponent';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(UtilsTestModule.ROUTES)],
  declarations: [
    BrowserBasicComponent,
    KeymapBasicComponent,
    LogBasicComponent
  ]
})
export class UtilsTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'classes/TiBrowser.html', label: 'TiBrowser' },
    { href: 'classes/TiKeymap.html', label: 'TiKeymap' },
    { href: 'classes/TiLog.html', label: 'TiLog' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'utils/browser-basic',
      component: BrowserBasicComponent
    },
    {
      path: 'utils/keymap-basic',
      component: KeymapBasicComponent
    },
    {
      path: 'utils/log-basic',
      component: LogBasicComponent
    }
  ];
}
