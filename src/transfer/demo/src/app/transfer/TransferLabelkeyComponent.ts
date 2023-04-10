import { Component } from '@angular/core';
import { valueOptions } from './data.js';
@Component({
  templateUrl: './transfer-labelkey.html'
})
export class TransferLabelkeyComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(valueOptions));
  mySelecteds: Array<any> = [];
  labelKey: string = 'label';
}
