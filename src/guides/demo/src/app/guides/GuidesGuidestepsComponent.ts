import { Component } from '@angular/core';

@Component({
  templateUrl: './guides-guidesteps.html'
})
export class GuidesGuidestepsComponent {
  activeIndex: number = 1;
  cards: Array<any> = [
    {
      title: '步骤一',
      content: '步骤一的步骤一的内容步骤一的内容步骤一的内容步骤一的内容内容',
      isComplete: true,
      items: [
        {
          stepTitle: '小步骤一',
          content: '第一步'
        },
        {
          stepTitle: '小步骤二',
          content: '第二步'
        }
      ]
    },
    {
      title: '步骤二',
      content: '步骤一的步骤一的内容步骤一的内容步骤一的内容步骤一的内容内容',
      isComplete: false,
      items: [
        {
          stepTitle: '小步骤一',
          content: '第一步'
        },
        {
          stepTitle: '小步骤二',
          content: '第二步'
        }
      ]
    },
    {
      title: '步骤三',
      content: '步骤一的步骤一的内容步骤一的内容步骤一的内容步骤一的内容内容',
      isComplete: false,
      items: [
        {
          stepTitle: '小步骤一',
          content: '第一步'
        },
        {
          stepTitle: '小步骤二',
          content: '第二步'
        }
      ]
    }
  ];

  clickShow1Fn(): void {
    this.activeIndex = 0;
    this.cards[0].isComplete = false;
    this.cards[1].isComplete = false;
  }
  clickShow2Fn(): void {
    this.activeIndex = 1;
    this.cards[0].isComplete = true;
  }
  clickShow3Fn(): void {
    this.activeIndex = 2;
    this.cards[0].isComplete = true;
    this.cards[1].isComplete = true;
  }
}
