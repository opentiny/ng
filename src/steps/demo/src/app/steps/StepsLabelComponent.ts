import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-label.html'
})
export class StepsLabelComponent {
  steps: Array<TiStepItem> = [
    {
      label: '购买专业服务',
      english: 'Purchase'
    },
    {
      label: '服务受理',
      english: 'Processing'
    },
    {
      label: '查看进展',
      english: 'Progress'
    },
    {
      label: '验收完成',
      english: 'Acceptance'
    }
  ];
  activeStep: number = 1;
}
