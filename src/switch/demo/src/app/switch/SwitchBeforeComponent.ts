import { Component } from '@angular/core';
import { TiSwitchComponent } from '@opentiny/ng';

@Component({
  templateUrl: './switch-before.html'
})
export class SwitchBeforeComponent {
  myLogs: Array<string> = [];
  switchState: boolean = true;

  onBeforeChange(component: TiSwitchComponent): void {
    if (window.confirm('您确定切换状态吗？')) {
      this.switchState = !this.switchState;
      this.myLogs = [...this.myLogs, `BeforeChange event = 确认切换状态`];
    }
  }
}
