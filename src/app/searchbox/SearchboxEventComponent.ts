import { Component } from '@angular/core';

@Component({
  templateUrl: './searchbox-event.html',
})
export class SearchboxEventComponent {
  myLogs: Array<string> = [];
  value: string = '';
  options: Array<any> = [
    {
      label: '华北',
    },
    {
      label: '华南',
    },
    {
      label: '西北',
    },
    {
      label: '西南',
    },
  ];
  onFocus(): void {
    this.myLogs = [...this.myLogs, 'on focus'];
  }
  onBlur(): void {
    this.myLogs = [...this.myLogs, 'on blur'];
  }
  onSearch(value: string): void {
    this.myLogs = [...this.myLogs, `search value: ${value}`];
  }
  onClear(event: MouseEvent): void {
    this.myLogs = [...this.myLogs, 'on clear'];
  }
  onModelChange(value: string): void {
    this.myLogs = [...this.myLogs, `modelChange: ${value}`];
  }
  onSelect(option: any): void {
    this.myLogs = [...this.myLogs, `select: ${JSON.stringify(option)}`];
  }
}
