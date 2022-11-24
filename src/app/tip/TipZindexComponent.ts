import { Component } from '@angular/core';

@Component({
  templateUrl: './tip-zindex.html',
  styles: [
    `
      .zIndex {
        z-index: 1000;
      }
    `,
  ],
})
export class TipZindexComponent {
  tipStr: string = 'this is my tip dfa';
}
