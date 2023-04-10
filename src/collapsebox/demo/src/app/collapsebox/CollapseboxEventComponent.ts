import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './collapsebox-event.html',
  encapsulation: ViewEncapsulation.None
})
export class CollapseboxEventComponent {
  myLogs: Array<string> = [];
  show: boolean = true;
  onClose() {
    this.show = false;
    this.myLogs = [...this.myLogs, `onClose()`];
  }
  onClickToggle() {
    this.show = true;
  }
}
