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
import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ChangeDetectionStrategy } from '@angular/core';
/**
 * @ignore
 */
@Component({
  selector: 'ti-progresspie',
  template: '<canvas #canvas></canvas>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiProgresspieComponent implements OnChanges, AfterViewInit {
  private defaultConfig: any = {
    value: 0,
    maxValue: 100,
    color: '#3dcca6',
    lineWidth: 2
  };
  @Input() value: number = this.defaultConfig.value;
  @Input() maxValue: number = this.defaultConfig.maxValue;
  private percent: number; // 计算后的百分比
  @ViewChild('canvas', { static: true }) private canvasEle: ElementRef; // canvas元素对应的ElementRef
  private canvasElement: any; // canvas元素对应的nativeElement
  nativeElement: Element; // 元素本身
  constructor(private hostEle: ElementRef) {
    this.nativeElement = this.hostEle.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // value和maxValue的动态修改均需要重绘进度呈现
    if ((changes.value && !changes.value.isFirstChange()) || (changes.maxValue && !changes.maxValue.isFirstChange())) {
      this.draw();
    }
  }
  ngAfterViewInit(): void {
    // 初始化走一次圆饼的绘制，在此处处理是因为canvas对象此处是通过ref方式获取canvas的最早时机
    this.canvasElement = this.canvasEle.nativeElement;
    // 修复SSR错误：ERROR ReferenceError: getComputedStyle is not defined
    if (typeof getComputedStyle === 'undefined') {
      return;
    }
    this.canvasElement.width = parseFloat(getComputedStyle(this.nativeElement).width);
    this.canvasElement.height = parseFloat(getComputedStyle(this.nativeElement).height);
    this.draw();
  }
  private draw(): void {
    this.calcPercent();
    this.drawProgressPie();
  }
  // 计算百分比，外部需要保证maxVlue和value均为数字类型
  private calcPercent(): void {
    // 计算percent值
    if (this.maxValue === 0) {
      this.percent = 0;

      return;
    }

    let percent: number = this.value / this.maxValue;
    if (isNaN(percent)) {
      this.percent = 0;

      return;
    }

    if (percent > 1) {
      percent = 1;
    }

    if (percent < 0) {
      percent = 0;
    }
    this.percent = percent;
  }

  private drawProgressPie(): void {
    const canvas: any = this.canvasElement;
    const ctx: any = canvas.getContext('2d');

    // 清除先前画布内容
    const width: number = canvas.width;
    const height: number = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 圆半径及起始点计算
    const d: number = Math.min(width, height);
    const cx: number = width / 2;
    const cy: number = height / 2;
    const lineWidth: number = this.defaultConfig.lineWidth;
    const r: number = d / 2 - lineWidth;
    const startPoint: number = -Math.PI / 2;
    // 笔触样式设置
    const color: string = this.defaultConfig.color;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    // 画外圆
    ctx.beginPath();
    ctx.arc(cx, cy, r, startPoint, startPoint + Math.PI * 2);
    ctx.stroke();

    // 画扇形
    const endPoint: number = startPoint + Math.PI * this.percent * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy); // 移动至圆心
    ctx.arc(cx, cy, r, startPoint, endPoint); // 从外边上的点画曲线
    ctx.lineTo(cx, cy); // 从圆心画直线到计算好的圆外上的点
    ctx.fill();
    if (this.percent === 0) {
      // 为0的情况下，绘制圆心值边缘竖线
      ctx.stroke();
    }
    ctx.closePath();
  }
}
