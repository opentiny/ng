---
title: 主题配置 | TinyNG
---

# 主题配置

TinyNG 支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

<img class="mb30 b-a" src="./images/theme.png" alt="theme" style="border-style:solid" />

## 使用预定义主题

### 默认主题

修改`angular.json`的`styles`字段，全量引入`"node_modules/@opentiny/ng/themes/styles.css"`和`"node_modules/@opentiny/ng/themes/theme-default.css"`。

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@opentiny/ng/themes/styles.css",
        "node_modules/@opentiny/ng/themes/theme-default.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

### 官方主题

除了默认主题外，我们还提供了 4 种官方主题，欢迎在项目中试用，并且给我们提供反馈。

- theme-blue.css
- theme-green.css
- theme-purple.css
- theme-red.css

修改`angular.json`的`styles`字段，全量引入`"node_modules/@opentiny/ng/themes/styles.css"`和`"node_modules/@opentiny/ng/themes/theme-xxx.css"`。

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@opentiny/ng/themes/styles.css",
        "node_modules/@opentiny/ng/themes/theme-xxx.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

## 自定义主题

如果需要自定义主题，可借助<a href='../../designtheme/home'>TinyUI Theme</a>平台。

## 动态切换主题

### 步骤一：将`TinyNG`主题 CSS 文件，复制到`assets`下

修改`angular.json`的`assets`字段，参考如下修改，下面`input`，`output`意思是打包时，`"node_modules/@opentiny/ng/themes/"`复制到`"/assets/tiny3/themes/"`。

```json
{
  ...
  "architect": {
    "build": {
      ...
      "assets": [
        "src/favicon.ico",
        "src/assets",
        {
          "glob": "**/*",
          "input": "node_modules/@opentiny/ng/themes/",
          "output": "/assets/tiny3/themes/"
        }
      ],
      ...
    }
  }
  ...
}
```

### 步骤二：添加基础样式`"node_modules/@opentiny/ng/themes/styles.css"`

修改`angular.json`的`styles`字段，引入`"node_modules/@opentiny/ng/themes/styles.css"`。

```json
{
  ...
  "architect": {
    "build": {
      ...
      "styles": [
        "node_modules/@opentiny/ng/themes/styles.css",
        "src/styles.css",
      ],
      ...
    }
  }
  ...
}
```

### 步骤三：加载主题 CSS 文件

修改Angular项目启动文件`main.ts`，加载主题 CSS 文件后，再启动`AppModule`。

```typescript
import { enableProdMode } from '@angular/core';
import { TiTheme } from '@opentiny/ng';

import { AppModule } from './app/AppModule';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (environment.production) {
  const themename: string = 'default';
  // 加载主题CSS文件。只有生产环境支持在线切换皮肤，所以基础CSS在angular.json中配置，主题CSS在代码中加载，之后再应用。
  // 会从assets/tiny3/themes/theme-${theme}.css 加载CSS文件，放在head link
  const link: HTMLLinkElement = TiTheme.loadCss(
    `assets/tiny3/themes/theme-${themename}.css`,
    'tiny3theme'
  );

  // 原生支持CSSVars
  // 在Chrome下，新加入的CSS载入太迟，CSS样式生效迟，overflow等需要计算宽度的组件有问题，所以要等CSS加载完成后才启动App
  link.addEventListener(
    'load',
    () => {
      TiTheme.bootstrapModule(AppModule);
    },
    false
  );
  link.addEventListener(
    'error',
    () => {
      TiTheme.bootstrapModule(AppModule);
    },
    false
  );
} else {
  TiTheme.bootstrapModule(AppModule);
}
```

### 步骤四：调用代码切换主题，详见 [theme](../components/theme) 用例

```typescript
import { TiTheme } from '@opentiny/ng';

...
TiTheme.loadThemeCss('blue', 'tiny3theme');
...
```



## 网页里动态改变组件样式

JavaScript 操作 CSS 变量的写法如下：（Chrome、Firefox、Safari 原生支持）

> IE 的兼容性补丁，暂时不支持 JavaScript 操作 CSS 变量，有可能后期会支持此能力。

```javascript
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```
