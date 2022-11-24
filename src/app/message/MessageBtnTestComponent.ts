import { Component, ViewEncapsulation } from '@angular/core';
import { TiMessageService, TiModalRef } from '@opentiny/ng';

@Component({
  templateUrl: './message-btn-test.html',
  styles: ['.modal-class { width:500px !important; }'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageBtnTestComponent {
  constructor(private tiMessage: TiMessageService) {}
  showDefaultBtn(): void {
    this.tiMessage.open({
      content: 'this is a message',
    });
  }
  showFalseBtn(): void {
    this.tiMessage.open({
      content: 'this is a message',
      cancelButton: {
        show: false,
      },
    });
  }
  showBtnClick(): void {
    const modalInstance: TiModalRef = this.tiMessage.open({
      modalClass: 'modal-class',
      content: 'this is a message',
      okButton: {
        click: (): void => {
          console.log('ok btn click');
          modalInstance.close();
        },
      },
      cancelButton: {
        click: (): void => {
          console.log('cancel btn click');
          modalInstance.dismiss();
        },
      },
    });
  }
  showBtnTxt(): void {
    this.tiMessage.open({
      content: 'this is a message',
      okButton: {
        text: 'text changed',
      },
    });
  }
  showBtnFocus(): void {
    this.tiMessage.open({
      content: 'this is a message',
      cancelButton: {
        autofocus: true,
      },
    });
  }
  showBtnPrimary(): void {
    this.tiMessage.open({
      content: 'this is a message',
      cancelButton: {
        primary: true,
      },
    });
  }
}
