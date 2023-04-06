import { Component } from '@angular/core';

@Component({
  templateUrl: './autocomplete-tip.html'
})
export class AutocompleteTipComponent {
  value: string = '';

  options: Array<object> = [
    {
      label: '华北（展示tip）',
      tip: '在自然地理上一般指秦岭—淮河线以北，长城以南的中国的广大区域。'
    },
    {
      label: '华南'
    },
    {
      label: '西北'
    },
    {
      label: '西南'
    }
  ];
}
