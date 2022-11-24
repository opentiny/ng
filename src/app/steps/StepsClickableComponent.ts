import { Component } from '@angular/core';

@Component({
  templateUrl: './steps-clickable.html',
})
export class StepsClickableComponent {
  steps: Array<any> = [
    {
      label: '购买专业服务'
    },
    {
      label: '服务受理'
    },
    {
      label: '查看进展'
    },
    {
      label: '验收完成(禁用)',
      disabled: true
    }
  ];

  activeStep: number = 1;
}
