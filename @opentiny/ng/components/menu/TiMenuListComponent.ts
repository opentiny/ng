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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TiListComponent } from '../list/TiListModule';
import { TiFormComponent } from '../base/TiBaseModule';
import { TiMenuItem } from './TiMenuItem';
/**
 * @ignore
 */
@Component({
      selector: 'ti-menulist',
      templateUrl: './menulist.html',
      styleUrls: ['./menulist.less'/* , './menu.less' */],
      changeDetection:ChangeDetectionStrategy.OnPush,
      providers: [TiFormComponent.getValueAccessor(TiMenuListComponent)]
})
export class TiMenuListComponent extends TiListComponent {
    @Input() panelAlign: 'left' | 'right' = 'right'; // 设置下拉菜单面板与按钮对齐方式。这里是为了决定了面板上箭头方向。
    protected isSelectable(item: TiMenuItem): boolean {// 与普通list区别：group也是可以选中的
        return !this.isDisabledFn(item);
    }
    protected getListOptions(): Array<TiMenuItem> {// 与普通list区别：次级节点不会放入本级别。
        return this.options;
    }
    public hasBorder(item: TiMenuItem, items: Array<TiMenuItem>): boolean { // 分组带线
        const index: number = items.indexOf(item);
        const indexPre: number = (index === 0) ? 0 : index - 1;

        return item.groupId !== items[indexPre].groupId;
    }
    public onMouseenterItem(event: MouseEvent, option: any): void {
        // 不是在选中项置Top时鼠标经过。
        if (new Date().getTime() - this.optionScrollTopLastTime > TiListComponent.SCROLL_TOP_TIME) {
            this.hoverOption = option;  // 更新hover
        }
    }
    // 防止继承list的ngOnChanges,初始化hoverOption变更触发hover事件，导致menu组件中的onhover事件报错
    ngOnChanges(): void {
    }
}
