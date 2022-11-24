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
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TiFormComponent, TiWholeComponent } from '../base/TiBaseModule';
import { TiDominatorComponent } from '../dominator/TiDominatorModule';
import { TiDropComponent } from '../drop/TiDropModule';
import { TiDropsearchComponent } from '../dropsearch/TiDropsearchModule';
import { TiListComponent, TiListScrollLoad } from '../list/TiListModule';
import { TiKeymap } from '../../utils/Util';
import { TiPositionType } from '../../utils/Position';
import { TiLocale } from '../../locale/TiLocaleModule';

/**
 * Select选择下拉组件
 *
 * 支持单选/多选，分组，搜索，懒加载。
 *
 * 单选主要功能为从一个数据集合中选择某一条数据，单选与RadioGroup功能相同，只是视觉呈现不同。
 *
 * 多选主要功能是从一个数据集合中任意选择多条数据，与checkboxGroup功能相同，只是视觉呈现不同。
 *
 */
@Component({
    selector: 'ti-select',
    templateUrl: './select.html',
    styleUrls: ['./select.less', './select-small.less'],
    providers: [TiFormComponent.getValueAccessor(TiSelectComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-select-small]': 'size === "small"',
        '(blur)': 'onBlur()'
    }
})
export class TiSelectComponent extends TiWholeComponent {
    /**
     * @ignore
     * dominator 到drop的距离
     */
    @Input() dominatorSpace: string = TiDropComponent.DOMINATOR_SPACE + 'px';
    /**
     * 下拉面板是否多选
     */
    @Input() multiple: boolean = false;
    /**
     * 多选场景下，选择框最多显示行数
     */
    @Input() maxLine: number = 2;
    /**
     * 选择框中选中项的tip提示方向
     */
    @Input() selectedTipPosition: TiPositionType = 'auto';
    /**
     * 选择框的占位文本
     */
    @Input() placeholder: string = '';
    // 面板配置
    /**
     * 下拉面板的宽度。
     *
     * 1."justified": 下拉面板的宽度与选择框宽度保持一致；
     *
     * 2."auto": 下拉面板的宽度根据下拉项的内容自动撑开；
     *
     * 3. 固定的下拉框宽度：不小于选择框的宽度，例如："200px"
     */
    @Input() panelWidth: 'justified' | 'auto'| string = 'justified'; // TODO: 确认类型
    /**
     * 下拉面板最大高度
     */
    @Input() panelMaxHeight: string;
    /**
     * 下拉面板无数据时的显示文本
     */
    @Input() noDataText: string = TiLocale.getLocaleWords().tiList.noDataText;
    // 列表数据配置
    /**
     * 下拉选项的全部数据
     */
    @Input() options: Array<any>;
    /**
     * 下拉面板要显示的键值
     */
   @Input() labelKey: string = 'label';
    /**
     * 下拉面板是否开启搜索功能
     */
   @Input() searchable: boolean = false;
    /**
     * 指定搜索的字段范围
     */
    @Input() searchKeys: Array<string>;
    // 其他配置
    /**
     * @ignore
     * 选择框大小
     */
    @Input() size: 'default' | 'small' = 'default';
    /**
     * 下拉面板选中项的 tip 提示方向
     */
    @Input() tipPosition: TiPositionType = 'right';
    /**
     * 选择框是否开启清除已选项功能
     *
     * 单选下拉一键清除功能
     *
     * 多选下拉一键清除功能
     */
    @Input() clearable: boolean = false;
    /**
     * 多选场景下是否开启全选功能
     */
    @Input() selectAll: boolean = false;
    /**
     * 多选场景下选择框是否显示选中项个数
     */
    @Input() showSelectedNumber: boolean = false ;
    /**
     * 是否开启虚拟滚动
     */
    @Input() virtual: boolean = false;
    /**
     * @ignore
     * TODO: 暂不对外开放该接口，后续根据使用场景进行优化
     * 当开启虚拟滚动时，可配置单条选项的高度(单位是px)， 默认值30
     */
    @Input() itemSize: number = TiListComponent.OPTION_DEFAULT_HEIGHT;
    /**
     * tip 提示最大宽度
     */
    @Input() tipMaxWidth: string;
    /**
     * @ignore
     *
     * 默认值为 labelKey 的接口值
     *
     * idKey指定的属性的值相等时即认为 option 选项是选中的。选中项 ngModel 中的数据跟 options 数据集中的选项(option对象)之间对应相等关系的依据属性。
     *
     * 当 modelOption中的 idKey 设置的属性的值 与 option 中的 idKey 设置的属性的值相等时，则认为 modelOption 和 option 是对应的相等关系，即认为 option 选项是选中的。
     *
     * 默认当 modelOption === option 或者 modelOption 中的 labelKey 设置的属性的值 与 option 中的  设置的属性的值相等时，则认为 option 选项是选中的。
     *
     */

    /**
     * 设置数据唯一标识的键值，默认为 labelKey 的接口值
     */
    @Input() idKey: string;
    /**
     * 下拉面板是否添加在 body 上
     */
    @Input() appendToBody: boolean = true;
    /**
     * 多选场景下，选择框是否显示已选个数的tip提示方向
     */
    @Input() showSelectedNumberTip: boolean = false;
    /**
     * 选择框已选个数的tip提示方向
     */
    @Input() selectedNumberTipPosition: TiPositionType = 'bottom';
    /**
     * 搜索场景下，下拉面板收起后是否保留搜索关键词
     */
    @Input() reserveSearchword: boolean = false;
    /**
     * 打开面板前触发的回调，参数为当前组件实例，一般用于数据懒加载场景
     */
    @Output() readonly beforeOpen: EventEmitter<TiSelectComponent> = new EventEmitter<TiSelectComponent>();
    /**
     * 下拉选项选中或取消选中时触发的回调，参数：当前点击项
     */
    @Output() readonly select: EventEmitter<any> = new EventEmitter<any>();
    /**
     * 点击清除按钮时触发的回调
     *
     * 单选下拉一键清除功能
     *
     * 多选下拉一键清除功能
     */
    @Output() readonly clear: EventEmitter<any> = new EventEmitter<any>();
    /**
     * 搜索前触发的回调，参数：搜索关键词，一般用于后台搜索
     */
    @Output() readonly beforeSearch: EventEmitter<any> = new EventEmitter<any>();
    /**
     * 下拉列表滚动到底部触发的回调，一般用于滚动加载场景
     */
    @Output() readonly scrollToBottom: EventEmitter<any> = new EventEmitter<any>();
    /**
     * @ignore
     * 用户写的item模板，firstTemplate是第一个或者唯一的template
     */
    @ContentChild(TemplateRef, { static: false }) firstTemplate: TemplateRef<any>;
    /**
     * 下拉选项区域的模板
     */
    @ContentChild('item', { static: false }) itemTemplate: TemplateRef<any>;
    /**
     * 选择框选中项区域的模板
     */
    @ContentChild('selected', { static: false }) selectedTemplate: TemplateRef<any>;
    /**
     * 选择框占位文本区域的模板
     */
    @ContentChild('placeholder', { static: false }) placeholderTemplate: TemplateRef<any>;
    /**
     * 下拉面板底部区域的模板
     */
    @ContentChild('footer', { static: false }) footerTemplate: TemplateRef<any>;
    /**
     * @ignore
     * 内部标签donimator组件
     */
    @ViewChild(TiDominatorComponent, { static: true }) dominatorCom: TiDominatorComponent;
    /**
     * @ignore
     * 内部标签Droplist组件
     */
    @ViewChild(TiDropsearchComponent, { static: true }) dropsearchCom: TiDropsearchComponent;
    protected oldSearchable: boolean = null;

    ngOnInit(): void {
        super.ngOnInit();
        if (this.beforeSearch.observers.length !== 0) {
            this.dropsearchCom.hasBeforeSearchObservers = true;
        }
        if (this.scrollToBottom.observers.length > 0) {
            this.virtual = true;
        }
    }

    /**
     * 兼容旧版：
     * 3.1.2版select只能内嵌一个模板，无命名。
     * 新版可以内嵌四个模板，示例书写要求都命名。
     * 但需要兼容旧版无命名测试用例。
     */
    ngAfterContentInit(): void {
        super.ngAfterContentInit();
        // 如果item模板为空，那么把第一个出现的无标签（无footer等标签）模板作为item
        if (!this.itemTemplate && this.firstTemplate) {
            const firstTemplateEle: Element = this.firstTemplate.elementRef.nativeElement;
            if (firstTemplateEle !== (this.selectedTemplate && this.selectedTemplate.elementRef.nativeElement)
                && firstTemplateEle !== (this.placeholderTemplate && this.placeholderTemplate.elementRef.nativeElement)
                && firstTemplateEle !== (this.footerTemplate && this.footerTemplate.elementRef.nativeElement)) {
                    this.itemTemplate = this.firstTemplate;
            }
        }
    }

    ngAfterViewChecked(): void {
        // 要支持searchable的动态变更，所以ngAfterViewChecked才能获知搜索框节点。
        if (this.searchable !== this.oldSearchable) {
            this.oldSearchable = this.searchable;
            if (this.searchable) {
                this.setFocusableElems(this.dominatorCom.getFocusableElems()
                    .concat(this.dropsearchCom.getFocusableElems()));
            } else {
                this.setFocusableElems(this.dominatorCom.getFocusableElems());
            }
        }
        if (this.dropsearchCom.isFocusableElemsInPaginationChange) {
            this.setFocusableElems(this.dominatorCom.getFocusableElems()
                    .concat(this.dropsearchCom.getFocusableElems()));
            this.dropsearchCom.isFocusableElemsInPaginationChange = false;
        }
        // 上面设置好focusElems后，调用父类逻辑afterViewChecked才去设置autofocs
        super.ngAfterViewChecked();

    }

    /**
     * @ignore
     * 切换面板开合状态
     */
    public toggle(): void {
        if (!this.dropsearchCom.isShow) { // 面板关闭时
            this.wantOpen();
        } else { // 面板开时
            this.close();
        }
    }
    /**
     * 打开面板
     */
    public open(): void {
        this.dropsearchCom.show();
    }
    /**
     * @ignore
     * 收起面板
     */
    public close(): void {
        this.dropsearchCom.hide();
    }
    /**
     * @ignore
     * 处理点击Dominator事件
     */
    public onClickDominator(): void {
        if (this.disabled) {
            return;
        }
        this.toggle();
    }
    /**
     * @ignore
     * ti-select键盘事件处理：回车/空格情况下，展开面板
     * @param event 按键事件
     * @returns void
     */
    @HostListener('keydown', ['$event']) public onKeydown(event: KeyboardEvent): void {
        if (this.disabled || this.dropsearchCom.isShow) {
            return;
        }
        const enterKeyCodeArr: Array<number> = [TiKeymap.KEY_SPACE, TiKeymap.KEY_ENTER, TiKeymap.KEY_NUMPAD_ENTER];
        if (enterKeyCodeArr.includes(event.keyCode)) {
            this.wantOpen();
            // 如果响应了按键，那么不再冒泡
            event.stopPropagation();
        }
    }
    /**
     * @ignore
     * 失焦情况下，仅关闭面板，不做聚焦等处理
     */
    public onBlur(): void {
        this.dropsearchCom.hideWithoutFocus();
    }
    /**
     *  点击或者toggle()，尝试打开面板
     */
    protected wantOpen(): void {
        if (this.beforeOpen.observers.length === 0) { // 无beforeOpen懒加载，直接打开
            this.open();
        } else { // 有beforeOpen懒加载，发出事件
            this.beforeOpen.emit(this);
        }
    }
    /**
     * @ignore
     * 多选带searchbox场景下，dominator中元素删除时，需要聚焦于searchbox
     */
    public onDeleteDominator(): void {
        if (this.dropsearchCom.isShow) {
            this.dropsearchCom.focus();
        }
    }
    /**
     * @ignore
     * 点击下拉选项触发的回调
     */
    public onSelect(option: any): void {
        this.select.emit(option);
        if (this.multiple) {
            return;
        }
    }
    /**
     * @ignore
     * 单选点击清除按钮时触发clear事件, 如果下拉中有搜索,则需要聚焦于searchbox。
     */
    public onClearDominator(): void {
        this.clear.emit();
        if (this.searchable && this.dropsearchCom.isShow) {
            this.dropsearchCom.focus();
        }
    }
    /**
     * @ignore
     */
    public onBeforeSearch(): void {
        this.beforeSearch.emit(this);
    }
    /**
     * 获取搜索关键词
     * @returns 搜索关键词
     */
    public getSearchWord(): string {
        return this.dropsearchCom.searchWord;
    }
    /**
     * @ignore
     * 设置搜索结果
     * @params 业务设置搜索后的结果，组件不再进行数据处理
     */
    public setSearchResult(searchResult: Array<any>): void {
        this.dropsearchCom.setSearchResult(searchResult);
    }
    /**
     * 获取搜索后的下拉列表数据
     */
    public getSearchResult(): Array<any> {
        return this.dropsearchCom.searchResult;
    }
    /**
     * @ignore
     */
    public onScrollToBottom(scrollLoad: TiListScrollLoad): void {
        this.scrollToBottom.emit(scrollLoad);
    }
}
