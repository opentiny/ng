import { Component } from '@angular/core';

@Component({
  templateUrl: './overflow-directive.html',
  styles: [
    `
      .container {
        border: 1px solid #000;
        width: 70px;
        height: 60px;
      }
      .overflow-cls {
        max-width: 100px;
        padding: 10px;
        background-color: yellow;
      }
    `
  ]
})
export class OverflowDirectiveComponent {}
