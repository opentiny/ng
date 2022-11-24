import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  TiButtonModule,
  TiCardModule,
  TiCheckboxModule,
  TiModalModule,
  TiSwiperModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { SwiperBasicComponent } from './SwiperBasicComponent';
import { SwiperShowcardnumComponent } from './SwiperShowcardnumComponent';
import { SwiperActiveindexComponent } from './SwiperActiveindexComponent';
import { SwiperEventsComponent } from './SwiperEventsComponent';
import { SwiperAutoplayComponent } from './SwiperAutoplayComponent';
import { SwiperLoopComponent } from './SwiperLoopComponent';
import { SwiperIndicatorpositionComponent } from './SwiperIndicatorpositionComponent';
import { SwiperShowcardnumTestComponent } from './SwiperShowcardnumTestComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiSwiperModule,
    TiButtonModule,
    TiModalModule,
    TiCardModule,
    TiCheckboxModule,
    DemoLogModule,
    RouterModule.forChild(SwiperTestModule.ROUTES)
  ],
  declarations: [
    SwiperBasicComponent,
    SwiperShowcardnumComponent,
    SwiperActiveindexComponent,
    SwiperEventsComponent,
    SwiperAutoplayComponent,
    SwiperLoopComponent,
    SwiperIndicatorpositionComponent,
    SwiperShowcardnumTestComponent
  ]
})
export class SwiperTestModule {
  public static readonly ROUTES: Routes = [
    {
      path: 'swiper/swiper-basic',
      component: SwiperBasicComponent
    },
    {
      path: 'swiper/swiper-showcardnum',
      component: SwiperShowcardnumComponent
    },
    {
      path: 'swiper/swiper-activeindex',
      component: SwiperActiveindexComponent
    },
    {
      path: 'swiper/swiper-events',
      component: SwiperEventsComponent
    },
    {
      path: 'swiper/swiper-autoplay',
      component: SwiperAutoplayComponent
    },
    {
      path: 'swiper/swiper-loop',
      component: SwiperLoopComponent
    },
    {
      path: 'swiper/swiper-showcardnum-test',
      component: SwiperShowcardnumTestComponent
    },
    {
      path: 'swiper/swiper-indicatorposition',
      component: SwiperIndicatorpositionComponent
    }
  ];
}
