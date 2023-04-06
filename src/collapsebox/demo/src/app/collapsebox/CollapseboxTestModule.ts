import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiCollapseboxModule, TiButtonModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { CollapseboxBasicComponent } from './CollapseboxBasicComponent';
import { CollapseboxCloseableComponent } from './CollapseboxCloseableComponent';
import { CollapseboxEventComponent } from './CollapseboxEventComponent';

@NgModule({
  imports: [CommonModule, TiCollapseboxModule, TiButtonModule, DemoLogModule, RouterModule.forChild(CollapseboxTestModule.ROUTES)],
  declarations: [CollapseboxBasicComponent, CollapseboxCloseableComponent, CollapseboxEventComponent]
})
export class CollapseboxTestModule {
  static readonly LINKS: Array<object> = [{ label: 'Collapsebox' }];
  public static readonly ROUTES: Routes = [
    {
      path: 'collapsebox/collapsebox-basic',
      component: CollapseboxBasicComponent
    },
    {
      path: 'collapsebox/collapsebox-closeable',
      component: CollapseboxCloseableComponent
    },
    {
      path: 'collapsebox/collapsebox-event',
      component: CollapseboxEventComponent
    }
  ];
}
