import { Component } from '@angular/core';

@Component({
  templateUrl: './swiper-showcardnum.html',
  styleUrls: ['./swiper.less']
})

export class SwiperShowcardnumComponent {
  cards: Array<any> = [
    { text: 'card-0' },
    { text: 'card-1' },
    { text: 'card-2' },
    { text: 'card-3' },
    { text: 'card-4' },
    { text: 'card-5' },
    { text: 'card-6' },
    { text: 'card-7' }
  ];
}
