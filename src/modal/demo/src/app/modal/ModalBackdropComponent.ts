import { Component, TemplateRef } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-backdrop.html'
})
export class ModalBackdropComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      backdrop: false
    });
  }
}
