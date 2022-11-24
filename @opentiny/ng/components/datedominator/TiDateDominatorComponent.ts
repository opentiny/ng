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
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';
import { TiFormComponent } from '../base/TiBaseModule';

/**
 * @ignore
 */
@Component({
    selector: 'ti-date-dominator',
    templateUrl: './datedominator.html',
    styleUrls: ['./datedominator.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '(mouseenter)': 'onMouseenter()',
        '(mouseleave)': 'onMouseleave()',
        '[class.ti3-date-dominator-container]': 'true'
    },
    encapsulation: ViewEncapsulation.None, // 灰化设置样式
    providers: [TiFormComponent.getValueAccessor(TiDateDominatorComponent) ]
})

export class TiDateDominatorComponent extends TiFormComponent {
    @Input() clearable: boolean; // 是否显示删除按钮
    @Input() format: string; // 该接口主要用于range组件中线的定位：用于计算宽度
    @Input() type: string; // 类型：'date','range'
    @Input() isTime: boolean; // 是否是纯时间组件
    @Output() readonly clear: EventEmitter<any> = new EventEmitter<any>(); // 点击删除按钮的事件回调
    /**
     * @ignore
     * 是否显示清除图标
     */
    public showClear: boolean;

    ngOnInit(): void {
        super.ngOnInit();
        this.setFocusableElems([this.nativeElement]);
    }

    onIconClearClick(event: MouseEvent): void {
        this.clear.emit(event);
    }

    onMouseenter(): void {
        this.showClear = true;
    }
    onMouseleave(): void {
        this.showClear = false;
    }

}
