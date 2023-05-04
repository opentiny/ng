---
title: Internationalization | TinyNG
---

# Internationalization

Currently, the default language is Chinese. If you need to use other languages, you can configure them during initialization or modify them at any time during runtime, following the solutions below.

## Setting the Language

`TinyNG` supports 5 languages, with Chinese set as the default. In Angular project application entry file `app.module.ts`, you can set the language.

```typescript
import { TiLocale } from '@opentiny/ng';
// Import other items

@NgModule({
  imports: [
    // Import module...
  ]

  // Configure other items...
})
export class AppModule {
  constructor() {
    // Configure Tiny's internationalization resources, with Chinese set as the default.
    /**
     * Available language identifiers:
     * TiLocale.EN_US English
     * TiLocale.ZH_CN Simplified Chinese
     * TiLocale.ES_US Latin American Spanish
     * TiLocale.FR_FR French
     * TiLocale.PT_BR Portuguese
     */
    TiLocale.setLocale(TiLocale.EN_US);
  }
  ...
}
```

## Internationalization Conversion
#### Using Pipes for Internationalization Conversion
This method only supports switching languages by refreshing the page. Businesses may combine cookie switching to change languages.

Template file `locale-basic.html`

```html
<p>{{ 'testStr' | tiTranslate }}</p>
<p>{{ 'testStrArgs1' | tiTranslate: [1] }}</p>
<p>{{ 'testStrArgs2' | tiTranslate: [1,2] }}</p>
<p>{{ 'tiButton.ok' | tiTranslate }}</p>
<button (click)='setLocaleAndRefresh("en-US")'>Set to English and refresh the page</button>
<button (click)='setLocaleAndRefresh("zh-CN")'>Set to Chinese and refresh the page</button>
```

`locale-basic.component.ts` file
```typescript
import { Component } from '@angular/core';
import {
  en_US as tinyen_US,
  zh_CN as tinyzh_CN,
  TiLocale,
  TiLocaleFormat,
} from '@opentiny/ng';

interface LocaleWords {
  tiLocaleKey: string;
  testStr: string;
  testStrArgs1: string;
  testStrArgs2: string;
}

@Component({
  templateUrl: './locale-basic.html',
})
export class LocaleBasicComponent {
  // The business's own words and phrases
  private static myzh_CN: any = {
    tiLocaleKey: 'zh-CN',
    testStr: 'Testing',
    testStrArgs1: 'Single argument test scenario {0}',
    testStrArgs2: 'Testing single multi-argument scenario {0} and {1}',
  };
  // The business's own words and phrases
  private static myen_US: LocaleWords = {
    tiLocaleKey: 'en-US',
    testStr: 'test str with args',
    testStrArgs1: 'test str with args {0}',
    testStrArgs2: 'test str with args {0} and {1}',
  };

  constructor() {
    // Add the business's internationalized words and phrases
    TiLocale.setWords({
      'zh-CN': { ...tinyzh_CN, ...LocaleBasicComponent.myzh_CN },
      'en-US': { ...tinyen_US, ...LocaleBasicComponent.myen_US },
    });
    TiLocale.setLocale(this.getCookie('localeKey'));
    this.setValues();
  }

  changeLocale(localeKey: string): void {
    TiLocale.setLocale(localeKey);
  }

  // Open this code to use filters for internationalization conversion:
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
```

#### Using JavaScript methods for internationalization conversion
This method allows language switching without refreshing the page.

Template file `locale-basic.html`

```html
<p>{{testStr}}</p>
<p>{{testStrArgs1}}</p>
<p>{{testStrArgs2}}</p>
<p>{{okBtn}}</p>
<button (click)='changeLocale("en-US")'>Set to English</button>
<button (click)='changeLocale("zh-CN")'>Set to Chinese</button>
```

`locale-basic.component.ts` file

```typescript
import { Component } from '@angular/core';
import {
  en_US as tinyen_US,
  zh_CN as tinyzh_CN,
  TiLocale,
  TiLocaleFormat,
} from '@opentiny/ng';

interface LocaleWords {
  tiLocaleKey: string;
  testStr: string;
  testStrArgs1: string;
  testStrArgs2: string;
}

@Component({
  templateUrl: './locale-basic.html',
})
export class LocaleBasicComponent {
  testStr: string;
  testStrArgs1: string;
  testStrArgs2: string;
  okBtn: string;
  // The business's own words and phrases
  private static myzh_CN: any = {
    tiLocaleKey: 'zh-CN',
    testStr: 'Testing',
    testStrArgs1: 'Single argument test scenario {0}',
    testStrArgs2: 'Testing single multi-argument scenario {0} and {1}',
  };
  // The business's own words and phrases
  private static myen_US: LocaleWords = {
    tiLocaleKey: 'en-US',
    testStr: 'test str with args',
    testStrArgs1: 'test str with args {0}',
    testStrArgs2: 'test str with args {0} and {1}',
  };

  constructor() {
    // Add the business's internationalized words and phrases
    TiLocale.setWords({
      'zh-CN': { ...tinyzh_CN, ...LocaleBasicComponent.myzh_CN },
      'en-US': { ...tinyen_US, ...LocaleBasicComponent.myen_US },
    });
    this.setValues();
  }

  changeLocale(localeKey: string): void {
    TiLocale.setLocale(localeKey);
    this.setValues();
  }

  setValues(): void {
    this.testStr = this.setLocaleValue('testStr');
    this.testStrArgs1 = this.setLocaleValue('testStrArgs1', [1]);
    this.testStrArgs2 = this.setLocaleValue('testStrArgs2', [1, 2]);
    this.okBtn = this.setLocaleValue('tiButton.ok');
  }

  setLocaleValue(key: string, params?: Array<any>): string {
    return TiLocale.translate(key, params);
  }
}
```
