import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TiBaseComponent, TiLeftmenuthinItem } from '@opentiny/ng';
/**
 * 原组件依赖router变化，新官网多个示例路由冲突，复写一个简单的组件去完成新官网展示
 */
@Component({
  templateUrl: './leftmenuthin-website.html',
  styleUrls: ['./leftmenuthin.less'],
  selector: 'website-leftmenuthin',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftmenuthinWebsiteComponent extends TiBaseComponent {
  @Input() active: TiLeftmenuthinItem;
  @Output() readonly activeChange: EventEmitter<TiLeftmenuthinItem> = new EventEmitter();
  @Output() readonly select: EventEmitter<TiLeftmenuthinItem> = new EventEmitter();
  @Input() reloadState: boolean = true;
  @Input() items: Array<TiLeftmenuthinItem>;
  @Output() readonly reloadStateChange: EventEmitter<boolean> = new EventEmitter();
  selectFn(item: TiLeftmenuthinItem) {
    if (this.active !== item) {
      this.activeChange.emit(item);
    } else if (this.active === item) {
      this.reloadStateChange.emit(false);
      setTimeout(() => {
        this.reloadStateChange.emit(true);
      }, 500);
    }
    this.select.emit(this.active);
  }
}
