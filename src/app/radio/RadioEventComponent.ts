import { Component } from '@angular/core';

@Component({
  templateUrl: './radio-event.html',
})
export class RadioEventComponent {
  myLogs: Array<any> = [];

  season: string = '';
  seasons: Array<any> = [
    {
      value: 'spring',
      label: '春天'
    },
    {
      value: 'summer',
      label: '夏天'
    },
    {
      value: 'autumn',
      label: '秋天'
    },
    {
      value: 'winter',
      label: '冬天'
    }
  ];

  ngModelChange($event: any): void {
    this.myLogs = [...this.myLogs, `ngModelChange：${JSON.stringify($event)}`];
  }
}
