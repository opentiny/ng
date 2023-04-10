import { Component } from '@angular/core';

@Component({
  templateUrl: './swiper-showcardnum-test.html'
})
export class SwiperShowcardnumTestComponent {
  public newCards: Array<any> = [{ text: 'card-0' }, { text: 'card-1' }, { text: 'card-2' }, { text: 'card-3' }];
  public newCards1: Array<any> = [
    { text: 'card-0' },
    { text: 'card-1' },
    { text: 'card-2' },
    { text: 'card-3' },
    { text: 'card-4' },
    { text: 'card-5' },
    { text: 'card-6' },
    { text: 'card-7' },
    { text: 'card-8' }
  ];

  // 当前激活卡片索引
  public currentIndex: number = 1;
  public currentIndex1: number = 2;

  // 激活卡片
  public activeCard(index: number): void {
    this.currentIndex = index;
  }

  public activeCard1(index: number): void {
    this.currentIndex1 = index;
  }
}
