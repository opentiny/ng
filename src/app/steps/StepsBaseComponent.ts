import { Component } from '@angular/core';

@Component({
  templateUrl: './steps-base.html',
})
export class StepsBaseComponent {
  steps: Array<any> = [
    {
      label: '购买专业服务',
    },
    {
      label: '服务受理',
    },
    {
      label: '查看进展',
    },
    {
      label: '验收完成',
    }
  ];
  activeStep: number = 1;
}
