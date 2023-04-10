import { Component } from '@angular/core';

@Component({
  templateUrl: './collapse-event.html',
  styleUrls: ['./collapse.less']
})
export class CollapseEventComponent {
  collapsed: boolean = false;
  myLogs: Array<string> = [];

  onToggleDone(event: boolean): void {
    this.myLogs = [...this.myLogs, `onToggleDone() event=${event}`];
  }

  change(): void {
    this.collapsed = !this.collapsed;
  }
}
