import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-labelwidth.html'
})
export class FormfieldLabelwidthComponent {
  labelWidth: string = '20px';
  labelWidth1: string = '30px';
  colsWidth: Array<string> = ['100%'];
  title: string = '表单1';
  title1: string = '表单2';
  title2: string = '表单3';
  items: any = [
    {
      label: '姓名:',
      required: true,
      value: 'Rose',
      index: 0
    },
    {
      label: '爱好:',
      required: true,
      value: '看电影，冲浪，极限挑战',
      index: 1
    },
    {
      label: '年龄:',
      required: false,
      value: '18',
      index: 3
    }
  ];

  items1: any = [
    {
      label: '姓名:',
      required: true,
      value: 'Rose',
      index: 0
    },
    {
      label: '爱好:',
      required: true,
      value: '看电影，冲浪，极限挑战',
      index: 1
    },
    {
      label: '年龄:',
      required: false,
      value: '18',
      index: 3
    }
  ];

  changeLabelwidth(): void {
    this.items1[0].label = 'name 文本超过初始设置宽度';
    this.labelWidth = this.labelWidth1 = '160px';
  }
}
