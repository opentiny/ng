import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
    templateUrl: './anchor-scrolltarget.html'
})
export class AnchorScrolltargetComponent {
    items: Array<TiAnchorItem> = [
        {
            id: 'scrolltarget-1',
            title: '概览'
        },
        {
            id: 'scrolltarget-2',
            title: 'Pod列表'
        },
        {
            id: 'scrolltarget-3',
            title: '容器配置'
        },
        {
            id: 'scrolltarget-4',
            title: '访问配置'
        },
        {
            id: 'scrolltarget-5',
            title: '配置Pod'
        },
        {
            id: 'scrolltarget-6',
            title: '事件'
        },
        {
            id: 'scrolltarget-7',
            title: '历史版本'
        }
    ];
}
