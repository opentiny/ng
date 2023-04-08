import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { TiIntroRef, TiIntroService, TiIntroStep } from '@opentiny/ng';

@Component({
  templateUrl: './intro-basic.html'
})
export class IntroBasicComponent implements AfterViewInit {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  @ViewChild('introStep3', { static: true }) introStep3: ElementRef;
  @ViewChild('introStep4', { static: true }) introStep4: ElementRef;

  @ViewChild('step3Tem', { static: true }) public step3Tem: TemplateRef<any>;

  constructor(private TiIntro: TiIntroService) {}

  intro: TiIntroRef;

  ngAfterViewInit(): void {
    const steps: Array<TiIntroStep> = [
      // 第一步没有指定element，则以弹窗的形式呈现
      {
        step: 0,
        title: '总览页标题',
        content: '总览页内容'
      },
      {
        element: this.introStep1.nativeElement,
        step: 1,
        title: '第一条标题',
        content: '可通过 position 属性设置提示的位置：此处设置为bottom-left',
        position: 'bottom-left'
      },
      {
        element: this.introStep2.nativeElement,
        step: 2,
        title: '第二条标题',
        content: '可通过 shape 属性设置高亮区域的形状： 此处设置为圆形',
        shape: 'circle'
      },
      {
        element: this.introStep3.nativeElement,
        step: 3,
        title: '第三条标题',
        content: this.step3Tem,
        position: 'left'
      },
      {
        element: this.introStep4.nativeElement,
        step: 4,
        title: '第四条标题',
        content: '第四条内容'
      }
    ];

    this.intro = this.TiIntro.create({
      id: 'intro_id',
      steps,
      skipable: true // 可配置是否显示跳过按钮
    });
  }

  start(): void {
    this.intro.start();
  }
}
