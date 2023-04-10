import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-header-align.html'
})
export class ModalHeaderAlignComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: string): void {
    this.tiModal.open(content, {
      headerAlign: 'center'
    });
  }
}
