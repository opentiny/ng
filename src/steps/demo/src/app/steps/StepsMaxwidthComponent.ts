import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-maxwidth.html'
})
export class StepsMaxwidthComponent {
  steps: Array<TiStepItem> = [
    {
      label: '咨询购买专业服务，并支付'
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
