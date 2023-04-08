import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './textarea-valid.html'
})
export class TextareaValidComponent {
  value: string = '';
  value1: string = '123';
  placeholder: string = '欢迎使用Tiny UI';
  // 使用TiValidation定义接口类型
  validation: TiValidationConfig = {
    type: 'blur'
  };
}
