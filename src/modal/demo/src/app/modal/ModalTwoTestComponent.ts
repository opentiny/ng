import { ChangeDetectorRef, Component } from '@angular/core';
import { TestComponent } from './TestComponent';
import { TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: 'modal-two-test.html'
})
export class ModalTwoTestComponent {
  constructor(private tiModal: TiModalService, protected changeDetectorRef: ChangeDetectorRef) {}
  myModal: TestComponent;
  show(): void {
    this.tiModal.open(TestComponent, {
      id: 'myModal'
    });
    setTimeout(() => {
      this.tiModal.open(TestComponent, {});
      // onpush模式需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
    }, 0);
  }
  showModal(): void {
    this.tiModal.open(TestComponent, {
      id: 'myModalId'
    });
    setTimeout(() => {
      this.tiModal.open(TestComponent, {
        id: 'myModalId'
      });
      // onpush模式需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
    }, 0);
  }
  showMoreModals(): void {
    setTimeout(() => {
      this.tiModal.open(TestComponent, {
        // id: 'myModal'
      });
      // onpush模式需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
    }, 0);
    setTimeout(() => {
      this.tiModal.open(TestComponent, {
        // id: 'myModal'
      });
      // onpush模式需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
    }, 0);
    setTimeout(() => {
      this.tiModal.open(TestComponent, {
        // id: 'myModal'
      });
      // onpush模式需要强制刷新，default模式不需要。
      this.changeDetectorRef.markForCheck();
      setTimeout(() => {
        console.log('close modals');
        const openedModals = this.tiModal.openedModals;
        for (let i = 0; i < openedModals.length; i++) {
          openedModals[i].dismiss();
        }
        // onpush模式需要强制刷新，default模式不需要。
        this.changeDetectorRef.markForCheck();
      }, 20000);
    }, 0);
  }
  closeOneShowAnother(): void {
    this.tiModal.open(TestComponent, {
      close: (): void => {
        setTimeout(() => {
          this.tiModal.open(TestComponent, {
            id: 'myModal'
          });
          // onpush模式需要强制刷新，default模式不需要。
          this.changeDetectorRef.markForCheck();
        }, 500); // 300ms~600ms
      }
    });
  }
}
