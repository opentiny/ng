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
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChange,
    SimpleChanges,
    TemplateRef} from '@angular/core';
import { TiTabsComponent } from './TiTabsComponent';
import { Util } from '../../utils/Util';
import { TiBaseComponent } from '../base/TiBaseModule';
/**
 * TiTabComponent 是单个页签组件，包含了页签标题头指令TiTabHeader 和 该页签对应的内容部分
 *
 */
@Component({
    selector: 'ti-tab',
    templateUrl: './tab.html',
    styleUrls: ['./tab.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-tab-pane]': 'true'
    }
})

export class TiTabComponent extends TiBaseComponent implements OnInit, OnDestroy, OnChanges {
    /**
     * 页签标题
     */
    @Input() header: string;
    /**
     * 是否禁用
     */
    @Input() disabled: boolean;
    /**
     * 当前页签是否激活，该接口是双向绑定的
     */
    @Input() @HostBinding('class.ti3-tab-active') active: boolean;
    /**
     * 页签激活项发生改变时触发的回调，参数为当前页签是否为激活状态
     */
    @Output() readonly activeChange: EventEmitter<any> = new EventEmitter();
    /**
     * 页签激活项发生改变前触发的回调
     */
    @Output() readonly beforeActiveChange: EventEmitter<any> = new EventEmitter();

    /**
     * @ignore
     * 获取到用户自定义的模板
     */
    @ContentChild('tiTabContent', { static: true }) public contentTemplate: TemplateRef<any>;
    /**
     * @ignore
     * 当前页签标题头显示的node节点
     */
    public headNode: any;
    /**
     * @ignore
     * 记录此页签的内容区是否已经加载过
     */
    public loaded: boolean = false;

    constructor(private elementRef: ElementRef, private renderer2: Renderer2,
                public tabset: TiTabsComponent, public changeDetectorRef: ChangeDetectorRef) {
            super(elementRef, renderer2);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.createHeadNode();
        this.tabset.addTab(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        const activeObj: SimpleChange = changes['active'];
        if (activeObj && activeObj.currentValue && this.tabset.selectedTab !== this && !this.disabled) {
            this.tabset.activeTab(this, !activeObj.firstChange);
        }

        const disabledChange: SimpleChange = changes['disabled'];
        if (disabledChange && !disabledChange.firstChange) {
            this.tabset.changeDetectorRef.markForCheck();
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // 父容器TiTabs的OnDestroy执行晚于TiTab的OnDestroy，所以此处需要setTimeout来延时
        setTimeout(() => {
            if (this.tabset.destroyed) {
                return;
            }
            this.tabset.removeTab(this);
            // tabs动态增删，onpush模式视图未更新
            this.tabset.changeDetectorRef.markForCheck();
            // 如果没有tab，那么下划线隐藏
            if (this.tabset.tabs.length === 0) {
                this.tabset.tiRenderer.setStyles(this.tabset.slider.nativeElement, {
                    width: 0,
                    left: 0
                });
            }
        }, 0);
    }

    private createHeadNode(): void {
        if (Util.isString(this.header)) {
            this.headNode = this.renderer2.createText(this.header);
        }
    }
}
