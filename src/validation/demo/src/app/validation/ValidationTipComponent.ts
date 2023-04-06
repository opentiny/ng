import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './validation-tip.html'
})
export class ValidationTipComponent {
  inputValue: string = '';
  tipConfig: TiValidationConfig = {
    tip: '自定义文案：请输入 hello tiny',
    tipPosition: 'bottom',
    tipMaxWidth: '100px'
  };
}
