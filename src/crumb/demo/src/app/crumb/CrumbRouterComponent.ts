import { Component } from '@angular/core';
import { TiLink } from '@opentiny/ng';

@Component({
  templateUrl: './crumb-router.html'
})
export class CrumbRouterComponent {
  myLogs: Array<string> = [];
  items: Array<TiLink> = [
    {
      label: 'Home',
      routerLink: ''
    },
    {
      label: 'Crumb',
      routerLink: '',
      queryParams: {
        name: 'crumb'
      }
    },
    {
      label: 'Crumb Router'
    }
  ];
}
