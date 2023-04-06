import { Component } from '@angular/core';

@Component({
  templateUrl: './card-add.html'
})
export class CardAddComponent {
  // 模拟事件打印日志
  myLogs: Array<any> = [];
  // add 事件
  onAddCard(event: Event): void {
    this.myLogs = [...this.myLogs, '【event:add】-- callback'];
  }
}
