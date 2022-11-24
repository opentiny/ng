import { Component, ViewEncapsulation } from '@angular/core';
import { TiLeftmenuItem } from '@opentiny/ng';

@Component({
    templateUrl: './leftmenu-security.html',
    styleUrls: ['./leftmenuTest.less'],
    encapsulation: ViewEncapsulation.None
})
export class LeftmenuSecurityComponent {
    headLabel: string = '弹性云服务器 ECS';
    marginLeft: string = '192px';
    collapsed: boolean = false; // 默认展开，当设置为true时会收起
    toggleable: boolean = true;
    reloadState: boolean = true;
    items: Array<TiLeftmenuItem> = [{
        label: '一级菜单',
        children: [{
            label: '首页',
            href: '' // 跳转至新页面打开链接
        }, {
            label: 'XSS攻击脚本',
            // 点击该项时js脚本alert('Hi XSS')不会执行
            href: "javascript:alert('Hi XSS')"
        }]
    }, {
        label: '原页面重定向',
        // 点击该项时原页面不会被重定向
        href: '#/leftmenu/opener'
    }, {
        label: '弹性伸缩',
        children: [{
            label: '伸缩实例',
            router: ['router31'] // 相对路由路径
        }, {
            label: '伸缩带宽',
            router: ['router32'] // 绝对路由路径
        }]
    }];

    active: TiLeftmenuItem = this.items[0].children[0];

    toggleClick(isHide: boolean): void {
        // 需要业务侧在菜单收起\展开时，控制右侧内容的位置
        // 3.1.3版本leftMenu默认宽度修改为192px
        this.marginLeft = isHide ? '0' : '192px';
    }
}
