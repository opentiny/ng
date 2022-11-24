import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: './layout-purchase-simple-responsive.html',
    styleUrls: ['./layout.less'],
    encapsulation: ViewEncapsulation.None
})

export class LayoutPurchaseSimpleResponsiveComponent {
    public items: Array<any> = [
        {
          label: 'item1 test 测试长标题  测试长标题 测试长标题'
        }
      ];
}
