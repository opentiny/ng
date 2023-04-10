import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiZoomModule } from '@opentiny/ng';

import { ZoomBasicComponent } from './ZoomBasicComponent';
import { ZoomChangeSrcComponent } from './ZoomChangeSrcComponent';
import { ZoomTestComponent } from './ZoomTestComponent';
import { ZoomRatioComponent } from './ZoomRatioComponent';

@NgModule({
  imports: [CommonModule, TiZoomModule, RouterModule.forChild(ZoomTestModule.ROUTES)],
  declarations: [ZoomBasicComponent, ZoomChangeSrcComponent, ZoomTestComponent, ZoomRatioComponent]
})
export class ZoomTestModule {
  static readonly LINKS: Array<object> = [{ href: 'directives/TiZoomDirective.html', label: 'Zoom' }];
  static readonly ROUTES: Routes = [
    {
      path: 'zoom/zoom-basic',
      component: ZoomBasicComponent
    },
    {
      path: 'zoom/zoom-ratio',
      component: ZoomRatioComponent
    },
    { path: 'zoom/zoom-change-src', component: ZoomChangeSrcComponent }, // 自测用例，改变src属性
    { path: 'zoom/zoom-test', component: ZoomTestComponent } // 自测用例
  ];
}
