import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

@Component({
  templateUrl: './cascader-item-test.html'
})

export class CascaderItemTestComponent {
  mySelected: TiCascaderItem;
  mySelected1: TiCascaderItem;
  mySelected2: TiCascaderItem;
  items: Array<TiCascaderItem> = [];

  data: Array<TiCascaderItem> = [
    {
      label: '常用端口',
      children: [
        { label: '全部放通' },
        { label: '全放通TCP' },
        { label: '全放通UCP' },
        { label: 'SSH' },
        { label: 'Telnet' },
        { label: 'RDP' },
        { label: 'PING' }
      ]
    }, {
      label: '基本协议',
      children: [
        { label: 'HTTP' },
        { label: 'HTTPS' },
        { label: 'WWW' },
        { label: 'FTP' },
        { label: 'MS SQL' },
        { label: 'My SQL复制' },
        { label: 'My SQL 超长数据 超长数据超长数据' },
        { label: 'PostgreSQL' },
        { label: 'PostgreSQL复制' },
        { label: 'Oracle' }
      ]
    }, {
      label: '没有children'
    }, {
      label: 'children是空数组',
      children: []
    }
  ];

}
