import { Component } from '@angular/core';
import { TiTabsComponent } from '@opentiny/ng';
@Component({
  templateUrl: './tab-beforeactivechange.html'
})
export class TabBeforeactivechangeComponent {
  myLogs: Array<string> = [];
  tabs: any = [
    {
      title: 'Tab1',
      active: true,
      onActiveChange: (isActive: boolean): void => {
        if (isActive) {
          this.myLogs = [...this.myLogs, 'tab1: not active => active'];
        } else {
          this.myLogs = [...this.myLogs, 'tab1: active => not active'];
        }
      }
    },
    {
      title: 'Tab2'
    },
    {
      title: 'Tab3',
      beforeActiveChange: (tabs: TiTabsComponent): void => {
        this.myLogs = [...this.myLogs, 'tab3: beforeActiveChange trigger'];
        setTimeout(() => {
          tabs.changeActive(tabs.clickTab);
          this.myLogs = [...this.myLogs, 'tab3: changeActive trigger at 1000ms'];
        }, 1000);
      }
    }
  ];
}
