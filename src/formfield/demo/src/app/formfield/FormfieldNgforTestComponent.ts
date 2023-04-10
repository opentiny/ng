import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-ngfor-test.html'
})
export class FormfieldNgforTestComponent {
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
  type: string = 'text';

  addItems(): void {
    this.items.splice(2, 0, {
      label: '性别:',
      required: true,
      value: '女',
      index: 2
    });
  }
}
