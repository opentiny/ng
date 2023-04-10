import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TiIntroRef, TiIntroService, TiIntroStep } from '@opentiny/ng';

@Component({
  templateUrl: './intro-event.html'
})
export class IntroEventComponent implements AfterViewInit {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  @ViewChild('introStep3', { static: true }) introStep3: ElementRef;
  @ViewChild('introStep4', { static: true }) introStep4: ElementRef;

  constructor(private TiIntro: TiIntroService) {}

  intro: TiIntroRef;
  myLogs: Array<string> = [];

  ngAfterViewInit(): void {
    const steps: Array<TiIntroStep> = [
      {
        step: 0,
        title: '第一条标题',
        content: '第一条内容'
      },
      {
        element: this.introStep2.nativeElement,
        step: 1,
        title: '第二条标题',
        content: '第二条内容'
      },
      {
        element: this.introStep3.nativeElement,
        step: 2,
        title: '第三条标题',
        content: '第三条内容',
        position: 'left'
      },
      {
        element: this.introStep4.nativeElement,
        step: 3,
        title: '第四条标题',
        content: '第四条内容'
      }
    ];

    this.intro = this.TiIntro.create({
      steps,
      finishButtonText: '马上开始',
      beforeStep: (introRef: TiIntroRef, currentNumber: number): void => {
        this.myLogs = [...this.myLogs, `beforeStep：即将进入新手引导的${currentNumber}步`];
        introRef.proceed();
      },
      onFinish: (): void => {
        this.myLogs = [...this.myLogs, 'onFinish：看完所有引导信息'];
      },
      onExit: (): void => {
        this.myLogs = [...this.myLogs, 'onExit：退出引导'];
      },
      skipable: true
    });
  }

  start(): void {
    this.intro.start();
  }
}
