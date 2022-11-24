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
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef } from '@angular/core';
import { TiTabComponent } from './TiTabComponent';
/**
 * TiTabHeaderComponent 是单个页签的标题头组件，其包裹的元素会作为当前页签的标题头
 *
 */
@Component({
    selector: 'ti-tab-header',
    templateUrl: './tab-head.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-tab-head-no-outline]': 'true'
    }
})

export class TiTabHeaderComponent implements AfterContentInit, AfterViewChecked {
    private oldHeaderText: string;
    constructor(private tab: TiTabComponent, private elementRef: ElementRef) {}

    ngAfterContentInit(): void {
        // 由于此处的AfterContentInit会比TiTabComponent组件的OnInit
        // 执行得晚，所以ti-tab-header中的内容会覆盖header接口传入的字符串值
        this.tab.headNode = this.elementRef.nativeElement;
        if (!this.tab.header) {
            // 处理自定义dom没有header接口时对应下拉面板展示
            this.tab.header = this.elementRef.nativeElement.textContent;
        }
        this.oldHeaderText = this.tab.header;
    }

    ngAfterViewChecked(): void {
        // 既没有滑动条也没有溢出
        if (!this.tab.tabset.hasSlider && !this.tab.tabset.overflow) {
            return;
        }

        // 获取当前文本
        const headerText: string = this.elementRef.nativeElement.textContent;

        if (headerText === this.oldHeaderText) {
            return;
        }

        // 有滑动条slider场景
        if (this.tab.tabset.hasSlider) {
            this.tab.tabset.headerWidthChange = true;
        }

        // 溢出时：更新header
        if (this.tab.tabset.overflow) {
            this.tab.header = headerText;
        }

        this.oldHeaderText = headerText;
    }
}
