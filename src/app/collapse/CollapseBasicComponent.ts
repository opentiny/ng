import { Component } from '@angular/core';

@Component({
  templateUrl: './collapse-basic.html',
  styleUrls: ['./collapse.less'],
})
export class CollapseBasicComponent {
  collapsed: boolean = false;
  change(): void {
    this.collapsed = !this.collapsed;
  }
}
