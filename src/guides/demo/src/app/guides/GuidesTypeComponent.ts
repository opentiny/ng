import { Component } from '@angular/core';

@Component({
  templateUrl: './guides-type.html'
})
export class GuidesTypeComponent {
  activeIndex: number = 2;
  steps: Array<any> = [
    {
      label: 'First step',
      content: 'The content of the first step',
      body: 'The body of the first step',
      type: 'error'
    },
    {
      label: 'Second step',
      content: 'The content of the second step',
      body: 'The body of the second step',
      type: 'info'
    },
    {
      label: 'Third step',
      content: 'The content of the third step',
      body: 'The body of the third step'
    },
    {
      label: 'Fourth step',
      content: 'The content of the fourth step',
      body: 'The body of the fourth step'
    }
  ];
}
