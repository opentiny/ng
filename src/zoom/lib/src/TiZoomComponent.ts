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
import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { TiRenderer } from '@opentiny/ng-renderer';

/**
 * @ignore
 *
 * 10.0.3版本增加，暂时不对外开放
 *
 * 该指令可以实现图片放大镜功能，添加tiZoom后会创建放大区域选择器元素（div）和放大结果呈现元素（div）
 *
 * 通过设置放大结果的background-image、background-size和background-position来达到放大效果
 *
 * 10.1.0版本从指令调整为组件形式
 *
 */
@Component({
  // 非img元素，tiZoom指令无效
  selector: 'img[tiZoom]',
  template: '',
  styleUrls: ['./zoom.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiZoomComponent implements OnInit, OnDestroy {
  // 放大结果的边框宽度
  private static readonly ZOOM_VIEWER_BORDER_WIDTH: number = 1;

  // 选择遮罩的宽高，默认150px
  @Input() zoomSelectorLength: number = 150;

  // 放大展示的宽高，默认300px
  @Input() zoomViewerLength: number = 300;

  // 比例
  private ratio: number;

  // 宿主元素
  private hostEle: any;

  // 宿主元素的父元素
  private parentEle: any;

  // 宿主元素的图片路径
  private imgSrc: string = '';

  // 放大区域选择器
  private zoomSelectorEle: any;

  // 放大结果展示区域
  private zoomViewerEle: any;

  // 选择遮罩监听事件
  private selectorMouseMoveHandler: () => void;
  private selectorMouseLeaveHandler: () => void;

  constructor(hostRef: ElementRef, private renderer: Renderer2, private tiRenderer: TiRenderer) {
    this.hostEle = hostRef.nativeElement;
  }

  ngOnInit(): void {
    // 设置父元素
    this.setParentEle();
    // 设置放大比例
    this.ratio = this.zoomViewerLength / this.zoomSelectorLength;
  }

  /**
   * @ignore
   * 图片加载成功事件处理
   */
  @HostListener('load', ['$event']) public onHostLoad(event: any): void {
    this.imgSrc = event.target.src;
  }

  /**
   * @ignore
   * 鼠标进入宿主元素，创建放大效果相关元素
   */
  @HostListener('mouseenter', ['$event']) public onHostMouseEnter(event: any): void {
    this.createZoomSelector();
    this.createZoomViewer();
    this.reStyleResults(event);
  }

  /**
   * @ignore
   * 鼠标离开宿主元素，移除放大效果相关元素
   */
  @HostListener('mouseleave', ['$event']) public onHostMouseLeave(event: any): void {
    // 当鼠标离开宿主元素并且不是进入选择遮罩时，移除选择遮罩和放大结果
    if (event.relatedTarget !== this.zoomSelectorEle) {
      this.removeZoomEle();
    }
  }

  /**
   * 设置父元素
   */
  private setParentEle(): void {
    const parentEle: any = this.hostEle.parentElement;
    if (parentEle !== null && parentEle.clientWidth !== 0 && parentEle.clientHeight !== 0) {
      if (this.hostEle.offsetParent !== parentEle) {
        // 父元素必须能够定位
        this.renderer.setStyle(parentEle, 'position', 'relative');
      }
      this.parentEle = parentEle;
    } else {
      this.parentEle = document.body;
    }
  }

  /**
   * 创建选择遮罩，初始化样式，增加事件监听
   */
  private createZoomSelector(): void {
    this.zoomSelectorEle = this.renderer.createElement('div');

    // 添加样式，tinyplus3的productpreview需要根据分辨率修改元素尺寸
    this.renderer.addClass(this.zoomSelectorEle, 'ti3-img-zoom-selector');
    this.tiRenderer.setStyles(this.zoomSelectorEle, {
      width: this.zoomSelectorLength + 'px',
      height: this.zoomSelectorLength + 'px'
    });

    // 鼠标在选择遮罩上移动时的事件
    this.selectorMouseMoveHandler = this.renderer.listen(this.zoomSelectorEle, 'mousemove', (event: any): void => {
      this.reStyleResults(event);
    });
    // 鼠标离开选择遮罩的事件，销毁遮罩元素和放大结果呈现元素
    this.selectorMouseLeaveHandler = this.renderer.listen(this.zoomSelectorEle, 'mouseleave', (event: MouseEvent) => {
      this.renderer.removeChild(this.parentEle, this.zoomSelectorEle);
      this.renderer.removeChild(document.body, this.zoomViewerEle);
      this.zoomSelectorEle = undefined;
      this.zoomViewerEle = undefined;
    });

    this.renderer.appendChild(this.parentEle, this.zoomSelectorEle);
  }

  /**
   * 创建放大结果呈现元素，初始化样式
   */
  private createZoomViewer(): void {
    this.zoomViewerEle = this.renderer.createElement('div');
    const hostEleRect: DOMRect = this.hostEle.getBoundingClientRect();
    const parentEleRect: DOMRect = this.parentEle.getBoundingClientRect();

    // 放大结果元素相对于父元素进行定位
    // left = 父元素宽度 - 边框宽度 + 滚动距离
    let left: number = this.parentEle.offsetWidth - TiZoomComponent.ZOOM_VIEWER_BORDER_WIDTH + parentEleRect.left + window.pageXOffset;
    // top = 父元素到视口距离 + 滚动距离
    let top: number = parentEleRect.top + window.pageYOffset;
    // 当父元素为body时，调整为相对于宿主元素定位
    if (this.parentEle === document.body) {
      left = this.hostEle.offsetWidth - TiZoomComponent.ZOOM_VIEWER_BORDER_WIDTH + hostEleRect.left + window.pageXOffset;
      top = hostEleRect.top + window.pageYOffset;
    }

    // 添加样式，tinyplus3的productpreview需要根据分辨率修改元素尺寸
    this.renderer.addClass(this.zoomViewerEle, 'ti3-img-zoom-viewer');
    this.tiRenderer.setStyles(this.zoomViewerEle, {
      left: left + 'px',
      top: top + 'px',
      width: `${this.zoomViewerLength}px`,
      height: `${this.zoomViewerLength}px`,
      background: `url('${this.imgSrc}')`,
      'background-size': `${this.hostEle.width * this.ratio}px ${this.hostEle.height * this.ratio}px`
    });

    this.renderer.appendChild(document.body, this.zoomViewerEle);
  }

  // 计算鼠标相对宿主元素的位置
  private getCursorPos(mouseEvent: MouseEvent): any {
    const hostEleRect: DOMRect = this.hostEle.getBoundingClientRect();
    // 考虑滚动情况
    const left: number = mouseEvent.pageX - hostEleRect.left - window.pageXOffset;
    const top: number = mouseEvent.pageY - hostEleRect.top - window.pageYOffset;

    return { x: left, y: top };
  }

  /**
   * 计算选择遮罩偏移和放大区域
   */
  private reStyleResults(mouseEvent: MouseEvent): void {
    // 1. 获取计算鼠标相对于宿主元素左上角的位置
    const cursorPos: any = this.getCursorPos(mouseEvent);
    // 获取遮罩宽度
    const zoomSelectorWidth: number = this.zoomSelectorEle.offsetWidth;

    // 2. 计算放大结果的位置
    let viewerPosX: number = cursorPos.x - zoomSelectorWidth / 2;
    let viewerPosY: number = cursorPos.y - zoomSelectorWidth / 2;

    // 3. 调整
    // 3.1 选择遮罩移出宿主元素的右侧
    if (viewerPosX > this.hostEle.offsetWidth - zoomSelectorWidth) {
      viewerPosX = this.hostEle.offsetWidth - zoomSelectorWidth;
    }
    // 3.2 选择遮罩移出宿主元素的左侧
    if (viewerPosX < 0) {
      viewerPosX = 0;
    }
    // 3.3 选择遮罩移出宿主元素的下方
    if (viewerPosY > this.hostEle.offsetHeight - zoomSelectorWidth) {
      viewerPosY = this.hostEle.offsetHeight - zoomSelectorWidth;
    }
    // 3.4 选择遮罩移出宿主元素的上方
    if (viewerPosY < 0) {
      viewerPosY = 0;
    }

    // 4. 设置选择区域偏移，选择区域偏移=放大结果位置 + 宿主元素的偏移
    this.tiRenderer.setStyles(this.zoomSelectorEle, {
      left: `${viewerPosX + this.hostEle.offsetLeft}px`,
      top: `${viewerPosY + this.hostEle.offsetTop}px`
    });

    // 5. 设置放大结果
    this.renderer.setStyle(this.zoomViewerEle, 'background-position', `-${viewerPosX * this.ratio}px -${viewerPosY * this.ratio}px`);
  }

  ngOnDestroy(): void {
    this.removeZoomEle();
  }

  /**
   * 移除选择遮罩和放大结果元素、解绑相关事件
   */
  private removeZoomEle(): void {
    if (this.zoomSelectorEle !== undefined) {
      this.renderer.removeChild(this.parentEle, this.zoomSelectorEle);
      this.zoomSelectorEle = undefined;
    }
    if (this.zoomViewerEle !== undefined) {
      this.renderer.removeChild(document.body, this.zoomViewerEle);
      this.zoomViewerEle = undefined;
    }
    if (this.selectorMouseMoveHandler) {
      this.selectorMouseMoveHandler();
    }
    if (this.selectorMouseLeaveHandler) {
      this.selectorMouseLeaveHandler();
    }
  }
}
