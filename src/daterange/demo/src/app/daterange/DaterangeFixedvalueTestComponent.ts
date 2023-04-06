import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-fixedvalue-test.html'
})
export class DaterangeFixedvalueTestComponent {
  value: TiDateValue = {
    begin: new Date(1990, 8, 27),
    end: new Date(1990, 9, 6)
  };
  isBeginFixed: boolean = true;
  isEndFixed: boolean = true;
  onChange(): void {
    this.value.end = new Date(1990, 10, 6);
    this.value = { ...this.value };
  }
}
