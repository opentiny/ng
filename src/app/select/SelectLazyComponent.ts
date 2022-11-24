import { ChangeDetectorRef, Component } from '@angular/core';
import { TiSelectComponent } from '@opentiny/ng';

@Component({
  templateUrl: './select-lazy.html',
})
export class SelectLazyComponent {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {}
  options: Array<any> = [];
  value: any;
  onBeforeOpen(selectComp: TiSelectComponent): void {
    // 模拟懒加载场景
    setTimeout(() => {
      this.options = [
        { label: '美国' },
        { label: '巴西' },
        { label: '加拿大' },
        { label: '中国' },
        { label: '法国' },
        { label: '德国' },
        { label: '日本' },
        { label: '韩国' },
        { label: '土耳其' },
        { label: '大不列颠和北爱兰联合王国' },
      ];

      this.value = this.options[0];
      selectComp.open();
      // 主动触发脏值检测，更新数据
      this.changeDetectorRef.markForCheck();
    }, 300);
  }
}
