import { Component } from '@angular/core';

@Component({
  templateUrl: './select-idkey.html',
})
export class SelectIdkeyComponent {
  options: Array<any> = [
    { value: 0, label: 'America' },
    { value: 1, label: 'Brazil' },
    { value: 2, label: 'Canada' },
    { value: 3, label: 'China' },
    { value: 30, label: 'China' },
    { value: 4, label: 'France' },
    { value: 5, label: 'Germany' },
    { value: 6, label: 'Japan' },
    { value: 7, label: 'South Korea' },
    { value: 8, label: 'Turkey' },
    { value: 9, label: 'United Kingdom' },
  ];

  value: any;
}
