import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserUsageComponent } from './BrowserUsageComponent';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(BrowserTestModule.ROUTES)],
  declarations: [BrowserUsageComponent]
})
export class BrowserTestModule {
  static readonly LINKS: Array<object> = [{ href: 'classes/TiBrowser.html', label: 'TiBrowser' }];
  static readonly ROUTES: Routes = [
    {
      path: 'browser/browser-basic',
      component: BrowserUsageComponent
    }
  ];
}
