import { Component } from '@angular/core';
const ITEMOPTS: Array<any> = [
  {
    label: '地域:',
    value: '中国 zh-CN'
  },
  {
    label: '云服务器组:',
    value: 'ecsg-23'
  },
  {
    label: '可用分区:',
    value: '可用区1'
  },
  {
    label: '虚拟私有云:',
    value: 'huaV'
  },
  {
    label: '规格:',
    value: 'M1.TINY | 0.5G'
  },
  {
    label: '购买时长:',
    value: '1年'
  }
];
@Component({
  templateUrl: './formfield-text-form.html'
})
export class FormfieldTextFormComponent {
  singleItem: any = {
    title: '单列纯文本表单：',
    textLineHeight: '22px',
    ITEMOPTS
  };
  multiItem: any = {
    title: '多列纯文本表单：',
    colsNumber: 3,
    colsGap: ['100px', '100px'],
    textLineHeight: '30px',
    ITEMOPTS
  };
}
