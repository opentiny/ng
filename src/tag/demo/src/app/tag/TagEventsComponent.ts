import { Component } from '@angular/core';

@Component({
  templateUrl: './tag-events.html'
})
export class TagEventsComponent {
  myLogs: Array<string> = [];

  onDelete(): void {
    this.myLogs = [...this.myLogs, `onDelete() delete`];
  }
}
