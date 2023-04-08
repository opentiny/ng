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
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * TiCellIcons 表格单元格中放置图标的容器组件
 *
 * 配合TiCellText组件使用可使表格单元格中内容显示不下时，文本出省略号...,
 * 而文本后的放在TiCellIcons图标始终可以显示出来
 *
 */
@Component({
  selector: 'ti-cell-icons',
  templateUrl: './cell-icons.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-cell-icons-container]': 'true'
  }
})
export class TiCellIconsComponent {}
