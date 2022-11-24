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
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { TiDraggableConfig, TiDragService } from '../../services/drag/TiDragService';
/**
 *
 * @ignore
 *
 * h5提供拖放特性，后续内部开发或服务开发建议优先使用原生拖放，故10.1.11起，在官网隐藏该组件。
 *
 * 拖拽指令，除指令方式外，还提供了服务生成方式[TiDragService]{@link ../injectables/TiDragService.html}
 *
 */
@Directive({
    selector: '[tiDraggable]'
})
export class TiDraggableDirective implements OnInit, OnChanges, OnDestroy {
    /**
     * 拖拽配置项
     */
    @Input() tiDraggable: TiDraggableConfig;
    /**
     * 拖拽是否灰化，可动态修改
     */
    @Input() tiDragDisabled: boolean = false;
    private dragInstance: {
        destroy(): void
    };
    private options: TiDraggableConfig;
    constructor(private hostEle: ElementRef, private dragService: TiDragService) {}
    ngOnInit(): void {
        this.options = {
            ...this.tiDraggable,
            helper: this.hostEle.nativeElement,
            disabled: this.tiDragDisabled
        };
        this.dragInstance = this.dragService.create(this.options);
    }
    ngOnChanges(changes: SimpleChanges): void {
        // 通过直接修改options的方式修改disabled状态
        if (changes['tiDragDisabled'] && !changes['tiDragDisabled'].firstChange) {
            this.options.disabled = this.tiDragDisabled;
        }
    }
    ngOnDestroy(): void {
        // 修复SSR错误：TypeError: Cannot read property 'destroy' of undefined
        this.dragInstance && this.dragInstance.destroy();
    }
}
