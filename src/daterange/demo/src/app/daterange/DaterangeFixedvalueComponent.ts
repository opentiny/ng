import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-fixedvalue.html'
})
export class DaterangeFixedvalueComponent {
  isBeginFixed: boolean = true;
  isEndFixed: boolean = true;
  value1: TiDateValue = {
    begin: new Date(2021, 8, 27),
    end: new Date(2021, 9, 6)
  };
  value2: TiDateValue = {
    begin: new Date(2021, 8, 27),
    end: new Date(2021, 9, 6)
  };
}
