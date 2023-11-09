import { Component } from '@angular/core';
import { myOptions } from './data';
@Component({
  templateUrl: './transfer-titles.html'
})
export class TransferTitlesComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = [];
}
