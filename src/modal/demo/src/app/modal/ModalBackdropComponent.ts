import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-backdrop.html'
})
export class ModalBackdropComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: string): void {
    this.tiModal.open(content, {
      backdrop: false
    });
  }
}
