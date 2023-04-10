import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './menu-templete.html'
})
export class MenuTempleteComponent {
  items: Array<TiMenuItem> = [
    {
      id: 'refresh',
      label: '刷新',
      iconName: 'refresh',
      tipIconName: 'warn',
      customTip: '确定要刷新吗？',
      tipPosition: 'left'
    },
    {
      id: 'delete',
      label: '删除',
      iconName: 'delete-1',
      tipIconName: 'warn',
      customTip: '确定要删除吗？',
      tipPosition: 'left'
    }
  ];
}
