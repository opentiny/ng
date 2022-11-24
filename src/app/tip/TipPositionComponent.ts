import { Component } from '@angular/core';

@Component({
  templateUrl: './tip-position.html',
  styles: [
    `
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
      }
    `,
  ],
})
export class TipPositionComponent {
  tipStr: string = 'myTip';
}
