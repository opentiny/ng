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
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { TiDominatorComponent } from '@opentiny/ng-dominator';
import { TiFormComponent, TiWholeComponent } from '@opentiny/ng-base';
import { TiDropsearchComponent } from '@opentiny/ng-dropsearch';
import { TiKeymap } from '@opentiny/ng-utils';
import packageInfo from '../package.json';
/**
 * TagsInput标签输入组件
 *
 * TagsInput组件主要实现了一个可以输入标签、可以联想选择标签的功能组件。
 *
 */
@Component({
  selector: 'ti-tags-input',
  templateUrl: './tagsinput.html',
  styleUrls: ['./tagsinput.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TiFormComponent.getValueAccessor(TiTagsInputComponent)],
  host: {
    '(blur)': 'onBlur()'
  }
})
export class TiTagsInputComponent extends TiWholeComponent {
  /**
   * 必选，下拉建议项
   */
  @Input() suggestions: Array<any> = [];
  /**
   * 输入框的占位文本
   */
  @Input() placeholder: string = '';
  /**
   * 下拉面板的宽度。
   *
   * 1."justified": 下拉面板宽度与输入框宽度保持一致；
   *
   * 2."auto": 下拉面板宽度根据下拉选项的内容自动撑开；
   *
   * 3.固定的下拉面板宽度: 不小于输入框组件的宽度，例如："200px"
   */
  @Input() panelWidth: string = 'justified';
  /**
   * 下拉建议项要展示的键值
   */
  @Input() labelKey: string = 'label';
  /**
   * 输入框允许的最大字符数
   */
  @Input() maxlength: number;
  /**
   * 自动分词的分隔符
   */
  @Input() separators: Array<string> = [];
  /**
   * @ignore
   * 内部的input标签
   */
  @ViewChild('input', { static: true }) public inputRef: ElementRef;
  /**
   * @ignore
   * 用户写的item模板
   */
  @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<any>;
  /**
   * @ignore
   * 内部标签donimator组件
   */
  @ViewChild(TiDominatorComponent, { static: true })
  dominatorCom: TiDominatorComponent;
  /**
   * @ignore
   * 内部标签selectDrop组件
   */
  @ViewChild(TiDropsearchComponent, { static: true })
  selectDrop: TiDropsearchComponent;
  /**
   * @ignore
   * input输入框的值
   */
  public inputValue: string = ''; // 输入框内容
  /**
   * @ignore
   * 兼容TiWholeComponent,该组件仅多选
   */
  public multiple: boolean = true;
  /**
   * 自动分词的分隔符正则
   *
   * @private
   */
  private separatorsReg: RegExp;
  /**
   * 记录粘贴的文本
   *
   * @private
   */
  private pasteValue: string;
  protected versionInfo: string = super.getVersion(packageInfo);

  ngOnInit(): void {
    super.ngOnInit();
    if (this.separators.length !== 0) {
      const separatorsStr: string = this.separators.join('');
      this.separatorsReg = new RegExp(`[${separatorsStr}]`);
    }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    // 推荐在onInit()时调用setFocusableElems(), 但是ngFor/ngIf中的元素在ngAfterViewInit()才能获取到
    this.setFocusableElems([this.dominatorCom.nativeElement, this.inputRef.nativeElement]);
  }

  /**
   * @ignore
   * 处理select事件
   */
  onSelect(event: any): void {
    // 当前内容对应的tag不在选中列表中或者不是输入生成的tag

    if (this.findFirstIndex(this.modelWhole, this.labelKey, event[this.labelKey]) === -1 || !event.isInput) {
      this.modelWhole.push(event);
      this.modelWhole = this.modelWhole.concat();
    }

    this.selectDrop.searchResult = this.getSuggestions(this.suggestions, this.modelWhole);
    // 去除选中项样式
    this.selectDrop.listCom.model = undefined;

    // 清空输入框
    this.inputValue = '';
    // 选中项由一行变为两行时，需要重定位
    setTimeout(() => {
      this.selectDrop.rePosition();
    }, 0);
  }

  /**
   * @ignore
   * 处理点击Dominator事件
   */
  onClickDominator(): void {
    if (this.disabled) {
      return;
    }

    this.inputRef.nativeElement.focus();
  }

  /**
   * @ignore
   * 点击选中项的叉号:从选中项中移除当前选中项
   */
  onDelete(event: { item: any; model: any }): void {
    this.inputRef.nativeElement.focus();
    // 选中项由两行变为一行时，需要重定位
    // 在app onpush和app default两种模式测试，确实需要settimeout，但不需要markfor
    setTimeout(() => {
      this.selectDrop.rePosition();
    }, 0);
    this.selectDrop.searchResult = this.getSuggestions(this.suggestions, event.model);
  }

  /**
   * @ignore
   * 组件整体失焦时，面板收起
   */
  onBlur(): void {
    this.selectDrop.hide();
  }

  /**
   * @ignore
   * 输入框失焦时，面板隐藏，根据文本框内容处理是否添加到选中项
   */
  onInputBlur(): void {
    const value: string = this.inputValue;

    // 清空输入框
    this.inputValue = '';

    // 输入框为空时或者当前输入框内容对应的标签已经在选中列表中了
    if (value.trim() === '' || this.findFirstIndex(this.modelWhole, this.labelKey, value) !== -1) {
      return;
    }
    // 将输入框内容添加到选中标签中
    this.addTagToSelected(value);
  }

  /**
   * @ignore
   * 处理input框聚焦事件
   */
  onInputFocus(event: FocusEvent): void {
    this.selectDrop.searchResult = this.getSuggestions(this.suggestions, this.modelWhole);
    // 视图绘制早于变量更新，变量更新后下拉定位不正确， 需要延时处理
    setTimeout(() => {
      this.showSelectDrop();
    }, 0);
  }

  /**
   * @ignore
   * 处理input输入框keyup快捷键功能
   */
  onInputKeyup(event: KeyboardEvent): void {
    if (event.keyCode === TiKeymap.KEY_ENTER || event.keyCode === TiKeymap.KEY_NUMPAD_ENTER) {
      this.responseEnter(event);
    }
  }

  /**
   * @ignore
   * 处理input输入框keydown快捷键功能
   * 回删键只能在keydown中处理：因为回删时，在keydown时输入框为当前值，keyup时为删除后的值
   * 比如输入一个字符，回删，获取的应该是回删前的一个字符，而不是没有删除后的
   */
  onInputKeydown(event: KeyboardEvent): void {
    if (event.keyCode === TiKeymap.KEY_BACKSPACE) {
      this.responseBackspace(event);
    }
  }

  /**
   * @ignore
   * 获取粘贴时的文本
   * @param event
   */
  onInputPaste(event: any): void {
    this.pasteValue = event.clipboardData.getData('Text');
  }

  /**
   * @ignore
   * 输入框内容变化时的处理
   * @param inputValue
   */
  onInputChange(inputValue: string): void {
    let value: string = inputValue;

    // 此处在粘贴事件中获取值的原因：当粘贴值包含换行符时，输入框会将换行符处理为空格
    if (this.pasteValue) {
      value = this.pasteValue;
      this.pasteValue = '';
    }

    // 输入值匹配到分隔符时
    if (this.separatorsReg?.test(value)) {
      this.tokenSeparate(value);

      return;
    }

    // 记录上次匹配项长度
    const oldSearchResultLength: number = this.selectDrop.searchResult?.length;
    // 过滤出匹配项
    this.selectDrop.searchWordChange(inputValue);

    // 由于dropsearch中searchWordChange调用setSearchResult方法，当匹配项长度变化时才会去重定位
    // tagsinput组件 匹配项长度相同选中项行数变化时，也需要重定位
    if (this.selectDrop.searchResult?.length === oldSearchResultLength) {
      setTimeout(() => {
        this.selectDrop.rePosition();
      }, 0);
    }

    // 从匹配项中移除已选中项
    this.selectDrop.searchResult = this.getSuggestions(this.selectDrop.searchResult, this.modelWhole);

    // 输入框为空时或者当前输入框内容对应的标签已经在选中列表中了，无需将输入框值添加至建议项中
    if (inputValue.trim() === '' || this.findFirstIndex(this.selectDrop.searchResult, this.labelKey, inputValue) !== -1) {
      return;
    }

    // 有labelkey和valueKey时，需要设置对应键值
    if (this.valueKey) {
      this.selectDrop.searchResult.unshift({
        id: inputValue,
        [this.labelKey]: inputValue,
        [this.valueKey]: inputValue,
        isInput: true
      });
    } else {
      this.selectDrop.searchResult.unshift({
        id: inputValue,
        [this.labelKey]: inputValue,
        isInput: true
      });
    }
  }

  /**
   * 处理input输入框enter键功能
   * @param event
   */
  private responseEnter(event: KeyboardEvent): void {
    // 获取输入框的值
    const value: string = this.inputValue;

    // 当有建议项存在时，按回车键会执行下拉建议项select事件逻辑，此处无需再处理
    if (this.suggestions && this.suggestions.length !== 0) {
      return;
    }

    // 清空input框的内容
    this.inputValue = '';

    this.addTag(value);
  }

  /**
   * 处理input输入框回删键功能
   * @param event
   */
  private responseBackspace(event: KeyboardEvent): void {
    this.selectDrop.hide();
    // 面板关闭时
    if (!this.selectDrop.isShow) {
      this.showSelectDrop();
      // 选中项由两行变为一行时，需要重定位
      setTimeout(() => {
        this.selectDrop.rePosition();
      }, 0);
    }
    const value: string = this.inputRef.nativeElement.value;
    // 输入框值不为空字符串时
    if (value !== '') {
      return;
    }

    // 获取当前选中项的长度
    const modelLength: number = this.modelWhole.length;

    // 当前已经没有选中项时，不做处理
    if (modelLength === 0) {
      return;
    }

    const lastSelected: any = this.modelWhole[modelLength - 1];
    const index: number = this.suggestions?.indexOf(lastSelected);
    // 从选中项中删除
    this.modelWhole.pop();
    this.modelWhole = this.modelWhole.concat();

    // 将要从选中项删除的最后一项是下拉选项中的一项时，将其添加到现有的下拉选项中;
    // 如果是用户自己创建的，则不放入下拉项中
    if (index !== -1) {
      this.selectDrop.searchResult = this.getSuggestions(this.suggestions, this.modelWhole);
    }
  }

  /**
   * 根据数组中属性找是否有匹配项
   * @param arr 需要匹配的数组
   * @param key 需要查找的属性
   * @param value 属性值
   * @returns
   */
  private findFirstIndex(arr: any, key: string, value: string): number {
    if (!(arr instanceof Array)) {
      return -1;
    }

    return arr.findIndex((i: any) => i[key] === value);
  }

  /**
   * 将输入框内容添加到选中标签中
   * @param inputValue 输入框的内容
   */
  private addTagToSelected(inputValue: string): void {
    const index: number = this.findFirstIndex(this.suggestions, this.labelKey, inputValue);
    // 有labelkey和valueKey时，需要设置对应键值
    const newTag: any =
      index === -1
        ? this.valueKey
          ? {
              id: inputValue,
              [this.labelKey]: inputValue,
              [this.valueKey]: inputValue
            }
          : { id: inputValue, [this.labelKey]: inputValue }
        : this.suggestions[index];
    this.modelWhole.push(newTag);
    this.modelWhole = this.modelWhole.concat();
  }

  /**
   * 从suggestions中删除选中项
   */
  private getSuggestions(suggestions: any, selected: any): Array<any> {
    const newSuggestions: any = !(suggestions instanceof Array) ? [] : suggestions.concat(); // 使用数组的concat方法，实现深拷贝

    let index: number;
    for (const select of selected) {
      index = newSuggestions.indexOf(select);

      if (index !== -1) {
        // 选中项如果在下拉列表中存在，则删除
        newSuggestions.splice(index, 1);
      }
    }

    // 下拉建议项数据更新时，需要手动触发变化检测
    if (newSuggestions !== this.selectDrop.searchResult) {
      this.selectDrop.changeDetectorRef.markForCheck();
    }

    return newSuggestions;
  }

  /**
   * @ignore
   * 展开面板时设置下拉选中项和hoverOption
   */
  public showSelectDrop(): void {
    if (!this.suggestions || (this.suggestions && this.suggestions.length === 0)) {
      return;
    }
    // 显示下拉面板
    this.selectDrop.show();

    if (!this.selectDrop.listCom) {
      return;
    }
    // 设置selectDrop的选中项
    this.selectDrop.listCom.model = undefined;
  }

  /**
   * 自动分词时，将输入框的值分隔生成 tag 并处理建议项数据
   *
   * @private
   * @param value
   */
  private tokenSeparate(value: string): void {
    const valueArr: Array<string> = value.split(this.separatorsReg);

    // 清空输入框的值
    this.inputRef.nativeElement.value = '';
    this.inputValue = '';

    valueArr.forEach((item: string) => {
      // 过滤出匹配项
      this.selectDrop.searchWordChange(item);
      this.addTag(item);
    });

    // 从匹配项中移除已选中项
    this.selectDrop.searchResult = this.getSuggestions(this.suggestions, this.modelWhole);
  }

  /**
   * 生成 tag 标签
   *
   * @private
   * @param value
   * @returns
   */
  private addTag(value: string): void {
    // 输入框为空时或者当前输入框内容对应的标签已经在选中列表中了
    if (value.trim() === '' || this.findFirstIndex(this.modelWhole, this.labelKey, value) !== -1) {
      return;
    }

    this.addTagToSelected(value);
  }
}
