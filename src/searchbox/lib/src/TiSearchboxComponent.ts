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
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng-autocomplete';
import { TiFormComponent } from '@opentiny/ng-base';
import packageInfo from '../package.json';
/**
 * 搜索框组件
 *
 */
@Component({
  selector: 'ti-searchbox',
  templateUrl: './searchbox.html',
  styleUrls: ['./searchbox.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiSearchboxComponent)],
  host: {
    '[class.ti3-searchbox-container]': 'true',
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()'
  }
})
export class TiSearchboxComponent extends TiAutocompleteComponent {
  /**
   * 是否删除搜索内容的首尾空格
   */
  @Input() trimmed: boolean = false;
  /**
   * 是否开启虚拟滚动
   */
  @Input() virtual: boolean = false;
  /**
   * 当选中下拉选项、按 enter 键或者点击搜索图标时触发的回调，参数：搜索内容
   */
  @Output() readonly search: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @ignore
   * input ngModel绑定值
   */
  public inputValue: string;
  private isDroplistSearch: boolean = false; // 是否是droplist触发搜索
  protected versionInfo: string = super.getVersion(packageInfo);

  ngOnInit(): void {
    // 默认有清除图标且不可配置：此处先赋值后继承，是由于父类中初始化需要读取clearable的值，设置清除图标
    this.clearable = true;
    super.ngOnInit();
  }

  /**
   * @ignore
   * 组件model更改时，更新input绑定值
   */
  writeValue(model: string) {
    super.writeValue(model);
    this.inputValue = model;
  }

  // 组件交互方法集合--start

  /**
   * @ignore
   * enter的触发有两种情况：
   * 1.在input框中输入值，然后按下enter，此时正常执行search
   * 2.在suggestion面板展开的情况下，通过hover选中一项，然后按下enter，
   *   此时的search应该在下拉面板的onDroplistChange回调中触发
   */
  public onInputEnter(): void {
    if (this.isDroplistSearch) {
      // 排除第2中情况
      this.isDroplistSearch = false;

      return;
    }

    this.onSearch();
  }
  /**
   * @ignore
   * 搜索事件触发
   */
  public onSearch(): void {
    if (this.disabled) {
      return;
    }
    this.search.emit(this.model);
  }
  /**
   * @ignore
   * 两种情况下触发
   * 1.在suggestion面板展开的情况下，通过hover选中一项，然后按下enter
   * 2.在suggestion面板展开的情况下，通过鼠标点击选中一项
   */
  onDroplistChange(value: { label: string }): void {
    if (value) {
      this.model = this.inputValue = value[this.labelKey] || value.label;
      this.onSearch();
      this.isDroplistSearch = true;
    }
  }
  // 组件交互方法集合--end

  /**
   * @ignore
   * 输入框中内容改变事件
   */
  public onInputChange(value: string): void {
    if (this.disabled || !this.isFocused) {
      return;
    }

    const searchValue: string = this.trimValue(value);
    this.model = searchValue;
    this.inputChangeObserve.next(searchValue);
  }

  /**
   * 控制是否删除搜索内容的首尾空格
   */
  private trimValue(value: string): string {
    let searchValue: string = value;
    if (this.trimmed && searchValue) {
      searchValue = searchValue.trim();
    }

    return searchValue;
  }
}
