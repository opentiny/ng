import { Component } from '@angular/core';
import { TiStepItem } from '@opentiny/ng-steps';

@Component({
  templateUrl: './steps-active.html' // 指定组件模板
})
export class StepsActiveComponent {
  steps: Array<TiStepItem> = [
    {
      id: 'id1',
      label: 'General'
    },
    {
      id: 'id2',
      label: 'Host Group'
    },
    {
      id: 'id3',
      label: 'Policy'
    },
    {
      id: 'id4',
      label: 'Names'
    }
  ];
  activeStep: TiStepItem = this.steps[2];
  clickable: boolean = true;
  labelKey: string = 'id';

  jump(): void {
    this.activeStep = this.steps[1];
  }
}
