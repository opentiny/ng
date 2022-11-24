import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TiIntroRef, TiIntroService, TiIntroStep } from '@opentiny/ng';

@Component({
  templateUrl: './intro-modal.html',
})
export class IntroModalComponent implements AfterViewInit {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  @ViewChild('introStep3', { static: true }) introStep3: ElementRef;

  constructor(private TiIntro: TiIntroService) {}
  intro: TiIntroRef;

  ngAfterViewInit(): void {
    const steps: Array<TiIntroStep> = [
      {
        step: 0,
        title: '总览页标题',
        content: '总览页内容',
      },
      {
        element: this.introStep1.nativeElement,
        step: 1,
        title: '第一条标题',
        content: '第一条内容',
        position: 'bottom-left',
      },
      {
        element: this.introStep2.nativeElement,
        step: 2,
        title: '第二条标题',
        content: '第二条内容',
      },
      {
        element: this.introStep3.nativeElement,
        step: 3,
        title: '第三条',
        content: '第三条内容',
        position: 'left',
      },
    ];

    this.intro = this.TiIntro.create({
      steps,
    });

    this.intro.start();
  }

  start(): void {
    this.intro.start();
  }
}
