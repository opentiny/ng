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
  DoCheck,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { TiTableComponent, TiTableRowData } from './TiTableComponent';
import { TiDetailsIconComponent } from './TiDetailsIconComponent';
/**
 * TiDetailsTr 详情行结构指令
 *
 * 使用时需要在其前面加 * 语法糖，传入当前行数据；
 * 其内部根据row.showDetails的值来控制详情行是否显示，功能类似于ngIf。
 */
@Directive ({
    selector: '[tiDetailsTr]'
})
export class TiDetailsTrDirective implements DoCheck {
    /**
     * 当前行数据
     */
    @Input('tiDetailsTr') row: TiTableRowData;
    private oldShowDetails: boolean;
    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef,
                private renderer: Renderer2, private table: TiTableComponent) {
    }

    ngDoCheck(): void {
        if (this.row.showDetails !== this.oldShowDetails) {
            this.updateView();
            this.oldShowDetails = this.row.showDetails;
        }

    }
    private updateView(): void {
        if (this.row.showDetails) {
            // 上下文参数是否需要传递
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            // 结构指令的宿主元素是一个 comment(注释) 的Node节点，
            // 生成节点元素插入DOM中的位置跟angularCompilerOptions.enableIvy 配置有关，true时在宿主元素之前，false时在宿主元素之后，
            // 而 ng9开始angularCompilerOptions.enableIvy 默认为true,但一些项目为兼容性，强制设置为了false，所以要做一下兼容处理
            let detailTr: HTMLElement;
            const nativeElement = this.templateRef.elementRef.nativeElement;
            if (nativeElement.previousSibling && nativeElement.previousSibling.classList &&
                nativeElement.previousSibling.classList.contains(TiDetailsIconComponent.TABLE_ClASS_DETAIL_BASE)) {
                detailTr = nativeElement.nextSibling;
            } else {
                detailTr = nativeElement.previousSibling;
            }

            this.renderer.addClass(detailTr, 'ti3-details-tr');
        } else {
            this.viewContainerRef.clear();
            //  TODO: 方案是否可优化
            // 表头锁定时，展开时可在table的AfterViewChecked中获取到表格变化后的高度，
            // 但是收起时，在table的AfterViewChecked中获取不到表格变化后的高度，不能及时处理滚动条的变化
            // 所以此处使用setTimeout使其延时触发table的AfterViewChecked，使其能够处理由高度变化引起的滚动条状态的改变
            // 注：使用ngIf指令也是如此效果
            if (this.table.isFixedHead) {
                setTimeout(() => {}, 0);
            }
        }
    }
}
