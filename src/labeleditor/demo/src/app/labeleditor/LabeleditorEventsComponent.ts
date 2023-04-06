import { Component } from '@angular/core';
@Component({
  templateUrl: './labeleditor-events.html',
  styles: [
    `
      .demo-labeleditor-container {
        line-height: 30px;
        max-width: 300px;
        display: inline-block;
      }
    `
  ]
})
export class LabeleditorEventsComponent {
  label: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  myLogs: Array<string> = [];
  confirm(val: string): void {
    this.myLogs = [...this.myLogs, `on confirm`];
  }
  cancel(): void {
    this.myLogs = [...this.myLogs, `on cancel`];
  }
  editor(): void {
    this.myLogs = [...this.myLogs, `on editor`];
  }
}
