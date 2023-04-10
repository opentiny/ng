import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';

import { TiButtonModule, TiLocaleModule } from '@opentiny/ng';

import { LocaleBasicComponent } from './LocaleBasicComponent';
import { LocaleFormatComponent } from './LocaleFormatComponent';
import { LocaleReloadComponent } from './LocaleReloadComponent';
import localeZh from '@angular/common/locales/zh';

@NgModule({
  imports: [CommonModule, TiLocaleModule, TiButtonModule, RouterModule.forChild(LocaleTestModule.ROUTES)],
  declarations: [LocaleBasicComponent, LocaleFormatComponent, LocaleReloadComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'zh' }]
})
export class LocaleTestModule {
  constructor() {
    registerLocaleData(localeZh, 'zh'); // 用于设置时间日期、数字格式化信息的配置，组件内部使用的规则语种与国际化语种设置一致，具体使用参考angular国际化设置文档
  }
  static readonly ROUTES: Routes = [
    {
      path: 'locale/locale-basic',
      component: LocaleBasicComponent
    },
    {
      path: 'locale/locale-reload',
      component: LocaleReloadComponent
    },
    {
      path: 'locale/locale-format',
      component: LocaleFormatComponent
    }
  ];
}
