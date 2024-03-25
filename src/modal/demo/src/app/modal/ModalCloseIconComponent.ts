import { Component, TemplateRef } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-close-icon.html'
})
export class ModalCloseIconComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      closeIcon: false
    });
  }
}
