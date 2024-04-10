import { Component } from '@angular/core';

@Component({
  templateUrl: './badge-show.html',
  styles: [
    `
      .badge-square {
        display: inline-block;
        width: 28px;
        height: 28px;
        border-radius: 2px;
        background-color: #eef0f5;
      }
    `
  ]
})
export class BadgeShowComponent {
  value: string = '8+';
  isShow: boolean = true;
  showBadge(): void {
    this.isShow = !this.isShow;
  }
}
