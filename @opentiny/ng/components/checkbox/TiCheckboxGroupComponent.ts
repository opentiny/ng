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
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TiFormComponent } from '../base/TiFormComponent';

/**
 *
 * ti-checkbox-group组件的数据集格式
 */
export interface TiCheckboxItem {
  /**
   * 显示文本
   */
  label?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * HTML属性id
   */
  id?: string;
  [propName: string]: any;
}

/**
 *
 * 将多个复选框聚合在一起，成为一个组，在表单校验时需要使用。
 *
 */
@Component({
    selector: 'ti-checkbox-group',
    templateUrl: 'checkboxgroup.html',
    styleUrls: ['./checkboxgroup.less'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.ti-checkboxgroup-horizon]': 'direction === "horizontal"',
        '[class.ti-checkboxgroup-vertical]': 'direction === "vertical"',
        '[class.ti-checkboxgroup-defalut-item]': '!itemTemplate'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TiFormComponent.getValueAccessor(TiCheckboxGroupComponent)]
})
export class TiCheckboxGroupComponent extends TiFormComponent {
    /**
     * 选项的全部数据
     */
    @Input() items: Array<TiCheckboxItem>;
    /**
     * 数据要显示的键值
     */
    @Input() labelKey: string = 'label';
    /**
     * 指定选中项数据的键值
     */
    @Input() valueKey: string;
    /**
     * 指定排列方向
     */
    @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
    /**
     * 自定义数据选项模板
     */
    @ContentChild('item', {static: false}) itemTemplate: TemplateRef<any>;

    /**
     * @ignore
     * checkgroup的checkeds更新只是emit，数据引用地址没变
     * 通过一个中间变量实现model和checkgroup checkeds接口的更新
     */
    public checkeds: Array<any> = [];
    /**
     * @ignore
     */
    public onCheckedsChange(checkeds: Array<TiCheckboxItem>): void {
        this.model = [...checkeds];
    }
    /**
     * @ignore
     */
    public writeValue(value: Array<TiCheckboxItem>): void {
        super.writeValue(value);
        this.checkeds = this.model ? [...this.model] : [];
    }
}
