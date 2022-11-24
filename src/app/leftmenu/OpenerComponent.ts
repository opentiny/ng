import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    template:  `
      <div>
        <h1>恶意攻击网站</h1>
        <h3>opener类型安全漏洞</h3>
        <p>如果在项目中需要 打开新标签 进行跳转一般会有两种方式</p>
        <p>1) HTML -> a标签， target = _blank</p>
        <p>2) JS  -> window.open('')</p>
        <p>这两种方式看起来没有问题，但是存在漏洞。通过这两种方式打开的页面可以使用 window.opener 来访问源页面的 window 对象。
           场景：A 页面通过 a标签 或 window.open 方式，打开 B 页面。但是 B 页面存在恶意代码如下：
           window.opener.location.replace('') 【此代码仅针对打开新标签有效】
           此时，用户正在浏览新标签页，但是原来网站的标签页已经被导航到了其他页面。
           恶意网站可以伪造一个足以欺骗用户的页面，使得进行恶意破坏。
           即使在跨域状态下 opener 仍可以调用 location.replace 方法。</p>
      </div>
      <demo-log [logs]="myLogs"></demo-log>
    `
})
export class OpenerComponent implements OnInit {
  myLogs: Array<string> = [];
  ngOnInit(): void {
    try {
      window.opener.location.replace('');
    } catch (error) {
      if (error.name === 'TypeError') {
        this.myLogs = [...this.myLogs, `已做安全处理：已经将 opner 赋值为 null，这里无法拿到 opener 的引用`];
      }
    }
  }
}
