import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Util } from '@opentiny/ng';
@Component({
  templateUrl: './select-tiscroll.html',
  styles: ['p {margin-bottom: 10px;}']
})
export class SelectTiscrollComponent {
  @ViewChild('container') private containerRef: ElementRef;
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: 'America'
    },
    {
      label: '巴西',
      englishname: 'Brazil'
    },
    {
      label: '加拿大',
      englishname: 'Canada'
    },
    {
      label: '中国',
      englishname: 'China'
    },
    {
      label: '法国',
      englishname: 'France'
    },
    {
      label: '德国',
      englishname: 'Germany'
    },
    {
      label: '日本',
      englishname: 'Japan'
    },
    {
      label: '韩国',
      englishname: 'South Korea'
    },
    {
      label: '土耳其',
      englishname: 'Turkey'
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom'
    }
  ];
  mySelected: any;
  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    // 监听容器滚动事件，触发tiScroll收起下拉
    this.renderer2.listen(this.containerRef.nativeElement, 'scroll', () => {
      // tiScroll 是自定义的事件，可以触发面板收起
      Util.trigger(document, 'tiScroll');
    });
  }
}
