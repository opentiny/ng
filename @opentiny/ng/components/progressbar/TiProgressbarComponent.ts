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
import { Component, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseModule';
/**
 * 进度条组件
 *
 */
@Component({
    selector: 'ti-progressbar',
    templateUrl: './progressbar.html',
    styleUrls: ['./progressbar.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-progress]': 'true'
    }
})

export class TiProgressbarComponent extends TiBaseComponent {
    /**
     *  当前进度值
     */
    @Input() value: number = 0;
    /**
     *  进度目标值
     */
    @Input() max: number = 100;
    /**
     *  进度条样式
     */
    @Input() progressClass: string = '';
    /**
     *  进度变化时是否开启动画效果过渡
     */
    @Input() animation: boolean = true;
    /**
     * @ignore
     */
    public percent: number; // 当前进度值
    // 设置合法的数值
    private static verifyNum(newVal: any, defaultValue: any): number {
        return isNaN(parseFloat(newVal)) ? defaultValue : newVal;
    }
    ngOnInit(): void {
        super.ngOnInit();
        this.max = TiProgressbarComponent.verifyNum(this.max, this.max);
        this.value = TiProgressbarComponent.verifyNum(this.value, this.value);
        this.calcPercentage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        // 当前值更新，重新计算进度
        this.setChanges(changes, 'value');
        // 当最大值更新，重新计算进度
        this.setChanges(changes, 'max');
    }

    /**
     * @description 处理用户输入的改变
     * @param: changes 改变的对象
     * @param: changeKey 那个属性改变
     */
    private setChanges(changes: SimpleChanges, changeKey: string): void {
        if (changes[changeKey] && !changes[changeKey].isFirstChange()) {
            const oldVal: any = changes[changeKey].previousValue;
            const newVal: any = changes[changeKey].currentValue;
            const _newValue: number = TiProgressbarComponent.verifyNum(newVal, oldVal);
            this[changeKey] = _newValue;
            this.calcPercentage();
        }
    }

    // 计算当前进度百分比
    private calcPercentage(): void {
        // 如果开发者设置数据不合理，则进度置0
        if (this.max === 0) {
            this.percent = 0;

            return;
        }
        this.percent = Number((this.value * 100 / this.max).toFixed(2));
        if (this.percent > 100) {
            this.percent = 100;
        }
        if (this.percent < 0) {
            this.percent = 0;
        }
    }
}
