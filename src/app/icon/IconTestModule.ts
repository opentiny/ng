import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiIconModule } from '@opentiny/ng';

import { IconBasicComponent } from './IconBasicComponent';
import { IconShowComponent } from './IconShowComponent';
import { IconSetpathComponent } from './IconSetpathComponent';


@NgModule({
  imports: [
    CommonModule,
    TiIconModule,
    RouterModule.forChild(IconTestModule.ROUTES),
  ],
  declarations: [IconBasicComponent, IconShowComponent, IconSetpathComponent],
})
export class IconTestModule {

  static readonly LINKS: Array<object> = [
    { href: 'components/TiIconComponent.html', label: 'Icon' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'icon/icon-basic',
      component: IconBasicComponent,
    },
    {
      path: 'icon/icon-show',
      component: IconShowComponent,
    },
    {
      path: 'icon/icon-setpath',
      component:IconSetpathComponent,
    }
  ];
}
