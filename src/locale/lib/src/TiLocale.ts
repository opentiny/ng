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
import { Util } from '@opentiny/ng-utils';

declare let global: any;

export class TiLocale {
  /**
   * 英文语种关键字，关键字均使用中划线形式命名，确保和浏览器保持一致
   */
  public static readonly EN_US: string = 'en-US';
  /**
   * 语种关键字
   */
  public static readonly ZH_CN: string = 'zh-CN';
  /**
   * 语种关键字
   */
  public static readonly ES_US: string = 'es-US';
  /**
   * 语种关键字
   */
  public static readonly FR_FR: string = 'fr-FR';
  /**
   * 语种关键字
   */
  public static readonly PT_BR: string = 'pt-BR';

  // private static localeKey: string = TiLocale.ZH_CN; // 语种关键字

  /**
   * Typescript没有静态代码段，所以这样代替静态代码段
   */
  protected static staticCode: void = TiLocale.initWordsAndLocale();
  /**
   * 静态代码段执行：如过word和locale未初始化，那么执行初始化。
   */
  private static initWordsAndLocale(): void {
    if (!TiLocale.getWords()) {
      // 默认所有语言都打包进来
      TiLocale.setWords({});
    }
    if (!TiLocale.getLocale()) {
      TiLocale.setLocale(TiLocale.ZH_CN);
    }
  }

  /**
   * Sets words
   * @param Words 全量的语言包，由语言名称：语言词条包组成。
   *
   * @returns words
   */
  public static setWords(words: any): void {
    // 设计缺陷：如果tiWords放在类成员变量上，会更好。window在SSR环境找不到。
    if (typeof window !== 'undefined') {
      (window as any).tiWords = words;
    } else if (typeof global !== 'undefined') {
      (global as any).tiWords = words;
    }
  }
  public static getWords(): any {
    if (typeof window !== 'undefined') {
      return (window as any).tiWords;
    } else if (typeof global !== 'undefined') {
      return (global as any).tiWords;
    }
  }
  /**
   * 设置组件国际化语种
   * @param locale 国际化字符，可通过TiLocale.ZH_CN/TiLocale.EN_US等语种关键字设置参数
   */
  public static setLocale(locale: string): void {
    if (typeof window !== 'undefined') {
      (window as any).tiLocale = locale;
    } else if (typeof global !== 'undefined') {
      (global as any).tiLocale = locale;
    }
  }
  public static getLocale(): string {
    let locale: string;
    if (typeof window !== 'undefined') {
      locale = (window as any).tiLocale;
    } else if (typeof global !== 'undefined') {
      locale = (global as any).tiLocale;
    }

    return locale ? locale : TiLocale.ZH_CN;
  }

  /**
   * 设置组件国际化语种
   * @param localeKey 国际化字符，可通过TiLocale.ZH_CN/TiLocale.EN_US等语种关键字设置参数
   */

  /**
   * @ignore
   * 获取当前语言下，组件国际化语种对应的词条集合
   */
  public static getLocaleWords(): any {
    return TiLocale.getWords()[TiLocale.getLocale()];
  }
  /**
   * @ignore
   * 获取单个词条的国际化文本/对象
   * 参数：
   */
  public static translate(keyValue: string, params?: Array<any>): any {
    const keyArr: Array<string> = keyValue.split('.');
    let value: any = TiLocale.getLocaleWords();
    keyArr.forEach((key: string) => {
      value = value[key];
    });

    return Util.formatEntry(value, params);
  }
  /**
   * @ignore
   * 获取各组件的词条追加在 tiWords 中
   */
  public static setTiWords(locales): void {
    const { en_US, es_US, fr_FR, pt_BR, zh_CN } = locales;
    const words = (window as any).tiWords;
    TiLocale.setWords({
      ...words,
      'zh-CN': { ...words['zh-CN'], ...zh_CN },
      'en-US': { ...words['en-US'], ...en_US },
      'es-US': { ...words['es-US'], ...es_US },
      'fr-FR': { ...words['fr-FR'], ...fr_FR },
      'pt-BR': { ...words['pt-BR'], ...pt_BR }
    });
  }
}
