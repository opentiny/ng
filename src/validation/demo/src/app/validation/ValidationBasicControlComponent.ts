import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './validation-basic-control.html'
})
export class ValidationBasicControlComponent {
  customFormControl: FormControl = new FormControl('hello tiny', [TiValidators.required, TiValidators.equal('hello tiny')]);
}
