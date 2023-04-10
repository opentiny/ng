import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TiModalRef, TiModalService } from '@opentiny/ng';

@Component({
  templateUrl: './modal-content-comp.html'
})
export class ModalContentCompComponent {
  constructor(private tiModal: TiModalService) {}
  myLogs: Array<string> = [];
  show(): void {
    this.tiModal.open(ModalTestComponent, {
      id: 'myModal1', // 定义id防止同一页面出现多个相同弹框
      // 弹框内容组件上下文属性定义
      context: {
        name: 'component',
        bodyText: 'component modal body',
        outputs: {
          // 输出属性定义在这里
          buttonClick: (): void => {
            this.myLogs = [...this.myLogs, 'buttonClick事件'];
          }
        }
      },
      close: (modalRef: TiModalRef): void => {},
      dismiss: (modalRef: TiModalRef): void => {}
    });
  }
}

// 组件定义，此处为了示例方便呈现写在一个文件，业务请新建文件定义组件
@Component({
  template: `
    <ti-modal-header>
      <span>I'm a {{ name }} modal!</span>
    </ti-modal-header>
    <ti-modal-body>
      {{ bodyText }}
      <button type="button" tiButton (click)="onClick()">点击</button>
    </ti-modal-body>
    <ti-modal-footer>
      <button type="button" color="danger" (click)="close()" tiButton>OK</button>
      <button type="button" (click)="dismiss()" tiButton>Cancel</button>
    </ti-modal-footer>
  `
})
export class ModalTestComponent {
  // 组件对外接口，modal可通过context属性设置/获取这些接口属性
  @Input() bodyText: string = '';
  @Input() name: string = '';
  @Output() readonly buttonClick: EventEmitter<any> = new EventEmitter();
  // 模板中实际调用的是Modal服务提供的close和dismiss方法，并非此处定义的方法；
  // 在此处定义close和dismiss方法只是为了避免生产环境打包时报错
  close(): void {}
  dismiss(): void {}
  onClick(): void {
    this.buttonClick.emit();
  }
}
