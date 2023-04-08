import { Component } from '@angular/core';

@Component({
  templateUrl: './tag-basic.html'
})
export class TagBasicComponent {
  myLogs: Array<string> = [];

  onDelete(): void {
    this.myLogs = [...this.myLogs, `onDelete() delete`];
  }
}
