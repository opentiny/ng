import { enableProdMode } from '@angular/core';
import { TiTheme } from '@opentiny/ng';

import { AppModule } from './app/AppModule';
import { AppModule as WcAppModule } from './app/AppWcModule';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.production) { // 生产环境
  // 主题名称
  const themename: string = 'default';
  // 加载主题CSS文件。只有生产环境支持在线切换皮肤，所以基础CSS在angular.json中配置，主题CSS在代码中加载，之后再应用。
  // 会从assets/tiny3/themes/theme-${theme}.css 加载CSS文件，放在head link
  const link: HTMLLinkElement = TiTheme.loadCss(`assets/tiny3/themes/theme-${themename}.css`, 'tiny3theme');

  // 原生支持CSSVars
  // 在Chrome下，新加入的CSS载入太迟，CSS样式生效迟，overflow等需要计算宽度的组件有问题，所以要等CSS加载完成后才启动App
  link.addEventListener('load', () => {
    // 监听DOMContentLoaded，是ng add @nguniversal/express-engine生成的。但是，在当前环境下，css load事件之后，再也没有DOMContentLoaded事件了，所以不需要监听。
    // document.addEventListener('DOMContentLoaded', () => {
       TiTheme.bootstrapModule(environment.isWc ? WcAppModule : AppModule);
    // });
  }, false);
  link.addEventListener('error', () => {
    TiTheme.bootstrapModule(environment.isWc ? WcAppModule : AppModule);
  }, false);
} else {
  TiTheme.bootstrapModule(AppModule);
}
