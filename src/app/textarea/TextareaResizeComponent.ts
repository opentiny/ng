import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './textarea-resize.html', // 指定组件模板
  encapsulation: ViewEncapsulation.None,
})
export class TextareaResizeComponent {
  value: string = '';
  value1: string = '';
  value2: string = '';
}
