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
import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { TiRadioBaseComponent } from '@opentiny/ng-base';
import { TiBrowser, TiLog, Util } from '@opentiny/ng-utils';
import packageInfo from '../package.json';

/**
 * Checkbox组件，尽管这是一个组件，但使用方法有点像属性指令。主要功能为设置某一条件是否被选中。
 *
 * Checkbox组件完全基于原生input checkbox实现，
 *
 * 可以使用Angular针对原生Checkbox提供的所有指令，包括：disabled, model, click等，
 *
 * 但是要记得在input中添加tiCheckbox属性。
 *
 */
@Component({
  selector: '[tiCheckbox]',
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiCheckboxComponent extends TiRadioBaseComponent {
  /**
   * 问题一：浏览器兼容性问题：用angular提供的indeterminate属性设置半选，在谷歌下全部正常显示。
   * 在火狐和IE下，checked=true 和indeterminate=true同时存在时，半选样式存在问题，不知道是否和tiny组件的css样式写法有关。
   * 为了统一逻辑和预测，checkgroup和tree组件内部本应该这样使用：置indeterminate=true时，同时会置checked = false
   * 但是，暂时tree组件没有这样做，由TiCheckboxComponent来纠错。
   * TiCheckboxComponent补充效果：tree组件/业务用户，置indeterminate=true时，组件自身会置checked = false
   * 问题二：浏览器兼容性问题：Chrome/Firefox半选点击后变为全选，checked状态改变。IE半选点击后变为不选，checked状态未改变，所以没有通知change事件。
   * 但checkgroup需要change事件去维护子选项
   * TiCheckboxComponent IE补充效果：监听IE的click，当indeterminate从true变为false时，组件会置checked = false，并通知change事件。
   */
  private lastIndeterminate: boolean = undefined;
  protected versionInfo: string = super.getVersion(packageInfo);
  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    // 补充效果：tree组件/业务用户，置indeterminate=true时，组件自身会置checked = false
    if (this.nativeElement.indeterminate) {
      this.nativeElement.checked = false;
    }
    this.lastIndeterminate = this.nativeElement.indeterminate;
  }
  /**
   * @ignore
   * IE补充效果：监听IE的click，当indeterminate从true变为false时，组件会置checked = false，并通知change事件。
   */
  @HostListener('click', ['$event']) public onCheckboxHostClick(event: MouseEvent): void {
    if (TiBrowser.isIE() && this.lastIndeterminate && !this.nativeElement.indeterminate) {
      this.checked(true);
    }
  }

  /**
   * @ignore
   * 设置checked属性，indeterminate，同时可能触发change事件。
   * 以后可以考虑开放这个接口，给用户调用
   * @protected
   * @param checked true/false/半选   半选用'indeterminate'或null
   */
  protected checked(checked: boolean | 'indeterminate'): void {
    const lastChecked: boolean = this.nativeElement.checked;
    const lastIndeterminate: boolean = this.nativeElement.indeterminate === true ? true : false; // 将undefined也转为false。
    switch (checked) {
      case true: // 全选
        this.nativeElement.checked = true;
        this.nativeElement.indeterminate = false;
        break;
      case false: // 全不选
        this.nativeElement.checked = false;
        this.nativeElement.indeterminate = false;
        break;
      case null: // 半选
      case 'indeterminate': // 半选
        this.nativeElement.checked = false; // TODO: 为了保证IE下点击半选后，变为全选，这里设false。未验证。
        this.nativeElement.indeterminate = true;
        break;
      default: // 不会走到这里。
        TiLog.error('setChecked(),switch default, can not reach code');
        break;
    }
    // indeterminate初始时为undefined。
    if (this.nativeElement.checked !== lastChecked || this.nativeElement.indeterminate !== lastIndeterminate) {
      Util.trigger(this.nativeElement, 'change'); // 必须主动触发change事件，否则ngModel不更新。也走不到change回调。
    }
  }
}
