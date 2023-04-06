import { Component } from '@angular/core';

@Component({
  templateUrl: './alert-open.html'
})
export class AlertOpenComponent {
  label: string = '提示文本';
  open: boolean = true;
  myLogs: Array<string> = [];
  setOpen(): void {
    this.open = !this.open;
    this.onOpenChange(this.open);
  }
  onOpenChange(openState: boolean): void {
    this.myLogs = [...this.myLogs, `openState: ${openState}`];
  }
}
