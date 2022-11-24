import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-tips-test.html',
})
export class ActionmenuTipsTestComponent {
  items: Array<TiActionmenuItem> = [
    {
      label: '启用',
      association: 'switch',
    },
    {
      label: '禁用',
      association: 'switch',
      disabled: true,
      tip: '已禁用操作',
      tipPosition: 'left',
    },
    {
      label: '制作镜像',
      tip: '只有云服务器处于关机状态，才能执行该操作',
    },
    {
      label: '这是一个很长的选项，只有云服务器处于关机状态，才能执行该操作',
      tip: 'this is a tip',
      tipPosition: 'right',
    },
    {
      label: '变更规格2',
      tip: 'welcome tip',
      children: [
        {
          label: '制作镜像',
          tip: '只有云服务器处于关机状态，才能执行该操作',
          children: [
            {
              label: '制作镜像',
              tip: '只有云服务器处于关机状态，才能执行该操作',
            },
            {
              label: '变更规格',
              disabled: true,
            },
          ],
        },
        {
          label: '变更规格',
          disabled: true,
        },
      ],
    },
    {
      label: '制作镜像2',
      tip: '只有云服务器处于关机状态，才能执行该操作',
      disabled: true,
    },
  ];

  items2: Array<TiActionmenuItem> = [
    {
      label: '启用',
      association: 'switch',
    },
    {
      label: '禁用',
      association: 'switch',
      disabled: true,
      tip: '已禁用操作',
      tipPosition: 'left',
    },
    {
      label: '制作镜像',
      tip: '只有云服务器处于关机状态，才能执行该操作',
    },
    {
      label: '这是一个很长的选项，只有云服务器处于关机状态，才能执行该操作',
      tip: 'this is a tip',
      tipPosition: 'right',
    },
  ];
  // 获取tip模板
  @ViewChild('tipTemplate') tipTemplateRef: TemplateRef<any>;

  onSelect(item: TiActionmenuItem): void {
    console.log('onSelect()');
    console.log(item);
  }

  private showTip: boolean = false;
  onClickToggleShowTip() {
    this.showTip = !this.showTip;
    // item.tip=''时，不显示tip
    this.items2.forEach((item: TiActionmenuItem) => {
      item.tip = this.showTip ? (this.tipTemplateRef as any) : '';
    });
  }
}
