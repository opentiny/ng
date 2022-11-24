import { Component } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
    templateUrl: './layout-basic.html',
    styleUrls: ['./layout-basic.less'],
})

export class LayoutBasicComponent {
    // 左侧菜单配置
    marginLeft: string = '192px';
    config: any = {
        serviceName: '菜单栏',
        reloadState: true, // 初始设置为true
        toggleable: true,
        collapsed: false, // 默认展开，当设置为true时会收起
        collapsedChangeFn: (collapsed: boolean): void => {
            this.marginLeft = collapsed ? '0' : '192px';
        }
    };
    items: Array<TiLeftmenuItem> = [
        {
          label: '菜单一',
          children: [
            {
              label: '子菜单1.1',
            },
            {
              label: '子菜单1.2',
            },
          ],
        },
        {
          label: '菜单二',
        }
      ];
    active: TiLeftmenuItem;
}
