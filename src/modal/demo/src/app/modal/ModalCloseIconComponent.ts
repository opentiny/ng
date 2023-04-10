import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-close-icon.html'
})
export class ModalCloseIconComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: string): void {
    this.tiModal.open(content, {
      closeIcon: false
    });
  }
}
