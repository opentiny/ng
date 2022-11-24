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
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter,
    Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TiFormComponent } from '../base/TiBaseModule';
/**
 * Switch开关组件
 *
 * 用于实现页面中的开关操作。
 *
 */
@Component({
    selector: 'ti-switch',
    templateUrl: './switch.html',
    styleUrls: ['./switch.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-switch-container]': 'true'
    },
    providers: [ TiFormComponent.getValueAccessor(TiSwitchComponent) ]
})
export class TiSwitchComponent extends TiFormComponent {
    /**
     * 打开状态的显示文本
     */
    @Input() onText: string = '';
    /**
     * 关闭状态的显示文本
     */
     @Input() offText: string = '';
    /**
     * 开关切换前触发的回调，参数：组件实例
     */
    @Output() readonly beforeChange: EventEmitter<TiSwitchComponent> = new EventEmitter<TiSwitchComponent>();
    /**
     * @ignore
     */
    @ViewChild('a', { static: true }) aRef: ElementRef;
    /**
     * 打开状态的自定义模板
     */
    @ContentChild('on', { static: true }) onTemplate: TemplateRef<any>;
    /**
     * 关闭状态的自定义模板
     */
    @ContentChild('off', { static: true }) offTemplate: TemplateRef<any>;

    private initialized: boolean = false;
    private hasAnimation: boolean = false;

    ngOnInit(): void {
        // 基类中做了设置宿主id的操作
        super.ngOnInit();
        this.setFocusableElems([this.aRef.nativeElement]);
    }
    /**
     * @ignore
     */
    ngOnModelChange(value: boolean): void {
        super.ngOnModelChange(value);
        if (value === null) { // 以 ngModel 的形式传入值时, writeValue首次传入null
            return;
        }

        if (this.initialized && !this.hasAnimation) { // 保证初始时没有动画
            this.renderer.addClass(this.aRef.nativeElement, 'ti3-switch-animation');
            this.hasAnimation = true;
        }
        this.initialized = true;
    }

    /**
     * 切换开关状态
     */
    private toggle(): void {

        if (this.beforeChange.observers.length === 0) {// 用户未定义beforeChange
            this.model = !this.model;
        } else {
            this.beforeChange.emit(this);
        }
    }
    /**
     * @ignore
     * 点击事件
     */
    public onClick(): void {
        if (!this.disabled) {
            this.toggle();
        }
    }
}
