import { Component } from '@angular/core';
import { TiMessageService } from '@opentiny/ng';

@Component({
  templateUrl: './message-content.html'
})
export class MessageContentComponent {
  constructor(private tiMessage: TiMessageService) {}
  showString(): void {
    this.tiMessage.open({
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
  template: ` <span>I'm a {{ contentName }} msg!</span> `
})
export class TestComponent {
  contentName: string = '';
}
