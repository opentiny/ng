import { Component, ViewChild } from '@angular/core';

@Component({
  templateUrl: './radio-focus.html'
})
export class RadioFocusComponent {
  selected1: string = 'option1';
  selected2: string = 'option2';

  myLogs: Array<any> = [];
  radioList: Array<any> = [
    {
      value: 'option1',
      label: '选项1'
    },
    {
      value: 'option2',
      label: '选项2'
    },
    {
      value: 'option3',
      label: '选项3'
    },
    {
      value: 'option4',
      label: '选项4'
    }
  ];
  @ViewChild('input') input: Element;

  onFocus(index: number): void {
    this.myLogs = [...this.myLogs, `focus：第${index + 1}个单选框`];
  }
}
