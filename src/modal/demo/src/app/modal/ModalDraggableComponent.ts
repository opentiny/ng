import { Component } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-draggable.html'
})
export class ModalDraggableComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: string): void {
    this.tiModal.open(content, {
      draggable: false
    });
  }
}
