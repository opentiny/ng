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
/* eslint-disable no-cond-assign */
// 另，angular也有brower-util.ts，但是没有对浏览器版本号的判断。

/*
 * 浏览器类型的枚举定义。字符串枚举，提供了运行时可读性。
 */

export class TiBrowser {
    /**
     * EDGE 浏览器字符串
     */
    public static readonly EDGE: string = 'EDGE';
    /**
     * IE 浏览器字符串
     */
    public static readonly IE: string = 'IE';
    /**
     * FIREFOX 浏览器字符串
     */
    public static readonly FIREFOX: string = 'FIREFOX';
    /**
     * CHROME 浏览器字符串
     */
    public static readonly CHROME: string = 'CHROME';
    /**
     * OPERA 浏览器字符串
     */
    public static readonly OPERA: string = 'OPERA';
    /**
     * SAFARI 浏览器字符串
     */
    public static readonly SAFARI: string = 'SAFARI';
    /**
     * OTHER 浏览器字符串
     */
    public static readonly OTHER: string = 'OTHER';

    private static _browser: string = TiBrowser.OTHER;
    private static _version: number = 0;  // 浏览器的大版本号，整数。取第一个小数点前
    private static isInit: boolean = false;

    /**
     * 浏览器类型
     * @returns 返回枚举型浏览器类型字符串
     */
    public static browser(): string {
        TiBrowser.init();

        return TiBrowser._browser;
    }
    /**
     * 浏览器版本
     */
    public static version(): number {
        TiBrowser.init();

        return TiBrowser._version;
    }
    /**
     * 是否 Edge
     */
    public static isEdge(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.EDGE;
    }
    /**
     * 是否 IE
     */
    public static isIE(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.IE;
    }
    /**
     * 是否 Firefox
     */
    public static isFirefox(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.FIREFOX;
    }
    /**
     * 是否 Chrome
     */
    public static isChrome(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.CHROME;
    }
    /**
     * 是否 Opera
     */
    public static isOpera(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.OPERA;
    }
    /**
     * 是否 Safari
     */
    public static isSafari(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.SAFARI;
    }
    /**
     * 是否 Other
     */
    public static isOther(): boolean {
        TiBrowser.init();

        return TiBrowser.browser() === TiBrowser.OTHER;
    }

    private static init(): void {
        if (TiBrowser.isInit) {// 如果已经初始化，那么返回
            return;
        }
        // 浏览器判断，已支持SSR
        const userAgent: string = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
        let aAgentInfo: Array<any>|null;

        if (userAgent.match(/edge\/([\d.]+)/)) {
            aAgentInfo = userAgent.match(/edge\/([\d.]+)/);
            TiBrowser._browser = TiBrowser.EDGE;
        } else if (userAgent.match(/rv:([\d.]+)\) like gecko/)) {
            aAgentInfo = userAgent.match(/rv:([\d.]+)\) like gecko/);
            TiBrowser._browser = TiBrowser.IE;
        } else if (userAgent.match(/msie ([\d.]+)/)) {
            aAgentInfo = userAgent.match(/msie ([\d.]+)/);
            TiBrowser._browser = TiBrowser.IE;
        } else if (userAgent.match(/firefox\/([\d.]+)/)) {
            aAgentInfo = userAgent.match(/firefox\/([\d.]+)/);
            TiBrowser._browser = TiBrowser.FIREFOX;
        } else if (userAgent.match(/chrome\/([\d.]+)/)) {
            aAgentInfo = userAgent.match(/chrome\/([\d.]+)/);
            TiBrowser._browser = TiBrowser.CHROME;
        } else if (userAgent.match(/version\/([\d.]+).*safari/)) {
            aAgentInfo = userAgent.match(/version\/([\d.]+).*safari/);
            TiBrowser._browser = TiBrowser.SAFARI;
        } else {
            TiBrowser._browser = TiBrowser.OTHER;
        }
        // 版本号取整
        TiBrowser._version = (aAgentInfo !== null) ? parseInt(aAgentInfo[1].split('.')[0], 10) : 0;
        // 改变初始化值
        TiBrowser.isInit = true;
    }
}
