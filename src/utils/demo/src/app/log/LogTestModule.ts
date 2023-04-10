import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LogUsageComponent } from './LogUsageComponent';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LogTestModule.ROUTES)],
  declarations: [LogUsageComponent]
})
export class LogTestModule {
  static readonly LINKS: Array<object> = [{ href: 'classes/TiLog.html', label: 'TiLog' }];
  static readonly ROUTES: Routes = [
    {
      path: 'log/log-usage',
      component: LogUsageComponent
    }
  ];
}
