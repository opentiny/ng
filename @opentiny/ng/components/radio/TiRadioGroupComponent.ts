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
import { ChangeDetectionStrategy, Component, ContentChild, Input, SimpleChanges, TemplateRef, ViewEncapsulation } from "@angular/core";
import { TiFormComponent } from '../base/TiFormComponent';
import { TiCheckboxItem } from '../checkbox/TiCheckboxGroupComponent';

/**
 *
 * ti-radio-group组件的数据集格式
 */
export interface TiRadioItem extends TiCheckboxItem {
    /**
     * 选中值
     */
    value?: string;
}

/**
 *
 * 将多个radio聚合在一起，成为一个组，在表单校验时需要使用。
 */
@Component({
    selector: 'ti-radio-group',
    templateUrl: './radio-group.html',
    styleUrls: ['./radiogroup.less'],
    host: {
        '[class.ti-radiogroup-horizon]': 'direction === "horizontal"',
        '[class.ti-radiogroup-vertival]': 'direction === "vertical"',
        '[class.ti-radiogroup-defalut-item]': '!itemTemplate'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TiFormComponent.getValueAccessor(TiRadioGroupComponent)]
})

export class TiRadioGroupComponent extends TiFormComponent {
    private static index: number = 0;
    /**
     * 所有单选项的数据集合
     */
    @Input() items: Array<TiRadioItem>;
    /**
     * @ignore
     * 组内每个 radio 的 name 属性值，多个 radio 需要共同的 name 属性才能聚合为一组
     */
    @Input() name: string;
    /**
     * 单选项数据要展示的键值
     */
    @Input() labelKey: string = 'label';
    /**
     * 指定选中项数据的键值
     */
    @Input() valueKey: string = 'value';
    /**
     * 排列方式
     */
    @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
    /**
     * 选项区域的插槽
     */
    @ContentChild('item', {static: false}) itemTemplate: TemplateRef<any>;
    /**
     * @ignore
     * ti-radio-group需要给组内的每个radio唯一的name属性
     */
    public uniqueName: string;
    ngOnInit(): void {
        super.ngOnInit();
        this.uniqueName = `ti_auto_radiogroup_${TiRadioGroupComponent.index++}`;
    }
}
