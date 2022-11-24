import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-nest-formfiled.html',
})
export class FormfieldNestFormfiledComponent {
  colsWidth: Array<string> = ['100%'];
  colsWidth1: Array<string> = ['50%', '50%'];
  colsNumber: number = 2;
  item1: any = {
    show: true,
    label: '姓名:',
    required: true,
  };
  item2: any = {
    label: '输入框:',
    required: true,
    value: 'happy',
  };
  item3: any = {
    show: false,
    label: 'span标签:',
    required: true,
    verticalAlign: 'middle',
  };
  item4: any = {
    label: '',
    required: true,
    verticalAlign: 'middle',
  };
  item5: any = {
    show: true,
    required: true,
    verticalAlign: 'middle',
  };
  button: any = {
    okLabel: '确定',
    cancelLabel: '取消',
  };
}
