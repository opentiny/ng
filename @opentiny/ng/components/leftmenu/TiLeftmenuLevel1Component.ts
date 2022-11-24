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
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SecurityContext
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TiLeftmenuComponent, TiLeftmenuItem } from './TiLeftmenuComponent';
import { TiLeftmenuGroupComponent } from './TiLeftmenuGroupComponent';
import { TiLeftmenuLevel2Component } from './TiLeftmenuLevel2Component';
import { TiLeftmenuItemComponent } from './TiLeftmenuItemComponent';
import { Util } from '../../utils/Util';
import { TiBaseComponent } from '../base/TiBaseModule';
/**
 * TiLeftmenuLevel1Component 是一级菜单组件，嵌在 TiLeftmenu 中使用
 *
 */
@Component({
  selector: 'ti-leftmenu-level1',
  templateUrl: './leftmenu-level1.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  host: {
        '[class.ti3-leftmenu-level1]': 'true',
        '[class.ti3-leftmenu-level1-dividing]': 'item.showDividingLine'
    }
})

export class TiLeftmenuLevel1Component extends TiBaseComponent implements AfterViewInit, OnDestroy, OnInit {
    /**
     * 设置当前菜单项的内容信息
     *
     */
    @Input() item: TiLeftmenuItem;
    /**
     * 是否禁用
     */
    @Input() disabled: boolean = false;
    /**
     * @ignore
     */
    @ContentChild(TiLeftmenuItemComponent, { static: false }) leftmenuItem: TiLeftmenuItemComponent;
    /**
     * @ignore
     * 当前 TiLeftmenuLevel1下所有的 TiLeftmenuLevel2 的集合
     */
    public children: Array<TiLeftmenuLevel2Component> = [];
    /**
     * @ignore
     * 模板中使用，二级菜单是否展开
     */
    public showChildren: boolean = false;
    /**
     * @ignore
     * 模板中使用，是否是激活状态
     */
    public isActived: boolean = false;
    /**
     * @ignore
     */
    private leftmenu: TiLeftmenuComponent;
    private element: any;
    private oldHref: string;
    constructor(leftmenu: TiLeftmenuComponent, private elementRef: ElementRef, renderer2: Renderer2,
                private changeRef: ChangeDetectorRef, @Optional() private leftmenuGroup: TiLeftmenuGroupComponent,
                private domSanitizer: DomSanitizer) {
            super(elementRef, renderer2);
            this.element = this.elementRef.nativeElement;
            this.leftmenu = leftmenu;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.oldHref = this.item?.href;
        if (this.leftmenuGroup) {
            this.leftmenuGroup.children.push(this);
        }
    }

    ngAfterViewInit(): void {
         this.setShowChildren();
         this.setActiveState();
         this.leftmenu.level1Items.push(this);
         this.changeRef.detectChanges();
    }

    ngDoCheck(): void {
        if (this.item?.href !== this.oldHref) {
            this.oldHref = this.item?.href;
            this.changeRef.detectChanges();
        }
    }

    ngOnDestroy(): void {
       const index: number = this.leftmenu.level1Items.indexOf(this);
       if (this.leftmenuGroup) {
            const groupIndex: number = this.leftmenuGroup.children.indexOf(this);
            if (groupIndex !== -1) {
                this.leftmenuGroup.children.splice(groupIndex, 1);
           }
       }

       if (index !== -1) {
            this.leftmenu.level1Items.splice(index, 1);
       }
    }
    /**
     * @ignore
     * 模板中使用，点击一级菜单项时调用
     */
    public selectFn(): void {
        if (this.disabled) {
            return;
        }
        if (this.item.href) {
            this.openHref(this.item.href);
            this.element.querySelector('.ti3-leftmenu-level1-item')
            .blur();

            return;
        }
        const oldactive: TiLeftmenuItem = this.leftmenu.active;

        if (this.hasChildren()) {
            this.showChildren = !this.showChildren;
            this.isActived = !this.showChildren && this.hasActivedChildren();
            if (this.showChildren) {
                for (const level1Items of this.leftmenu.level1Items) {
                    if (level1Items === this) {
                        continue;
                    }
                    if (level1Items.showChildren) {
                        level1Items.showChildren = false;
                        if (level1Items.hasActivedChildren()) {
                            level1Items.isActived = true;
                        }
                        // onpush模式下showChildren变更，视图未刷新
                        level1Items.changeRef.markForCheck();
                        break;
                    }
                }
            }
        } else {
            if (this.leftmenu.routable) {
                // 点击当前已经激活的item时，刷新对应路由
                if (this.item === oldactive) {
                    this.leftmenu.triggerReload(this.item);
                } else {
                    // 点击其他项需要进行跳转，来触发路由守卫，实际是否跳转取决于路由守卫返回值。
                    this.leftmenu.navigate(this.item);
                }
            } else {
                if (this.item !== oldactive) {
                    this.leftmenu.active = this.item;
                    this.leftmenu.activeChange.emit(this.item);
                    this.isActived = true;
                }
            }

        }
        // leftmenuGroup的模板中绑定的 hasActivedChild() 方法中用到了level1 的 isActived 值
        if (this.leftmenuGroup) {
            this.leftmenuGroup.changeRef.markForCheck();
        }
    }
    /**
     * @ignore
     * 在 TiLeftmenuComponent.ts 中调用了
     */
    public setShowChildren(): void {
        // 初始化时，子菜单中有当前选中状态时，显示子菜单
        this.showChildren = this.hasActivedChildren();
        this.changeRef.markForCheck();
    }

    /**
     * @ignore
     * 在模板上使用
     */
    public hasChildren(): boolean {
        return this.children && this.children.length > 0;
    }
    /**
     * @ignore
     * 在模板上使用
     */
    public hasActivedChildren(): boolean {
        if (!this.hasChildren()) {
            return false;
        }

        const result: Array<TiLeftmenuLevel2Component> = this.children.filter((level2: TiLeftmenuLevel2Component) => {
            return level2.item === this.leftmenu.active;
        });

        return result.length > 0;
    }

    /**
     * @ignore
     * 设置当前菜单是否处于激活状态，下边两种情况下将当前菜单设置为激活状态：
     *
     * 有子菜单时，当子菜单有有激活状态项并且子菜单关闭状态情况下；
     *
     * 没有子菜单时，当前菜单就是激活菜单项。
     */
    public setActiveState(): void {
        this.isActived = (this.hasActivedChildren() && !this.showChildren)
            || this.item === this.leftmenu.active;
        // onpush模式下，active状态视图未及时更新
        this.changeRef.markForCheck();
        // leftmenuGroup的模板中绑定的 hasActivedChild() 方法中用到了level1 的 isActived 值
        if (this.leftmenuGroup) {
            this.leftmenuGroup.changeRef.markForCheck();
        }
    }

    /**
     * @ignore
     */
    public onStateIconClick(): void {
        if (!this.disabled) {
            Util.trigger(this.leftmenuItem?.element, 'click');
        }
    }

    /**
     * @ignore
     * 如果有链接，跳转新页面
     */
    public openHref(href: string): void {
        const newTab: any = window.open(this.domSanitizer.sanitize(SecurityContext.URL, href), '_blank');
        // IE 下有时 newTab 不存在
        if (newTab) {
            newTab.opener = null;
        }
    }
}
