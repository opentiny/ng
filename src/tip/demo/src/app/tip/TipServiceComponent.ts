import { Component, ElementRef, ViewChild } from '@angular/core';
import { TiTipRef, TiTipService, TiTipShowInfo } from '@opentiny/ng';

@Component({
  templateUrl: './tip-service.html'
})
export class TipServiceComponent {
  private tipInstance: TiTipRef; // tip组件实例
  private tipShowState: boolean = false; // tip显示状态标志位
  @ViewChild('button') buttonRef: ElementRef;
  constructor(private tipService: TiTipService) {}
  ngAfterViewInit(): void {
    this.tipService.create(this.buttonRef.nativeElement, {
      position: 'right',
      trigger: 'mouse', // 需要与 showFn 结合使用；指定触发 tip 显示的方式
      showFn: (): TiTipShowInfo => {
        // 设置为 'mouse' 时的显示函数，返回值类型为 TiTipShowInfo
        return { content: 'tip content', context: {} };
      }
    });
  }
  onClick($event: any): void {
    if (!this.tipInstance) {
      // 生成tip实例：通过调用tipService的create方法生成
      this.tipInstance = this.tipService.create($event.target, {
        position: 'right'
      });
    }

    // tip实例已生成情况下，切换tip提示的显示状态
    this.toggleTip();
  }
  toggleTip(): void {
    if (!this.tipShowState) {
      this.tipInstance.show('tip content'); // 显示tip提示，并定义其内容为'tip content'
      this.tipShowState = true; // 设置tip显示状态标志位
    } else {
      this.tipInstance.hide(); // 隐藏tip提示
      this.tipShowState = false; // 重置tip显示状态标志位
    }
  }
}
