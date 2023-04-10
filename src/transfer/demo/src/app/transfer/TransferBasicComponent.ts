import { Component } from '@angular/core';
import { myOptions, mySelecteds } from './data.js';
@Component({
  templateUrl: './transfer-basic.html'
})
export class TransferBasicComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = JSON.parse(JSON.stringify(mySelecteds));
}
