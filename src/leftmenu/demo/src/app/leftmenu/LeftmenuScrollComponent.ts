import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './leftmenu-scroll.html',
  styleUrls: ['./leftmenuTest.less'],
  styles: ['body {height: 200px;}'],
  encapsulation: ViewEncapsulation.None
})
export class LeftmenuScrollComponent {
  headLabel: string = '弹性云服务器 ECS';
  marginLeft: string = '192px';
  collapsed: boolean = false;
  toggleable: boolean = true;
  reloadState: boolean = true;
  myOptions: Array<any> = [
    { label: '美国', englishname: 'America' },
    { label: '巴西', englishname: 'Brazil' }
  ];
  items: Array<TiLeftmenuItem> = [
    {
      label: '云硬盘',
      children: [
        {
          label: '磁盘',
          router: ['./router11']
        },
        {
          label: '快照',
          router: ['./router12']
        }
      ]
    },
    {
      label: '镜像服务',
      router: ['router2']
    },
    {
      label: '弹性伸缩',
      children: [
        {
          label: '伸缩带宽',
          router: ['./router31'] // 绝对路由路径
        }
      ]
    }
  ];

  active: TiLeftmenuItem = this.items[0].children[0];

  toggleClick(isHide: boolean): void {
    // 需要业务侧在菜单收起/展开时，控制右侧内容的位置。3.1.3版本leftMenu默认宽度修改为192px
    this.marginLeft = isHide ? '0' : '192px';
  }

  clickLevel1(m1: any): void {
    console.log(`点击一级菜单${JSON.stringify(m1)}`);
  }

  clickLevel2(m2: any): void {
    console.log(`点击二级菜单${JSON.stringify(m2)}`);
  }
}
