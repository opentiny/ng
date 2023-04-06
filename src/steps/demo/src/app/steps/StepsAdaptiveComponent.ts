import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-adaptive.html'
})
export class StepsAdaptiveComponent {
  steps: Array<TiStepItem> = [
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
      label: '验收完成'
    }
  ];
  activeStep: number = 1;
}
