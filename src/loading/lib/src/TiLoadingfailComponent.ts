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
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiLocale } from '@opentiny/ng-locale';
import packageInfo from '../package.json';
/**
 * @ignore
 *
 * 加载失败，可以重新加载
 *
 *
 */
@Component({
  selector: 'ti-loadingfail',
  templateUrl: './loadingfail.html',
  styleUrls: ['./loadingfail.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiLoadingfailComponent extends TiBaseComponent {
  @Output() readonly reload: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @ignore
   */
  protected versionInfo: string = super.getVersion(packageInfo);
  public tiLoadingWords: any = TiLocale.getLocaleWords().tiLoading;

  /**
   * @ignore
   *
   * 重新加载的回调事件
   */
  onReload(event: MouseEvent): void {
    this.reload.emit(event);
  }
}
