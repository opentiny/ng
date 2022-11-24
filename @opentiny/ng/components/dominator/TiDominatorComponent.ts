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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, NgZone,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewChildren,
    QueryList} from '@angular/core';
import { TiFormComponent } from '../base/TiBaseModule';
import { Util } from '../../utils/Util';
import { TiPositionType } from '../../utils/Position';
import { TiTagComponent } from '../tag/TiTagModule';

/**
 * @ignore
 */
@Component({
    selector: 'ti-dominator',
    templateUrl: './dominator.html',
    styleUrls: ['./dominator.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-select-dominator-container]': 'true',
        '[class.ti3-multiselect-container]': 'multiple'
    },
    providers: [TiFormComponent.getValueAccessor(TiDominatorComponent)]
})
export class TiDominatorComponent extends TiFormComponent {
    // 删除 buttonStyle 接口，规范中按钮样式只有三角图标样式
    @Input() labelKey: string; // 呈现的内容（无删除按钮） TODO: 含删除按钮的场景，扩展为Array
    @Input() placeholder: string; // 组件的预留文本
    @Input() multiple: boolean = false; // 单选多选
    @Input() selectedTipPosition: TiPositionType = 'auto'; // 选中项文本超出时tip展开方向
    /**
     * @ignore
     * tag的最大宽，TpSearchbox使用
     */
    @Input() tagMaxWidth: string;
    /**
     * 设置dominator最多显示几行，默认2行, multiple为true时生效
     */
    @Input() maxLine: number = 2 ;
    /**
     * 设置是否显示已选项的个数，默认不显示，multiple为true时生效
     *
     */
    @Input() showSelectedNumber: boolean = false;
    /**
     * 设置是否显示已选中项个数的tip提示
     *
     */
    @Input() showSelectedNumberTip: boolean = false;
    /**
     * 设置已选中项个数tip的方向
     *
     */
    @Input() selectedNumberTipPosition: TiPositionType = 'bottom';
    /**
     * 设置dominator 内容的最大高度，默认是两行的高度，multiple为true时生效，此参数设置后maxLine接口失效
     */
    @Input() maxHeight: string;
    @Input() type: 'tagsinput' | string;
    /**
     * 下拉选择框是否开启清除已选项功能
     */
    @Input() clearable: boolean = false;

    @Input() tipMaxWidth: string;
    /**
     * @ignore
     * 是否可输入
     */
    @Input() inputtable: boolean = false;
    @Output() readonly delete: EventEmitter<any> = new EventEmitter<any>();
    /**
     * 当下拉选择框开启清除已选项功能时，点击清除按钮时触发
     *
     */
    @Output() readonly clear: EventEmitter<any> = new EventEmitter<any>();
    /**
     * 传出输入内容
     */
    @Output() readonly inputChange: EventEmitter<string> = new EventEmitter<string>();

    @ContentChild(TemplateRef, { static: true }) firstTemplate: TemplateRef<any>;
    @ContentChild('item', { static: true }) itemTemplate: TemplateRef<any>;
    @ContentChild('placeholder') placeholderTemplate: TemplateRef<any>;
    @ViewChild('input', { static: false }) inputRef: ElementRef<any>;
    @ViewChildren('tag') tagComs: QueryList<TiTagComponent>;
    public inputModel: string = '';
    public isInputFocus: boolean = false; // 控制输入框和dominator文本区域的样式状态
    public hasInputModel: boolean = false; // 控制输入框和dominator文本区域的样式状态

    private isMouseIn: boolean = false;
    private selectOptionLine: number;
    constructor(protected hostRef: ElementRef, protected renderer: Renderer2,
                protected changeDetectorRef: ChangeDetectorRef, private zone: NgZone) {
        super(hostRef, renderer, changeDetectorRef);
    }


    ngOnInit(): void {
        super.ngOnInit();
        // 每行tag的高度24px, +2 是因为 .ti3-select-dominator-text 元素上下padding
        if (this.showSelectedNumber) {
            this.selectOptionLine = this.maxLine === 1 ? 1 : this.maxLine - 1;
        } else {
            this.selectOptionLine = this.maxLine;
        }

        this.maxHeight = this.multiple ? this.maxHeight : '';
    }

    ngDoCheck(): void {
        super.ngDoCheck();
        // 修复问题：OnPush的综合搜索，绑定的ngModel值内容变化，引用未变时，综合搜索显示不变。
        // 详见tp-serchbox-table用例，更改表格某列过滤项，综合搜索应该立即改变。
        this.changeDetectorRef.markForCheck();
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (this.inputRef?.nativeElement) {
            this.setFocusableElems([this.nativeElement, this.inputRef.nativeElement]);
        } else {
            this.setFocusableElems([this.nativeElement]);
        }
        this.zone.runOutsideAngular(() => {
            // 内部mousedown事件冒泡至根节点
            this.renderer.listen(this.nativeElement, 'mousedown', (event: MouseEvent): void => {
                if (this.disabled) {
                    event.preventDefault(); // 不能聚焦，不能click
                }
            });
            if (this.clearable) {
                this.renderer.listen(this.nativeElement, 'mouseenter', (): void => {
                    if (this.disabled || Util.isEmptyString(this.model)) {
                        return;
                    }
                    this.zone.run(() => {
                        this.isMouseIn = true;
                        this.changeDetectorRef.markForCheck();
                    });
                });
                this.renderer.listen(this.nativeElement, 'mouseleave', (): void => {
                    if (this.isMouseIn) {
                        this.zone.run(() => {
                            this.isMouseIn = false;
                            this.changeDetectorRef.markForCheck();
                        });
                    }
                });
            }
        });
    }
    /**
     * 兼容旧版：
     * 3.1.2版select只能内嵌一个模板，无命名。
     * 新版可以内嵌2个模板，示例书写要求都命名。
     * 但需要兼容旧版无命名测试用例。
     */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
        // 如果item模板为空，那么把第一个出现的无标签（无footer等标签）模板作为item
        if (!this.itemTemplate && this.firstTemplate !== this.placeholderTemplate) {
            this.itemTemplate = this.firstTemplate;
        }
    }

    ngAfterViewChecked(){
        super.ngAfterViewChecked();

        if (this.multiple && this.tagComs.first?.nativeElement && !this.maxHeight) {
            if (typeof getComputedStyle !== 'undefined') {
                const tagStyle: CSSStyleDeclaration = getComputedStyle(this.tagComs.first?.nativeElement);
                const dominatorStyle: CSSStyleDeclaration = getComputedStyle(this.nativeElement);

                const tagHeight = parseInt(tagStyle.height, 10);
                const tagBorderWidth = parseInt(tagStyle.borderWidth, 10) * 2;
                const dominatorMargin = parseInt(dominatorStyle.getPropertyValue('--ti-dominator-multiselect-tag-margin'), 10) * 2;
                const dominatorPadding = parseInt(dominatorStyle.getPropertyValue('--ti-dominator-multiselect-container-padding'), 10) * 2;

                this.maxHeight = (this.selectOptionLine * (tagHeight + tagBorderWidth + dominatorMargin) + dominatorPadding) + 'px';
                this.changeDetectorRef.detectChanges();
            }
        }
    }

    /**
     * @ignore 获取选中项呈现个数的tip匹配
     */
    public getTipConfig(): string {
        return this.showSelectedNumberTip ? this.model?.map((item: any) => item[this.labelKey]).toString() : '';
    }
    /**
     * 用户点击叉号，删除一个项目
     * @param item
     * @returns
     */
    public onDelete(item: any): void {
        if (item.disabled === true) {
            return;
        }
        // 删除选中
        const index: number = this.model.indexOf(item);
        if (index !== -1) {
            this.model.splice(index, 1);
        }
        this.delete.emit({
            item: item,
            model: this.model
        });
        // 强行向外通知model改变。
        this.model = this.model.concat();
    }
    /**
     * @ignore
     */
    public onClickClear(event: MouseEvent): void {
        event.stopPropagation();
        this.model = this.multiple ? [] : null;
        this.clear.emit();
    }
    public showClear(): boolean {
        const isShow: boolean = this.clearable && !this.disabled && (this.isMouseIn || this.focused);

        return this.multiple ? isShow && this.model && this.model.length !== 0 : isShow && this.model;
    }
    /**
     * @ignore
     */
    public onInputFocus(): void {
        this.isInputFocus = true;
    }
    /**
     * @ignore
     */
    public onInputBlur(): void {
        this.hasInputModel = false;
        this.isInputFocus = false;
        this.inputModel = '';
    }
    /**
     * @ignore
     */
    public inputModelChange(event: string): void {
        if (event?.length > 0) {
            this.hasInputModel = true;
        } else if (event?.length === 0) {
            this.hasInputModel = false;
        }
        this.inputChange.emit(event);
    }
}
