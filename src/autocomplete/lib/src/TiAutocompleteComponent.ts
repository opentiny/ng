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
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiDroplistComponent } from '@opentiny/ng-droplist';
import { debounceTime, switchMap } from 'rxjs/operators';
import { TiTextComponent } from '@opentiny/ng-text';
import { empty, Subject, Subscription } from 'rxjs';
import { Util } from '@opentiny/ng-utils';
import { TiPositionType } from '@opentiny/ng-utils';
import packageInfo from '../package.json';

/**
 * 自动补全输入框组件
 *
 */
@Component({
  selector: 'ti-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrls: ['./autocomplete.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiAutocompleteComponent)],
  host: {
    '[class.ti3-autocomplete-container]': 'true',
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()'
  }
})
export class TiAutocompleteComponent extends TiFormComponent {
  /**
   * 输入框的占位文本
   */
  @Input() placeholder: string = '';
  /**
   * 是否开启清除功能，
   *
   * 10.1.0/9.1.0版本之后默认不开启，在此之前版本默认开启
   */
  @Input() clearable: boolean = false;
  /**
   * 输入框允许的最大字符数
   */
  @Input() maxlength: number;
  /**
   * 下拉面板宽度。
   *
   * 1."justified": 下拉面板的宽度与输入框宽度保持一致；
   *
   * 2."auto": 下拉面板的宽度根据下拉项的内容自动撑开；
   *
   * 3.固定的下拉面板宽度: 不小于输入框的宽度，例如："200px"
   */
  @Input() panelWidth: string = 'justified';
  /**
   * 下拉面板最大高度
   */
  @Input() panelMaxHeight: string;
  /**
   * 下拉面板要展示的键值
   */
  @Input() labelKey: string = 'label';
  /**
   * 下拉建议项
   */
  @Input() options: Array<any> = [];
  /**
   * tip 提示方向
   */
  @Input() tipPosition: TiPositionType = 'right';
  /**
   *
   * 下拉面板是否添加在 body 上
   */
  @Input() appendToBody: boolean = true;
  /**
   *
   * tip 最大宽度
   */
  @Input() tipMaxWidth: string;
  /**
   * 当聚焦或值改变时触发的回调，提供设置建议项的时机，
   *
   * 参数：组件实例
   */
  @Output() readonly suggest: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 点击清除按钮时触发的回调。
   *
   */
  @Output() readonly clear: EventEmitter<MouseEvent> = new EventEmitter();
  /**
   * 选中选项时触发的回调，
   *
   */
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 自定义下拉建议项模板
   *
   */
  @ContentChild('item', { static: true }) itemTemplate: TemplateRef<any>;
  /**
   * @ignore
   * droplist选项值
   */
  public selected: any;
  /**
   * @ignore
   *
   */
  public suggestions: Array<any> = [];
  /**
   * @ignore
   * 是否聚焦的标志位
   */
  public isFocused: boolean = false;
  /**
   * 最后一次下拉建议项
   */
  private lastSuggestions: Array<any> = [];

  protected versionInfo: string = super.getVersion(packageInfo);

  /**
   * @ignore
   */
  @ViewChild('input', { static: true }) textComp: TiTextComponent;
  /**
   * @ignore
   */
  @ViewChild('droplist', { static: false }) dropListComp: TiDroplistComponent;
  /**
   * @ignore
   */
  public inputChangeObserve: Subject<string> = new Subject();
  private inputChangeSub: Subscription;
  // 根据数组中属性查找是否有匹配项
  private static findFirstIndex(arr: any, key: string, value: string): number {
    if (!(arr instanceof Array)) {
      return -1;
    }

    return arr.findIndex((i: any) => i[key] === value);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setFocusableElems([this.textComp.nativeElement]);
    this.createInputChangeObserve();
    if (this.clearable) {
      this.renderer.setAttribute(this.textComp.nativeElement, 'clearable', '');
    }
  }

  ngOnDestroy(): void {
    // 修正SSR报错：TypeError: Cannot read property 'unsubscribe' of undefined
    this.inputChangeSub && this.inputChangeSub.unsubscribe();
  }

  // 组件交互方法集合--start
  /**
   * @ignore
   * 输入框中内容改变事件
   */
  public onInputChange(value: string): void {
    if (this.disabled || !this.isFocused) {
      return;
    }

    this.inputChangeObserve.next(value);
  }
  /**
   * @ignore
   * 两种情况下触发
   * 1.在suggestion面板展开的情况下，通过hover选中一项，然后按下enter
   * 2.在suggestion面板展开的情况下，通过鼠标点击选中一项
   */
  public onDroplistChange(value: { label?: string }): void {
    if (value) {
      this.model = value[this.labelKey] || value.label;
    }
  }
  /**
   * @ignore
   */
  public onFocus(): void {
    if (this.disabled) {
      return;
    }
    this.isFocused = true;
    if (this.isInputClear()) {
      // 如果是点击清除按钮，值会改变，那么就会在onInputChange中处理
      return;
    }

    this.showSuggestions();
  }
  /**
   * @ignore
   */
  public onBlur(): void {
    // 问题现象：组件聚焦情况下，手动切换到其他小窗口应用，再在当前页面点击组件以外的地方，下拉面板展开无法收起（此时组件处于失焦状态）#2626；
    // 问题根因：以上操作中当点击组件以外的地方，组件会有快速的聚焦再失焦的过程；聚焦时打开面板添加了延时处理，组件再失焦后时机早于聚焦，导致下拉面板无法隐藏；
    // 解决方案：失焦时也添加延时处理；
    setTimeout(() => {
      this.dropListComp && this.dropListComp.hide();
      this.isFocused = false;
    }, 0);
  }
  /**
   * @ignore
   *
   * 避免滚动页面下拉框隐藏之后组件仍聚焦时再次点击，下拉框无法展开
   *
   * mousedown在focus事件之前执行
   */
  public onInputMousedown(): void {
    if (this.disabled || !this.isFocused || this.isInputClear()) {
      // 如果是点击清除按钮，值会改变，那么就会在onInputChange中处理
      return;
    }

    this.showSuggestions();
  }
  /**
   * @ignore
   * 点击叉号时触发
   *
   */
  onClear(event: MouseEvent): void {
    this.clear.emit(event);
  }

  /**
   * @ignore
   * 选中事件，鼠标或enter选中选项后
   *
   */
  onSelect(option: any): void {
    this.select.emit(option);
  }

  /**
   * @ignore
   * 防止原生input框select（选中文本）事件触发时，冒泡到ti-autocomplete的select（选中选项）事件
   *
   */
  inputSelect(event: Event) {
    event.stopPropagation();
  }

  // 组件交互方法集合--end

  // 内部公共方法集合--start
  /**
   * @description: 创建inputValue的observable，确保收集2ms内的数据后再更新下拉
   *  触发该observable时，使用next方法
   */
  private createInputChangeObserve(): void {
    this.inputChangeSub = this.inputChangeObserve
      .pipe(
        debounceTime(200), // 200ms延迟执行，解决请求太频繁问题
        // TODO: 在点击清除按钮或者快捷键删除时数据不准确，可能导致在这些操作时触发不了下面的逻辑
        // distinctUntilChanged(),避免前后两次相同数据重复处理，只有上次数据和200ms后的数据不相等时才触发后续动作。
        switchMap(
          // TODO: 这个switchMap有可能没有生效。测试用例增加，switchMap
          (value: string) => {
            if (this.isFocused) {
              if (this.suggest.observers.length === 0) {
                this.lastSuggestions = this.suggestions;
                this.suggestions = this.filter(value);
                if (this.suggestions.length > 0) {
                  this.show();
                } else {
                  this.dropListComp && this.dropListComp.hide();
                }
              } else {
                this.suggest.emit(this);
              }
            }
            // OnPush模式下，异步刷新都需要手动触发。
            this.changeDetectorRef.markForCheck();
            return empty();
          }
        )
      )
      .subscribe();
  }
  /**
   * 设置下拉建议项数据
   *
   * @param value 下拉建议项数组
   */
  public setSuggestions(value: Array<any>): void {
    this.lastSuggestions = this.suggestions;
    this.suggestions = value;
    if (this.suggestions.length > 0) {
      this.show();
    } else {
      this.dropListComp.hide();
    }

    // OnPush模式下，异步获取数据需要手动触发
    this.changeDetectorRef.markForCheck();
  }

  private filter(searchWord: string): Array<any> {
    if (this.options && this.options.length >= 0) {
      // 搜索结果临时值。结果默认值，是原数据
      let searchResult: Array<any> = this.options;
      // 如果搜索词存在
      if (!Util.isEmptyString(searchWord)) {
        // 在集合中搜索
        searchResult = searchResult.filter((option: any) => {
          return option[this.labelKey].toLowerCase().indexOf(searchWord.toLowerCase()) >= 0;
        });

        if (this.options.length > 0 && TiAutocompleteComponent.findFirstIndex(searchResult, this.labelKey, searchWord) === -1) {
          searchResult.unshift({ id: searchWord, [this.labelKey]: searchWord });
        }
      }

      return searchResult;
    }

    return [];
  }

  private show(): void {
    if (this.dropListComp.isShow) {
      // 搜索时，按需重新定位
      if (this.lastSuggestions.length !== this.suggestions.length) {
        setTimeout(() => {
          this.dropListComp.rePosition(true);
          // OnPush模式下，异步刷新都需要手动触发。否则会出现闪动
          this.changeDetectorRef.markForCheck();
        }, 0);
      }
    } else {
      // 数据更新后，未及时通知到droplist，初始化时按照默认值[]绘制视图，需延时处理
      setTimeout(() => {
        this.dropListComp.show();
        this.selected = undefined; // 为了去掉选中样式
        // OnPush模式下，异步刷新都需要手动触发。
        this.changeDetectorRef.markForCheck();
      }, 0);
    }
  }

  private isInputClear(): boolean {
    return this.textComp.isShowClear && this.textComp.isClearActive;
  }

  private showSuggestions(): void {
    if (this.suggest.observers.length === 0) {
      this.lastSuggestions = this.suggestions;
      this.suggestions = this.filter(this.model);
      if (this.suggestions.length > 0) {
        this.show();
      }
    } else {
      this.suggest.emit(this);
    }
  }
  // 内部公共方法集合--end
}
