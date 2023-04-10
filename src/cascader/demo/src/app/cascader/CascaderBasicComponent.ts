import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

@Component({
  templateUrl: './cascader-basic.html'
})
export class CascaderBasicComponent {
  selected: TiCascaderItem;

  items: Array<TiCascaderItem> = [
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
    },
    {
      label: '基本协议',
      children: [
        { label: 'HTTP' },
        { label: 'HTTPS' },
        { label: 'WWW' },
        { label: 'FTP' },
        { label: 'MS SQL' },
        { label: 'My SQL' },
        { label: 'PostgreSQL' },
        { label: 'Oracle' }
      ]
    }
  ];
}
