import { Component } from '@angular/core';
import { valueOptions } from './data.js';
@Component({
  templateUrl: './transfer-searchkeys.html',
})
export class TransferSearchkeysComponent {
  // 设置穿梭框源数据
  myOptions: Array<any> = JSON.parse(JSON.stringify(valueOptions));
  // 设置穿梭框初始选中项，选中项会移动到右侧面板
  mySelecteds: Array<any> = [
    {
      label: '四季发财',
      name: '心远地自偏'
    }
  ];
  searchable: boolean = true;
  // 设置搜索字段, 该数组中设置多个字段，就会根据该数组中的任意一个字段进行搜索匹配
  searchKeys: Array<string> = ['label', 'name'];
}
