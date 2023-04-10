import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-colspan-rowspan-test.html'
})
export class FormfieldColspanRowspanTestComponent {
  public title: string = '单列表单';
  public item1: any = {
    show: true,
    label: '站点名称:',
    required: true,
    value: ''
  };
  public item2: any = {
    label: '站点地址:',
    required: true,
    value: ''
  };
  public item3: any = {
    show: false,
    label: '国家:',
    required: true,
    verticalAlign: 'middle',
    value: ''
  };
  public item4: any = {
    label: '分布式探测',
    required: true,
    verticalAlign: 'middle'
  };
  public item5: any = {
    show: true,
    required: true,
    verticalAlign: 'middle',
    label: '类别'
  };
  public button: any = {
    okLabel: '确定',
    cancelLabel: '取消'
  };

  public myOptions: Array<any> = [{ label: '华北-北京一' }, { label: '华东-上海一' }];
  public mySelected: any = this.myOptions[0].label;
}
