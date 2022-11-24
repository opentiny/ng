import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: './layout-purchase-responsive.html',
    styleUrls: ['./layout.less'],
    encapsulation: ViewEncapsulation.None
})

export class LayoutPurchaseResponsiveComponent {
    // 返回标题
    public items: Array<any> = [
        {
          label: 'item1 test 测试长标题  测试长标题 测试长标题'
        }
    ];

    // 步骤
    public steps: Array<any> = [
        {
            label: 'General'
        },
        {
            label: 'Host Group'
        },
        {
            label: 'Policy'
        },
        {
            label: 'Names'
        }
    ];
    public activeStep: any = this.steps[0];
    public format: string = 'N0';
    public spinnerValue: number = 1;

    public myOptions: Array<any> = [
        { label: '一个月' },
        { label: '二个月' },
        { label: '三个月' },
        { label: '四个月' },
        { label: '五个月' },
        { label: '六个月' },
        { label: '七个月' },
        { label: '八个月' },
        { label: '九个月' },
        { label: '一年' },
        { label: '两年' },
        { label: '三年' }
    ];

    public mySelected1: any = this.myOptions[3];

}




