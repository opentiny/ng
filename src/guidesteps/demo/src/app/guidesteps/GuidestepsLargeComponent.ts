import { Component } from '@angular/core';

@Component({
  templateUrl: './guidesteps-large.html'
})
export class GuidestepsLargeComponent {
  items: Array<any> = [
    {
      label: '小步骤一',
      content: '小步骤一的内容小步骤一的内容小步骤一的内容小步骤一的内容小步骤一的内容'
    },
    {
      label: '小步骤二',
      content: '小步骤二的内容小步骤二的内容小步骤二的内容小步骤二的内容小步骤二的内容'
    },
    {
      label: '小步骤三',
      content: '小步骤三的内容小步骤三的内容小步骤三的内容小步骤三的内容小步骤三的内容'
    }
  ];
}
