import { Component } from '@angular/core';
import { TiMessageService } from '@opentiny/ng';

@Component({
  templateUrl: './message-btn.html'
})
export class MessageBtnComponent {
  constructor(private tiMessage: TiMessageService) {}
  showMsg(): void {
    const modalInstance: any = this.tiMessage.open({
      content: 'this is a message',
      close: (): void => {},
      okButton: {
        show: true,
        disabled: false,
        primary: true,
        text: '确定',
        autofocus: true,
        click: (): void => {
          // 在这里可以添加你的业务代码
          // 使用按钮自定义click时，需要显式调用close或者dismiss
          modalInstance.close();
        }
      },
      cancelButton: {
        // 取消按钮的设置和okbutton的属性设置是一致的，参考okbutton设置即可。
        show: false // 是否显示，默认是true
      }
    });
  }

  showMsg1(): void {
    const modalInstance: any = this.tiMessage.open({
      content: 'this is a message',
      close: (): void => {},
      okButton: {
        show: true
      },
      cancelButton: {
        show: true,
        disabled: true,
        primary: false,
        text: '取消',
        autofocus: false,
        click: (): void => {
          modalInstance.close();
        }
      }
    });
  }
}
