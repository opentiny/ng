import { Component, ChangeDetectorRef } from '@angular/core';
import { myOptions, mySelecteds } from './data.js';
@Component({
  templateUrl: './transfer-lazy.html'
})
export class TransferLazyComponent {
  constructor(protected changeDetectorRef: ChangeDetectorRef) {}
  // 设置穿梭框源数据
  myOptions: Array<any> = [];
  // 设置穿梭框初始选中项，选中项会移动到右侧面板
  mySelecteds: Array<any> = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.myOptions = JSON.parse(JSON.stringify(myOptions));
      this.mySelecteds = JSON.parse(JSON.stringify(mySelecteds));
      // OnPush模式下，需要手动更新数据
      this.changeDetectorRef.markForCheck();
    }, 1000);
  }
}
