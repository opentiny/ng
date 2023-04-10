import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiGuidesModule } from '@opentiny/ng-guides';
import { TiTabModule } from '@opentiny/ng-tab';
import { GuidesBasicComponent } from './GuidesBasicComponent';
import { GuidesTabComponent } from './GuidesTabComponent';
import { GuidesGuidestepsComponent } from './GuidesGuidestepsComponent';
import { GuidesTypeComponent } from './GuidesTypeComponent';

@NgModule({
  imports: [CommonModule, TiGuidesModule, TiTabModule, RouterModule.forChild(GuidesTestModule.ROUTES)],
  declarations: [GuidesBasicComponent, GuidesTabComponent, GuidesGuidestepsComponent, GuidesTypeComponent]
})
export class GuidesTestModule {
  static readonly ROUTES: Routes = [
    {
      path: 'guides/guides-basic',
      component: GuidesBasicComponent,
      data: { label: '基础' }
    },
    {
      path: 'guides/guides-tab',
      component: GuidesTabComponent,
      data: { label: '与组件结合使用' }
    },
    {
      path: 'guides/guides-guidesteps',
      component: GuidesGuidestepsComponent,
      data: { label: '与组件结合使用' }
    },
    {
      path: 'guides/guides-type',
      component: GuidesTypeComponent,
      data: { label: '错误失败状态' }
    }
  ];
}
