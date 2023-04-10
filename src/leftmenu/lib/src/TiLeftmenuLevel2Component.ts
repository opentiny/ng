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
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { TiLeftmenuComponent, TiLeftmenuItem } from './TiLeftmenuComponent';
import { TiLeftmenuLevel1Component } from './TiLeftmenuLevel1Component';
import { TiBaseComponent } from '@opentiny/ng-base';
import { DOCUMENT } from '@angular/common';
import packageInfo from '../package.json';
/**
 * TiLeftmenuLevel2Component 是二级菜单组件，嵌在 TiLeftmenuLevel1 中使用
 */
@Component({
  selector: 'ti-leftmenu-level2',
  templateUrl: './leftmenu-level2.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-leftmenu-level2-disabled]': 'disabled',
    '[class.ti3-leftmenu-level2]': 'true',
    '[class.ti3-leftmenu-level2-active]': 'this.item === this.leftmenu.active',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[id]': 'appendId("leftmenu_level2")',
    '(click)': 'selectFn()',
    '(keyup.enter)': 'selectFn()'
  }
})
export class TiLeftmenuLevel2Component extends TiBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * 设置当前菜单项的内容信息
   */
  @Input() item: TiLeftmenuItem;
  /**
   * 是否禁用
   */
  @Input() disabled: boolean = false;
  /**
   * @ignore
   */
  public leftmenu: TiLeftmenuComponent;
  public level2Ele: any;
  public renderer: any;
  protected versionInfo: string = super.getVersion(packageInfo);
  private oldHref: string;
  private documentVisibilitychangeListener: () => void;

  constructor(
    elementRef: ElementRef,
    renderer2: Renderer2,
    leftmenu: TiLeftmenuComponent,
    private level1: TiLeftmenuLevel1Component,
    private zone: NgZone,
    @Inject(DOCUMENT) private document,
    private changeRef: ChangeDetectorRef
  ) {
    super(elementRef, renderer2);
    this.leftmenu = leftmenu;
    this.level2Ele = elementRef;
    this.renderer = renderer2;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.level1.children.push(this);
    this.oldHref = this.item?.href;
  }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      let outlineColor: string;
      const transparentColor: string = 'rgba(0, 0, 0, 0)'; // 透明色,跟transparent色值一致
      this.renderer.listen(this.level2Ele.nativeElement, 'mousedown', (): void => {
        // 当点击的时候，不需要有outline。
        this.renderer.setStyle(this.level2Ele.nativeElement, 'outlineColor', 'transparent');
      });
      this.renderer.listen(this.level2Ele.nativeElement, 'blur', (): void => {
        // blur时仅能读取到outlineColor，作为窗口切换前的状态标志。
        outlineColor = getComputedStyle(this.level2Ele.nativeElement).outlineColor;
        // 恢复outline原生状态
        this.renderer.setStyle(this.level2Ele.nativeElement, 'outline', '');
      });
      this.documentVisibilitychangeListener = this.renderer.listen(this.document, 'visibilitychange', (): void => {
        if (
          this.document.visibilityState === 'visible' &&
          outlineColor === transparentColor &&
          this.document.activeElement === this.level2Ele.nativeElement
        ) {
          this.renderer.setStyle(this.level2Ele.nativeElement, 'outlineColor', 'transparent');
        }
      });
    });
  }

  ngDoCheck(): void {
    if (this.item?.href !== this.oldHref) {
      this.oldHref = this.item?.href;
      this.changeRef.detectChanges();
    }
  }
  /**
   * @ignore
   * 模板中使用，点击二级菜单项时调用
   */
  public selectFn(): void {
    if (this.disabled) {
      return;
    }
    if (this.item.href) {
      this.level1.openHref(this.item.href);
      this.level2Ele.nativeElement.blur(); // 为了没有outline。

      return;
    }

    if (this.leftmenu.routable) {
      // 点击当前已经激活的item时，刷新对应路由
      if (this.leftmenu.active === this.item) {
        this.leftmenu.triggerReload(this.item);
      } else {
        // 点击其他项需要进行跳转，来触发路由守卫，实际是否跳转取决于路由守卫返回值。
        this.leftmenu.navigate(this.item);
      }
    } else {
      if (this.leftmenu.active !== this.item) {
        this.leftmenu.active = this.item;
        this.leftmenu.activeChange.emit(this.item);
      }
    }
  }

  ngOnDestroy(): void {
    const index: number = this.level1.children.indexOf(this);
    if (index !== -1) {
      this.level1.children.splice(index, 1);
    }
    if (this.documentVisibilitychangeListener) {
      this.documentVisibilitychangeListener();
    }
  }
}
