import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-events.html'
})
export class StepsEventsComponent {
  myLogs: Array<string> = [];
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
  onActiveStepChange(activeStep: number): void {
    this.myLogs = [...this.myLogs, `activeStepChange() event => ${JSON.stringify(this.steps[activeStep])}`];
  }
}
