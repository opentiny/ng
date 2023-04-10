import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-template.html'
})
export class StepsTemplateComponent {
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
  ngOnInit(): void {
    this.getIcon(this.activeStep);
  }

  activeStepChange(activeStep: number): void {
    this.getIcon(activeStep);
  }

  getIcon(activeStep: number): void {
    this.steps.forEach((step: TiStepItem, index: number) => {
      step.icon = index > activeStep ? 'exclamation-circle' : 'add1';
    });
  }
}
