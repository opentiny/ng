import { Component } from '@angular/core';
import { myOptions, mySelecteds } from './data';
@Component({
  templateUrl: './transfer-placeholder.html'
})
export class TransferPlaceholderComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = JSON.parse(JSON.stringify(mySelecteds));
  searchable: boolean = true;
  placeholder: string = '请搜索';

  // 改变placeholder的内容
  changePlaceholder(): void {
    this.placeholder = '请搜索关键字';
  }
}
