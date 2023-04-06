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

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

import { TiBaseComponent } from '@opentiny/ng-base';
import { TiPopUpRef, TiPopupService } from '@opentiny/ng-popup';
import { Position } from '@opentiny/ng-utils';
import { TiLocale } from '@opentiny/ng-locale';
import { Subject, Subscription } from 'rxjs';
import { delay, throttleTime } from 'rxjs/operators';

import { TiToastComponent } from './TiToastComponent';

/**
 * 复制组件，用于复制文本
 *
 */
@Component({
  selector: 'ti-copy',
  templateUrl: './copy.html',
  styleUrls: ['./copy.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiCopyComponent extends TiBaseComponent {
  constructor(protected hostRef: ElementRef, private Renderer: Renderer2, private tiPopup: TiPopupService<any>) {
    super(hostRef, Renderer);
  }
  @Input() content: string;
  /**
   * 复制后的<strong>即时提示信息</strong>(小黑框)，
   *
   * 缺省值：复制成功/Copied successfully.（国际化），支持自定义
   */
  @Input() successTip: string;
  /**
   * 复制成功后的事件接口
   */
  @Output() readonly copy: EventEmitter<any> = new EventEmitter<any>();
  private clickObserve: Subject<string> = new Subject();
  private clickSub: Subscription;
  private hideToast: Subject<string> = new Subject();
  private hideToastSub: Subscription;
  private deleteToast: Subject<string> = new Subject();
  private deleteToastSub: Subscription;

  private toast: TiPopUpRef;
  private toastRef: any;
  private hostSpace: number = 4; // toast距copy图标的距离

  ngOnInit(): void {
    super.ngOnInit();
    // 创建点击事件的observe
    this.createClickObserve();
    // 创建hideToast的observe
    this.createHideToastObserve();
    // 创建deleteToast的observe
    this.createDeleteToastObserve();
  }
  /**
   * @ignore
   * 图标点击事件
   */
  public onClick(): void {
    if (!this.content) {
      return;
    }
    this.clickObserve.next(null);
  }
  private createClickObserve(): void {
    this.clickSub = this.clickObserve.pipe(throttleTime(2000)).subscribe((): void => {
      // 创建textarea
      const textarea: any = this.Renderer.createElement('textarea');
      this.Renderer.appendChild(document.body, textarea);
      this.Renderer.setStyle(textarea, 'postion', 'absolute');
      this.Renderer.setStyle(textarea, 'top', '-9999px');
      this.Renderer.setStyle(textarea, 'left', '-9999px');
      this.Renderer.setProperty(textarea, 'value', this.content);
      textarea.select();
      document.execCommand('Copy');
      this.Renderer.removeChild(document.body, textarea);
      this.copy.emit();
      // 复制成功后，显示即时提示信息
      this.showToast();
      // 显示后隐藏
      this.hideToast.next(null);
    });
  }
  private createHideToastObserve(): void {
    this.hideToastSub = this.hideToast.pipe(delay(1000)).subscribe(() => {
      this.Renderer.addClass(this.toastRef.location.nativeElement, 'fadeout');
      // 隐藏后删除
      this.deleteToast.next(null);
    });
  }
  private createDeleteToastObserve(): void {
    this.deleteToastSub = this.deleteToast.pipe(delay(300)).subscribe(() => {
      this.toast.hide();
    });
  }
  /**
   * 复制成功后，显示toast提示
   */
  private showToast(): void {
    this.toast = this.tiPopup.create(TiToastComponent);
    this.toastRef = this.toast.show({
      content: this.successTip || TiLocale.getLocaleWords().tiCopy.successTip,
      container: 'body'
    });
    Position.setPosition({
      hostEle: this.hostRef.nativeElement,
      targetEle: this.toastRef.location.nativeElement,
      hostSpace: this.hostSpace,
      fixMaxHeight: true,
      determinPositionFn: (layout: any): string => {
        if (layout.avilableLayout.right >= layout.targetLayout.width + this.hostSpace) {
          return 'right';
        } else {
          return 'left';
        }
      }
    });
    this.Renderer.addClass(this.toastRef.location.nativeElement, 'fadein');
  }
  ngOnDestroy(): void {
    if (this.toast) {
      this.toast.hide();
    }
    if (this.clickSub) {
      this.clickSub.unsubscribe();
    }
    if (this.hideToastSub) {
      this.hideToastSub.unsubscribe();
    }
    if (this.deleteToastSub) {
      this.deleteToastSub.unsubscribe();
    }
  }
}
