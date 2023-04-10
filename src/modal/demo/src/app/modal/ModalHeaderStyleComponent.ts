import { Component, TemplateRef } from '@angular/core';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: './modal-header-style.html'
})
export class ModalHeaderStyleComponent {
  constructor(private tiModal: TiModalService) {}
  modalName: string = 'aaa';
  show(content: TemplateRef<any>): void {
    this.tiModal.open(content, {
      closeIcon: false, // 隐藏上方关闭按钮
      headerAlign: 'center' // 设置头部标题居中对齐
    });
  }
}
