import { Component } from '@angular/core';
import { TiMessageService, TiModalRef } from '@opentiny/ng';

@Component({
  templateUrl: './message-id.html',
})
export class MessageIdComponent {
  constructor(private tiMessage: TiMessageService) {}
  showMsg(): void {
    this.tiMessage.open({
      id: 'message_id',
      content: 'this is a message_id',
      close(messageRef: TiModalRef): void {
        console.log('on close', messageRef);
      },
      dismiss(messageRef: TiModalRef): void {
        console.log('on dismiss', messageRef);
      },
    });
  }
}
