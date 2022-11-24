import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './validation-rules-test.html',
})
export class ValidationRulesTestComponent {
  myValue: string;
  myValue1: string;
  myValue2: string;
  myValue3: string;
  myValue4: string;
  myValue5: string;
  myValue6: string;
  myValue7: string;
  myValue8: string;
  myValue9: string;
  myValue10: string;
  myValue11: string;
  myValue12: string;
  myValue13: string;
  myValue14: string;
  myValue15: string;
  myValue16: string;
  myValue17: string;
  myValue18: string;
  myValue19: string;
  myValue20: string;
  myValue21: string;
  myValue22: string;
  myValue23: string;
  myValue24: string;
  disableStatus: boolean = false;
  validationObj1: TiValidationConfig = {};
  validationObj: TiValidationConfig = {
    type: 'change',
  };
  changeDisable(): void {
    this.disableStatus = !this.disableStatus;
  }
}
