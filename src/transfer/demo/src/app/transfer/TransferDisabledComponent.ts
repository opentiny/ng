import { Component, ChangeDetectorRef } from '@angular/core';
import { mySelecteds } from './data';
@Component({
  templateUrl: './transfer-disabled.html'
})
export class TransferDisabledComponent {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  myOptions: Array<any> = [
    {
      label: '一帆风顺'
    },
    {
      label: '二龙戏珠',
      disabled: true
    },
    {
      label: '三阳开泰',
      disabled: false
    },
    {
      label: '四季发财'
    },
    {
      label: '五福临门'
    },
    {
      label: '六六大顺'
    },
    {
      label: '七星高照'
    },
    {
      label: '八面来风'
    },
    {
      label: '九九归一'
    },
    {
      label: '十全十美'
    }
  ];
  mySelecteds: Array<any> = JSON.parse(JSON.stringify(mySelecteds));
}
