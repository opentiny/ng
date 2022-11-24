import { Component } from '@angular/core';
import { TiLink } from '@opentiny/ng';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './crumb-router-test.html'
})
export class CrumbRouterTestComponent {
    constructor(private router: Router, private activeRoute: ActivatedRoute) {
    }
    myLogs: Array<string> = [];
    items: Array<TiLink> = [
        {
            label: '第一级',
        },
        {
            label: '第二级',
            routerLink: 'router2',
            // 参数传递
            queryParams: {
                name: 'router'
            }
        },
        {
            label: '第三级',
            href: '#/crumb/crumb-router-test/router3' // 相对路径跳转
        },
        {
            label: '第四级',
            routerLink: 'router2',
        },
        {
            label: '最后一级'
        }
    ];

    onSelect(item: any): void {
        if (item.label === '第一级') {
            this.router.navigate(['./router1'], { relativeTo: this.activeRoute });
        }
    }
}
