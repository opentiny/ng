import { Component } from '@angular/core';
import { TiDateValue, TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-validation.html'
})
export class DaterangeValidationComponent {
  value: TiDateValue = {
    begin: new Date(2015, 8, 27),
    end: new Date(2016, 5, 6)
  };
  validation: TiValidationConfig = {
    tipPosition: 'top'
  };
}
