import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiIconactionModule, TiSvgComponent, TiIconModule } from '@opentiny/ng';
import { IconactionBasicComponent } from './IconactionBasicComponent';
import { IconactionDarkComponent } from './IconactionDarkComponent';
import { IconactionDisabledComponent } from './IconactionDisabledComponent';
import { IconactionHrefComponent } from './IconactionHrefComponent';

@NgModule({
  imports: [CommonModule, TiIconModule, TiIconactionModule, RouterModule.forChild(IconactionTestModule.ROUTES)],
  declarations: [IconactionBasicComponent, IconactionDarkComponent, IconactionDisabledComponent, IconactionHrefComponent]
})
export class IconactionTestModule {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  constructor() {
    TiSvgComponent.setPath(`${this.baseUrl}assets/ionicons/`);
  }
  static readonly ROUTES: Routes = [
    {
      path: 'iconaction/iconaction-basic',
      component: IconactionBasicComponent
    },
    {
      path: 'iconaction/iconaction-dark',
      component: IconactionDarkComponent
    },
    {
      path: 'iconaction/iconaction-disabled',
      component: IconactionDisabledComponent
    },
    {
      path: 'iconaction/iconaction-href',
      component: IconactionHrefComponent
    }
  ];
}
