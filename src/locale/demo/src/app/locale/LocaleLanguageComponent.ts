import { Component } from '@angular/core';
import { TiLocale } from '@opentiny/ng';

interface LocaleWords {
  tiLocaleKey: string;
  testPassWord: string;
  testMaxValue: string;
  testRangeValue: string;
}

@Component({
  templateUrl: './locale-language.html'
})
export class LocaleLanguageComponent {
  // 用户自定义词条
   static myde_DE: LocaleWords = {
    tiLocaleKey: 'de-DE',
    testPassWord: 'Invalid password.',
    testMaxValue: 'Der Eingabewert kann {0} nicht überschreiten.',
    testRangeValue: 'Der Eingabewert muss im Bereich zwischen {0} und {1} liegen.'
  };

  constructor() {
    const words = (window as any).tiWords;
    // 添加用户的国际化词条
    TiLocale.setWords({
      ...words,
      'de-DE': LocaleLanguageComponent.myde_DE
    });
    TiLocale.setLocale('de-DE');
    this.setValues();
  }

  testPassWord: string;
  testMaxValue: string;
  testRangeValue: string;

  setValues(): void {
    this.testPassWord = this.setLocaleValue('testPassWord');
    this.testMaxValue = this.setLocaleValue('testMaxValue', [1]);
    this.testRangeValue = this.setLocaleValue('testRangeValue', [1, 2]);
  }

  setLocaleValue(key: string, params?: Array<any>): string {
    return TiLocale.translate(key, params);
  }
}
