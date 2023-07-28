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
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChildren
} from '@angular/core';
import { Util } from '@opentiny/ng-utils';
import { TiFormComponent, TiWholeComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
// TODO: 标签命名不规范，TiButtongroup应该对应到ti-buttongroup
/**
 * 每个选块的配置
 */
export interface TiButtonItem {
  /**
   * 选块显示的文本
   */
  text?: string;
  /**
   * 选块是否显示
   */
  show?: boolean;
  /**
   * 选块是否禁用
   */
  disabled?: boolean;
  /**
   * tip 提示内容
   */
  tipContent?: string | TemplateRef<any> | any;
  /**
   * tip 提示方向
   */
  tipPosition?: string;
  /**
   * @ignore
   * 配置选块角标：
   *
   * 对象类型，包含两个属性:1.text: 显示的文本；2.class:标志的样式；eg: {text: string; class: string}
   *
   * 可以通过 #sup 模板配置选块角标，因此隐藏sup键值对
   */
  sup?: {
    text?: string;
    class?: string;
    /**
     * 允许有多余的属性字段
     */
    [propName: string]: any;
  };
  /**
     * 和组件id拼接成选块id
    id?: any;
    /**
     * 允许有多余的属性字段
     */
  [propName: string]: any;
}
/**
 * buttonGroup选择按钮组组件
 *
 * 该组件支持单选、多选两种形式，显示内容支持用户自定义
 *
 * 单选块：用户要从一个数据集中选择单个选项。
 * 分大尺寸，小尺寸，无边框三种类型。
 * 支持可取消选中，默认选中时再次点击不取消当前选中项；
 *
 * 多选块：允许用户从一个数据集中选择多个选项。
 * 分大尺寸，小尺寸两种类型。
 *
 */
@Component({
  selector: 'ti-button-group',
  templateUrl: './buttongroup.html',
  styleUrls: ['./buttongroup.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ti3-button-group-bottom-space]': 'multiline'
  },
  providers: [TiFormComponent.getValueAccessor(TiButtongroupComponent)]
})
export class TiButtongroupComponent extends TiWholeComponent {
  /**
   * 选块组的数据
   */
  @Input() items: Array<TiButtonItem>;
  /**
   * 激活状态项样式类定义
   */
  @Input() activeClass: string;
  /**
   * 单个选块的最小宽度
   */
  @Input() minWidth: string;
  /**
   * 选块的尺寸和间距
   *
   * 单选选块可选值包括 'large','small','noBorder'；多选选块可选值包括 'large','small'。
   */
  @Input() type: string = 'large';
  /**
   * 是否为多选选块组
   */
  @Input() multiple: boolean = false;
  // TODO:Tiny4 deselectable改为unselectable
  /**
   * 单选选块组选中后再次点击是否可以取消选中
   */
  @Input() deselectable: boolean = false;
  /**
   * 用于取代公共样式类ti3-button-group-bottom-space
   * <ti-button-group class="ti3-button-group-bottom-space"></ti-button-group>
   */
  /**
   * 选块是否为多行，多行时有行间距
   */
  @Input() multiline: boolean = false;
  /**
   * 点击选块，数据选中前的回调事件
   */
  @Output() readonly beforeClick: EventEmitter<TiButtonItem> = new EventEmitter<TiButtonItem>();
  /**
   * @ignore
   * 获取到用户自定义的模板
   */
  @ContentChild(TemplateRef, { static: true }) firstTemplate: TemplateRef<any>;
  /**
   * 选块内容区域的模板。
   */
  @ContentChild('item', { static: true }) itemTemplate: TemplateRef<any>;
  /**
   * 选块角标区域的模板。
   */
  @ContentChild('sup', { static: true }) supTemplate: TemplateRef<any>;
  /**
   * @ignore
   * 获取每个按钮
   */
  @ViewChildren('btn') btns: QueryList<ElementRef>;
  /**
   * @ignore
   * 绑在模板上用户自定义激活样式
   */
  public actClass: string;
  protected versionInfo: string = super.getVersion(packageInfo);
  private itemsDiffer: IterableDiffer<TiButtonItem>;
  constructor(
    protected elementRef: ElementRef,
    protected renderer2: Renderer2,
    protected changeDetectorRef: ChangeDetectorRef,
    private iterableDiffers: IterableDiffers
  ) {
    super(elementRef, renderer2, changeDetectorRef);
  }

  ngOnInit(): void {
    super.ngOnInit();
    // 处理激活样式
    this.actClass = this.activeClass || 'ti3-active';
    this.itemsDiffer = this.iterableDiffers.find(this.items || []).create();
  }

  ngDoCheck(): void {
    /**
     * onPush模式下，可以通过监听items的变化标记变更检测，而且组件内已有itemsDiffer，
     * 但是，原本的differ只会监听数组的增删改，要监听数组对象的属性变化，需要this.trackByFn，
     * 而且，过多的变化引起多余的setFocusableElems，
     * 因此改为直接标记变更检测。
     */
    super.ngDoCheck();
    this.changeDetectorRef.markForCheck();
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    const itemsDiffer: IterableChanges<TiButtonItem> = this.itemsDiffer.diff(this.items || []);
    if (itemsDiffer) {
      const focusElements: Array<any> = [];
      this.btns.forEach((item: ElementRef) => {
        focusElements.push(item.nativeElement);
      });
      this.setFocusableElems(focusElements);
    }
  }

  /**
   * 兼容旧版：
   * 之前只能内嵌一个模板，无命名。
   * 新版可以内嵌两个模板，示例书写要求都命名（#item，#sup）。
   * 但需要兼容旧版无命名测试用例。
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    // 如果 item 模板为空 && 存在第一个模板，那么把第一个出现的 “非 #sup 标签” 的模板作为 item 模板
    if (
      !this.itemTemplate &&
      this.firstTemplate &&
      this.firstTemplate.elementRef.nativeElement !== (this.supTemplate && this.supTemplate.elementRef.nativeElement)
    ) {
      this.itemTemplate = this.firstTemplate;
    }
  }

  /**
   * @ignore
   * sup属性存在class类或text存在且有效
   */
  public isSuperScript(item: TiButtonItem): boolean {
    return (
      item.sup &&
      item.sup.constructor === Object &&
      ((Util.isString(item.sup.class) && item.sup.class !== '') || (Util.isString(item.sup.text) && item.sup.text !== ''))
    );
  }

  /**
   * @ignore
   * @description 根据selectedId来设置每个按钮的样式
   * @param: item
   */
  public setActiveClass(item: string): string {
    if (this.hasSelected(item)) {
      return this.actClass;
    }

    return '';
  }

  /**
   * @ignore
   * 每个item上的点击事件
   */
  public onClick(item: TiButtonItem): void {
    if (item.disabled || this.disabled) {
      // 灰化状态下 ，点击操作无效
      return;
    }
    if (this.beforeClick.observers.length > 0) {
      this.beforeClick.emit(item);

      return;
    }

    this.toggleItem(item);
  }

  /**
   * @ignore
   * 每个item的点击事件(提供给lowCode平台使用)
   */
  public toggleItem(item: TiButtonItem): void {
    if (this.multiple) {
      if (Util.isUndefined(this.modelWhole)) {
        this.modelWhole = [item];
      } else {
        const index: number = this.modelWhole.indexOf(item);
        if (index !== -1) {
          // 如果存在，则将其移除
          this.modelWhole.splice(index, 1);
        } else {
          // 先前未选中情况下，勾选
          this.modelWhole.push(item);
        }
        // selectedId是引用类型，内容改变不会触发modelchange，故需改变引用地址
        this.modelWhole = this.modelWhole.concat();
      }
    } else {
      this.modelWhole = Object.is(item, this.modelWhole) && this.deselectable ? '' : item;
    }
  }

  /**
   * @ignore
   * 判断是不是选中项
   */
  private hasSelected(item: string): boolean {
    if (Util.isUndefined(this.modelWhole) || Util.isNull(this.modelWhole)) {
      return;
    }

    if (this.multiple) {
      return this.modelWhole.indexOf(item) !== -1;
    } else {
      return Object.is(item, this.modelWhole);
    }
  }
}
