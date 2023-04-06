import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';

import { TiCollapsetextModule } from '@opentiny/ng';
import { CollapsetextBasicComponent } from './CollapsetextBasicComponent';
import { CollapsetextTypeComponent } from './CollapsetextTypeComponent';
import { CollapsetextHighlightComponent } from './CollapsetextHighlightComponent';
import { CollapsetextCollapsedComponent } from './CollapsetextCollapsedComponent';
import { CollapsetextSceneComponent } from './CollapsetextSceneComponent';

@NgModule({
  imports: [CommonModule, TiCollapsetextModule, DemoLogModule, RouterModule.forChild(CollapsetextTestModule.ROUTES)],
  declarations: [
    CollapsetextBasicComponent,
    CollapsetextTypeComponent,
    CollapsetextHighlightComponent,
    CollapsetextCollapsedComponent,
    CollapsetextSceneComponent
  ]
})
export class CollapsetextTestModule {
  static readonly ROUTES: Routes = [
    { path: 'collapsetext/collapsetext-basic', component: CollapsetextBasicComponent },
    { path: 'collapsetext/collapsetext-type', component: CollapsetextTypeComponent },
    { path: 'collapsetext/collapsetext-highlight', component: CollapsetextHighlightComponent },
    { path: 'collapsetext/collapsetext-collapsed', component: CollapsetextCollapsedComponent },
    { path: 'collapsetext/collapsetext-scene', component: CollapsetextSceneComponent }
  ];
}
