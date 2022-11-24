import { Component } from '@angular/core';

@Component({
  templateUrl: './textarea-scroll.html',
})
export class TextareaScrollComponent {
  items: Array<any> = new Array(20);
  enableWhiteList: boolean = false;
  item1: any = {
    show: true,
    label: '姓名:',
    required: true,
    value: '',
  };
  item2: any = {
    label: '输入框:',
    required: true,
    value: '',
  };
}
