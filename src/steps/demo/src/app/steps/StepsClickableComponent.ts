import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-clickable.html'
})
export class StepsClickableComponent {
  steps: Array<TiStepItem> = [
    {
      label: '购买专业服务'
    },
    {
      label: '服务受理'
    },
    {
      label: '查看进展',
      error: true
    },
    {
      label: '验收完成(禁用)',
      disabled: true
    }
  ];

  activeStep: number = 1;
}
