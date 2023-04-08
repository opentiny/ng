import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiSkeletonModule } from '@opentiny/ng';

import { SkeletonPageComponent } from './SkeletonPageComponent';
import { SkeletonTitleComponent } from './SkeletonTitleComponent';
import { SkeletonTypeComponent } from './SkeletonTypeComponent';

@NgModule({
  imports: [CommonModule, TiSkeletonModule, RouterModule.forChild(SkeletonTestModule.ROUTES)],
  declarations: [SkeletonPageComponent, SkeletonTitleComponent, SkeletonTypeComponent]
})
export class SkeletonTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiSkeletonComponent.html', label: 'Skeleton' }];
  static readonly ROUTES: Routes = [
    {
      path: 'skeleton/skeleton-type',
      component: SkeletonPageComponent
    },
    {
      path: 'skeleton/skeleton-title',
      component: SkeletonTitleComponent
    },
    {
      path: 'skeleton/skeleton-page',
      component: SkeletonTypeComponent
    }
  ];
}
