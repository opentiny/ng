import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TiButtonModule, TiProgressbarModule } from '@opentiny/ng';
import { ProgressbarBasicComponent } from './ProgressbarBasicComponent';
import { ProgressbarClassComponent } from './ProgressbarClassComponent';
import { ProgressbarAnimationComponent } from './ProgressbarAnimationComponent';

@NgModule({
  imports: [
    CommonModule,
    TiProgressbarModule,
    TiButtonModule,
    RouterModule.forChild(ProgressbarTestModule.ROUTES),
  ],
  declarations: [
    ProgressbarBasicComponent,
    ProgressbarClassComponent,
    ProgressbarAnimationComponent,
  ],
})
export class ProgressbarTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiProgressbarComponent.html', label: 'Progressbar' },
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'progressbar/progressbar-basic',
      component: ProgressbarBasicComponent,
      data: { label: '基本使用' },
    },
    {
      path: 'progressbar/progressbar-class',
      component: ProgressbarClassComponent,
      data: { label: '样式设置' },
    },
    {
      path: 'progressbar/progressbar-animation',
      component: ProgressbarAnimationComponent,
      data: { label: '动效' },
    }
  ];
}
