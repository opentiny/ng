import { Component, TemplateRef } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-header-align.html'
})
export class ModalHeaderAlignComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      headerAlign: 'center'
    });
  }
}
