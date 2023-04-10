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
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, IterableDiffer, Output } from '@angular/core';

import { ObservableMap, ObservableSet, TiLog } from '@opentiny/ng-utils';
import { TiCheckitemComponent } from './TiCheckitemComponent';
// TODO: 有些用户提出，响应式表单里，checkgroup value没有绑定已选中数据，不方便。
/**
 * Checkgroup全选框组件，主要功能为从一数据集合中选择某几条数据，与多选组件(Select multiple)功能相同，只是数据规模和视觉呈现不同。
 *
 * 复选框组通常由一个全选框和多个子复选框构成。
 *
 */
@Component({
  selector: '[tiCheckgroup]',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tiCheckbox: '' // 给宿主元素添加tiCheckbox属性，实现定制样式
  }
})
export class TiCheckgroupComponent extends TiCheckitemComponent {
  /**
   * 复选框的全部数据
   */
  @Input() items: Array<any>;
  /**
   * 选中项数据
   */
  @Input() checkeds: Array<any> | Set<any>;
  /**
   * 选中项变化的回调事件
   */
  @Output() readonly checkedsChange: EventEmitter<Set<any> | Array<any>> = new EventEmitter<Set<any> | Array<any>>();

  private checkedMap: ObservableMap; // 储存本组所有子选项状态：key：item，value：true/false/null, 全选/不选/半选
  private disabledSet: ObservableSet = new ObservableSet(); // 储存本组所有禁用的子选项

  private itemsDiffer: IterableDiffer<any>;
  private checkedsDiffer: IterableDiffer<any>;

  /**
   * @ignore
   * 监听change事件，会多触发一次DoCheck。
   * @param checked 原生change事件选中状态：全选，全不选
   */
  @HostListener('change', ['$event']) public onHostChange(checked: any): void {
    super.onHostChange(checked);
    if (this.nativeElement.checked === true) {
      // 全选
      this.checkAll(true);
    } else if (this.nativeElement.indeterminate === true) {
      // 半选情况，不作处理。
    } else {
      // 全不选
      this.checkAll(false);
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initCheckedMap();
    this.initGlobeCheckedMap();
    this.initDisabledSet();
    this.setChecked();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // 解除监听
    TiCheckitemComponent.globeCheckedMap.removeObserver(this.globeCheckedMapObserverFn);
    TiCheckitemComponent.globeDisabledSet.removeObserver(this.globeDisabledSetObserverFn);
  }

  ngDoCheck(): void {
    super.ngDoCheck();
    // 【1】[items][checkeds] →  checkedMap
    const itemsChanges: any = this.itemsDiffer.diff(this.items);
    const checkedsChanges: any = this.checkedsDiffer.diff(this.checkeds);
    if (checkedsChanges) {
      checkedsChanges.forEachAddedItem((record) => {
        const item: any = this.getItem(record.item);
        if (this.items.includes(item)) {
          this.checkedMap.set(item, true, this.checkeds);
        } else {
          // 正常不会走到这里
          this.checkedMap.delete(item, this.checkeds);
          // 表格需求：允许用户设置的checkeds，范围大于items。所以会走到这里
        }
      });
      checkedsChanges.forEachRemovedItem((record) => {
        const item: any = this.getItem(record.item);
        if (this.items.includes(item)) {
          if (this.checkedMap.get(item) === true || this.checkedMap.get(item) === undefined) {
            this.checkedMap.set(item, false, this.checkeds);
          }
        } else {
          this.checkedMap.delete(item, this.checkeds);
        }
        // 强调：如果子选项是半选状态null，就不再置false了。
        // 规律：父节点，不会下达让子节点由null到false的指令。父节点，只会下达让节点由null到true的指令。
        // 注意：在树型结构中，外界@Input checkeds不能强制指定某个半选节点，变为不选。（checkeds中去除某个节点，此节点保持半选不变。）
      });
    }
    // 将每次的变化，合入到全局变量中。因为多出来的项目，可能是刚才使用过的，所以需要重新赋值
    if (itemsChanges) {
      itemsChanges.forEachAddedItem((record) => {
        // Map中没有此项，会返回undefined
        if (this.checkedMap.has(record.item)) {
          //  初始化为什么会走到这里？本以为没有代码可以走到这里
          // 【5】checkedMap→globeCheckedMap
          TiCheckitemComponent.globeCheckedMap.set(record.item, this.checkedMap.get(record.item), this.checkedMap);
        } else {
          // 表格需求：checkeds允许范围比items更大。所以，根据checkeds来给checkedMap设置。
          let isChecked: boolean = false;
          const value = this.getValue(record.item);
          if (this.checkeds instanceof Array) {
            isChecked = this.checkeds.includes(value);
          } else if (this.checkeds instanceof Set) {
            isChecked = this.checkeds.has(value);
          }
          this.checkedMap.set(record.item, isChecked, this.checkeds);
          if (TiCheckitemComponent.globeDisabledSet.has(record.item)) {
            this.disabledSet.add(record.item);
          } else {
            this.disabledSet.delete(record.item);
          }
        }
      });
      itemsChanges.forEachRemovedItem((record) => {
        this.checkedMap.delete(record.item, this.checkeds); // from标志从checkeds来，所以词条checkedMap变化，并未同步到checkeds。
        // 注意：会造成checkeds范围大于items
        this.disabledSet.delete(record.item);
      });
    }
    if (checkedsChanges || itemsChanges) {
      // 【3】checkedMap →  Group checked
      this.setChecked(); // 设置全选状态。本地checkedMap变化，元素很多，但只初始化一次。
    }
    // 发出事件：checkeds改变
    if (checkedsChanges) {
      /**
       * checkedsChange 回调中同步修改其他数据会报错，影响正常功能，所以需要延时，
       * 为什么不使用setTimout而使用Promise，Promise.then 是微任务，比setTimout(宏任务)先执行，想尽量早emit事件
       * 宏任务和微任务：https://juejin.cn/post/6844903657264136200
       * 扩展：ngDoCheck,ngAfterViewChecked中emit事件，在事件回调中同步修改数据，都存在同样问题。
       */
      Promise.resolve(null).then(() => {
        this.checkedsChange.emit(this.checkeds);
      });
    }
  }
  private initCheckedMap(): void {
    // 监听items和checkeds
    this.itemsDiffer = this.iterableDiffers.find(this.items).create(null);
    this.checkedsDiffer = this.iterableDiffers.find(this.checkeds).create(null);
    this.checkedMap = new ObservableMap();
    this.items.forEach(
      // 【1】[items][checkeds] →  checkedMap
      (item) => {
        let isChecked: boolean = false;
        const value: any = this.getValue(item);
        if (this.checkeds instanceof Array) {
          isChecked = this.checkeds.includes(value);
        } else if (this.checkeds instanceof Set) {
          isChecked = this.checkeds.has(value);
        }
        if (isChecked) {
          // 选中态，直接添加
          this.checkedMap.set(item, true, this.checkeds);
        } else if (this.checkedMap.get(item) === true || this.checkedMap.get(item) === undefined) {
          // 初始化
          this.checkedMap.set(item, false, this.checkeds);
          // 强调：如果子选项是半选状态null，就不再置false了。
          // 规律：父节点，不会下达让子节点由null到false的指令。父节点，只会下达让节点由null到true的指令。
          // 注意：在树型结构中，外界@Input checkeds不能强制指定某个半选节点，变为不选。（checkeds中去除某个节点，此节点保持半选不变。）
        }
      }
    );

    this.checkedMap.addObserver((item: any, value: any, isAdd: boolean, from: any) => {
      // 有多个来源：chekceds，（items），checkall，globe
      // 不是从checkeds来的，就要同步到chekeds
      if (from !== this.checkeds) {
        // 【2】checkedMap- >[checkeds]
        const isChecked: boolean = isAdd && this.checkedMap.get(item);
        const newItem: any = this.getValue(item);
        if (this.checkeds instanceof Set) {
          isChecked ? this.checkeds.add(newItem) : this.checkeds.delete(item);
        } else if (this.checkeds instanceof Array) {
          // TODO:写公用的Array remove函数
          const index: number = this.checkeds.indexOf(newItem);
          if (isChecked && index === -1) {
            this.checkeds.push(newItem);
          } else if (!isChecked && index !== -1) {
            this.checkeds.splice(index, 1);
          }
        }
      }
      // 不是从全局来的，就要同步到全球。
      if (from !== TiCheckitemComponent.globeCheckedMap) {
        // 【5】checkedMap→globeCheckedMap
        TiCheckitemComponent.globeCheckedMap.set(item, value, this.checkedMap);
      }
      // 从全局来的，需要更新全选状态。（树形结构层级较多，需要这个逻辑）
      if (from === TiCheckitemComponent.globeCheckedMap) {
        // 【3】checkedMap →  Group checked
        this.setChecked();
      }
    });
  }
  private initGlobeCheckedMap(): void {
    // checkedMap以group端优先，disabled以item端优先。
    // checkedMap同步加入到globeCheckedMap
    this.checkedMap.getMap().forEach((item) => {
      // 【5】checkedMap→globeCheckedMap
      TiCheckitemComponent.globeCheckedMap.set(item[0], item[1], this.checkedMap);
    });
    // 监听globecheckedMap
    TiCheckitemComponent.globeCheckedMap.addObserver(this.globeCheckedMapObserverFn);
  }
  private initDisabledSet(): void {
    // 【7】globeDisabledSet→disabledSet，并监听
    this.items.forEach((item) => {
      TiCheckitemComponent.globeDisabledSet.has(item) ? this.disabledSet.add(item) : this.disabledSet.delete(item);
    });
    // 【7】globeDisabledSet→disabledSet，监听globeDisabledSet
    TiCheckitemComponent.globeDisabledSet.addObserver(this.globeDisabledSetObserverFn);
    // 【8】disabledSet→Group checked
    this.disabledSet.addObserver((item: any, isAdd: boolean, from: any) => {
      // 从全局disabledSet而来，说明是用户点击改变disabled，需要重新判断全选状态。
      if (from === TiCheckitemComponent.globeDisabledSet) {
        this.setChecked();
      }
      // 如果是从其他地方而来，是从docheck diff而来。内部有setsetChecked，不用主动调用。
    });
  }
  /**
   * 【6】globeCheckedMap→checkedMap
   */
  private globeCheckedMapObserverFn = (item: any, value: any, isAdd: boolean, from: any) => {
    if (from !== this.checkedMap && this.items.includes(item)) {
      // 同步globe的改变到本地
      if (isAdd) {
        this.checkedMap.set(item, value, TiCheckitemComponent.globeCheckedMap);
      } else {
        // !isAdd. 如果globe删除了某项，但这项属于自己的子项，那么把这一项添加回globe。（场景：子项item动态改变，并未销毁，却触发了全局delete）
        TiCheckitemComponent.globeCheckedMap.set(item, this.checkedMap.get(item), this.checkedMap);
      }
    }
  };
  /**
   * 【7】globeDisabledSet→disabledSet
   */
  private globeDisabledSetObserverFn = (item: any, isAdd: boolean) => {
    if (isAdd && this.items.includes(item)) {
      this.disabledSet.add(item, TiCheckgroupComponent.globeDisabledSet);
    } else if (!isAdd) {
      this.disabledSet.delete(item, TiCheckgroupComponent.globeDisabledSet);
    }
  };
  /**
   * 设置本group全选框的状态 【3】checkedMap →  Group checked
   */
  private setChecked(): void {
    this.checked(this.getCheckedStatus());
  }
  /**
   * 规则一：disabled状态的复选框不影响全选状态，所以需要将其从统计信息中过滤
   * 例如有3个复选框，前两个为选中状态，最后一个是disabled，则认为整体为全部选中状态
   * 所以无需关心disabled复选框的选中状态，只需关心非disabled状态即可
   * 规则二：但当子复选框全部是disabled状态时，将会影响全选的状态
   * @returns 全选：true，全不选：false，半选：null
   */
  private getCheckedStatus(): boolean {
    if (this.items.length === 0) {
      // 情景零：没有选项
      return false;
    }
    // 用户可勾选项目数
    let checkedableNum = this.items.length - this.disabledSet.size;
    const isTotalCount = this.disabledSet.size === 0 || checkedableNum === 0; // 全部可用，或者全部禁用。所有选项进入统计。
    if (checkedableNum === 0) {
      // 如果全部禁用，那么所有选项都计入统计。
      checkedableNum = this.items.length;
    }
    let checkedNum = 0; // 选中项数目（非禁用）
    let notCheckedNum = 0; // 未选项数目（非禁用）
    for (const item of this.items) {
      if (isTotalCount || !this.disabledSet.has(item)) {
        // 全部进入统计，或者未禁用项进入统计。
        switch (this.checkedMap.get(item)) {
          case true:
            checkedNum++;
            break;
          case false:
            notCheckedNum++;
            break;
          case null:
            return null; // 只要有一个子选项是半选，那么结果是半选。
          default:
            // 不会走到这里
            TiLog.error('getCheckedStatus(),can not reach code, items item is not in checkedMap');
            break;
        }
        if (checkedNum !== 0 && notCheckedNum !== 0) {
          // 有选中，有不选中，所以半选。
          return null; // 半选
        } else if (checkedNum === checkedableNum) {
          return true;
        } else if (notCheckedNum === checkedableNum) {
          return false;
        }
      }
    }
    return false;
  }
  /**
   *  设置全选框的状态值
   * 【4】Group checked →  checkedMap
   * @param checked
   */
  private checkAll(checked: boolean): void {
    this.items.forEach((item) => {
      if (!this.disabledSet.has(item)) {
        // 【4】Group checked →  checkedMap
        this.checkedMap.set(item, checked, this.checkAll);
      }
    });
  }
  /**
   * 输出：得到整个item对象
   * @param value item对象或者数据的身份标识
   *
   */
  private getItem(value: any): any {
    for (const obj of this.items) {
      if (obj === value || obj[this.valueKey] === value) {
        return obj;
      }
    }

    return null;
  }
}
/*
需求：Group checked，Item checked，[(checkedSet)]三者其一改变，都要通知其他二者。所以采用中介者模式。

版本一：Tiny2,中介者是[(checkedSet)]，但要求Item也去绑定[(groupCheckedSet)]

                           Group checked    ←  disabledSet
                                     ↕                               ↑
[dataArray]         [checkedSet]            groupDisabledSet
                                     ↕                               ↑
                            Item checked             Item disabled

版本二：中介者是全局变量globeCheckedSet，不要求Item绑定其他变量。

                          Group checked   ←   disabledSet
[dataArray]                   ↕                              ↑
[(checkedSet)]↔globeCheckedSet     globeDisabledSet
                                     ↕                              ↑
                            Item checked           Item disabled

版本三：链条传递，不要求Item绑定其他变量。

                   Group checked       ←     disabledSet
                            ↕                                         ↑
[dataArray] [checkedSet]                               ↑
                            ↕                                         ↑
                   globeCheckedSet            globeDisabledSet
                            ↕                                         ↑
                    Item checked                  Item disabled

版本四：链条传递，不要求Item绑定其他变量。但也可以绑定所属于组织选中变量。Array/Set兼容

                                    Group checked       ←     disabledSet
                                            ↕                                     ↑
            [checkeds] ↔  checkedSet                            ↑
                                            ↕                                     ↑
                                    globeCheckedSet            globeDisabledSet
                                             ↕                                     ↑
                                    Item checked                   Item disabled
                                             ↕
         [beCheckeds] ↔ beCheckedSet
版本五：链条传递，不要求Item绑定其他变量。但也可以绑定所属于组织选中变量。Array/Set兼容。
兼容Tree树形结构，子节点也有可能是半选状态。
                                                                    8
                                    Group checked       ←     disabledSet
                             1>         3↑↓4                                 ↑
 [items][checkeds] ↔  checkedMap                           ↑
                            <2          5↓↑6                                  ↑7
                                    globeCheckedMap          globeDisabledSet
                                            ↓↑                                     ↑
                                    Item checked                    Item disabled
                                            ↓↑
         [beCheckeds] ↔ beCheckedSet
*/
/*
@Input支持Set<any>|Array<any>
方案一：每次使用时，都判断类型，调用不同方法。
方案二：@Input set时，给Array绑定上has()、add()、delete()方法，但是get size怎么绑定？
方案三：Set<any>|Array，赋值给新的Set。采用
 */
/* TODO：已去除此逻辑，推测应该没有此Bug。等IE环境好了后，再测试。
              解决IE浏览器下的复选框半选状态BUG，
              BUG表现：当复选框的状态为半选状态，
                       点击复选框的时候IE浏览器会把复选框状态为  checked = false，
                       而其他浏览器会直接变成checked = true,
              http://www.xuebuyuan.com/1322692.html
              解决方案：绑定点击事件，手动更改checked状态，同时更新子复选框选中状态。
             */
