import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TiIntroRef, TiIntroService, TiIntroStep } from '@opentiny/ng';

@Component({
  templateUrl: './intro-tip.html',
})
export class IntroTipComponent implements AfterViewInit {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  @ViewChild('introStep3', { static: true }) introStep3: ElementRef;
  @ViewChild('introStep4', { static: true }) introStep4: ElementRef;
  @ViewChild('introStep5', { static: true }) introStep5: ElementRef;
  @ViewChild('finish', { static: true }) finish: ElementRef;

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
      },
      {
        element: this.introStep3.nativeElement,
        step: 2,
        title: '第三条',
        content: '第三条内容',
        position: 'left',
      },
      {
        element: this.introStep4.nativeElement,
        step: 3,
        content: '第四条内容，以tip形式显示',
      },
      {
        element: this.introStep5.nativeElement,
        step: 3,
        shape: 'circle',
        content: '第五条内容，以tip形式显示',
      },
      {
        element: this.finish.nativeElement,
        step: 3,
        isAction: true, // 标识为结束该步的操作按钮
      },
    ];

    this.intro = this.TiIntro.create({
      steps,
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
