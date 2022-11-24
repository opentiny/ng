import { Component } from '@angular/core';

@Component({
  templateUrl: './spinner-stepfn.html',
})
export class SpinnerStepfnComponent {
  myLogs: Array<string> = [];
  max: number = 2000;
  min: number = -20;
  spinnerValue: number = 1500.3624;

  stepFn: (value: number, isAdd: boolean) => number = (
    value: number,
    isAdd: boolean
  ) => {
    let step: number = 1;
    if (value < 10) {
      step = isAdd ? 2 : 1;
    } else if (value >= 10 && value <= 100) {
      step = isAdd ? 10 : 5;
    } else {
      step = 100;
    }

    this.myLogs = [...this.myLogs, `stepFn isAdd=${isAdd} value=${value} step=${step}`];

    return step;
  };
}
