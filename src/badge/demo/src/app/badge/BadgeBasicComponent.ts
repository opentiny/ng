import { Component } from '@angular/core';

@Component({
  templateUrl: './badge-basic.html',
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
export class BadgeBasicComponent {
  value: string = '6+';
}
