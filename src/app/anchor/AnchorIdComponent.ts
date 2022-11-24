import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
    templateUrl: './anchor-id.html'
})
export class AnchorIdComponent {
    myLogs: Array<string> = [];
    anchorId: string = 'id-4';
    items: Array<TiAnchorItem> = [
        {
            id: 'id-1',
            title: '概览'
        },
        {
            id: 'id-2',
            title: 'Pod列表'
        },
        {
            id: 'id-3',
            title: '容器配置'
        },
        {
            id: 'id-4',
            title: '访问配置'
        },
        {
            id: 'id-5',
            title: '配置Pod'
        },
        {
            id: 'id-6',
            title: '事件'
        },
        {
            id: 'id-7',
            title: '历史版本'
        }
    ];

    onAnchorIdChange(id: string): void {
        this.myLogs = [...this.myLogs, `onAnchorIdChange() id = ${id}`];
    }
}
