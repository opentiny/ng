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
/**
 * @ignore
 * 工具类
 */
export class Util {
    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    private static idCounter: number = 0;
    /**
     * 获得一个唯一标示
     * @param prefix 前缀
     * @returns 唯一标示字符串
     */
    public static getUniqueId(prefix: string): string {
        Util.idCounter++;
        const id: string = `${prefix}_${Util.idCounter}`;

        return id;
    }
    // TODO: 是否可以去除？
    /**
     * 是否未定义
     * @param value 值
     * @returns 是否
     */
    public static isUndefined(value: any): boolean {
        return value === undefined;
    }
    // TODO: 是否可以去除？
    /**
     * 是否空
     * @param value 值
     * @returns 是否
     */
    public static isNull(value: any): boolean {
        return value === null;
    }
    // TODO: 是否可以去除？
    /**
     * 是否String
     * @param value 值
     * @returns 是否
     */
    public static isString(value: any): boolean {
        return typeof value === 'string';
    }
    // TODO: 是否可以去除？
    /**
     * 是否Number
     * @param value 值
     * @returns 是否
     */
    public static isNumber(value: any): boolean {
        return typeof value === 'number' && !isNaN(value);
    }

    /**
     * 是否空字符串
     * @param value 值
     * @returns 是否
     */
    public static isEmptyString(value: string): boolean {
        return value === undefined || value === null || value === '';
    }
    // TODO: 是否可以去除
    /**
     * 是否Array
     * @param value 值
     * @returns 是否
     */
    public static isArray(value: any): boolean {
        return Array.isArray(value);
    }
    // TODO: 是否可以去除
    /**
     * 是否函数
     * @param value 值
     * @returns 是否
     */
    public static isFunction(value: any): boolean {
        return typeof value === 'function';
    }

    /**
     * 使用固定参数值格式化填充字串
     * @param source 源字串,其中使用{N}代表需要匹配的参数次序,N从0开始
     * @param params Array 参数数组
     */
    public static formatEntry(source: string, params: Array<any>): string {
        let formatSource: string = source;
        if (!this.isArray(params) || formatSource === '') {
            return formatSource;
        }
        params.forEach((param: any, i: number) => {
            formatSource = formatSource.replace(new RegExp(`\\{${i}\\}`, 'g'), () => {
                return param;
            });
        });

        return formatSource;
    }

    /**
     * 发出一个HTML事件
     * @param: ele 触发事件的DOM
     * @param: eventName 事件名称
     * @param: [canBubble] 是否冒泡，可选参数默认不冒泡 false
     */
    public static trigger(ele: any, eventName: string, canBubble?: boolean): void {
        // 修复SSR错误：ERROR ReferenceError: document is not defined
        if (typeof document === 'undefined') {
            return;
        }
        const event: Event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, canBubble || false, true);
        // event.initEvent(eventType,canBubble,cancelable)
        ele?.dispatchEvent(event);
    }
    /**
     * 判断是否为dom元素
     */
    public static isElement(ele: any): boolean {
        if (ele && ele.nodeType) {
            return ele.nodeType === 1;
        } else {
            return false;
        }
    }
    /**
     * 判断是否支持CSS Var
     */
    public static supportsCssVars(): boolean {
        return typeof(window) !== 'undefined' && (window as any).CSS && (window as any).CSS.supports && (window as any).CSS.supports('(--a: 0)');
    }
    /**
     * 通过tab键在弹窗内切换的时候，焦点需要一直在弹窗内部循环。
     */
    public static focusInDialogOnTabchange(event: KeyboardEvent, focusableElements: NodeList): void {
        if (!focusableElements || focusableElements.length === 0) {
            return;
        }
        const firstFocusableEle: any = focusableElements[0];
        const lastFocusableEle: any = focusableElements[focusableElements.length - 1];
        const target: EventTarget = event.target; // 获得触发事件的元素

        // 按下tab+shift键时，如果当前已获取焦点元素是弹出框中的第一个可获取焦点元素，则聚焦最后一个元素
        if (event.shiftKey) {
            if (target === firstFocusableEle) {
                lastFocusableEle.focus();
                event.preventDefault(); // 阻止默认事件，确保此处手动focus生效
            }
        } else if (target === lastFocusableEle) { // 按下tab键时，如当前已获取焦点元素是最后一个可获取焦点元素，则聚焦第一个元素
            firstFocusableEle.focus();
            event.preventDefault(); // 阻止默认事件，确保此处手动focus生效
        }
    }
}
export { TiBrowser } from './TiBrowser';
export { TiKeymap } from './TiKeymap';
export { TiLog } from './TiLog';
export { TiDateUtil } from './TiDateUtil';
export { TiTheme } from './TiTheme';
export { ObservableMap } from './ObservableMap';
export { ObservableSet } from './ObservableSet';
