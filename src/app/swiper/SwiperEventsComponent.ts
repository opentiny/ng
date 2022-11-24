import { Component } from '@angular/core';

@Component({
  templateUrl: './swiper-events.html',
  styleUrls: ['./swiper.less']
})

export class SwiperEventsComponent {
  activeIndex: number = 1;
  myLogs: Array<string> = [];
  items: Array<string> = ['First', 'Second', 'Third', 'Fourth'];
  activeIndexChange = (currentPage: number): void => {
    this.myLogs = [...this.myLogs, `activeIndex: ${currentPage}`];
  }
}
