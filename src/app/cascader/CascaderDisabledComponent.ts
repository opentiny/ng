import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';
@Component({
  templateUrl: './cascader-disabled.html'
})

export class CascaderDisabledComponent {
  items: Array<TiCascaderItem> = [
    {
      label: '常用端口',
      disabled: true,
      children: [
        { label: '全部放通' },
        { label: '全放通TCP' },
        {
          label: '全放通UCP',
          disabled: true
        },
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
        {
          label: 'WWW',
          disabled: true
        },
        { label: 'FTP' },
        { label: 'MS SQL' },
        { label: 'My SQL' },
        { label: 'PostgreSQL' },
        { label: 'Oracle' }
      ]
    }
  ];
}
