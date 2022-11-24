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
import { Component, Input, SimpleChanges } from '@angular/core';
import { TiFormComponent } from './TiFormComponent';
/**
 * 复原完整model对象基类，基于valueKey时，select/buttongroup实现复原选中值到完整对象
 */
@Component({// lib编译要求@Component
    selector: 'ti-whole',
    template: ''
})
export class TiWholeComponent extends TiFormComponent {
    /**
     * 指定选中项数据的键值
     */
    @Input() valueKey: string;
    private _modelWhole: any;
    /**
     * @ignore
     */
    public get modelWhole(): any {
        return this._modelWhole;
    }
    /**
     * @ignore
     * 用户点选时modelWhole改变，要同时更改model
     */
    public set modelWhole(value: any) {

        this._modelWhole = value;
        if (this.valueKey && value !== undefined && value !== null) {
            // 存在valueKey，且value不为空
            this.model = this['multiple'] ?
                value.map((item: any) => this.valueFn(item))
                : this.valueFn(value);
        } else {
            this.model = value;
        }
    }
    /**
     * @ignore
     * 找到value值的函数
     */
    @Input() valueFn: (item: any) => any = (item: any) => {
        return item[this.valueKey];
    };

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        // 监听 options/items/suggestions 变化
        if ((changes['options'] || changes['items'] || changes['suggestions']) && this.valueKey) {
            // 存在 valueKey 时，modelWhole 需通过匹配 valueKey 来重新赋值（解决动态改变options/items时选中项不高亮问题 issues#1332）
            this.writeValue(this.model);
        }
    }
    /**
     * @ignore
     * 每次用户主动设置ngModel值时，需要顺便更改modelWhole
     * @param model 设置的ngModel值
     */
    writeValue(model: any): void {
        super.writeValue(model);
        if (this.valueKey && model !== undefined && model !== null) { // 存在valueKey，且value不为空
            // 历史设计缺陷：select总数据集是options，buttongroup总数据集是items,tagsinput总数据集是suggestions
            let options: Array<any> = this['options'] || this['items'] || this['suggestions'];
            if (!options) {
                return;
            }
            if (options[0]?.children) {
                // 如果是分组，把options扁平化处理
                const _options: Array<any>  = [];
                options.forEach((option: any) => {
                    _options.push(...option.children);
                });
                options = _options;
            }
            // 直接去写内部值，不触发set函数
            this._modelWhole = this['multiple'] ?
                options.filter((item: any) => model.includes(this.valueFn(item))) :
                options.find((item: any) => this.valueFn(item) === model);
        } else {
            this._modelWhole = model;
        }
    }
}
