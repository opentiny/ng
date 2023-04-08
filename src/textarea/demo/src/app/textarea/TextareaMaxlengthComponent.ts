import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  templateUrl: './textarea-maxlength.html'
})
export class TextareaMaxlengthComponent {
  value: string = '解落三秋叶';
  placeholder: string = '欢迎使用Tiny UI';
  aaControl: any = new FormControl('');
}
