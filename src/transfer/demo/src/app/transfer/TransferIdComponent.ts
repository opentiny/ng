import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { myOptions, mySelecteds } from './data';
@Component({
  templateUrl: './transfer-id.html'
})
export class TransferIdComponent {
  // 设置穿梭框源数据
  myOptions: Array<any> = JSON.parse(JSON.stringify(myOptions));
  // 设置穿梭框初始选中项，选中项会移动到右侧面板
  mySelecteds: Array<any> = JSON.parse(JSON.stringify(mySelecteds));
  ids: Array<string> = [
    'myTransfer',
    'myTransfer_left_list_list_list',
    'myTransfer_left_list_list_0',
    'myTransfer_left_list_select_all',
    'myTransfer_to_left_button',
    'myTransfer_right_list_list_list',
    'myTransfer_right_list_list_0',
    'myTransfer_right_list_select_all',
    'myTransfer_to_right_button'
  ];

  idExistMap: Map<string, boolean> = new Map<string, boolean>();
  allIdExist: boolean = false;
  // 修复SSR报错：ERROR ReferenceError: document is not defined
  constructor(@Inject(DOCUMENT) private document) {}
  ngDoCheck(): void {
    this.allIdExist = true;
    this.ids.forEach((id: string) => {
      const idExist: boolean = this.document.getElementById(id) !== undefined;
      this.idExistMap.set(id, idExist);
      if (!idExist) {
        this.allIdExist = false;
      }
    });
  }
}
