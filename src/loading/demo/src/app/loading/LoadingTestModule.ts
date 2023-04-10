import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiLoadingModule } from '@opentiny/ng';

import { LoadingBasicComponent } from './LoadingBasicComponent';
import { LoadingTypeComponent } from './LoadingTypeComponent';
import { LoadingSizeComponent } from './LoadingSizeComponent';
import { LoadingAreaComponent } from './LoadingAreaComponent';

@NgModule({
  imports: [TiLoadingModule, TiButtonModule, RouterModule.forChild(LoadingTestModule.ROUTES)],
  declarations: [LoadingTypeComponent, LoadingSizeComponent, LoadingBasicComponent, LoadingAreaComponent]
})
export class LoadingTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiLoadingComponent.html', label: 'Loading' }];
  static readonly ROUTES: Routes = [
    {
      path: 'loading/loading-basic',
      component: LoadingBasicComponent
    },
    {
      path: 'loading/loading-type',
      component: LoadingTypeComponent
    },
    {
      path: 'loading/loading-size',
      component: LoadingSizeComponent
    },
    {
      path: 'loading/loading-area',
      component: LoadingAreaComponent,
      data: { label: '区域加载' }
    }
  ];
}
