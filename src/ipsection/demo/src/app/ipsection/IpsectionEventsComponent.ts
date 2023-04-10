import { Component } from '@angular/core';
import { TiIpsectionConfig } from '@opentiny/ng';

@Component({
  templateUrl: './ipsection-events.html'
})
export class IpsectionEventsComponent {
  myLogs: Array<string> = [];
  ipValue: string = '127.0.0.1/255';
  configs: Array<TiIpsectionConfig> = [
    { section: 0, bold: true },
    { section: 1, options: ['0'] },
    { section: 2 },
    { section: 3, options: ['0'] },
    { section: 4 }
  ];
  onBlur(event: FocusEvent): void {
    this.myLogs = [...this.myLogs, `失焦事件 当前IP值为${this.ipValue}`];
  }
  onChange(event: any): void {
    this.myLogs = [...this.myLogs, `change事件 当前IP值为${event}`];
  }
}
