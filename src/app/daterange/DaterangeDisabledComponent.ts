import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-disabled.html',
})
export class DaterangeDisabledComponent {
  disabled: boolean = true;
  value: TiDateValue = {
    begin: new Date(2015, 3, 12),
    end: new Date(2056, 2, 1),
  };
}
