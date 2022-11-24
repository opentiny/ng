import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './time-validation.html',
})
export class TimeValidationComponent {
  timeValue: string = '';
  validationObj: TiValidationConfig = {
  };
}
