import { Component } from '@angular/core';

@Component({
  templateUrl: './collapsetext-scene.html'
})
export class CollapsetextSceneComponent {
  label: string = '查看';
  type: string = 'content';
  collapsed: boolean = true;
  highlight: boolean = true;
  collapsedChange(collapsed: boolean): void {
    if (collapsed) {
      this.label = '查看';
    } else {
      this.label = '收起';
    }
  }
}
