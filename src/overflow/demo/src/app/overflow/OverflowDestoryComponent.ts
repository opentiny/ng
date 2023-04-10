import { Component } from '@angular/core';

@Component({
  templateUrl: './overflow-destory.html',
  styles: [
    `
      .overflow-cls {
        max-width: 200px;
        line-height: 30px;
        background-color: yellow;
      }
    `
  ]
})
export class OverflowDestoryComponent {
  textContent: string = '明月几时有，把酒问青天。明月几时有，把酒问青天。明月几时有，把酒问青天。';
  show: boolean = true;
  clickFn() {
    setTimeout(() => {
      this.show = false;
    }, 2000);
  }
}
