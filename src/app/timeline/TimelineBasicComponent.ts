import { TiTimelineOption } from '@opentiny/ng';
import { Component } from '@angular/core';
@Component({
    templateUrl: './timeline-basic.html'
})

export class TimelineBasicComponent {
    options: Array<TiTimelineOption> = [
        {
            label: '部署准备',
            time: '2021年3月19日  11:30:26'
        },
        {
            label: '服务器部署',
            time: '2021年3月19日  11:35:26'
        },
        {
            label: '网络配置',
            time: '2021年3月19日  11:48:26'
        },
        {
            label: '实例发放',
            time: '2021年3月19日  11:50:26'
        }
    ];
}
