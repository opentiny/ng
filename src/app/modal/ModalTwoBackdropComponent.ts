import { ChangeDetectorRef, Component } from '@angular/core';
import { TestComponent } from './TestComponent';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-two-backdrop.html',
})
export class ModalTwoBackdropComponent {
  constructor(
    private tiModal: TiModalService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}
  myModal: TestComponent;
  show(): void {
    this.tiModal.open(TestComponent, {
      id: 'myModal',
      backdrop: false, // 第一个弹窗没有遮罩
    });
    setTimeout(() => {
      this.tiModal.open(TestComponent, {
        id: 'myModalId',
        backdrop: true, // 第二个弹窗有遮罩
      });
      // onpush模式需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
    }, 0);
  }
}
