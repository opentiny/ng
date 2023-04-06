import { Component } from '@angular/core';

@Component({
  templateUrl: './textarea-disabled.html'
})
export class TextareaDisabledComponent {
  value: string = '解落三秋叶，能开二月花。';
  disabled: boolean = true;
}
