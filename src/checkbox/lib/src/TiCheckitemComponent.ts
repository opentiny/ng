/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  IterableDiffer,
  IterableDiffers,
  Renderer2,
  SimpleChanges,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { TiCheckboxComponent } from './TiCheckboxComponent';
import { ObservableMap, ObservableSet, Util } from '@opentiny/ng-utils';

/**
 * Checkitem多选选项组件，尽管这是一个组件，使用时像属性指令。
 *
 */
@Component({
  selector: '[tiCheckitem]',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tiCheckbox: '' // 给宿主元素添加tiCheckbox属性，实现定制样式
  }
})
export class TiCheckitemComponent extends TiCheckboxComponent {
  /**
   * @ignore
   * 全局item数据(多个group的item都在这里)
   */
  public static globeCheckedMap: ObservableMap = new ObservableMap();
  /**
   * @ignore
   * 全局灰化禁用数据(多个group的item都在这里)
   */
  public static globeDisabledSet: ObservableSet = new ObservableSet();
  /**
   * 只使用 TiCheckitem 时的所有数据
   */
  @Input() item: any;
  /**
   * 只使用 TiCheckitem 时，配置选中数据
   */
  @Input() beCheckeds: Set<any> | Array<any>;
  /**
   * 指定选中项数据的键值
   */
  @Input() valueKey: string;
  private beCheckedSet: ObservableSet; // 用于存储选中的数据项。如果未配置valueKey，则存储的是整个数据项；如果指定valueKey，则存储的值基于选中项。
  private beCheckedsDiffer: IterableDiffer<any>;
  constructor(
    protected hostRef: ElementRef,
    protected renderer: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    protected iterableDiffers: IterableDiffers
  ) {
    // 是因为group item两个子类都用到differs，所以放在父类这里。
    super(hostRef, renderer, changeDetectorRef);
  }
  /**
   * @ignore
   * 监听change事件，会多触发一次DoCheck。 //TODO: 不让这条HostListener('change', ['$event'])在文档显示
   * @param checked
   * @returns
   */
  @HostListener('change', ['$event']) public onHostChange(checked: any): void {
    // item checked同步到globeCheckedSet
    if (!this.item) {
      return;
    }

    this.nativeElement.checked
      ? TiCheckitemComponent.globeCheckedMap.set(this.item, true, this)
      : this.nativeElement.indeterminate
      ? TiCheckitemComponent.globeCheckedMap.set(this.item, null, this)
      : TiCheckitemComponent.globeCheckedMap.set(this.item, false, this);
    // item checked同步到beCheckedSet
    if (this.beCheckedSet) {
      const value: any = this.getValue(this.item);
      this.nativeElement.checked ? this.beCheckedSet.add(value) : this.beCheckedSet.delete(value);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initBeCheckedSet();
    if (!this.item) {
      // 用户忘了设定，或者继承的子类无需设定
      return;
    }
    this.initGlobeCheckedSetItem();
    this.setCheckedItem();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    // 外部直接给item重新赋值了。
    if (changes['item'] && !changes['item'].isFirstChange()) {
      // 删除已使用的静态资源。当然，这里有可能误删除。因为此item还在别处使用。   全选按钮那里，有纠正机制。
      this.deleteGlobeRef(changes['item'].previousValue);
      // 添加新的资源
      this.setCheckedItem();
      // 重新设置disabled
      this.setDisabledStateGlobe();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // 删除已使用的静态资源
    this.deleteGlobeRef(this.item);
    // 解除监听
    TiCheckitemComponent.globeCheckedMap.removeObserver(this.globeCheckedMapObserverItemFn);
  }

  // 删除已使用的静态资源
  private deleteGlobeRef(item: any): void {
    TiCheckitemComponent.globeCheckedMap.delete(this.item);
    TiCheckitemComponent.globeDisabledSet.delete(this.item);
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    if (!this.beCheckedSet) {
      return;
    }
    const beCheckedsChanges = this.beCheckedsDiffer.diff(this.beCheckeds);
    if (beCheckedsChanges) {
      // beCheckeds同步到beCheckedSet
      beCheckedsChanges.forEachAddedItem((record) => {
        this.beCheckedSet.add(record.item);
      });
      beCheckedsChanges.forEachRemovedItem((record) => {
        this.beCheckedSet.delete(record.item);
      });
    }
  }
  private initBeCheckedSet(): void {
    if (!this.beCheckeds) {
      return;
    }
    this.beCheckedsDiffer = this.iterableDiffers.find(this.beCheckeds).create(null);
    this.beCheckedSet = new ObservableSet(this.beCheckeds); // TODO:写共用的Array/Set转Set
    this.beCheckedSet.addObserver((item: any, isAdd: boolean) => {
      // beCheckedSet的变化同步到beCheckeds
      if (this.beCheckeds instanceof Set) {
        isAdd ? this.beCheckeds.add(item) : this.beCheckeds.delete(item);
      } else if (this.beCheckeds instanceof Array) {
        // TODO:写公用的Array remove函数
        const index: number = this.beCheckeds.indexOf(item);
        if (isAdd && index === -1) {
          this.beCheckeds.push(item);
        } else if (!isAdd && index !== -1) {
          this.beCheckeds.splice(index, 1);
        }
      }
      // checkedSet通知到item checked
      this.setCheckedItem();
    });
  }
  /**
   * globeCheckedSet同步到item checked
   */
  private initGlobeCheckedSetItem(): void {
    // 初始化时，不往globeCheckedSet放值，是因为group优先级更高。
    TiCheckitemComponent.globeCheckedMap.addObserver(this.globeCheckedMapObserverItemFn);
  }

  private globeCheckedMapObserverItemFn = (item: any, value: any, isAdd: boolean, from: any) => {
    if (from !== this && item === this.item && isAdd) {
      // 从全局同步过来的，可能是半选
      const lastChecked = this.nativeElement.checked;
      const lastIndeterminate = this.nativeElement.indeterminate === true ? true : false; // 将undefined也转为false。
      this.nativeElement.checked = value === true;
      this.nativeElement.indeterminate = value === null;
      if (this.nativeElement.checked !== lastChecked || this.nativeElement.indeterminate !== lastIndeterminate) {
        Util.trigger(this.nativeElement, 'change'); // 必须主动触发change事件，否则ngModel不更新。
      }
    }
  };
  private setCheckedItem(): void {
    if (!this.item) {
      return;
    }
    const lastChecked: boolean = this.nativeElement.checked;
    const value: any = this.getValue(this.item);
    // 如果beCheckeds存在，优先级更高，以beCheckeds为准。
    this.nativeElement.checked = this.beCheckedSet ? this.beCheckedSet.has(value) : TiCheckitemComponent.globeCheckedMap.get(this.item);
    // 这里应该不用考虑半选吧？
    if (this.nativeElement.checked !== lastChecked) {
      Util.trigger(this.nativeElement, 'change'); // 必须主动触发change事件，否则ngModel不更新。
    }
  }
  /**
   * @ignore
   */
  setDisabledState?(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.setDisabledStateGlobe();
  }

  private setDisabledStateGlobe(): void {
    this.nativeElement.disabled
      ? TiCheckitemComponent.globeDisabledSet.add(this.item)
      : TiCheckitemComponent.globeDisabledSet.delete(this.item);
  }
  /**
   * 输入：某个数据项
   * 输出：当有valueKey,返回值基于valueKey；当没有valueKey时，返回输入值
   */
  protected getValue(item: any): any {
    return this.valueKey ? item[this.valueKey] : item;
  }
}
