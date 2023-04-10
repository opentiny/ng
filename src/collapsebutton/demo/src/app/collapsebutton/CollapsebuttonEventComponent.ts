import { Component } from '@angular/core';

@Component({
  templateUrl: './collapsebutton-event.html'
})
export class CollapsebuttonEventComponent {
  collapsed: boolean = true;
  myLogs: Array<string> = [];

  onCollapsedChange(isCollapsed: boolean): void {
    this.collapsed = !this.collapsed;
    this.myLogs = [...this.myLogs, `collapsed: ${this.collapsed}`];
  }
}
