---
title: 国际化 | TinyNG
---

# 国际化

目前的默认文案是中文，如果需要使用其他语言，可以在初始化时进行配置，也可以在运行中随时修改，可以参考下面的方案。

## 设置语言

`TinyNG`支持 7 种语言，默认显示中文，在 Angular 项目应用入口文件`app.module.ts`，可设置语言。

```typescript
import { TiLocale } from '@opentiny/ng';
// 导入其他项

@NgModule({
  imports: [
    // 导入模块...
  ]

  // 配置其他项...
})
export class AppModule {
  constructor() {
    // 配置Tiny国际化资源，默认为中文
    /**
     * 可用的语言标识
     * TiLocale.EN_US 英文
     * TiLocale.ZH_CN 简体中文
     * TiLocale.DE_DE 德语
     * TiLocale.ES_ES 欧洲西语
     * TiLocale.ES_US 拉美西语
     * TiLocale.FR_FR 法语
     * TiLocale.PT_BR 葡语
     */
    TiLocale.setLocale(TiLocale.EN_US);
  }
  ...
}
```

## 国际化转化
#### 使用管道符做国际化转换
此种方式只支持通过页面刷新切换语言，业务可结合 cookie 切换语言

模板文件`locale-basic.html`

```html
<p>{{ 'testStr' | tiTranslate }}</p>
<p>{{ 'testStrArgs1' | tiTranslate: [1] }}</p>
<p>{{ 'testStrArgs2' | tiTranslate: [1,2] }}</p>
<p>{{ 'tiCommon.okBtn' | tiTranslate }}</p>
<button (click)='setLocaleAndRefresh("en-US")'>设置为英文并刷新页面</button>
<button (click)='setLocaleAndRefresh("zh-CN")'>设置为中文并刷新页面</button>
```

`locale-basic.component.ts`文件
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
  // 业务自己的词条
  private static myzh_CN: any = {
    tiLocaleKey: 'zh-CN',
    testStr: '测试',
    testStrArgs1: '测试单参数场景 {0}',
    testStrArgs2: '测试单多参数场景 {0} 和 {1}',
  };
  // 业务自己的词条
  private static myen_US: LocaleWords = {
    tiLocaleKey: 'en-US',
    testStr: 'test str with args',
    testStrArgs1: 'test str with args {0}',
    testStrArgs2: 'test str with args {0} and {1}',
  };

  constructor() {
    // 添加业务的国际化词条
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

  // 使用过滤器做国际化转换打开此代码：
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

#### 使用 JavaScript 方法做国际化转换
此种方式可做到页面无刷新切换语言

模板文件`locale-basic.html`

```html
<p>{{testStr}}</p>
<p>{{testStrArgs1}}</p>
<p>{{testStrArgs2}}</p>
<p>{{okBtn}}</p>
<button (click)='changeLocale("en-US")'>设置为英文</button>
<button (click)='changeLocale("zh-CN")'>设置为中文</button>
```

`locale-basic.component.ts`文件

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
  // 业务自己的词条
  private static myzh_CN: any = {
    tiLocaleKey: 'zh-CN',
    testStr: '测试',
    testStrArgs1: '测试单参数场景 {0}',
    testStrArgs2: '测试单多参数场景 {0} 和 {1}',
  };
  // 业务自己的词条
  private static myen_US: LocaleWords = {
    tiLocaleKey: 'en-US',
    testStr: 'test str with args',
    testStrArgs1: 'test str with args {0}',
    testStrArgs2: 'test str with args {0} and {1}',
  };
  constructor() {
    // 添加业务的国际化词条
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
    this.okBtn = this.setLocaleValue('tiCommon.okBtn');
  }

  setLocaleValue(key: string, params?: Array<any>): string {
    return TiLocale.translate(key, params);
  }
}
```
