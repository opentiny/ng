import { Component } from '@angular/core';
import {
  en_US as tinyen_US,
  TiLocale,
  zh_CN as tinyzh_CN,
} from '@opentiny/ng';

interface LocaleWords {
  tiLocaleKey: string;
  testPassWord: string;
  testMaxValue: string;
  testRangeValue: string;
}

@Component({
  templateUrl: './locale-reload.html',
})
export class LocaleReloadComponent {
  // 用户自定义词条
  private static myzh_CN: LocaleWords = {
    tiLocaleKey: 'zh-CN',
    testPassWord: '密码输入不符合要求，请重新输入',
    testMaxValue: '输入值不能超过{0}',
    testRangeValue: '输入值必须在{0}到{1}之间',
  };

  // 用户自定义词条
  private static myen_US: LocaleWords = {
    tiLocaleKey: 'en-US',
    testPassWord: 'Invalid password.',
    testMaxValue: 'Enter a value less than or equal to {0}.',
    testRangeValue: 'Enter a value from {0} to {1}.',
  };

  constructor() {
    // 添加用户的国际化词条
    TiLocale.setWords({
      'zh-CN': { ...tinyzh_CN, ...LocaleReloadComponent.myzh_CN },
      'en-US': { ...tinyen_US, ...LocaleReloadComponent.myen_US },
    });

    TiLocale.setLocale(this.getCookie('localeKey'));
  }

  changeLocale(localeKey: string): void {
    TiLocale.setLocale(localeKey);

  }

  setLocaleValue(key: string, params?: Array<any>): string {
    return TiLocale.translate(key, params);
  }

  setLocaleAndRefresh(localeKey: string): void {
      this.changeLocale(localeKey);
      document.cookie = `localeKey=${localeKey}`;
      location.reload();
  }

  getCookie(key: string): string {
      const name: string = key + '=';
      const splitedCookie: Array<string> = document.cookie.split(';');
      for (let word of splitedCookie) {
          while (word.charAt(0) === ' ') {
              word = word.substring(1);
          }
          if (word.indexOf(name) === 0) {
              return word.substring(name.length, word.length);
          }
      }

      return '';
  }
}