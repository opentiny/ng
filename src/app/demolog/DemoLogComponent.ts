import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ElementRef, Input, SimpleChanges, ViewChild
} from '@angular/core';

@Component({
  selector: 'demo-log',
  templateUrl: './log.html',
  styleUrls: ['./log.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoLogComponent {

  @Input() logs: Array<any>;
  @ViewChild('log', { static: true }) logRef: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['logs']) {
      // 手动更新一次视图，使可以滚动到最底部
      this.changeDetectorRef.detectChanges();
      this.logRef.nativeElement.scrollTop = 100000;
    }
  }
}
