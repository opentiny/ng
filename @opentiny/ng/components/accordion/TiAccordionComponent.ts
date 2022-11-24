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
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TiAccordionItemComponent } from './TiAccordionItemComponent';
import { TiBaseComponent } from '../base/TiBaseModule';

/**
 * 手风琴组件，
 * 用于实现多个折叠面板的呈现方式，通过ti-accordion、ti-accordion-item、ti-accordion-head组件嵌套方式实现
 *
 * <p><span style="color: red">使用此组件时需要开发者在项目模块(建议在根模块)
 * 中引入BrowserAnimationsModule。</span>这是因为此组件中使用了Angular动画，需要引入BrowserAnimationsModule，
 * 但是 BrowserAnimationsModule 不能在懒加载模块被重复引入，所以需要开发者来引入BrowserAnimationsModule，保证其引入一次。</p>
 *
 */
@Component({
    selector: 'ti-accordion',
    templateUrl: './accordion.html',
    styleUrls: ['./accordion.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-accordion-group]': 'true'
    }
})
export class TiAccordionComponent extends TiBaseComponent {
    /**
     * 展开某一项时，是否关闭其它项
     */
    @Input() closeOthers: boolean = true;
    /**
     * 头部样式类
     */
    @Input() headClass: string = '';
    /**
     * 内容体样式类
     */
    @Input() bodyClass: string = '';

    protected items: Array<TiAccordionItemComponent> = [];
    /**
     * @ignore
     * 关闭其余item
     */
    closeOtherItems(openItem: TiAccordionItemComponent): void {
        if (!this.closeOthers) {
            return;
        }
        this.items.forEach((item: TiAccordionItemComponent) => {
            if (item.open && item !== openItem) {
                item.open = false;
            }
        });
    }

    /**
     * @ignore
     * 添加某一accordion条目到items数组中
     */
    addItem(item: TiAccordionItemComponent): void {
        this.items.push(item);
    }

    /**
     * @ignore
     * 从items数组中删除某一accordion条目
     */
    removeItem(item: TiAccordionItemComponent): void {
        const index: number = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}
