import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-esc.html'
})
export class ModalEscComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: string): void {
    this.tiModal.open(content, {
      closeOnEsc: false
    });
  }
}
