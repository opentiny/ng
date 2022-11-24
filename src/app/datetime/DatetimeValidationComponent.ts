import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './datetime-validation.html'
})
export class DatetimeValidationComponent {
  value: Date = new Date(2016, 2, 12, 10, 23, 45);
  validation: TiValidationConfig = {
    tipPosition: 'top'
  };
}
