import { Component } from '@angular/core';

@Component({
  templateUrl: './select-tworow.html',
})
export class SelectTworowComponent {
  options: Array<any> = [
    {
      primary: '子网1 (192.168.0.1/24)',
      secondary: '可用IP数278',
      disabled: true,
    },
    {
      primary: '子网2 (192.168.0.1/25)',
      secondary: '可用IP数312',
    },
    {
      primary: '子网3 (192.168.0.1/26)',
      secondary: '可用IP数225',
    },
    {
      primary: '子网4 (192.168.0.1/27)',
      secondary: '可用IP数300',
    },
  ];

  value: any;
}
