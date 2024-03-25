import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-class.html',
  styles: ['.modal-class { width: 300px !important; }'],
  encapsulation: ViewEncapsulation.None // 要想设置的样式生效，此处必须配置成 ViewEncapsulation.None
})
export class ModalClassComponent {
  constructor(private tiModal: TiModalService) {}

  show(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      modalClass: 'modal-class'
    });
  }
}
