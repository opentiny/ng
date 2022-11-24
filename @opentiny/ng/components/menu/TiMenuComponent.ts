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
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output,
      QueryList, SimpleChanges, TemplateRef, ViewChild, ViewChildren, ChangeDetectionStrategy} from '@angular/core';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiDropComponent } from '../drop/TiDropModule';
import { TiMenuListComponent } from './TiMenuListComponent';
import { TiKeymap } from '../../utils/Util';

import { TiMenuItem } from './TiMenuItem';
// TODO: beforOpen延时打开，需要动态转圈等待

/**
 * Menu菜单组件
 *
 * 提供了一种方便的生成菜单下拉列表的方式，提供分组、自定义内容等功能。
 *
 */
@Component({
      selector: 'ti-menu',
      templateUrl: './menu.html',
      styleUrls: ['./menu.less'],
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
            '(blur)': 'onBlur()',
            '[class.ti-menu-danger-button]': 'color === "danger"'
      }
})
export class TiMenuComponent extends TiFormComponent {  // 本应继承自BaseComp，但是想要A标签焦点功能
      /**
       * 下拉面板与按钮对齐方式
       */
      @Input() panelAlign: 'left' | 'right' = 'right';
      /**
       * 必选，下拉面板数据集
       */
      @Input() items: Array<TiMenuItem>;
      /**
       * 下拉面板最大宽度，超过时内容换行显示
       */
      @Input() panelMaxWidth: string = '9999px';
      /**
       * 下拉面板最大高度，超过时面板出现竖向滚动条
       */
      @Input() panelMaxHeight: string = '9999px';
      /**
       * 下拉面板要展示的键值
       */
      @Input() labelKey: string = 'label';
      /**
       * 按钮颜色（配置 buttonselect 属性时生效）
       */
      @Input() color: 'default' | 'danger' = 'default';
      /**
       * tip 最大宽度
       */
      @Input() tipMaxWidth: string;
      /**
       * @ignore
       */
      @ViewChild('mytoggle', { static: true })  mytoggleRef: ElementRef;
      /**
       * @ignore
       */
      @ViewChildren(TiDropComponent) dropComs: QueryList<TiDropComponent>;
      /**
       * @ignore
       */
      @ViewChildren(TiMenuListComponent) listComs: QueryList<TiMenuListComponent>;
      /**
       * @ignore
       */
      @ContentChild(TemplateRef, { static: true }) firstTemplate: TemplateRef<any>;
      /**
       * 下拉选项区域的模板
       */
      @ContentChild('item',  { static: true }) itemTemplate: TemplateRef<any>;
      /**
       * tip 提示区域的模板
       */
      @ContentChild('tip', { static: false }) tipTemplate: TemplateRef<any>;
      /**
       * 选中菜单项时触发的回调，参数：当前选中项数据
       */
      @Output() readonly select: EventEmitter<TiMenuItem> = new EventEmitter<TiMenuItem>();
      /**
       * 打开面板前触发的回调，一般用于懒加载场景，参数：组件实例 TiMenuComponent
       */
      @Output() readonly beforeOpen: EventEmitter<TiMenuComponent> = new EventEmitter<TiMenuComponent>();
      /**
       * @ignore
       * itemsArr[0]存放根面板内容，itemArr[1]存放次级面板内容，itemArr[2]存放次次级面板内容
       */
      public itemsArr: Array<Array<TiMenuItem>> = [];
      /**
       * @ignore
       *  与开关距离
       */
      public dominatorSpace: string = '10px';
      /**
       * @ignore
       * 设置该属性时为buttonselect组件
       */
      public buttonSelect: boolean;
      /**
       * menulist最大高度
       */
      public menulistMaxHeight: number;
      ngOnInit(): void {
            // 基类中做了设置宿主id的操作
            super.ngOnInit();
            // 10.1.17 版本之前在标签上写 hasborder 属性会呈现按钮下拉样式，10.1.17 版本之后修改为 buttonselect 属性，也兼容之前的写法
            this.buttonSelect = this.nativeElement.hasAttribute('hasborder') || this.nativeElement.hasAttribute('buttonselect');
      }
      ngOnChanges(changes: SimpleChanges): void {
            this.setFocusableElems([this.mytoggleRef.nativeElement]);
            super.ngOnChanges(changes);
            if (changes['items']) { // 外部修改show属性的处理，初始定义在ngOnInit中处理
                  this.itemsArr[0] = this.items;
            }
      }
      /**
       * 兼容旧版：
       * 10.0.3 版本之前只能内嵌一个模板，无命名。
       * 新版可以内嵌两个模板，示例书写要求都命名（#item，#tip）。
       * 但需要兼容旧版无命名测试用例。
       */
      ngAfterContentInit(): void {
            super.ngAfterContentInit();
            // 如果 item 模板为空 && 存在第一个模板，那么把第一个出现的 “非#tip 标签” 的模板作为 item 模板
            if (!this.itemTemplate && this.firstTemplate
                && (this.firstTemplate.elementRef.nativeElement !== (this.tipTemplate && this.tipTemplate.elementRef.nativeElement))) {
                  this.itemTemplate = this.firstTemplate;
            }
      }
      /**
       * 打开面板
       */
      public open(): void {
            if (this.disabled) {
                  return;
            }
            // 打开面板前重置menulist最大高度
            this.initListMaxHeight();
            this.dropComs.first.show();
            // 使用beforeOpen事件：异步加载数据，调用open事件，需要手动触发变更检测
            if (this.beforeOpen.observers.length > 0) {
                  this.changeDetectorRef.markForCheck();
            }

            this.listComs.first.hoverOption = null;
            // 根据drop的最大高度设置menulist最大高度
            this.restyleListMaxHeight();
            // IE滚动条Bug的监听
            this.listComs.toArray().forEach(listCom => {
                  listCom.listenIESrollbarBug();
            })
      }
      /**
       * 关闭面板
       */
      public close(): void {
            this.dropComs.first.hide();
            this.onHover(null, 0);
            // 解除IE滚动条Bug的监听
            this.listComs.toArray().forEach(listCom => {
                  listCom.unlistenIESrollbarBug();
            })
      }
      /**
       * @ignore
       *
       * 切换面板状态：打开/关闭
       */
      public toggle(): void {
            this.dropComs.first.isShow ? this.close() : this.open();
      }
      /**
       * @ignore
       */
      public onKeydown(event: KeyboardEvent): void {
            switch (event.keyCode) {
                  case TiKeymap.KEY_SPACE: // 原生SPACE键仅可打开。但Tiny2,3都跟Enter键保持一致
                  case TiKeymap.KEY_ENTER: // ENTER键 相当于click
                  case TiKeymap.KEY_NUMPAD_ENTER: // ENTER键(苹果数字小键盘)
                        // 第一级已打开，但无选中项。或者第一级没有打开。相当于鼠标点击逻辑。
                        if ((this.dropComs.first.isShow && !this.listComs.toArray()[0].hoverOption)
                              || !this.dropComs.first.isShow) {
                              this.onMousedown(null); // 相当于鼠标点击
                              break; // 注意:break在if内，如果if不满足，则走到default，list处理按键
                        }
                  // 上面的回车键, 可能继续走到下面分支。
                  // eslint-disable-next-line no-fallthrough
                  case TiKeymap.KEY_ARROW_LEFT: // 左右箭头，焦点在左右面板转移
                  case TiKeymap.KEY_ARROW_RIGHT: // 左右箭头，焦点在左右面板转移
                  case TiKeymap.KEY_ARROW_UP: // 上下箭头，上下移动选中项
                  case TiKeymap.KEY_ARROW_DOWN: // 上下箭头，上下移动选中项
                        for (let i = this.dropComs.length - 1; i >= 0; i--) { // 寻找末尾面板且有hover，list处理按键
                              if (this.dropComs.toArray()[i].isShow && this.listComs.toArray()[i].hoverOption) {
                                    this.onKeydownLastHoverList(event, i);

                                    // break; //这里触发了for循环的break；并没有走到switch的break;所以改为return;
                                    return;
                              }
                        }
                        // 没有hover的面板，那么第一级面板（肯定是展开的）处理按键
                        this.listComs.first.onKeydown(event);
                        break;
                  default:
                        break;
            }
      }
      private onKeydownLastHoverList(event: KeyboardEvent, i: number): void {
            switch (event.keyCode) {
                  case TiKeymap.KEY_ARROW_LEFT: // 左右箭头，焦点在左右面板转移
                  case TiKeymap.KEY_ARROW_RIGHT: // 左右箭头，焦点在左右面板转移
                        if ((this.panelAlign === 'right' && event.keyCode === TiKeymap.KEY_ARROW_LEFT)
                              || (this.panelAlign === 'left' && event.keyCode === TiKeymap.KEY_ARROW_RIGHT)) { // 次级面板方向键
                              if (i + 1 < this.dropComs.length && this.dropComs.toArray()[i + 1].isShow) {// 次级存在且展开
                                    this.listComs.toArray()[i + 1].nextOption(false); // 次级面板hover由null改为下一个
                              }
                        } else { // 上级面板方向键
                              this.listComs.toArray()[i].hoverOption = null;
                        }
                        break;
                  case TiKeymap.KEY_SPACE: // 原生SPACE键仅可打开。但Tiny2,3都跟Enter键保持一致
                  case TiKeymap.KEY_ENTER: // ENTER键 相当于click
                  case TiKeymap.KEY_NUMPAD_ENTER: // ENTER键(苹果数字小键盘)
                        if (!this.listComs.toArray()[i].isGroup(this.listComs.toArray()[i].hoverOption)) {
                              this.listComs.toArray()[i].onKeydown(event);
                        }
                        break;
                  default: // 上下键等，和上面的回车键也会走到这里。
                        this.listComs.toArray()[i].onKeydown(event);
                        break;
            }
      }
      /**
       * @ignore
       */
      public onMousedown(event: MouseEvent): void {
            if (this.dropComs.first.isShow) { // 已打开，则关闭
                  this.close();
            } else if (this.beforeOpen.observers.length === 0) { // 下拉菜单收起，且无beforeOpen，则打开
                  this.open();
            } else { // 下拉菜单收起，有beforeOpen
                  this.beforeOpen.emit(this);
            }
      }
      /**
       * @ignore
       */
      public onSelect(panelIndex: number): void {
            this.select.emit(this.listComs.toArray()[panelIndex].model);
            this.close();
      }
      /**
       * @ignore
       */
      public onBlur(): void {
            this.close();
      }
      /**
       * @ignore
       */
      public onHover(item: any, panelIndex: number): void { // 当item为空，表示鼠标移出当前面板，也需要关闭次级面板。
            if (panelIndex + 1 === this.dropComs.length) {// 当前hover面板，已经是最后一级面板
                  return;
            }
            const dropComArr: Array<TiDropComponent> = this.dropComs.toArray();
            const listComArr: Array<TiMenuListComponent> = this.listComs.toArray();
            if (item && listComArr[panelIndex].isGroup(item) && !listComArr[panelIndex].isDisabledFn(item)) { // 根据数据，是否展开下一级
                  this.itemsArr[panelIndex + 1] = item.children; // 下一级数据，赋新值。
                  listComArr[panelIndex + 1].hoverOption = null; // 下一级面板赋空hoverOption，会触发onHover，进而关闭下一级面板的后续面板。
                  // 赋新值以后，等模板有了新的尺寸，再弹出。
                  setTimeout(() => {
                        const currentPanel: HTMLElement = dropComArr[panelIndex].nativeElement; // 当前面板元素
                        const nextPanel: HTMLElement = dropComArr[panelIndex + 1].nativeElement; // 下一级面板元素

                        dropComArr[panelIndex + 1].show(); // 打开下一级面板
                        // 位置调整，X方向 // TODO: 使用Position是否可行？
                        const leftOffset: number = (this.panelAlign === 'left') ?
                                                   currentPanel.offsetLeft + currentPanel.offsetWidth :
                                                   currentPanel.offsetLeft - nextPanel.offsetWidth;
                        nextPanel.style.left = `${leftOffset}px`;
                        // 位置调整，Y方向
                        const itemIndex: number = this.itemsArr[panelIndex].indexOf(item);
                        const itemElem: any = listComArr[panelIndex].nativeElement.getElementsByTagName('LI')[itemIndex];
                        // 当前li距离面板顶部的距离 = 当前li距离可视区顶部的距离 - 当前面板到可视区顶部的距离
                        const itemElmTop: number = itemElem.getBoundingClientRect().top - currentPanel.getBoundingClientRect().top;
                        // 当前li距离页面底部的距离 = 可视区窗口高度 + 文档滚动高度 - 当前面板的offsetTop - 当前li距离面板顶部的距离
                        const bottomOffset: number = document.documentElement.clientHeight + document.documentElement.scrollTop -
                                             currentPanel.offsetTop - itemElmTop;
                        // 下一级面板的的高度
                        const itemHeight: number = nextPanel.offsetHeight;
                        // 底部空间能放下下一级面板：下一级面板的top = 当前面板的offsetTop + 当前li距离面板顶部的距离 - 面板的上下留白
                        const nextPanelTop: number = currentPanel.offsetTop + itemElmTop - 4;
                        if (bottomOffset > itemHeight) {
                              nextPanel.style.top = nextPanelTop + 'px';

                              return;
                        }

                        // 底部空间不足，和浏览器底部对齐
                        nextPanel.style.top = nextPanelTop + bottomOffset - itemHeight + 'px';
                  }, 0);
            } else {
                  // 当hover到具体项目（非分组）或 null（移出当前面板），需要闭合所有后续面板
                  for (let i: number = panelIndex + 1; i < dropComArr.length; i++) {
                        dropComArr[i].hide();
                  }
            }
      }
      /**
       * @ignore
       */
      public onMouseoutDrop(event: MouseEvent, panelIndex: number): void {
            // 默认需要隐藏, 除非鼠标进入面板区域。
            for (let i: number = 0; i < this.dropComs.length; i++) {
                  const dropRect: DOMRect = this.dropComs.toArray()[i].nativeElement
                                                                      .getBoundingClientRect();
                  // 因为慢慢移出本面板时，移出鼠标事件依然停留在本面板内（1px误差），所以面板rect四周范围要更小1px。
                  if (dropRect.left < event.clientX && event.clientX < dropRect.right
                        && dropRect.top < event.clientY && event.clientY < dropRect.bottom) {
                        return;
                  }
            }
            // 给第一级面板置无选中，那么次级面板自然会关闭。
            this.listComs.first.hoverOption = null; // 会触发到上面this.onHover(null, 0)
      }
      /**
       * @ignore
       *
       * 初始化menulist最大高度
       */
      public initListMaxHeight(): void {
            this.menulistMaxHeight = parseInt(this.panelMaxHeight, 10);
            this.listComs.toArray().forEach(listCom => {
                  this.renderer.setStyle(listCom.nativeElement, 'max-height', this.menulistMaxHeight + 'px');
            });
      }
      /**
       * @ignore
       *
       * 考虑drop的压缩情况，设置menulist的max-height
       */
      public restyleListMaxHeight(): void {
            const dropCurMaxHeight: number = parseInt(this.dropComs.first.nativeElement.style.maxHeight, 10);
            if (!isNaN(dropCurMaxHeight) && dropCurMaxHeight < this.menulistMaxHeight) {
                  this.listComs.toArray().forEach(listCom => {
                        this.renderer.setStyle(listCom.nativeElement, 'max-height',  dropCurMaxHeight + 'px');
                  });
            }
      }
}
