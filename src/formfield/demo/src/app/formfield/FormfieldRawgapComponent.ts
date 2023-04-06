import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-rowgap.html'
})
export class FormfieldRawgapComponent {
  colsWidth: Array<string> = ['50%', '50%'];
  public item1: any = {
    label: '姓名:',
    required: true
  };
  public item2: any = {
    label: '描述:',
    required: true
  };
  public item3: any = {
    label: 'span标签:',
    required: false,
    verticalAlign: 'middle'
  };
  public item4: any = {
    verticalAlign: 'middle',
    required: false
  };
  public item5: any = {
    required: true,
    verticalAlign: 'middle'
  };
  public item6: any = {
    required: false,
    label: '输入框:',
    value: 'd'
  };
  public button: any = {
    okLabel: '确定',
    cancelLabel: '取消'
  };
}
