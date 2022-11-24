import { Component } from '@angular/core';
@Component({
  templateUrl: './transfer-idkey.html',
})
export class TransferIdkeyComponent {
  // 设置穿梭框源数据
  myOptions: Array<any> = [
    {
      id: 1,
      label: '一帆风顺'
    },
    {
      id: 2,
      label: '一帆风顺'
    },
    {
      id: 3,
      label: '一帆风顺'
    },
    {
      id: 4,
      label: '四季发财'
    },
    {
      id: 5,
      label: '五福临门'
    },
    {
      id: 6,
      label: '六六大顺'
    },
    {
      id: 7,
      label: '七星高照'
    },
    {
      id: 8,
      label: '八面来风'
    },
    {
      id: 9,
      label: '九九归一'
    },
    {
      id: 10,
      label: '十全十美'
    }
  ];
  mySelecteds: Array<any> = [
    {
    id: 4,
    label: '四季发财'
    }
  ];
}
