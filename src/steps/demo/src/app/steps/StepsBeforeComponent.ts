import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-before.html'
})
export class StepsBeforeComponent {
  myLogs: Array<string> = [];
  steps: Array<TiStepItem> = [
    {
      label: '购买专业服务'
    },
    {
      label: '服务受理'
    },
    {
      label: '查看进展(必选项)',
      require: true
    },
    {
      label: '验收完成'
    }
  ];
  activeStep: number = 1;
  beforeStep(step: TiStepItem): void {
    let requireIndex: number;
    const index: number = this.steps.indexOf(step);
    for (let i: number = 0; i < this.steps.length; i++) {
      if (this.steps[i].require) {
        requireIndex = i;
      }
    }

    if (index < requireIndex) {
      this.activeStep = index;
    } else {
      this.myLogs = [...this.myLogs, '有必选项未完成，点击项不可直接跳转，需完成未完成项。'];
    }
  }
}
