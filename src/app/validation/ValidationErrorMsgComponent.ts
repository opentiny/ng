import { Component } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  templateUrl: './validation-error-msg.html',
})
export class ValidationErrorMsgComponent {
  errorMsgBaseValue: string = 'hello';
  errorMsgMultirowValue: string = 'hello';
  errorMsgClearValue: string = 'hello';

  errorMsgBaseConfig: TiValidationConfig = {
    type: 'blur',
    errorMessage: {
      equal: 'not equal to {0}',
    },
  };
  errorMsgMultirowConfig: TiValidationConfig = {
    errorMessage: {
      equal: '输入值<br>应该为{0}。',
    },
  };
  errorMsgClearConfig: TiValidationConfig = {
    type: 'blur',
    errorMessage: {
      equal: '',
    },
  };

}
