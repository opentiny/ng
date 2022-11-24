import { TiTimelineOption } from '@opentiny/ng';
import { Component } from '@angular/core';
@Component({
    templateUrl: './timeline-type.html'
})

export class TimelineTypeComponent {
    options: Array<TiTimelineOption> = [
        {
            label: 'primary',
            time: '2015年4月28日  11:30:26',
            type: 'primary'
        },
        {
            label: 'info',
            time: '2015年4月28日  11:30:26',
            type: 'info'
        },
        {
            label: 'success',
            time: '2015年4月28日  11:30:26',
            type: 'success'
        },
        {
            label: 'warning',
            time: '2015年4月28日  11:30:26',
            type: 'warning'
        },
        {
            label: 'danger',
            time: '2015年4月28日  11:30:26',
            type: 'danger'
        }
    ];
}
