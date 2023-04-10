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
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TiFormComponent, TiWholeComponent } from '@opentiny/ng-base';
import { TiDroplistComponent } from '@opentiny/ng-droplist';
@Component({
  selector: 'ti-buttonselect',
  templateUrl: 'buttonselect.html',
  styleUrls: ['buttonselect.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiButtonselectComponent)]
})
export class TiButtonselectComponent extends TiWholeComponent {
  constructor(private render: Renderer2, protected hostRef: ElementRef, protected cdRef: ChangeDetectorRef) {
    super(hostRef, render, cdRef);
  }
  /**
   * 下拉面板数据
   */
  @Input() options: Array<any> = [];
  /**
   * 下拉面板显示options数组对象中的哪个字段
   */
  @Input() labelKey: string = 'label';
  /**
   * @ignore
   */
  @ViewChild(TiDroplistComponent) droplistCom: TiDroplistComponent;
  /**
   * @ignore
   */
  @ViewChild('button', { static: true }) buttonRef: ElementRef;
  /**
   * @ignore 待选项
   */
  public candidate: any;

  // chooseItem: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && changes['options'].currentValue.length > 0) {
      this.candidate = this.options[0];
    }
  }
  protected ngOnModelChange(model: any): void {
    this.candidate = model ? model : this.candidate;
  }

  ngAfterViewInit(): void {
    this.setFocusableElems([this.buttonRef.nativeElement]);
    this.render.listen(this.droplistCom.dropCom.nativeElement, 'mouseleave', (event: MouseEvent) => {
      const dropPosition: string = this.droplistCom.dropCom.position;
      if (dropPosition.split('-')[0] === 'bottom') {
        if (event.offsetX > 0 && event.offsetX < this.buttonRef.nativeElement.offsetWidth && event.offsetY < 0) {
          return;
        }
      } else {
        // 面板在上方展开时，鼠标向上移动不能关闭面板，向下要关闭面板
        if (
          event.offsetX > 0 &&
          event.offsetX < this.buttonRef.nativeElement.offsetWidth &&
          event.offsetY >= (event.target as any).offsetHeight
        ) {
          return;
        }
      }
      this.droplistCom.hide();
    });
  }
  /**
   * @ignore 鼠标移入button
   */
  onMouseenterButton(): void {
    this.droplistCom.show();
  }
  /**
   * @ignore 鼠标移出button
   */
  onMouseleaveButton(event: MouseEvent): void {
    const dropPosition: string = this.droplistCom.dropCom.position;
    if (dropPosition.split('-')[0] === 'bottom') {
      // 面板在下方展开时，鼠标向下移动不能关闭面板
      if (
        event.offsetX > 0 &&
        event.offsetX < (event.target as any).offsetWidth &&
        event.offsetY > (event.target as any).offsetHeight - 2
      ) {
        return;
      }
    } else {
      // 面板在上方展开时，鼠标向上移动不能关闭面板，向下要关闭面板
      if (event.offsetX > 0 && event.offsetX < (event.target as any).offsetWidth && event.offsetY < 1) {
        return;
      }
    }
    this.droplistCom.hide();
  }
  /**
   * @ignore 点击button
   */
  onClickButton(): void {
    this.droplistCom.hide();
    this.model = this.model ? undefined : this.candidate;
  }

  /**
   * @ignore 下拉面板选中
   */
  onDroplistChange(event: any): void {
    this.model = event;
    this.candidate = event;
  }
}
