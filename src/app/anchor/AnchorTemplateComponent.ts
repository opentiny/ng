import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
    templateUrl: './anchor-template.html'
})
export class AnchorTemplateComponent {
    items: Array<TiAnchorItem> = [
        {
            id: 'template-1',
            title: '概览'
        },
        {
            id: 'template-2',
            title: 'Pod列表'
        },
        {
            id: 'template-3',
            title: '容器配置'
        },
        {
            id: 'template-4',
            title: '访问配置'
        },
        {
            id: 'template-5',
            title: '配置Pod'
        },
        {
            id: 'template-6',
            title: '事件'
        },
        {
            id: 'template-7',
            title: '历史版本'
        }
    ];
}
