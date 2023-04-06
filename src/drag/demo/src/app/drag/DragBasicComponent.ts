import { Component, ViewEncapsulation } from '@angular/core';
import { TiDraggableConfig, TiDraggableEvent } from '@opentiny/ng';

@Component({
  templateUrl: './drag-basic.html',
  styleUrls: ['./dragTest.less'],
  encapsulation: ViewEncapsulation.None
})
export class DragBasicComponent {
  dragOption: TiDraggableConfig = {
    drag: (event: TiDraggableEvent): void => {
      if (event.position.left > 400) {
        event.position.left = 400; // 容器的宽度 - 拖拽元素的宽度
      }

      if (event.position.left < 0) {
        event.position.left = 0;
      }

      if (event.position.top < -10) {
        // 上margin 10px
        event.position.top = -10;
      }

      if (event.position.top > 470) {
        // 容器的高度 - 拖拽元素的高度 - 下margin
        event.position.top = 470;
      }
    }
  };
}
