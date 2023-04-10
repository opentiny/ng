import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  templateUrl: './checkbox-focused.html'
})
export class CheckboxFocusedComponent {
  checkList: Array<any> = [
    {
      title: '香港',
      checked: false,
      disabled: false
    },
    {
      title: '大陆',
      checked: true,
      disabled: true
    },
    {
      title: '台湾',
      checked: true,
      disabled: false
    }
  ];

  lists: Array<any> = [
    {
      id: 'xianggang',
      title: '香港',
      checked: false
    },
    {
      id: 'dalu',
      title: '大陆',
      checked: true
    },
    {
      id: 'taiwan',
      title: '台湾',
      checked: true
    }
  ];

  myDisabled: boolean = true;
  changeDisabled(): void {
    this.myDisabled = !this.myDisabled;
  }
}
