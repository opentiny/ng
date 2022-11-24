import { Component } from '@angular/core';
import { TiMessageService } from '@opentiny/ng';

@Component({
  templateUrl: './message-content.html'
})
export class MessageContentComponent {
  constructor(private tiMessage: TiMessageService) {}
  showString(): void {
    this.tiMessage.open({
      // v10.1.3及之前的版本存在XSS攻击(html类型)风险, v10.1.4 版本做了安全处理，已不存在XSS攻击风险，建议业务尽快升级版本。
      content: '<span>this is a message</span>'
    });
  }
  showTemplate(content: string): void {
    this.tiMessage.open({
      content,
      context: {
        contentName: 'ng-template content'
      }
    });
  }
  showComp(): void {
    this.tiMessage.open({
      content: TestComponent,
      context: {
        contentName: 'component'
      }
    });
  }
}

// 弹框内部内容组件定义
@Component({
  template: `
    <span>I'm a {{ contentName }} msg!</span>
  `
})
export class TestComponent {
  contentName: string = '';
}
