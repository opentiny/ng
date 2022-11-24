import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
  TiButtonModule,
  TiIconModule,
  TiOverflowModule,
  TiPaginationModule,
  TiTransferModule
} from '@opentiny/ng';

import { DemoLogModule } from '../demolog/DemoLogModule';
import { TransferBasicComponent } from './TransferBasicComponent';
import { TransferLazyComponent } from './TransferLazyComponent';
import { TransferSizeComponent } from './TransferSizeComponent';
import { TransferLabelkeyComponent } from './TransferLabelkeyComponent';
import { TransferNodatatextComponent } from './TransferNodatatextComponent';
import { TransferEventComponent } from './TransferEventComponent';
import { TransferTitlesComponent } from './TransferTitlesComponent';
import { TransferDisabledComponent } from './TransferDisabledComponent';
import { TransferLoadComponent } from './TransferLoadComponent';
import { TransferSearchableComponent } from './TransferSearchableComponent';
import { TransferSearchkeysComponent } from './TransferSearchkeysComponent';
import { TransferPlaceholderComponent } from './TransferPlaceholderComponent';
import { TransferIdkeyComponent } from './TransferIdkeyComponent';
import { TransferPaginationComponent } from './TransferPaginationComponent';
import { TransferIdComponent } from './TransferIdComponent';
import { TransferTableComponent } from './TransferTableComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiButtonModule,
    TiPaginationModule,
    TiIconModule,
    TiOverflowModule,
    TiTransferModule,
    DemoLogModule,
    RouterModule.forChild(TransferTestModule.ROUTES)
  ],
  declarations: [
    TransferBasicComponent,
    TransferLazyComponent,
    TransferSizeComponent,
    TransferLabelkeyComponent,
    TransferNodatatextComponent,
    TransferEventComponent,
    TransferTitlesComponent,
    TransferDisabledComponent,
    TransferLoadComponent,
    TransferSearchableComponent,
    TransferSearchkeysComponent,
    TransferPlaceholderComponent,
    TransferIdkeyComponent,
    TransferPaginationComponent,
    TransferIdComponent,
    TransferTableComponent
  ]
})
export class TransferTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiTransferComponent.html', label: 'Transfer' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'transfer/transfer-basic',
      component: TransferBasicComponent
    },
    {
      path: 'transfer/transfer-lazy',
      component: TransferLazyComponent
    },
    {
      path: 'transfer/transfer-size',
      component: TransferSizeComponent
    },
    {
      path: 'transfer/transfer-labelkey',
      component: TransferLabelkeyComponent
    },
    {
      path: 'transfer/transfer-nodatatext',
      component: TransferNodatatextComponent
    },
    {
      path: 'transfer/transfer-titles',
      component: TransferTitlesComponent
    },
    {
      path: 'transfer/transfer-event',
      component: TransferEventComponent
    },
    {
      path: 'transfer/transfer-disabled',
      component: TransferDisabledComponent
    },
    {
      path: 'transfer/transfer-load',
      component: TransferLoadComponent
    },
    {
      path: 'transfer/transfer-searchable',
      component: TransferSearchableComponent
    },
    {
      path: 'transfer/transfer-searchkeys',
      component: TransferSearchkeysComponent
    },
    {
      path: 'transfer/transfer-placeholder',
      component: TransferPlaceholderComponent
    },
    {
      path: 'transfer/transfer-idkey',
      component: TransferIdkeyComponent
    },
    {
      path: 'transfer/transfer-pagination',
      component: TransferPaginationComponent
    },
    {
      path: 'transfer/transfer-table',
      component: TransferTableComponent
    },
    { path: 'transfer/transfer-id',
      component: TransferIdComponent
    }
  ];
}
