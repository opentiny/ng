import { Component } from '@angular/core';
import { myOptions } from './data';
@Component({
  templateUrl: './transfer-nodatatext.html'
})
export class TransferNodatatextComponent {
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  mySelecteds: Array<any> = [];
  noDataText: string = '暂无列表数据';
}
