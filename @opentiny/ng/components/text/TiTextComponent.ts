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
    DoCheck,
    ElementRef,
    EventEmitter,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Optional,
    Renderer2,
    Input,
    SimpleChanges
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { TiBrowser, Util } from '../../utils/Util';
import { TiRenderer } from '../../services/renderer/TiRenderer';
import { TiAutofocusComponent } from '../base/TiBaseModule';

/**
 * 本组件基于原生input标签进行扩展，原生input加 tiText 属性即为text组件,
 * 原生input的所有属性以及 Angular 的各种属性指令都可以使用。
 *
 */
@Component({
    selector: '[tiText]',
    template: '',
    styleUrls: ['text.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-text-input-show-icon]': 'isShowClear || showEye',
        '[class.ti3-text-input-show-clear]': 'isShowClear',
        '[class.ti3-text-input-show-password]': 'showEye',
        '[class.ti3-text-input-noborder]': 'isNoBorder',
        '(focus)': 'handleFocus()'
    }
})
export class TiTextComponent extends TiAutofocusComponent implements OnInit, DoCheck, OnDestroy {
    private static readonly CLEAR_WIDTH: number = 26; // 常量，清除按钮区域宽度
    private static readonly PASSWORD_WIDTH: number = 36; // 常量，眼睛按钮区域宽度
    /**
     *
     * 密码是否可见
     *
     */
    @Input() passwordVisible: boolean = false;
    /**
     * 密码可见/不可见状态改变时触发的回调
     *
     */
     @Output() readonly passwordVisibleChange: EventEmitter<boolean> = new EventEmitter();
    /**
     * 点击清除按钮触发的回调，一般用于文本清除场景
     */
    @Output() readonly clear: EventEmitter<MouseEvent> = new EventEmitter();
    /**
     * @ignore
     *
     * autoComplete 也使用了该变量
     */
    public isClearActive: boolean;
    /**
     * @ignore
     *
     * autoComplete 也使用了该变量
     */
    public isShowClear: boolean;
    /**
     * @ignore
     */
    public isNoBorder: boolean;
    /**
     * @ignore
     *
     * 密码类型是否显示眼睛
     */
    public showEye: boolean = false;
    private isFirstFocus: boolean = true; // 是否为第一次聚焦
    private hasClear: boolean = false; // 是否有清除功能
    private pwdHackEle: HTMLInputElement; // 当类型为password时，动态生成放在password文本框前的input元素
    private lastIsHover: boolean = undefined; // 最后一次绘制叉号的状态。
    private lastDisabled: boolean = undefined; // 最后一次叉号是否禁用。
    constructor(elementRef: ElementRef, renderer: Renderer2,
                private tiRenderer: TiRenderer, @Optional() private formControl: NgControl, private zone: NgZone,
                private changeDetectorRef: ChangeDetectorRef) {
        super(elementRef, renderer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
        if (changes['passwordVisible'] && !changes['passwordVisible'].firstChange) {
            if (this.showEye && !this.isClearActive) {
                const isHover: boolean = this.nativeElement.disabled ? null : false;
                this.lastIsHover = undefined;
                this.controlEyeShow(isHover);
            }
        }
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.showEye = this.nativeElement.type === 'password' && !this.nativeElement.hasAttribute('noeye');
        this.hasClear = this.nativeElement.hasAttribute('clearable') && !this.showEye;
        this.isNoBorder = this.nativeElement.hasAttribute('noborder');

        // 初始化注册事件
        this.initFn();
        this.handlePassword();

        // Chrome下输入框有时出现自动联想(该问题出现无规律可寻，比较奇怪)，
        // 将其autocomplete置为off可规避此问题
        // 之后firefox及IE11也出现类似问题，所以不区分浏览器差异，统一添加这层处理
        if (this.nativeElement.type === 'text' && this.nativeElement.autocomplete !== 'on') {
            this.renderer.setAttribute(this.nativeElement, 'autocomplete', 'off');
        }

        // 由于在valueChanges中监听不到动态表单中文本框的初始值
        // 所以此处对初始值要做单独处理
        this.controlClearShow(this.nativeElement.value);

        // 文本框的值发生变化时触发
        if (this.formControl) {
            this.formControl.valueChanges.subscribe((value: any): void => {
                this.controlClearShow(value);
                // onpush策略 需要更新视图
                this.changeDetectorRef.markForCheck();
            });
        }

        // 初始设置eye图标
        this.controlEyeShow();
    }
    ngDoCheck(): void {
        const disabled: boolean = this.nativeElement.disabled;
        // 与上次disabled状态相同，则返回
        if (this.lastDisabled === disabled) {
            return;
        }
        // 叉号特殊处理，2）禁用
        if (this.isShowClear || this.showEye) {
            if (disabled) {
                this.setClearBackgroud(null);
                this.lastDisabled = true;
            } else { // 从禁用改为非禁用
                this.setClearBackgroud(false);
                this.lastDisabled = false;
            }
        }
    }

    ngOnDestroy(): void {
        // 销毁组件时需要将内部生成dom也移除
        if (this.pwdHackEle) {
            this.renderer.removeChild(this.renderer.parentNode(this.pwdHackEle), this.pwdHackEle);
        }
    }

    /**
     * @ignore
     */
    public handleFocus(): void {
        // IE和火狐浏览器在首次autofoucus聚焦时会将光标移到文字起始位置，用户体验不好
        // 需要手动设置光标位置到行尾
        if (this.isFirstFocus && this.nativeElement.autofocus &&
            (TiBrowser.isFirefox() || TiBrowser.isIE())) {
            this.nativeElement.setSelectionRange(this.nativeElement.value.length,
                this.nativeElement.value.length);
        }
        this.isFirstFocus = false;
    }

    private initFn(): void {
        this.zone.runOutsideAngular(() => { // 避免不停触发变化检测
            this.renderer.listen(this.nativeElement, 'mousemove', this.handleMousemove);
            this.renderer.listen(this.nativeElement, 'mouseout', this.handleMouseout);
            this.renderer.listen(this.nativeElement, 'mousedown', this.handleMousedown);
            this.renderer.listen(this.nativeElement, 'click', this.handleClick);
        })
    }

    /**
     * @ignore
     * 鼠标移入清除按钮区域时，给宿主元素添加ti-text-clear-active样式
     */
    public handleMousemove = (event: MouseEvent): void => {
        if (this.nativeElement.disabled || !this.isShowClear && !this.showEye) {
            return;
        }

        // 鼠标移入清除按钮区域时，给宿主元素添加ti-text-clear-active样式;
        // 否则去掉ti-text-clear-active样式
        this.isClearActive = this.isIconField(event);

        this.isClearActive ? this.renderer.addClass(this.nativeElement, 'ti3-text-clear-active') :
                             this.renderer.removeClass(this.nativeElement, 'ti3-text-clear-active');

        // 密码类型只需要设置悬浮时手型样式
        if (this.showEye) {
            return;
        }

        // 叉号特殊处理，3）hover
        this.isClearActive ? this.setClearBackgroud(true) : this.setClearBackgroud(false);
    }
    /**
     * @ignore
     */
    public handleMouseout = (event: MouseEvent) => {
        if (this.nativeElement.disabled || !this.isShowClear) {
            this.isClearActive = false;

            return;
        }
        // 叉号特殊处理，3）hover
        this.setClearBackgroud(false);
    }

    /**
     * @ignore
     * 切换密码可见不可见时，输入框需处于失焦状态
     */
    public handleMousedown = (event: MouseEvent) => {
        if (this.nativeElement.disabled || !this.showEye || !this.isIconField(event)) {
            return;
        }

        event.preventDefault();

        // 聚焦到可输入区域，再点击眼睛图标时，输入框应失焦
        if (document.activeElement === this.nativeElement) {
            this.nativeElement.blur();
        }
    }
    /**
     * @ignore
     * @param isHover true标示悬浮，false标示非悬浮，null标示禁用，undefinded标示不画叉号。
     * @returns
     */
    setClearBackgroud(isHover: boolean): void {
        // 如果跟上次一样，则返回。
        if (this.lastIsHover === isHover) {
            return;
        } else {
            this.lastIsHover = isHover;
        }

        let colorStr: string = '';
        if (Util.supportsCssVars()) {
            // Chrome等支持CSSVar的浏览器，正常操作,  从CSSVar变量中取出颜色。
            let varName: string ='';
            if (isHover === false) {
                varName = '--ti-common-color-icon-normal';
            } else if (isHover === true ) {
                varName = '--ti-common-color-icon-hover';
            } else if (isHover === null ) {
                varName = '--ti-common-color-icon-disabled';
            }
            // 修复SSR报错：ERROR ReferenceError: getComputedStyle is not defined
            if (typeof getComputedStyle !== 'undefined') {
                colorStr = getComputedStyle(document.documentElement).getPropertyValue(varName);
            }
        } else {
            // IE和低版Edge不支持CSSVar的浏览器，从一个CSS样式中取出颜色。
            let styleName: string ='';
            if (isHover === false) {
                styleName = 'flood-color';
            } else if (isHover === true ) {
                styleName = 'lighting-color';
            } else if (isHover === null ) {
                styleName = 'stop-color';
            }
            // 修复SSR报错：ERROR ReferenceError: getComputedStyle is not defined
            if (typeof getComputedStyle !== 'undefined') {
                colorStr = getComputedStyle(this.nativeElement).getPropertyValue(styleName);
            }
        }
        colorStr = colorStr.trim().replace('#', '%23'); // URL编码
        let urlStr: string;
        if (this.showEye) {
            urlStr = this.passwordVisible ? `url(data:image/svg+xml,%3Csvg%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2232%22%20height=%2232%22%20viewBox=%220%200%2032%2032%22%3E%3Cpath%20fill%3D%22${colorStr}%22%20d=%22M16%206.4c9.4%200%2016%206.4%2016%209.6%200%203-6.6%209.6-16%209.6-9.2%200-16-6.4-16-9.6s6.8-9.6%2016-9.6zM16%208.2c-4.2%200-7.8%203.6-7.8%207.8%200%204.4%203.4%207.8%207.8%207.8%204.2%200%207.8-3.6%207.8-7.8%200-4.4-3.6-7.8-7.8-7.8zM16%2011c2.8%200%205%202.2%205%205s-2.2%205-5%205-5-2.2-5-5c0-2.8%202.2-5%205-5z%22%3E%3C/path%3E%3C/svg%3E%0A)` :
                `url(data:image/svg+xml,%3Csvg%20version=%221.1%22%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2232%22%20height=%2232%22%3E%3Cpath%20fill%3D%22${colorStr}%22%20d=%22M1.6%202.925c0.6-0.6%201.4-0.6%201.8%200v0l25.6%2024.2c0.2%200.2%200.4%200.6%200.4%201s-0.2%200.6-0.4%201c-0.2%200.2-0.6%200.4-1%200.4s-0.8-0.2-1-0.4v0l-5-5.2c-2%200.6-4%201-6%201-9.2%200-16-6.6-16-9.8%200-1.8%202-4.6%205.4-6.6v0l-3.6-3.8c-0.6-0.4-0.6-1.2-0.2-1.8zM9%2011.725c-0.4%201-0.6%202.2-0.6%203.4%200%204.4%203.4%208%207.8%208%201.4%200%202.8-0.4%203.8-1v0l-2.4-2.4c-0.4%200.2-1%200.4-1.6%200.4-2.8%200-5-2.2-5-5%200-0.4%200-0.8%200.2-1.2v0l-2.2-2.2zM16%205.325c9.4%200%2016%206.6%2016%209.8%200%201.8-2%204.6-5.6%206.8v0l-3.4-3.2c0.6-1%200.8-2.2%200.8-3.4%200-4.4-3.4-8-7.8-8-1.4%200-2.8%200.4-4%201.2v0%200l-2-2c2-1%204-1.2%206-1.2zM16%209.925c2.8%200%205%202.2%205%205%200%200.4%200%201-0.2%201.4v0l-6.6-6c0.6-0.2%201.2-0.4%201.8-0.4z%22%3E%3C/path%3E%3C/svg%3E)`
        } else {
            urlStr = `url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216px%22%20height%3D%2216px%22%3E%3Cpath%20fill%3D%22${colorStr}%22%20d%3D%22M12.529%2C11.469L9.061%2C8l3.469-3.469c0.294-0.294%2C0.295-0.768%2C0.001-1.062c-0.293-0.293-0.769-0.293-1.061%2C0L8%2C6.938L4.53%2C3.469c-0.292-0.293-0.767-0.293-1.061%2C0C3.177%2C3.762%2C3.177%2C4.238%2C3.471%2C4.532L6.939%2C8l-3.469%2C3.468c-0.294%2C0.293-0.294%2C0.768-0.001%2C1.062C3.616%2C12.678%2C3.81%2C12.75%2C4%2C12.75s0.384-0.072%2C0.53-0.219L8%2C9.062l3.47%2C3.469c0.147%2C0.146%2C0.339%2C0.219%2C0.53%2C0.219c0.192%2C0%2C0.384-0.072%2C0.53-0.219C12.823%2C12.236%2C12.824%2C11.762%2C12.529%2C11.469z%22%2F%3E%3C%2Fsvg%3E)`;
        }
        this.renderer.setStyle(this.nativeElement, 'backgroundImage', urlStr);
    }

    /**
     *  @ignore
     * 当在清除按钮区域点击时，清空输入框内容
     */
    public handleClick = (event: MouseEvent) => {
        if (this.nativeElement.disabled || !this.isShowClear && !this.showEye || !this.isIconField(event)) {
            return;
        }

        if (this.isShowClear) {
            this.renderer.setProperty(this.nativeElement, 'value', '');
            Util.trigger(this.nativeElement, 'input');
            this.zone.run(() => {
                this.clear.emit(event);
            });

            this.nativeElement.focus();
        }

        if (this.showEye) {
            this.passwordVisible = !this.passwordVisible;
            this.lastIsHover = undefined;
            this.controlEyeShow();
            this.zone.run(() => {
                this.passwordVisibleChange.emit(this.passwordVisible);
            });
        }
    }

    private handlePassword(): void {
        // 密码框情况下，默认关闭autocomplete，避免浏览器弹出记住密码提示框引起的安全问题
        if (TiBrowser.isChrome() && this.nativeElement.type === 'password' &&
            this.nativeElement.autocomplete !== 'on') {
            this.pwdHackEle = this.renderer.createElement('input');
            this.tiRenderer.setAttributes(this.pwdHackEle, { type: 'text', tabindex: -1, autocomplete: 'off' });
            this.renderer.addClass(this.pwdHackEle, 'ti3-password-hack-input');
            // 插入一个input元素，阻止密码框前面的input联想用户名
            this.renderer.insertBefore(this.nativeElement.parentElement, this.pwdHackEle, this.nativeElement);
        }
    }

    // 控制clear是否显示，文本框为空时不显示，有内容时才显示
    private controlClearShow(value: any): void {
        if (!this.hasClear) {
            return;
        }
        const lastIsShowClear: boolean = this.isShowClear;
        this.isShowClear = (Util.isString(value) && value !== '');
        // 与上次状态相同，则返回
        if (this.isShowClear === lastIsShowClear) {
            return;
        }

        // 叉号特殊处理，1)初始化和监听是否显示
        if (this.isShowClear) {
            this.setClearBackgroud(false);
        } else {
            this.renderer.removeStyle(this.nativeElement, 'background');
            this.lastIsHover = undefined;
        }
    }

    // 控制eye是否显示，
    private controlEyeShow(isHover: boolean = false): void {
        if (!this.showEye) {
            return;
        }
        this.setClearBackgroud(isHover);
        this.nativeElement.type = this.passwordVisible ? 'text' : 'password';
    }

    // 判断事件是否在清除按钮区域
    private isIconField(event: MouseEvent): boolean {
        const iconWidth: number = this.showEye ? TiTextComponent.PASSWORD_WIDTH : TiTextComponent.CLEAR_WIDTH;

        return event.clientX - this.nativeElement.getBoundingClientRect().left >
            this.nativeElement.getBoundingClientRect().width - iconWidth;
    }
}
