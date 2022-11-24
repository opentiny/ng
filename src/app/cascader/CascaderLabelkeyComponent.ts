import { Component } from '@angular/core';
import { TiCascaderItem } from '@opentiny/ng';

@Component({
  templateUrl: './cascader-labelkey.html'
})

export class CascaderLabelkeyComponent {
  selected: TiCascaderItem;

  items: Array<TiCascaderItem> = [{
    label: 'chang yong duan kou',
    name: '常用端口',
    children: [
      { name: '全部放通', label: 'quan bu fang tong' },
      { name: '全放通TCP', label: 'quan fang tong TCP' },
      { name: '全放通UCP', label: 'quan fang tong UCP' },
      { name: 'SSH', label: 'SSH' },
      { name: 'Telnet', label: 'Telnet' },
      { name: 'RDP', label: 'RDP' },
      { name: 'PING', label: 'PING' },
      { name: 'PING', label: 'PING' }
    ]
  }, {
    label: 'ji ben xie yi',
    name: '基本协议',
    children: [
      { name: 'HTTP', label: 'HTTP' },
      { name: 'HTTPS', label: 'HTTPS' },
      { name: 'WWW', label: 'WWW' },
      { name: 'FTP', label: 'FTP' },
      { name: 'MS SQL', label: 'MS SQL' },
      { name: 'My SQL', label: 'MS SQL' },
      { name: 'PostgreSQL', label: 'PostgreSQL' },
      { name: 'Oracle', label: 'Oracle' }
    ]
  }];

}
