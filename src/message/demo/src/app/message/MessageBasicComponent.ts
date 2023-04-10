import { Component } from '@angular/core';
import { TiMessageService, TiModalRef } from '@opentiny/ng';

@Component({
  templateUrl: './message-basic.html'
})
export class MessageBasicComponent {
  constructor(private tiMessage: TiMessageService) {}
  showMsg(): void {
    this.tiMessage.open({
      content: 'this is a message',
      close(messageRef: TiModalRef): void {
        console.log('on close', messageRef);
      },
      dismiss(messageRef: TiModalRef): void {
        console.log('on dismiss', messageRef);
      }
    });
  }
}
