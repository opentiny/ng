import { Component } from '@angular/core';
import { myOptions, mySelecteds } from './data';
@Component({
  templateUrl: './transfer-size.html'
})
export class TransferSizeComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = JSON.parse(JSON.stringify(mySelecteds));
}
