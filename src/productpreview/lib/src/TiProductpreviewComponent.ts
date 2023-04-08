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
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TiFilePreviewInfo, TiImagepreviewComponent } from '@opentiny/ng-imagepreview';
import { TiModalService } from '@opentiny/ng-modal';
import { TiBaseComponent } from '@opentiny/ng-base';

@Component({
  selector: 'ti-productpreview',
  templateUrl: './productpreview.html',
  styleUrls: ['./productpreview.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiProductpreviewComponent extends TiBaseComponent implements OnInit, OnChanges, AfterViewInit {
  /**
   * 每页显示的小图个数
   */
  private static readonly ITEM_PER_PAGE: number = 4;

  /**
   * 预览文件列表
   */
  @Input() files: Array<TiFilePreviewInfo> = [];

  /**
   * @ignore
   * 缩略图列表，翻页时重新设置
   */
  public thumbList: Array<TiFilePreviewInfo> = [];

  /**
   * @ignore 记录当前预览的商品索引
   */
  public currentPreviewIndex: number = -1;

  /**
   * @ignore 缩略图当前页
   */
  public currentThumbPage: number = 1;

  /**
   * @ignore 缩略图总页数
   *
   */
  public totalThumbPage: number = 1;

  /**
   * @ignore 内部变量
   */
  @ViewChild('productThumb') productThumbEle: ElementRef;

  constructor(private tiModal: TiModalService, private render: Renderer2, private hostEleRef: ElementRef) {
    super(hostEleRef, render);
  }

  ngAfterViewInit(): void {
    this.render.addClass(this.productThumbEle.nativeElement.children[0], 'ti-product-preview-thumb-item-active');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.files && changes.files.firstChange === false) {
      this.files = changes.files.currentValue;
      this.initThumb();
      if (this.productThumbEle) {
        this.setThumbList();
      }
      // 确保files接口变化时，第一个缩略图的选中样式生效
      setTimeout((): void => {
        if (this.productThumbEle) {
          this.render.addClass(this.productThumbEle.nativeElement.children[0], 'ti-product-preview-thumb-item-active');
        }
      }, 0);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initThumb();
  }

  /**
   * 初始化缩略图相关变量
   */
  private initThumb(): void {
    if (this.files && this.files.length > 0) {
      this.currentPreviewIndex = 0;
      // 计算总页数
      this.totalThumbPage = Math.ceil(this.files.length / TiProductpreviewComponent.ITEM_PER_PAGE);
      this.currentThumbPage = 1;
      if (this.files.length >= TiProductpreviewComponent.ITEM_PER_PAGE) {
        this.thumbList = this.files.slice(0, TiProductpreviewComponent.ITEM_PER_PAGE);
      } else {
        this.thumbList = this.files;
      }
    }
  }

  /**
   * @ignore 主图查看
   * @param event: 事件
   * @param index: 当前选中项在this.thumbList中的索引,this.thumbList中始终只有4项
   */
  onMouseenterThumb(event: any, index: number): void {
    this.currentPreviewIndex = (this.currentThumbPage - 1) * TiProductpreviewComponent.ITEM_PER_PAGE + index;
    // 计算最后一页的缩略图个数
    const thumbItemNumber: number = this.files.length % TiProductpreviewComponent.ITEM_PER_PAGE;
    // 如果是最后一页，且最后一页不满4个
    if (this.totalThumbPage > 1 && this.currentThumbPage === this.totalThumbPage && thumbItemNumber !== 0) {
      this.currentPreviewIndex -= TiProductpreviewComponent.ITEM_PER_PAGE - thumbItemNumber;
    }

    // 设置选中样式
    const thumbItemEles: any = this.productThumbEle.nativeElement.children;
    for (const item of thumbItemEles) {
      this.render.removeClass(item, 'ti-product-preview-thumb-item-active');
    }
    this.render.addClass(event.target.parentElement, 'ti-product-preview-thumb-item-active');
  }

  /**
   * @ignore 弹框中预览大图
   */
  onClickMain(event: any): void {
    this.tiModal.open(TiImagepreviewComponent, {
      id: this.id + '_productPreviewModal',
      modalClass: 'ti-product-preview-modal',
      context: {
        index: this.currentPreviewIndex, // 当前文件索引
        fileList: this.files, // 预览列表
        id: this.id // 传递id
      }
    });
  }

  /**
   * @ignore 缩略图上一页
   */
  prev(): void {
    if (this.currentThumbPage === 1) {
      return;
    }
    this.currentThumbPage--;
    this.setThumbList();
  }

  /**
   * @ignore 缩略图下一页
   */
  next(): void {
    if (this.currentThumbPage === this.totalThumbPage) {
      return;
    }
    this.currentThumbPage++;
    this.setThumbList();
  }

  /**
   * 设置缩略图列表
   */
  private setThumbList(): void {
    // undefined、null、false、string情况下，不处理
    if (!this.files || typeof this.files === 'string' || (this.files && this.files.slice === undefined)) {
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.thumbList = this.files.slice(
      (this.currentThumbPage - 1) * TiProductpreviewComponent.ITEM_PER_PAGE,
      this.currentThumbPage * TiProductpreviewComponent.ITEM_PER_PAGE
    );

    // 计算最后一页的缩略图个数
    const thumbItemNumber: number = this.files.length % TiProductpreviewComponent.ITEM_PER_PAGE;
    if (this.totalThumbPage > 1 && this.currentThumbPage === this.totalThumbPage && thumbItemNumber !== 0) {
      this.thumbList = this.files.slice(this.files.length - TiProductpreviewComponent.ITEM_PER_PAGE, this.files.length);
    }
  }
}
