import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TiIconModule, TiOverflowModule } from '@opentiny/ng';

import { OverflowTestComponent } from './OverflowTestComponent';
import { OverflowMaxlineComponent } from './OverflowMaxlineComponent';
import { OverflowMaxwidthComponent } from './OverflowMaxwidthComponent';
import { OverflowTipcontentComponent } from './OverflowTipcontentComponent';
import { OverflowPositionComponent } from './OverflowPositionComponent';
import { OverflowDirectiveComponent } from './OverflowDirectiveComponent';
import { OverflowServiceComponent } from './OverflowServiceComponent';
import { OverflowDestoryComponent } from './OverflowDestoryComponent';

@NgModule({
  imports: [
    TiIconModule,
    TiOverflowModule,
    CommonModule,
    RouterModule.forChild(OverflowTestModule.ROUTES)
  ],
  declarations: [
    OverflowTestComponent,
    OverflowServiceComponent,
    OverflowMaxlineComponent,
    OverflowMaxwidthComponent,
    OverflowTipcontentComponent,
    OverflowPositionComponent,
    OverflowDirectiveComponent,
    OverflowDestoryComponent
  ]
})
export class OverflowTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'directives/TiOverflowDirective.html', label: 'Overflow' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'overflow/overflow-directive',
      component: OverflowDirectiveComponent
    },
    {
      path: 'overflow/overflow-maxline',
      component: OverflowMaxlineComponent
    },
    {
      path: 'overflow/overflow-maxwidth',
      component: OverflowMaxwidthComponent
    },
    {
      path: 'overflow/overflow-tipcontent',
      component: OverflowTipcontentComponent
    },
    {
      path: 'overflow/overflow-position',
      component: OverflowPositionComponent
    },
    { path: 'overflow/overflow-service',
      component: OverflowServiceComponent
    },
    { path: 'overflow/overflow-test',
      component: OverflowTestComponent
    },
    { path: 'overflow/overflow-destory',
      component: OverflowDestoryComponent
    }
  ];
}
