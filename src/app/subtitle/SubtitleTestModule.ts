import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiSubtitleModule } from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { SubtitleBasicComponent } from './SubtitleBasicComponent';
import { SubtitleDarkComponent } from './SubtitleDarkComponent';
import { SubtitleEventComponent } from './SubtitleEventComponent';
import { SubtitleRouteComponent } from './SubtitleRouteComponent';
import { SubtitleScrollLoadComponent } from './SubtitleScrollLoadComponent';
import { SubtitleItemsComponent } from './SubtitleItemsComponent';
import { SubtitleIdkeyComponent } from './SubtitleIdkeyComponent';
import { SubtitleTargetComponent } from './SubtitleTargetComponent';
import { SubtitleMaxwidthComponent } from './SubtitleMaxwidthComponent';
import { SubtitlePanelwidthComponent } from './SubtitlePanelwidthComponent';
import { SubtitleSearchableComponent } from './SubtitleSearchableComponent';
import { SubtitleTipPositionComponent } from './SubtitleTipPositionComponent';
import { SubtitleBeforeSearchComponent } from './SubtitleBeforeSearchComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiSubtitleModule,
    DemoLogModule,
    RouterModule.forChild(SubtitleTestModule.ROUTES)
  ],
  declarations: [
    SubtitleBasicComponent,
    SubtitleDarkComponent,
    SubtitleEventComponent,
    SubtitleRouteComponent,
    SubtitleScrollLoadComponent,
    SubtitleItemsComponent,
    SubtitleIdkeyComponent,
    SubtitleTargetComponent,
    SubtitleMaxwidthComponent,
    SubtitlePanelwidthComponent,
    SubtitleSearchableComponent,
    SubtitleTipPositionComponent,
    SubtitleBeforeSearchComponent
  ]
})
export class SubtitleTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiSubtitleComponent.html', label: 'Subtitle' }
  ];
  public static readonly ROUTES: Routes = [
    { path: 'subtitle/subtitle-basic',
      component: SubtitleBasicComponent
    },
    { path: 'subtitle/subtitle-event',
      component: SubtitleEventComponent
    },
    {
      path: 'subtitle/subtitle-dark',
      component: SubtitleDarkComponent
    },
    {
      path: 'subtitle/subtitle-idkey',
      component: SubtitleIdkeyComponent
    },
    {
      path: 'subtitle/subtitle-route',
      component: SubtitleRouteComponent
    },
    {
      path: 'subtitle/subtitle-scroll-load',
      component: SubtitleScrollLoadComponent
    },
    { path: 'subtitle/subtitle-target',
      component: SubtitleTargetComponent
    },
    { path: 'subtitle/subtitle-items',
      component: SubtitleItemsComponent
    },
    {
      path: 'subtitle/subtitle-maxwidth',
      component: SubtitleMaxwidthComponent
    },
    {
      path: 'subtitle/subtitle-panelwidth',
      component: SubtitlePanelwidthComponent
    },
    {
      path: 'subtitle/subtitle-searchable',
      component: SubtitleSearchableComponent
    },
    {
      path: 'subtitle/subtitle-tip-position',
      component: SubtitleTipPositionComponent
    },
    {
      path: 'subtitle/subtitle-before-search',
      component: SubtitleBeforeSearchComponent
    }
  ];
}
