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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseComponent';
/**
 * 头像展示组件
 *
 */
@Component({
  selector: 'ti-avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.less'],
  host: {
      '[class.ti3-avt-shape-square]': 'shape ==="square"',
      '[class.ti3-avt-xs]': 'size === "xs"',
      '[class.ti3-avt-small]': 'size === "small"',
      '[class.ti3-avt-large]': 'size === "large"',
      '[class.ti3-avt-xl]': 'size === "xl"',
      '[style.width]': 'size',
      '[style.height]': 'size',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TiAvatarComponent extends TiBaseComponent {
  /**
   * 头像形状
   *
   */
  @Input() shape: 'circle' | 'square' = 'circle';
  /**
   * 头像尺寸(Chrome浏览器中限制最小的字体为12px,故默认头像中的icon最小为12px)
   *
   */
  @Input() size: "xs" | "small" | "middle" | "large" | "xl" | string = 'middle';
  /**
   * 图片类头像地址
   *
   */
  @Input() imgSrc: string;
  /**
   * 图片类头像加载不成功时显示的文字
   *
   */
  @Input() imgAlt: string;
  /**
   * 文本类头像
   *
   */
  @Input() text: string;
  /**
   * @ignore
   *
   */
  @ViewChild('textRef', {static:false}) textRef: ElementRef;
  /**
   * @ignore
   * 头像中图标或文字的尺寸
   */
  public fontSize: string;
  /**
   * @ignore
   * 文本缩放的尺寸
   */
  public txtScale: number;

  constructor(protected elementRef: ElementRef,
              protected renderer2: Renderer2,
              private cdRef: ChangeDetectorRef){
    super(elementRef, renderer2);
  }
  /**
   * @ignore
   * error: This event is not cancelable and does not bubble.
   * event.defaultPrevented indicat whether the call to Event.preventDefault() canceled the event.
   * @param $event
   */
  imgError($event: Event): void {
    if(!$event.defaultPrevented){
      this.imgSrc = "";
    }
  }

  /**
   * @ignore
   * 获取scale及其参数这个字符串
   * @param str
   * @returns
   */
  getScale(str):string{
      return `scale(${str})`
    }
  /**
   * @ignore
   *
   */
  ngAfterViewInit(): void {
    // 根据用户输入的文本的width来确认文本尺寸缩放的比例
    if(this.text) {
      const textWidth: number = this.textRef.nativeElement.offsetWidth;
      const textHeight: number = this.textRef.nativeElement.offsetHeight;
      this.txtScale = Math.min(this.nativeElement.offsetWidth/ textWidth, this.nativeElement.offsetHeight/ textHeight, 1);
    }
    //当size的输入为用户自定义字符串时，捕获头像的宽度，计算对应的字体的大小
    this.fontSize = this.nativeElement.offsetWidth / 3 + 'px';
    this.cdRef.detectChanges();
  }
}
