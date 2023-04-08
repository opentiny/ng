import { Component } from '@angular/core';
import { myOptions, mySelecteds } from './data.js';
@Component({
  templateUrl: './transfer-searchable.html'
})
export class TransferSearchableComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = JSON.parse(JSON.stringify(mySelecteds));
  searchable: boolean = true;
}
