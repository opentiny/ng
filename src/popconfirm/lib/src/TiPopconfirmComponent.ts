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
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { TiLocale } from '@opentiny/ng-locale';
import { TiBaseComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';

@Component({
  selector: 'ti-popconfirm',
  templateUrl: 'popconfirm.html',
  styleUrls: ['./popconfirm.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-popconfirm-container]': 'true',
    '[tabindex]': '0'
  }
})
export class TiPopconfirmComponent extends TiBaseComponent implements OnInit, AfterViewInit {
  @Input() config: any;
  @Input() destroyPopover: (result?: boolean) => void;
  protected versionInfo: string = super.getVersion(packageInfo);
  private readonly tiPopconfirm: any = TiLocale.getLocaleWords().tiPopconfirm;

  ngOnInit(): void {
    this.config.yesText = this.config.yesText || this.tiPopconfirm.yesLabel;
    this.config.noText = this.config.noText || this.tiPopconfirm.noLabel;
  }

  ngAfterViewInit(): void {
    // 轻量级弹窗阴影定制
    this.renderer.addClass(this.nativeElement.offsetParent, 'ti3-popconfirm-tip'); // 在init中设置会影响button样式 TODO: IE下还存在背景闪烁问题
  }
}
