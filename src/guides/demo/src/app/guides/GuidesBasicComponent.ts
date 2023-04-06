import { Component } from '@angular/core';

@Component({
  templateUrl: './guides-basic.html'
})
export class GuidesBasicComponent {
  items: Array<any> = [
    {
      label: 'First step',
      content: 'The content of the first step'
    },
    {
      label: 'Second step',
      content: 'The content of the second step'
    }
  ];
}
