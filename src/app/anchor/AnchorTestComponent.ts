import { Component } from '@angular/core';
import { TiAnchorItem } from '@opentiny/ng';

@Component({
    templateUrl: './anchor-test.html',
    styleUrls: ['./anchortest.less']
})
export class AnchorTestComponent {
    items: Array<TiAnchorItem> = [
        {
            id: 'id1',
            title: '概览'
        },
        {
            id: 'id2',
            title: 'Pod列表'
        }
        , {
            id: 'id3',
            title: '容器配置'
        }
        ,
        {
            id: 'id4',
            title: '访问配置'
        }
        ,
        {
            id: 'id5',
            title: '配置Pod'
        }
        ,
        {
            id: 'id6',
            title: '事件'
        }
        ,
        {
            id: 'id7',
            title: '历史版本'
        }
        ,
        {
            id: 'id8',
            title: 'Container Configuration'
        }
    ];
    anchorId: string = 'id4';
    offsetTop: number = 100;
    itemId: string;

    changeanchorId(): void {
        this.anchorId = 'id2';
    }

    changeOffsetTop(): void {
        this.offsetTop = 0;
    }

    onChange(id: string): void {
        this.itemId = id;
    }
}
