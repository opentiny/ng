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
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { TiBrowser, Util } from '../../utils/Util';
import { TiTableComponent, TiTableRowData } from './TiTableComponent';
/**
 * TiDetailsIcon 详情展开图标组件
 *
 * ti-details-icon 用来显示详情展开图标，其嵌在详情展开列的 td 标签中；
 * 点击该图标，对应详情行在展开/收起两个状态之间切换。
 */
@Component({
  selector: 'ti-details-icon',
  templateUrl: './details-icon.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  host: {
      '(click)': 'onClick()'
  }
})

export class TiDetailsIconComponent implements OnInit, DoCheck {
    /**
     * @ignore
     * 表格详情中，非详情行标记样式类
     */
    public static TABLE_ClASS_DETAIL_BASE: string = 'ti3-table-detail-icon-tr';
    /**
     * 当前行数据
     */
    @Input() row: TiTableRowData;
    /**
     * 当前行索引值，即 ngFor 中对应的 index
     */
    @Input() index: number;
    /**
     * 点击详情展开图标时触发的回调，参数为当前行数据，一旦使用此接口，就由开发者决定是否要展开/收起,
     * 可通过行数据中的 showDetails 属性控制是否及何时展开/收起
     */
    @Output() readonly beforeToggle: EventEmitter<TiTableRowData> = new EventEmitter();
    private oldShowDetails: boolean = false;
    private element: any;
    constructor(private table: TiTableComponent, private elementRef: ElementRef,
                private renderer: Renderer2, private changeRef: ChangeDetectorRef) {
        this.element = this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.row = Util.isUndefined(this.row) ? {} : this.row;
        this.row.showDetails = Util.isUndefined(this.row.showDetails) ? false : this.row.showDetails;
        // 给当前行添加样式类标记
        const parentTr: any = this.renderer.parentNode(this.renderer.parentNode(this.element));
        this.renderer.addClass(parentTr, TiDetailsIconComponent.TABLE_ClASS_DETAIL_BASE);
    }

    ngDoCheck(): void {
        // 如果需要关闭其它行的详情(即只能展开一行的详情)时，需要监听showDetails
        if (this.table.closeOtherDetails && this.row.showDetails !== this.oldShowDetails) {
            this.oldShowDetails = this.row.showDetails;
            if (this.row.showDetails) {
                // 当打开当前行的详情时，关闭其他行的详情
                this.table.closeOtherDetailsFn(this.row);
            }
        }
        // 使用closeOtherDetails和beforeToggle接口时，保证图标收起
        this.changeRef.markForCheck();
    }

    /**
     * @ignore
     */
    public onClick(): void {
        if (this.beforeToggle.observers.length > 0) {
            this.beforeToggle.emit(this.row);
        } else {
            this.row.showDetails = !this.row.showDetails;
        }

        // 为了解决 codeclub #1720
        // 在chrome浏览器下，滚动条滚到底部后，这时页面内容高度变小，滚动条保留在底部(正常的现象),
        // 之后页面内容高度再变大时，滚动条依然保留在底部。
        // 这导致了当页面滚动条拖动到底部后，将表格的pagesize由大变小(如20条修改为10条)，再去点击某一行详情展开时，
        // 视觉上详情行是向上展开的，其原因是滚动条一直停留在底部；这时，只要稍微手动触发滚动条滚动，详情正常展开
        // 注意：此问题只修复了在body上出滚动条的表格的详情展开问题。
        if (TiBrowser.isChrome()) {
            const scrollTop: number = Math.ceil(document.documentElement.scrollTop);
            // 窗口可视区域高度
            const height: number = document.documentElement.clientHeight;
            const scrollHeight: number = document.body.scrollHeight;
            if (scrollTop > 0 && scrollTop + height >= scrollHeight) {
                document.body.scrollTop = scrollTop - 0.5;
                document.body.scrollTop = scrollTop + 0.5;
            }
        }
    }
}
