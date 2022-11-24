import { Component, ViewEncapsulation } from '@angular/core';
import { TiDraggableConfig } from '@opentiny/ng';

@Component({
  templateUrl: './drag-test.html',
  styleUrls: ['./dragTest.less'],
  encapsulation: ViewEncapsulation.None,
})
export class DragTestComponent {
  disabled: boolean = false;
  options1: TiDraggableConfig = {
    axis: 'x',
  };
  options2: TiDraggableConfig = {
    axis: 'y',
  };
  changeDisable(): void {
    this.disabled = !this.disabled;
  }
}
