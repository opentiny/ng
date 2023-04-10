import { Component } from '@angular/core';

@Component({
  templateUrl: './collapsetext-collapsed.html'
})
export class CollapsetextCollapsedComponent {
  label: string = '标题下展';
  collapsed: boolean = false;
  myLogs: Array<string> = [];
  collapsedChange(collapsed: boolean): void {
    this.myLogs = [...this.myLogs, `collapsed = ${collapsed}`];
  }
}
