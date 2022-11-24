import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiIconModule, TiTipModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { TipBasicComponent } from './TipBasicComponent';
import { TipPositionComponent } from './TipPositionComponent';
import { TipContentTemplateComponent } from './TipContentTemplateComponent';
import { TipContentCompComponent, TipDemoComponent } from './TipContentCompComponent';
import { TipHasArrowComponent } from './TipHasArrowComponent';
import { TipMaxWidthComponent } from './TipMaxWidthComponent';
import { TipTriggerComponent } from './TipTriggerComponent';
import { TipServiceComponent } from './TipServiceComponent';
import { TipZindexComponent } from './TipZindexComponent';
import { TipPositionTestComponent } from './TipPositionTestComponent';
import { TipServiceDestroyComponent } from './TipServiceDestroyComponent';
import { TipValidPositionTestComponent } from './TipValidPositionTestComponent';
import { TipEmptyComponent } from './TipEmptyComponent';
import { TipLongTextPositionComponent } from './TipLongTextPositionComponent';

@NgModule({
  imports: [
    CommonModule,
    TiTipModule,
    TiButtonModule,
    TiIconModule,
    FormsModule,
    ReactiveFormsModule,
    DemoLogModule,
    RouterModule.forChild(TipTestModule.ROUTES)
  ],
  declarations: [
    TipBasicComponent,
    TipContentTemplateComponent,
    TipContentCompComponent,
    TipPositionComponent,
    TipHasArrowComponent,
    TipMaxWidthComponent,
    TipServiceComponent,
    TipServiceDestroyComponent,
    TipTriggerComponent,
    TipPositionTestComponent,
    TipValidPositionTestComponent,
    TipDemoComponent,
    TipEmptyComponent,
    TipLongTextPositionComponent,
    TipZindexComponent
  ],
  entryComponents: [TipDemoComponent]
})
export class TipTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'directives/TiTipDirective.html', label: 'Tip' },
    { href: 'injectables/TiTipService.html', label: 'TiTipService' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'tip/tip-basic',
      component: TipBasicComponent
    },
    {
      path: 'tip/tip-trigger',
      component: TipTriggerComponent
    },
    {
      path: 'tip/tip-content-template',
      component: TipContentTemplateComponent
    },
    {
      path: 'tip/tip-content-comp',
      component: TipContentCompComponent
    },
    {
      path: 'tip/tip-position',
      component: TipPositionComponent
    },
    {
      path: 'tip/tip-has-arrow',
      component: TipHasArrowComponent
    },
    {
      path: 'tip/tip-max-width',
      component: TipMaxWidthComponent
    },
    {
      path: 'tip/tip-service',
      component: TipServiceComponent
    },
    {
      path: 'tip/tip-zindex',
      component: TipZindexComponent
    },
    { path: 'tip/tip-service-destroy',
      component: TipServiceDestroyComponent
    },
    { path: 'tip/tip-position-test',
      component: TipPositionTestComponent
    },
    {
      path: 'tip/tip-valid-position-test',
      component: TipValidPositionTestComponent
    },
    {
      path: 'tip/tip-empty',
      component: TipEmptyComponent
    },
    {
      path: 'tip/tip-long-text-position',
      component: TipLongTextPositionComponent
    }
  ];
}
