import { Component } from '@angular/core';

@Component({
  templateUrl: './dominator-default.html'
})
export class DominatorDefaultComponent {
  isFocused: boolean = false;
  disabled: boolean = false;
  selected: any = {
    id: 'haha',
    name: '很长很长很长很长很长很长很长很长很长很长很长很长myemail@example.com很长很长',
    pic: 'pic.png'
  };
  searchWord: string = '';
  myLogs: Array<string> = [];
  onSearch(event: string): void {
    this.searchWord = event;
    this.myLogs = [...this.myLogs, `搜索内容：${event}`];
  }

  change1(): void {
    this.selected = {
      id: 'haha',
      name: '很长很长很长很长很长很长很长很长很长很长很长很长myemail@example.com很长很长',
      pic: 'pic.png'
    };
  }
  change2(): void {
    this.selected = null;
  }
  change3(): void {
    this.selected = {
      id: 'haha',
      name: '很长很长很长很长很长很长很长很长很长很长很长很长myemail@example.com很长很长',
      pic: 'pic.png'
    };
  }
  change4(): void {
    this.selected = undefined;
  }

  changeDisabled(): void {
    this.disabled = !this.disabled;
  }
}
