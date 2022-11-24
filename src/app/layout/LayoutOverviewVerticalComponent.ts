import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';


@Component({
    templateUrl: './layout-overview-vertical.html',
    styleUrls: ['./layout.less'],
    encapsulation: ViewEncapsulation.None
})

export class LayoutOverviewVerticalComponent {
    // 左侧菜单配置
    public marginLeft: string = '192px';
    public config: any = {
        serviceName: '云服务器控制台',
        reloadState: true, // 初始设置为true
        toggleable: true,
        collapsed: false, // 默认展开，当设置为true时会收起
        collapsedChangeFn: (collapsed: boolean): void => {
            this.marginLeft = collapsed ? '0' : '192px';
        }
    };
    public items: Array<TiLeftmenuItem> = [{
        label: '总览',
        children: [{
            label: '二级菜单1'
        }, {
            label: '二级菜单2'
        }]
    }, {
        label: '弹性云服务器',
        children: [{
            label: '二级菜单'
        }, {
            label: '二级'
        }]
    }, {
        label: '裸金属服务器'
    }];
    public active: TiLeftmenuItem;
}
