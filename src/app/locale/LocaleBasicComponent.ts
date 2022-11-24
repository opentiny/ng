import { Component } from '@angular/core';
import { en_US as tinyen_US, TiLocale, zh_CN as tinyzh_CN } from '@opentiny/ng';

interface LocaleWords {
  tiLocaleKey: string;
  testPassWord: string;
  testMaxValue: string;
  testRangeValue: string;
}

@Component({
  templateUrl: './locale-basic.html',
})
export class LocaleBasicComponent {
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
      'zh-CN': { ...tinyzh_CN, ...LocaleBasicComponent.myzh_CN },
      'en-US': { ...tinyen_US, ...LocaleBasicComponent.myen_US },
    });
    this.setValues();
  }

  testPassWord: string;
  testMaxValue: string;
  testRangeValue: string;
  okBtn: string;

  changeLocale(localeKey: string): void {
    TiLocale.setLocale(localeKey);
    this.setValues();
  }

  setValues(): void {
    this.testPassWord = this.setLocaleValue('testPassWord');
    this.testMaxValue = this.setLocaleValue('testMaxValue', [1]);
    this.testRangeValue = this.setLocaleValue('testRangeValue', [1, 2]);
    this.okBtn = this.setLocaleValue('tiCommon.okBtn');
  }

  setLocaleValue(key: string, params?: Array<any>): string {
    return TiLocale.translate(key, params);
  }
}
