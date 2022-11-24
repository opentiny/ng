import { Component, TemplateRef } from '@angular/core';
import { TiModalRef, TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: './modal-event.html',
})
export class ModalEventComponent {
  constructor(private tiModal: TiModalService) {}
  myLogs: Array<string> = [];
  showModal(modalTemplate: TemplateRef<any>): void {
    this.tiModal.open(modalTemplate, {
      id: 'myModal',
      // 只有点击确认按钮时弹窗关闭
      beforeClose: (modalRef: TiModalRef, reason: boolean): void => {
        if (reason) {
          modalRef.destroy(reason);
        } else {
          this.myLogs = [...this.myLogs, '关闭不了'];
        }
      },
      close: (): void => {

      },
      dismiss: (): void => {

      }
    });
  }
}
