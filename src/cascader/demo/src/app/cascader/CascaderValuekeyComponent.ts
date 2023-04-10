import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

@Component({
  templateUrl: './cascader-valuekey.html'
})
export class CascaderValuekeyComponent {
  selected: TiCascaderItem;

  items: Array<TiCascaderItem> = [
    {
      label: '常用端口',
      id: '1',
      children: [
        { label: '全部放通', id: '1-1' },
        { label: '全放通TCP', id: '1-2' },
        { label: '全放通UCP', id: '1-3' },
        { label: 'SSH', id: '1-4' },
        { label: 'Telnet', id: '1-5' },
        { label: 'RDP', id: '1-6' },
        { label: 'PING', id: '1-7' },
        { label: 'PING', id: '1-8' }
      ]
    },
    {
      label: '基本协议',
      id: '2',
      children: [
        { label: 'HTTP', id: '2-1' },
        { label: 'HTTPS', id: '2-2' },
        { label: 'WWW', id: '2-3' },
        { label: 'FTP', id: '2-4' },
        { label: 'MS SQL', id: '2-5' },
        { label: 'My SQL', id: '2-6' },
        { label: 'PostgreSQL', id: '2-7' },
        { label: 'Oracle', id: '2-8' }
      ]
    }
  ];
}
