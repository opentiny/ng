---
title: 快速上手 | TinyNG
---

# 快速上手

`TinyNG`是基于 Angular + TypeScript 的 Web UI 组件库，本文将介绍在一个项目中如何使用`TinyNG`组件。

> 在使用`TinyNG`组件库之前，建议您提前学习 [HTML](https://www.w3school.com.cn/h.asp)、[CSS](https://www.w3school.com.cn/css/index.asp)、[TypeScript](https://www.tslang.cn/)、[Angular](https://angular.cn/docs)。

## 第一个本地实例

如果您已经拥有一个 Angular 应用项目，请直接进入[安装](#%E5%AE%89%E8%A3%85)步骤。

如果没用，我们强烈建议使用官方的`@angular/cli`工具创建项目，它在项目的构建、开发、调试、打包部署等环节贡献突出，对开发者帮助很大。

#### 安装脚手架工具

> 如果你想了解更多 CLI 工具链的功能和命令，建议访问 [@angular/cli](https://angular.cn/cli) 了解更多。

```bash
$ npm install -g @angular/cli
```

#### 创建一个项目

> 在创建项目之前，请确保 `@angular/cli` 已被成功安装。

通过 `@angular/cli` 在当前目录下新建一个名为 MYAPP 的 Angular 项目，并自动安装好相应依赖。

```bash
ng new MYAPP
```

## 安装及使用

#### 进入项目根目录，使用 npm 安装 `TinyNG`

```bash
cd MYAPP
npm install @opentiny/ng @angular/cdk
```
#### 引入模块

在使用某个组件前，需要引入对应的模块，此处以引入`Button`组件为例。

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 部分组件依赖angular动画，可能需要引入animations模块
import { NgModule } from '@angular/core';
import { TiButtonModule } from '@opentiny/ng'; // 导入某个组件的模块
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    TiButtonModule // 引入该模块
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### 引入样式文件

在`angular.json`文件中, 引入`TinyNG`组件库样式文件。

```json
{
  "build": {
    "styles": [
      "node_modules/@opentiny/ng-themes/styles.css", // 基础样式
      "node_modules/@opentiny/ng-themes/theme-default.css", // 主题样式
      "src/styles.css"
    ]
  }
}
```

`TinyNG`组件库内置了 5 套主题，分别是: theme-default.css、theme-blue.css、theme-green.css、theme-purple.css、theme-red.css，您可以根据业务场景进行选择，也可以在[主题配置](./themedoc)中选择更多样式配置方式。


## 启动开发调试

```bash
ng serve --open
```
