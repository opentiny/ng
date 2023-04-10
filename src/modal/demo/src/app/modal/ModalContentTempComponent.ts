import { Component, TemplateRef } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-content-temp.html'
})
export class ModalContentTempComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      id: 'myModal'
    });
  }
}
