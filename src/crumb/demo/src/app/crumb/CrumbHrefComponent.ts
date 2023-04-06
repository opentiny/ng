import { Component } from '@angular/core';
import { TiLink } from '@opentiny/ng';

@Component({
  templateUrl: './crumb-href.html'
})
export class CrumbHrefComponent {
  items: Array<TiLink> = [
    {
      label: '服装',
      href: '',
      target: '_blank'
    },
    {
      label: '女装',
      href: '',
      target: '_parent'
    },
    {
      label: '裙子',
      href: '',
      target: '_top'
    },
    {
      label: '连衣裙',
      href: ''
    },
    {
      label: '复古'
    }
  ];
}
