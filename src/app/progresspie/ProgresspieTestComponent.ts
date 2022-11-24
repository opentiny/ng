import { Component } from '@angular/core';

@Component({
  template: `
    <p>1. 不设置value和maxValue,均使用默认值</p>
    <ti-progresspie
      [value]="value1"
      style="width:100px; height:100px;"
    ></ti-progresspie>
    <p>2. 不设置maxValue,maxValue使用默认值;value设置为20</p>
    <ti-progresspie
      [value]="value2"
      style="width:100px; height:100px;"
    ></ti-progresspie>
    <p>3. 同时设置value(10)和maxValue(200)</p>
    <ti-progresspie
      [value]="value3"
      [maxValue]="maxValue3"
      style="width:100px; height:100px;"
    ></ti-progresspie>
    <input [(ngModel)]="valueChanged" />
    <button (click)="changeValue(valueChanged, 'value1')">
      设置value1为{{ valueChanged }}
    </button>
    <button (click)="changeValue(valueChanged, 'value2')">
      设置value2为{{ valueChanged }}
    </button>
    <button (click)="changeValue(valueChanged, 'value3')">
      设置value3为{{ valueChanged }}
    </button>
  `,
})
export class ProgresspieTestComponent {
  value1: number;
  value2: number = 20;
  value3: number = 10;
  maxValue3: number = 200;
  valueChanged: string;
  changeValue(valueChanged: string, valueIndex: string): void {
    this[valueIndex] = parseInt(valueChanged, 10);
  }
}
