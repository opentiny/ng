import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  TiIntroRef,
  TiIntroService,
  TiIntroStep,
  TiMessageService,
} from '@opentiny/ng';

@Component({
  templateUrl: './intro-tiscroll.html',
})
export class IntroTiscrollComponent implements AfterViewInit {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  constructor(private TiIntro: TiIntroService, tiMessage: TiMessageService) {}
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
    ];

    this.intro = this.TiIntro.create({
      id: 'intro_id',
      steps,
    });
  }
  start(): void {
    this.intro.start();
  }
}
