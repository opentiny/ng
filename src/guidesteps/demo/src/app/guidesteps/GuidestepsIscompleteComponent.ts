import { Component } from '@angular/core';

@Component({
  templateUrl: './guidesteps-iscomplete.html'
})
export class GuidestepsIscompleteComponent {
  isComplete: boolean = true;
  items: Array<any> = [
    {
      label: '小步骤一',
      content: '提交订单'
    },
    {
      label: '小步骤二',
      content: '确认订单'
    },
    {
      label: '小步骤三',
      content: '完成付款'
    }
  ];
}
