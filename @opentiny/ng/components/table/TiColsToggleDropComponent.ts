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
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    IterableChanges,
    IterableDiffer,
    IterableDiffers,
    NgZone,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { TiDropsearchComponent } from '../dropsearch/TiDropsearchModule';
import { TiListComponent } from '../list/TiListModule';
import { TiTableColumns, TiTableComponent } from './TiTableComponent';

/**
 * @ignore
 * TiColsToggleDrop 控制列动态隐藏/显示的下拉组件
 *
 */
@Component({
    selector: 'ti-cols-toggle-drop',
    templateUrl: './cols-toggle-drop.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-cols-toggle-drop-container]': 'true'
    }
})
export class TiColsToggleDropComponent extends TiDropsearchComponent {
    public static readonly DOMINATOR_SPACE: number = 4;
    public static readonly DEFAULT_LIST_MAX_HEIGHT: number = 30 * 8 + 8;
    public static readonly LIST_WITH_SEARCHBOX_MAX_HEIGHT: number = 30 * 7;
    public static readonly SEARCHBOX_AREA_HEIGHT: number = 28 + 6 + 4; // 搜索框所占区域高度
    public static readonly DROP_VERTICAL_PADDING: number = 4 + 4;
    public dominatorSpace: string = TiColsToggleDropComponent.DOMINATOR_SPACE + 'px';
    public columns: Array<TiTableColumns> = [];
    public selectedColumns: Array<TiTableColumns>; // TODO: 可以不定义此变量，用this.model来代替
    public readonly listLabelKey: string = 'title';
    private columnsDiffer: IterableDiffer<TiTableColumns>;
    private optionsChangeInner: boolean = false;
    /**
     * @ignore
     * 覆写 TiDroplistComponent 中的 listInited 值
     */
    public listInited: boolean = true;
    @ViewChild(TiListComponent, { static: true }) listCom: TiListComponent;
    constructor(protected elementRef: ElementRef, protected renderer2: Renderer2, public changeDetectorRef: ChangeDetectorRef,
                protected zone: NgZone, private iterableDiffers: IterableDiffers, private table: TiTableComponent) {
            super(elementRef, renderer2, changeDetectorRef, zone);
    }

    private static trackByFn(index: number, item: any): string {
        // 表格记忆show属性也需要跟踪
        return item.title + item.show;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.multiple = true; // 设置为多选。
        this.heightExcludeList = this.searchable ? TiColsToggleDropComponent.DROP_VERTICAL_PADDING +
            TiColsToggleDropComponent.SEARCHBOX_AREA_HEIGHT : TiColsToggleDropComponent.DROP_VERTICAL_PADDING;
        this.defaultListMaxHeight = this.searchable ? TiColsToggleDropComponent.LIST_WITH_SEARCHBOX_MAX_HEIGHT :
            TiColsToggleDropComponent.DEFAULT_LIST_MAX_HEIGHT;
        this.searchKeys = ['title'];
        this.columnsDiffer = this.iterableDiffers.find(this.options)
            .create(TiColsToggleDropComponent.trackByFn);
    }

    ngDoCheck(): void { // 动态监听columns的变化(主要是引用不变，内容变化colums.push等), 从而更新经过 tiColumns 管道的数据(数据引用变了才会进pipe管道)
        super.ngDoCheck();
        const columnsDiffer: IterableChanges<TiTableColumns> = this.columnsDiffer.diff(this.options);
        if (columnsDiffer) {
            if (this.optionsChangeInner) {
                this.optionsChangeInner = false;
            } else {
                this.selectedColumns = this.options.filter((column: { show?: boolean }) => {
                    return column.show === true || column.show === undefined;
                });
                this.columns = this.options.concat(); // 强制变化，不然colums.push的列不能出现在列表中，与在html中使用的 PIPE 有关
                if (this.searchable && this.searchResult === this.options) {
                    // 如果 options 由于push等方法导致的改变，这里将 searchResult 引用更新一下，这样在 dropsearch 中打开面板时
                    // 把 options 的值赋给 searchResult(searchResult = options)时，searchResult新数据(引用改变了)才能进 tiColumns 管道, 从而渲染出来。
                    this.searchResult = this.searchResult.concat();
                }
            }

            // columns变化需要处理列固定
            if(this.table.fixedColumnInfo.hasFixedColumn) {
                // 需要延迟处理，columns变化时，组件渲染还未完成。
                // 但如果在ngAfterViewChecked处理，太频繁，影响性能。
                setTimeout((): void => {
                    // 处理左侧列固定
                    this.table.updateFixedThLeftSubject.next(null);
                    this.table.updateFixedTdLeftSubject.next(null);
                    // 处理右侧列固定
                    const scrollLeft: number = this.table.fixedColumnInfo.container.scrollLeft;
                    const isRightColumnFloat: boolean =
                        scrollLeft + this.table.fixedColumnInfo.container.clientWidth < this.table.fixedColumnInfo.container.scrollWidth;
                    this.table.containerScrollXChangeSubject.next({
                        scrollLeft,
                        isRightColumnFloat
                    });
                }, 0);
            }
        }
    }

    public onSelect(option: any): void {
        if (option === this.listCom.optionSelectAll) {
            this.options.forEach((item: any) => {
                if (!this.isDisabledFn(item)) {
                    item.show = this.selectedColumns.includes(item);
                }
            });
        } else {
            option.show = this.selectedColumns.includes(option);
        }
        this.optionsChangeInner = true;
        // 需要在父类select.emit之前，更改option内容
        super.onSelect(option);
        // TODO: 没有处理，用户主动改变绑定变量selectedColumns。应该在docheck里监听selectedColumns（this.model）
    }

    public isDisabledFn = (item: {disabled?: boolean, show?: boolean}): boolean => {
        return item.disabled === true || (item.show === undefined && item !== this.listCom.optionSelectAll);
    }

    // 鼠标点击到搜索框外围的空白，会失焦导致面板关闭
    // 此处做特殊处理,当点击空白时通过阻止默认事件的方式处理
    public onMousedownSearchBoxOuter(event: MouseEvent): void {
        if ((event.target as any).tagName === 'INPUT') {
            return;
        }
        event.preventDefault();
    }
}
