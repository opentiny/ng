import { Component } from '@angular/core';
import { TiMessageService } from '@opentiny/ng';

@Component({
  templateUrl: './message-title.html'
})
export class MessageTitleComponent {
  constructor(private tiMessage: TiMessageService) {}
  showMessage(): void {
    this.tiMessage.open({
      title: 'this is message title',
      content: 'message content'
    });
  }
}
