import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
    templateUrl: './leftmenu-id.html',
    styleUrls: ['./leftmenuTest.less'],
    encapsulation: ViewEncapsulation.None
})
export class LeftmenuIdComponent {
    leftmenuId: string = 'leftmenu';
    headId: string = 'leftmenu_head';
    footId: string = 'leftmenu_foot';

    headLabel: string = '弹性云服务器 ECS';
    footLabel: string = '返回旧版(自定义)';
    marginLeft: string = '192px';
    collapsed: boolean = false; // 默认展开，当设置为true时会收起
    toggleable: boolean = true;
    reloadState: boolean = true;
    items: Array<TiLeftmenuItem> = [{
        id: 'hardDisk',
        label: '云硬盘',
        children: [{
            id: 'disk',
            label: '磁盘',
            router: ['./router11'] // 相对路由路径
        }, {
            id: 'snapshot',
            label: '快照',
            router: ['./router12']
        }]
    }, {
        id: 'mirror',
        label: '镜像服务',
        router: ['router2']
    }, {
        id: 'scale',
        label: '弹性伸缩',
        children: [{
            id: 'scaleInstance',
            label: '伸缩实例',
            router: ['router31'] // 相对路由路径
        }, {
            id: 'scaleBandwidth',
            label: '伸缩带宽',
            router: ['router32'] // 绝对路由路径
        }]
    }];

    active: TiLeftmenuItem = this.items[1];

    toggleClick(isHide: boolean): void {
        this.marginLeft = isHide ? '0' : '192px';
    }
}
