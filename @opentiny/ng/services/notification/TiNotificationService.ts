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
import { Overlay, GlobalPositionStrategy, NoopScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { TiNotificationModule } from './TiNotificationModule';
import { TiNotificationMapper } from './TiNotificationMapper';
import { TiNotificationContainerComponent } from './TiNotificationContainerComponent';
import { TiNoticeConfig, TiNotificationRef, TiNoticeData, TiNotificationType } from './TiNotificationInterface'

@Injectable({
  providedIn: TiNotificationModule
})

export class TiNotificationService {
  private _container: TiNotificationContainerComponent

  private static readonly _prefix: string = 'ti-notification-';

  private static _notificationFlag: number = 0;

  constructor(
    private _mapper: TiNotificationMapper,
    private _overlay: Overlay,
    private _injector: Injector
  ) { }

  private static createNoticeId(): string {
    return `${this._prefix}${this._notificationFlag++}`;
  }

  private createContainer(): TiNotificationContainerComponent {
    let container: TiNotificationContainerComponent = this._mapper.getItem();
    if (container) {
      return container;
    }

    const _overlayRef = this._overlay.create({
      hasBackdrop: false,
      disposeOnNavigation: false,
      scrollStrategy: new NoopScrollStrategy,
      positionStrategy: new GlobalPositionStrategy
    });
    const componentRef = _overlayRef.attach(new ComponentPortal(TiNotificationContainerComponent, null, this._injector));
    container = componentRef.instance;
    this._mapper.setItem(container);
    this._container = componentRef.instance;
    return container;
  }

  /**
   * 打开成功通知弹窗
   */
  success(content: string, config?: TiNoticeConfig): TiNotificationRef {
    return this.action({ type: 'success', content, config});
  }

  /**
   * 打开失败通知弹窗
   */
  error(content: string, config?: TiNoticeConfig): TiNotificationRef {
    return this.action({ type: 'error', content, config});
  }

  /**
   * 打开提示通知弹窗
   */
  prompt(content: string, config?: TiNoticeConfig): TiNotificationRef {
    return this.action({ type: 'prompt', content, config});
  }

  /**
   * 打开警告通知弹窗
   */
  warn(content: string, config?: TiNoticeConfig): TiNotificationRef {
    return this.action({ type: 'warn', content, config});
  }

  /**
   * 打开无图标通知弹窗
   */
  simple(content: string, config?: TiNoticeConfig): TiNotificationRef {
    return this.action({ type: 'simple', content, config});
  }

  /**
   * 打开通知弹窗方法，已对外提供五个包装方法，此方法暂时对用户隐藏
   * @ignore
   * @param type 通知弹窗类型
   * @param content 通知弹窗文案
   * @param config 通知弹窗配置
   * @returns 通知弹窗包装实例，包含一个可关闭对象
   */
  open(
    type: TiNotificationType,
    content: string,
    config?: TiNoticeConfig
  ): TiNotificationRef {
    return this.action({ type, content, config});
  }

  /**
   * 打开自定义内容通知弹窗
   * @param template 自定义模板
   * @param config 自定义配置
   * @returns 通知弹窗包装实例，包含一个可关闭对象
   */
  template(template: TemplateRef<any>, config?: TiNoticeConfig): TiNotificationRef {
    return this.action({ template, config});
  }

  private action(baseData: TiNoticeData): TiNotificationRef {
    this._container = this.createContainer();

    return this._container.create({
      ...baseData,
      ...{
        noticeId: TiNotificationService.createNoticeId()
      }
    });
  }
  /**
   * 关闭全部已打开的通知弹窗
   */
  closeAll(): void {
    this._container.closeAll();
  }
}