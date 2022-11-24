import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './validation-blur-check.html',
})
export class ValidationBlurCheckComponent {
  inputValue: string;
  typeConfig: TiValidationConfig = {
    type: 'blur'
  };
}