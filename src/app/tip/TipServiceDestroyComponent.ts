import { Component, ElementRef } from '@angular/core';
import { TiTipRef, TiTipService, TiTipShowInfo } from '@opentiny/ng';

@Component({
  templateUrl: './tip-service-destroy.html',
})
export class TipServiceDestroyComponent {
  private tipInstance: TiTipRef; // tip组件实例
  constructor(private tipService: TiTipService) {}

  addTip($event: any, target: ElementRef): void {
    if (this.tipInstance) {
      return;
    }
    // 生成tip实例：通过调用tipService的create方法生成
    this.tipInstance = this.tipService.create(target.nativeElement, {
      position: 'right',
      trigger: 'mouse',
      showFn: (): TiTipShowInfo => {
        return {
          content: '自定义tip内容',
        };
      },
    });
  }
  removeTip($event: any): void {
    if (this.tipInstance) {
      this.tipInstance.destroy();
      this.tipInstance = null;
    }
  }
}
