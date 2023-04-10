import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TiMessageService } from '@opentiny/ng';

@Component({
  templateUrl: './message-security.html'
})
export class MessageSecurityComponent {
  constructor(private tiMessage: TiMessageService, private domSanitizer: DomSanitizer) {}
  showString1(): void {
    this.tiMessage.open({
      // 10.1.3及之前版本该接口存在XSS攻击风险；该接口在10.1.4版本已经做了安全处理，js脚本不会执行。
      content: `<span style="color: red">hello</span><script>alert("xss")</script><img src=# onerror=alert(/xss2/) /><a href="javascript:alert('Hi a')">链接1</a><a target="_blank" href="">链接2</a>`
    });
  }

  showString2(): void {
    this.tiMessage.open({
      // 组件内部用的是Angular提供的 DomSanitizer.sanitize 方法做防XSS攻击安全处理的，它会把style设置会过滤掉，所以建议使用class的方式添加样式；
      // 如果一定要使用style方式，且能确保传入的html字符串片段是安全的，可以使用Angular提供的 DomSanitizer 上的 bypassSecurityTrustHtml 方法去掉angular的安全过滤处理。
      content: this.domSanitizer.bypassSecurityTrustHtml(`<span style="color: red">hello</span><a target="_blank" href="">链接</a>`)
    });
  }
}
