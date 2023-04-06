import { Component } from '@angular/core';

@Component({
  templateUrl: './copy-event.html'
})
export class CopyEventComponent {
  myLogs: Array<string> = [];
  onCopy(): void {
    this.myLogs = [...this.myLogs, '已复制'];
  }
}
