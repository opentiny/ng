import { Component } from '@angular/core';

@Component({
  templateUrl: './swiper-activeindex.html',
  styleUrls: ['./swiper.less']
})
export class SwiperActiveindexComponent {
  items = ['First', 'Second', 'Third', 'Fourth'];
  activeIndex: number = 2;
}
