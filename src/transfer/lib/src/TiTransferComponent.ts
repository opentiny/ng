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
import { Component, Input, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { TiLocale } from '@opentiny/ng-locale';
import { TiFormComponent } from '@opentiny/ng-base';
import { TiTransferUtil } from './transferUtil';
import { TiTransferColumn } from './TiTransferColumn';
import packageInfo from '../package.json';

@Component({
  selector: 'ti-transfer',
  templateUrl: './transfer.html',
  providers: [TiFormComponent.getValueAccessor(TiTransferComponent)],
  styleUrls: ['./transfer.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiTransferComponent extends TiFormComponent {
  /**
   * 源数据
   */
  @Input() options: Array<any> = [];
  /**
   * 列表数据要展示的键值
   */
  @Input() labelKey: string = 'label';
  /**
   * 设置数据唯一标识的键值
   */
  @Input() idKey: string;
  /**
   * 左侧面板标题文本
   *
   * 默认值 : 可选项（国际化）
   */
  @Input() leftTitle: string = TiLocale.getLocaleWords().tiTransfer.available;
  /**
   * 右侧面板标题文本
   *
   * 默认值 : 已选项（国际化）
   */
  @Input() rightTitle: string = TiLocale.getLocaleWords().tiTransfer.selected;
  /**
   * 无数据时的显示文本
   *
   * 默认值 : 暂无数据（国际化）
   */
  @Input() noDataText: string = TiLocale.getLocaleWords().tiList.noDataText;
  /**
   * 穿梭框的高度
   *
   * 1.type 为 list 默认值为 300px
   *
   * 2.type 为 table 默认值为 443px
   *
   */
  @Input() height: string;
  /**
   * 穿梭框的宽度
   *
   * 1.type 为 list 默认值为 200px
   *
   * 2.type 为 table 默认值为 340px
   *
   */
  @Input() width: string;
  /**
   * 是否开启搜索
   */
  @Input() searchable: boolean = false;
  /**
   * 输入框的提示文本
   *
   * 默认值 : 请输入关键字搜索（国际化）
   */
  @Input() placeholder: string = TiLocale.getLocaleWords().tiTransfer.placeholder;
  /**
   * 搜索字段
   */
  @Input() searchKeys: Array<string>;
  /**
   * 是否开启分页
   */
  @Input() pageable: boolean = false;
  /**
   * 每页显示数据条数
   */
  @Input() pageSize: number = 10;
  /**
   * 点击左向右的按钮点时触发的回调
   */
  @Output() readonly transferToRight: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 点击右向左的按钮点时触发的回调
   */
  @Output() readonly transferToLeft: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 穿梭框类型
   */
  @Input() type: 'list' | 'table' = 'list';
  /**
   * 表格类型时表头显示配置
   */
  @Input() columns: Array<TiTransferColumn> = [];
  /**
   * @ignore
   * 选中事件，向外通知option数据,因不了解业务使用场景，暂不对外开发该接口
   */
  @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 表格类型每行展示的模板
   */
  @ContentChild('row', { static: false }) rowTemplate: TemplateRef<any>;
  /**
   * @ignore
   * 左侧面板选中项
   */
  public leftSelectedOptions: Array<any> = [];
  /**
   * @ignore
   * 右侧面板选中项
   */
  public rightSelectedOptions: Array<any> = [];
  /**
   * @ignore
   * 设置向右button的disabled状态
   */
  public toRightButtonDisabled: boolean = true;
  /**
   * @ignore
   * 设置向左button的disabled状态
   */
  public toLeftButtonDisabled: boolean = true;
  /**
   * @ignore
   * 穿梭框的左侧面板的列表数据
   *
   * 默认值 : []
   */
  public leftOptions: Array<any> = []; // options的数据
  /**
   * @ignore
   * 穿梭框的右侧面板的列表数据
   *
   * 默认值 : []
   */
  public rightOptions: Array<any> = []; // options的数据
  protected versionInfo: string = super.getVersion(packageInfo);

  // 初始化右侧面板的数据
  writeValue(model: any): void {
    super.writeValue(model);
    this.rightOptions = this.getEqualOptions(model, this.options);
    this.leftOptions = this.getLeftOptions();

    // 根据左右面板最新数据来获取最新的左右面板选中项
    this.leftSelectedOptions = this.getEqualOptions(this.leftSelectedOptions, this.leftOptions);
    this.rightSelectedOptions = this.getEqualOptions(this.rightSelectedOptions, this.rightOptions);

    this.toRightButtonDisabled = this.getButtondisabled(this.leftSelectedOptions);
    this.toLeftButtonDisabled = this.getButtondisabled(this.rightSelectedOptions);
  }

  private filterModel(option: any): boolean {
    // 从右侧面板列表中查找当前的option的index
    const index: number = this.rightOptions.findIndex((rightOption) => {
      return TiTransferUtil.isEqualOption(this.idKey, this.labelKey, rightOption, option);
    });
    // 结果大于-1，说明当前的option存在于右侧面板中
    return index > -1;
  }

  // 获取left面板的数据
  public getLeftOptions(): Array<any> {
    const leftOptions: Array<any> = this.options
      ? this.options.filter((option) => {
          // 过滤掉右侧面板数据
          return !this.filterModel(option);
        })
      : [];

    return leftOptions;
  }

  /**
   * 点击向右button事件
   */
  public onClickToRight(): void {
    if (this.toRightButtonDisabled) {
      return;
    }
    // 1.将左侧的选中项同步到右侧
    this.rightOptions = [...this.leftSelectedOptions, ...this.rightOptions];
    // 2.将左侧的选中项从左侧的options中进行清除
    this.leftOptions = this.leftOptions.filter((option) => {
      return this.leftSelectedOptions.indexOf(option) < 0;
    });
    // 将右侧列表的值传给model，实现双向绑定
    this.model = this.rightOptions;
    const selectParms: object = {
      rightOptions: this.rightOptions,
      leftOptions: this.leftOptions,
      toRightOptions: this.leftSelectedOptions
    };
    // 将相关数据传到外面
    this.transferToRight.emit(selectParms);
    // 清除已选中项,清除选中项
    this.leftSelectedOptions = [];
    // 设置向右箭头的disabled状态
    this.toRightButtonDisabled = true;
  }

  /**
   * 点击向左button事件
   */
  public onClickToLeft(): void {
    if (this.toLeftButtonDisabled) {
      return;
    }
    // 1.将右侧的选中项移动到左边,并进行恢复初始数据
    this.leftOptions = this.recoveryOptions([...this.leftOptions, ...this.rightSelectedOptions]);
    // 2.将右侧的选中项从右侧的options中进行清除
    this.rightOptions = this.rightOptions.filter((option) => {
      return this.rightSelectedOptions.indexOf(option) < 0;
    });

    // 将右侧列表的值传给model，实现双向绑定
    this.model = this.rightOptions;
    const selectParms: object = {
      rightOptions: this.rightOptions,
      leftOptions: this.leftOptions,
      toLeftOptions: this.rightSelectedOptions
    };

    // 将相关数据传到外面
    this.transferToLeft.emit(selectParms);
    // 清除已选中项，清除选中状态;
    this.rightSelectedOptions = [];
    // 设置向左箭头的disabled状态
    this.toLeftButtonDisabled = true;
  }

  // 为左右两侧面板数据赋值
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes?.options) {
      this.rightOptions = this.getEqualOptions(this.model, this.options);
      this.leftOptions = this.getLeftOptions();

      // 根据左右面板最新数据来获取最新的左右面板选中项
      this.leftSelectedOptions = this.getEqualOptions(this.leftSelectedOptions, this.leftOptions);
      this.rightSelectedOptions = this.getEqualOptions(this.rightSelectedOptions, this.rightOptions);

      this.toRightButtonDisabled = this.getButtondisabled(this.leftSelectedOptions);
      this.toLeftButtonDisabled = this.getButtondisabled(this.rightSelectedOptions);
    }
  }

  // 获取相同的option部分
  private getEqualOptions(modelOptions: Array<any> = [], options: Array<any> = []): Array<any> {
    const optionsTemp: Array<any> = [];
    modelOptions?.forEach((modelOption) => {
      const equalOption: object = options?.find((option) => {
        return TiTransferUtil.isEqualOption(this.idKey, this.labelKey, modelOption, option);
      });

      if (equalOption) {
        optionsTemp.push(equalOption);
      }
    });

    return optionsTemp;
  }
  public leftModelChange(options: Array<any> = []): void {
    // 判断左侧面板是否有选中项，从而控制向右button的禁用状态
    this.toRightButtonDisabled = this.getButtondisabled(options);
  }
  public rightModelChange(options: Array<any> = []): void {
    // 判断右侧面板是否有选中项，从而控制向左button的禁用状态
    this.toLeftButtonDisabled = this.getButtondisabled(options);
  }

  // 获取左右箭头的disabled状态
  private getButtondisabled(options: Array<any> = []): boolean {
    return !options || options.length === 0;
  }

  // 当右侧数据到左侧时，恢复左侧options的顺序
  private recoveryOptions(leftOptions: Array<any> = []): Array<any> {
    const optionsTemp: Array<any> = [];
    this.options?.forEach((oldOption) => {
      leftOptions?.forEach((leftOption) => {
        if (TiTransferUtil.isEqualOption(this.idKey, this.labelKey, leftOption, oldOption)) {
          optionsTemp.push(leftOption);
        }
      });
    });

    return optionsTemp;
  }

  /**
   * @ignore
   * 左侧面板选中/取消事件回调，暂不对外开放
   */
  public onLeftSelect(option: any): void {
    this.select.emit(option);
  }

  /**
   * @ignore
   * 右侧面板取消/选中事件回调，暂不对外开放
   */
  public onRightSelect(option: any): void {
    this.select.emit(option);
  }
}
