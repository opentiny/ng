import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './date-validation.html',
})
export class DateValidationComponent {
  value: Date = new Date(2015, 8, 2);
  validation: TiValidationConfig = {
    tipPosition: 'top'
  };
}
