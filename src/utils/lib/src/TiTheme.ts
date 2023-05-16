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
import Color from 'color';
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

  public static formats: Array<string> = ['hex', 'rgb', 'hsl'];
  public static setBrandColor(tiBaseColorBrand6: string): any {
    const listA: any = [];
    const func: any = TiTheme.colorPalette;
    for (let i: number = 1; i <= 8; i++) {
      listA.push(func(tiBaseColorBrand6, i));
    }

    for (let i: number = 0; i < listA.length + 1; i++) {
      document.documentElement.style.setProperty(`--ti-base-color-brand-${i + 1}`, listA[i]);
    }
  }

  private static getNewHue(color, isLight, i): number {
    const h = color.hue();
    const hueStep: number = 2;
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i;
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue); // 取整：获取最近的整数
  }

  private static getNewSaturation(color, isLight, i) {
    let newSaturation;
    const maxSaturationStep = 100;
    const minSaturationStep = 9;

    const s = color.saturationv();
    if (isLight) {
      newSaturation = s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i;
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * i;
    }
    return newSaturation;
  }

  private static getNewValue(color, isLight, i) {
    const maxValue = 100;
    const minValue = 30;
    const v = color.value();
    return isLight ? v + ((maxValue - v) / 5) * i : v <= minValue ? v : v - ((v - minValue) / 4) * i;
  }

  private static getColorString(color, format): string {
    const innerFormat = TiTheme.getFormat(format);

    if (innerFormat === 'hex') {
      return color[innerFormat]();
    }
    return color[innerFormat]().round().string();
  }

  private static getFormat(format?: string): string {
    if (!format || TiTheme.formats.indexOf(format) < 0) {
      return 'hex';
    }
    return format;
  }

  private static colorPalette(originColor, i, format?): string {
    const color = Color(originColor);

    const isLight = i < 6;
    const index = isLight ? 6 - i : i - 6;
    const h = TiTheme.getNewHue(color, isLight, index);
    const s = TiTheme.getNewSaturation(color, isLight, index);
    const v = TiTheme.getNewValue(color, isLight, index);
    const retColor = i === 6 ? color : Color({ h, s, v });

    return TiTheme.getColorString(retColor, format);
  }
}
