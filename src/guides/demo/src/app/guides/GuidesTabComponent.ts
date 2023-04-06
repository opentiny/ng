import { Component } from '@angular/core';

@Component({
  templateUrl: './guides-tab.html'
})
export class GuidesTabComponent {
  card1: Array<any> = [
    {
      title: '第一项',
      active: true,
      activeIndex: 1,
      items: [
        {
          label: '第一项步骤一',
          content: '步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一'
        },
        {
          label: '步骤二',
          content: '步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二'
        },
        {
          label: '步骤三',
          content: '步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三'
        },
        {
          label: '步骤四',
          content: '步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四步骤四'
        }
      ]
    },
    {
      title: '第二项',
      items: [
        {
          label: '第二项步骤一',
          content: '步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一步骤一'
        },
        {
          label: '步骤二',
          content: '步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二步骤二'
        },
        {
          label: '步骤三',
          content: '步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三步骤三'
        }
      ]
    }
  ];
  card2: Array<any> = [
    {
      title: '第一项',
      active: true,
      items: [
        {
          label: '第一项步骤一',
          content: '提交订单'
        },
        {
          label: '步骤二',
          content: '确认订单'
        },
        {
          label: '步骤三',
          content: '完成付款'
        }
      ]
    },
    {
      title: '第二项',
      items: [
        {
          label: '第二项步骤一',
          content: '提交订单'
        },
        {
          label: '步骤二',
          content: '确认订单'
        },
        {
          label: '步骤三',
          content: '完成付款'
        }
      ]
    }
  ];
  clickFn(): void {
    console.log('触发点击事件');
  }
}
