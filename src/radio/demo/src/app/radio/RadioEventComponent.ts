import { Component } from '@angular/core';
import { TiRadioItem } from '@opentiny/ng';

@Component({
  templateUrl: './radio-event.html'
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

  radioList: Array<TiRadioItem> = [
    {
      id: '1',
      label: '中国',
      value: 'China'
    },
    {
      id: '2',
      label: '美国',
      value: 'America'
    },
    {
      id: '3',
      label: '英国',
      value: 'Britain'
    },
    {
      id: '4',
      label: '加拿大',
      value: 'Canada'
    }
  ];
  selected: string = 'China';

  onNgModelChange(model: any): void {
    this.myLogs = [...this.myLogs, `ngModelChange：${JSON.stringify(model)}`];
  }

  onNgModelChange1(model: any): void {
    this.myLogs = [...this.myLogs, `ngModelChange1：${JSON.stringify(model)}`];
  }
}
