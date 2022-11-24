import { Component, OnInit } from '@angular/core';
import { TiModalService } from '@opentiny/ng';
@Component({
  template: `
    <h1>子菜单 1.2 的内容</h1>
    <ng-template #myModal let-context="context">
      <ti-modal-header>弹窗标题</ti-modal-header>
      <ti-modal-body>
      <div>弹窗内容</div>
      </ti-modal-body>
      <ti-modal-footer>
        <button type="button" color="danger" (click)="context.close()" tiButton>确定</button>
      </ti-modal-footer>
    </ng-template>
    <button (click) = 'show(myModal)' tiButton>显示弹窗</button>
  `
})
export class Router12Component {
  constructor(private tiModal: TiModalService) { }
  show(content: string): void {
    this.tiModal.open(content, {
      modalClass: 'modal-class'
    });
  }
}
