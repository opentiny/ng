/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TiNotificationContainerComponent } from './TiNotificationContainerComponent';
import { TiNotificationComponent } from './TiNotificationComponent';

import { TiAlertModule } from '../../components/alert/TiAlertModule';
import { TiIconModule } from '../../components/icon/TiIconModule'

@NgModule({
  imports: [OverlayModule, CommonModule, TiAlertModule, TiIconModule],
  declarations: [TiNotificationComponent, TiNotificationContainerComponent]
})
export class TiNotificationModule {}