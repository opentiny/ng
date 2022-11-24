import { Component } from '@angular/core';

@Component({
  templateUrl: './steps-events.html',
})
export class StepsEventsComponent {
  myLogs: Array<string> = [];
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
  onActiveStepChange(activeStep: any): void {
    this.myLogs = [...this.myLogs, `activeStepChange() event => ${JSON.stringify(this.steps[activeStep])}`];
  }
}
