import { Component } from '@angular/core';

@Component({
  templateUrl: './steps-template.html',
})
export class StepsTemplateComponent {
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
    this.steps.forEach((step: any, index: number) => {
      step.icon = index > activeStep ? 'exclamation-circle' : 'add1';
  });
  }
}
