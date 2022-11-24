import { Component } from '@angular/core';
@Component({
  templateUrl: './select-appendtobody.html',
})
export class SelectAppendtobodyComponent {
  options: Array<any> = [
    { label: '美国' },
    { label: '巴西' },
    { label: '加拿大' },
    { label: '中国' },
    { label: '法国' },
  ];
  value: any;
}
