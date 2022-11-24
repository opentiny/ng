import { Component } from '@angular/core';
import { TiMessageService } from '@opentiny/ng';

@Component({
  templateUrl: './message-type.html'
})
export class MessageTypeComponent {
  constructor(private tiMessage: TiMessageService) {}
  showDefault(): void {
    this.tiMessage.open({
      content: 'confirm'
    });
  }
  showPrompt(): void {
    this.tiMessage.open({
      type: 'prompt',
      content: 'prompt'
    });
  }
  showWarn(): void {
    this.tiMessage.open({
      type: 'warn',
      content: 'warn'
    });
  }
  showError(): void {
    this.tiMessage.open({
      type: 'error',
      content: 'error'
    });
  }
}
