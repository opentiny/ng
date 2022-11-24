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
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
export class TiTheme {

    /**
     * 加载CSS文件，挂在head link
     * @param cssPath css路径
     * @param id link id
     */
    public static loadCss(cssPath: string, id: string): HTMLLinkElement {
        let link: HTMLLinkElement = document.getElementById(id) as HTMLLinkElement;

        // 原本没有link，那么创建link
        if (!link) {
            link = document.createElement('link');
            document.head.appendChild(link);
        }
        // 如果link href没变，那么就不处理了。
        if (link.href === cssPath) {
            return;
        }
        link.href = cssPath;
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';

        // 被CSSVar补丁处理后，补丁会给link打上disabled。去除disabled，才能再次补丁生效。
        if (link.hasAttribute('disabled')) {
            link.removeAttribute('disabled');
        }

        return link;
    }
    /**
     * 检测浏览器是否原生支持CSSVar
     * @returns 是否支持CSSVar
     */
    public static isNativeSupportCssVar(): boolean {
        const isBrowser: boolean = typeof window !== 'undefined';
        const isNativeSupport: boolean = isBrowser && window.CSS && window.CSS.supports && window.CSS.supports('(--a: 0)');

        return isNativeSupport;
    }
    /**
     * 启动AppModule
     * @param app 传入的AppModule
     */
    public static bootstrapModule(app: any): void {
        platformBrowserDynamic()
            .bootstrapModule(app)
            .catch((err: any) => console.error(err));
    }
}
