import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiBadgeModule, TiButtonModule } from '@opentiny/ng';
import { BadgeBasicComponent } from './BadgeBasicComponent';
import { BadgeShowComponent } from './BadgeShowComponent';
import { BadgeDotComponent } from './BadgeDotComponent';

@NgModule({
  imports: [CommonModule, TiBadgeModule, TiButtonModule, RouterModule.forChild(BadgeTestModule.ROUTES)],
  declarations: [BadgeBasicComponent, BadgeShowComponent, BadgeDotComponent]
})
export class BadgeTestModule {
  static readonly ROUTES: Routes = [
    {
      path: 'badge/badge-basic',
      component: BadgeBasicComponent
    },
    {
      path: 'badge/badge-dot',
      component: BadgeDotComponent,
      data: { label: '小圆点标识' }
    },
    {
      path: 'badge/badge-show',
      component: BadgeShowComponent,
      data: { label: '动态隐藏标识' }
    }
  ];
}
