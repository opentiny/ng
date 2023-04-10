import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiCollapseModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { CollapseBasicComponent } from './CollapseBasicComponent';
import { CollapseEventComponent } from './CollapseEventComponent';

@NgModule({
  imports: [CommonModule, TiCollapseModule, TiButtonModule, DemoLogModule, RouterModule.forChild(CollapseTestModule.ROUTES)],
  declarations: [CollapseBasicComponent, CollapseEventComponent]
})
export class CollapseTestModule {
  static readonly LINKS: Array<object> = [{ href: 'directives/TiCollapseDirective.html', label: 'Collapse' }];
  static readonly ROUTES: Routes = [
    {
      path: 'collapse/collapse-basic',
      component: CollapseBasicComponent
    },
    {
      path: 'collapse/collapse-event',
      component: CollapseEventComponent
    }
  ];
}
