import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TiOverflowService } from '@opentiny/ng';

@Component({
  templateUrl: './overflow-service.html',
  styles: [
    `
      .test1 {
        max-width: 50px;
      }
      .container {
        border: 1px solid #000;
        width: 70px;
        height: 60px;
      }
      .child {
        max-width: calc(100% - 20px);
        border: 1px solid #000;
        box-sizing: border-box;
      }
    `,
  ],
})
export class OverflowServiceComponent implements OnInit {
  @ViewChild('ele1', { static: true }) ele1: ElementRef;
  @ViewChild('ele2', { static: true }) ele2: ElementRef;
  @ViewChild('ele3', { static: true }) ele3: ElementRef;
  @ViewChild('ele4', { static: true }) ele4: ElementRef;
  constructor(private overflowService: TiOverflowService) {}
  ngOnInit(): void {
    this.overflowService.create(this.ele1.nativeElement);
    this.overflowService.create(this.ele2.nativeElement, {
      tipPosition: 'right',
      tipContent: 'my tip define with aa',
      tipMaxWidth: '100px',
    });
    this.overflowService.create(this.ele3.nativeElement, {
      tipElement: this.ele4.nativeElement,
      tipPosition: 'right',
    });
  }
}
