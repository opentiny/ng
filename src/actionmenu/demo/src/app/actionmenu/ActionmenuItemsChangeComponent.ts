import { ChangeDetectorRef, Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-items-change.html'
})
export class ActionmenuItemsChangeComponent {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {}
  items: Array<TiActionmenuItem> = [
    {
      title: '启用',
      label: '远程登录',
      association: 'switch'
    },
    {
      title: '禁用',
      label: '变更规格',
      association: 'switch',
      disabled: true
    },
    {
      title: '制作镜像',
      label: '制作镜像'
    },
    {
      title: '这是一个很长的选项只有云服务器处于关机状态才能执行该操作',
      label: '云服务器'
    },
    {
      title: '变更规格2',
      label: '规格',
      children: [
        {
          title: '制作镜像',
          label: '制作规格',
          children: [
            {
              title: '制作镜像',
              label: '规格1'
            },
            {
              title: '变更规格',
              label: '规格2',
              disabled: true
            }
          ]
        },
        {
          title: '变更规格',
          label: '规格',
          disabled: true
        }
      ]
    },
    {
      title: '制作镜像2',
      label: '镜像',
      disabled: true
    }
  ];

  click(): void {
    this.items[1].disabled = false;
    this.items = this.items.concat();
  }

  click1(): void {
    this.items[1].label = '文本改变了文本改变了文本改变了';
    this.items = this.items.concat();
  }

  click2(): void {
    this.items.unshift({
      title: '新增',
      label: '新增新增'
    });
    this.items = this.items.concat();
  }

  click3(): void {
    this.items.shift();
    this.items = this.items.concat();
  }
}
