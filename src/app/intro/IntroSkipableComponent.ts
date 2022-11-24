import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TiIntroRef, TiIntroService, TiIntroStep } from '@opentiny/ng';

@Component({
  templateUrl: './intro-skipable.html',
})
export class IntroSkipableComponent implements AfterViewInit {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  @ViewChild('introStep3', { static: true }) introStep3: ElementRef;
  constructor(private TiIntro: TiIntroService) {}
  intro: TiIntroRef;
  ngAfterViewInit(): void {
    const steps: Array<TiIntroStep> = [
      {
        element: this.introStep1.nativeElement,
        step: 0,
        title: '第一条标题',
        content: '第一条内容',
        position: 'bottom-left',
      },
      {
        element: this.introStep2.nativeElement,
        step: 1,
        title: '第二条标题',
        content: '第二条内容',
        position: 'bottom-left',
      },
      {
        element: this.introStep3.nativeElement,
        step: 2,
        title: '第三条标题',
        content: '第三条内容',
        position: 'left',
      },
    ];

    this.intro = this.TiIntro.create({
      id: 'intro_id',
      steps,
      skipable: true,
    });

    /**
     * 此处使用延时，是因为组件示例的component和展示源码的tabs组件是兄弟元素，
     * 组件ViewInit被调用时，tabs没有渲染完成，页面高度没有完全被撑开，遮罩层的高度不足
     * 实际业务不需要setTimeout
     */
    setTimeout(() => {
      this.intro.start();
    }, 0);
  }

  start(): void {
    this.intro.start();
  }
}
