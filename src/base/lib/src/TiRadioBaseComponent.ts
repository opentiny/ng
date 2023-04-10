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
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { TiBrowser, Util } from '@opentiny/ng-utils';
import { TiFormComponent } from './TiFormComponent';
// 编译lib要求注册Component，不能用抽象类
/**
 * 单选/多选共同的基类。单选多选唯一的差异：单选只有在未选状态才接受空格键改变状态。
 */
@Component({
  // lib编译要求@Component
  selector: 'ti-radiobase',
  template: ''
})
export class TiRadioBaseComponent extends TiFormComponent {
  /**
   * 选项文本
   */
  @Input() label: string;
  /**
   * @ignore
   */
  @ViewChild('labelRef', { static: true }) private labelRef: ElementRef;
  /**
   * @ignore
   */
  @ViewChild('proxyRef', { static: true }) private proxyRef: ElementRef;

  ngOnInit(): void {
    super.ngOnInit();
    this.creatId();
    this.setFocusableElems([this.proxyRef.nativeElement]);
    this.moveNode();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.renderer.removeChild(this.renderer.parentNode(this.nativeElement), this.renderer.nextSibling(this.nativeElement));
  }

  /**
   * 将input子元素label，调整为兄弟元素。
   */
  private moveNode(): void {
    const parentNode: any = this.renderer.parentNode(this.nativeElement);
    const nextNode: any = this.renderer.nextSibling(this.nativeElement);
    this.renderer.insertBefore(parentNode, this.labelRef.nativeElement, nextNode);
  }

  // TODO: 原始节点改为0高度，不显示。那么所有宿主元素focus都转移到proxy。
  /**
   * @ignore
   * 点选元素后，聚集到对应的checkbox-skin
   * 经测试，这段逻辑，是为了解决第一次进入页面时 radio/checkbox 火狐下点击 label 无法聚焦。
   * @param event 鼠标点击事件
   */
  @HostListener('click', ['$event']) public onHostClick(event: MouseEvent): void {
    if (!this.nativeElement.disabled && TiBrowser.isFirefox()) {
      this.focusElem.focus();
      this.renderer.setStyle(this.focusElem, 'outlineStyle', 'none');
    }
  }

  // 阻止事件冒泡：当子组件中有input元素时，change事件会冒泡到父组件
  // 问题：多选树模板包含复选框组件，树组件中有自己的change事件，点击复选框会触发两次change事件
  // 一次是树组件自身触发，一次是复选框组件冒泡，故需阻止该事件，例如下边代码会打印日志
  /**
   * @ignore
   */
  @HostListener('change', ['$event']) public onHostChange(event: Event): void {
    event.stopPropagation();
  }
  /**
   * @ignore
   * 阻止checkbox-skin和checkbox-label的事件冒泡，防止上层dom绑定的事件被多次触发
   * 原因：span和label使用for和input关联，input上的click等事件也会触发span/label的事件处理，
   * 如果不做处理，上层dom绑定的事件会被触发两次
   * @param event 鼠标点击事件
   */
  public onLabelClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  /**
   * @ignore
   * 快捷键的处理(Enter和Space)：考虑到交互的友好性及与原生的一致性，
   * 在keyup中做相应的事件处理(keydown和keypress会存在一次点击，多次触发的情况);
   * 此外，需要阻止浏览器默认事件（空格键会触发页面滚动条滚到底部的行为，
   * 默认事件的阻止需要在keyup之前，因此此处在keydown中阻止）
   * @param event 键盘按键事件
   */
  public onSpaceKeydown(event: KeyboardEvent): void {
    // with type info
    if (!this.nativeElement.disabled) {
      event.preventDefault();
    }
  }
  /**
   * @ignore
   * @param event 键盘按键事件
   */
  public onSpaceKeyup(event: KeyboardEvent): void {
    // with type info
    if (!this.nativeElement.disabled && this.canChange()) {
      this.nativeElement.checked = !this.nativeElement.checked; // 设置元素的选中状态
      // this.cdRef.detectChanges();  执行并不能触发checked改变检查，所以只有下面的change事件才可以。
      // 触发check原生的change事件"createEvent" in document. 因为原生只有blur时才触发onchange
      Util.trigger(this.nativeElement, 'change');
    }
  }
  /**
   * @ignore
   * 这是单选多选唯一的差异：单选只有在未选状态才接受空格键改变状态。
   * @returns 默认返回true，多选框会继承这个方法。单选框重写这个方法。
   */
  protected canChange(): boolean {
    return true;
  }
} // end of class
