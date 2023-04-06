---
title: 贡献指南 | TinyNG
---

## 贡献指南

### Issue 规范

- Issue 仅用于提交 Bug 或 Feature 以及用户体验相关的内容，其它内容可能会被直接关闭。

- 在提交 Issue 之前，请搜索相关内容是否已被提出。

- 在提 Bug 时请说明清楚使用的 @opentiny/ng 的版本号及相关环境。

### Pull Request 规范

- 请先 fork 一份到自己的项目下，新建一个分支用于变更。

  ```bash
  git checkout -b my-branch master
  ```

- commit 信息请遵循 [commit rules](commit.template)。

- 提交 PR 前请先进行 rebase，确保 commit 记录的整洁。
  ```bash
  git rebase master -i
  git push -f
  ```

- 如果是修复 `bug` 或者 `issues`，请在 PR 中描述清楚。


### 开发

```bash

# fork && git clone
...
# my-branch
npm install 
npm start

```

## 单元测试

### 整体测试
```bash
$ npm test ng-demo
```
或
```bash
$ npx ng test ng-demo
```

### 指定组件测试
```bash
$ npm test ${component name for test}-demo
```
或
```bash
$ npx ng test ${component name for test}-demo
```

例如:
```bash
$ npm test text-demo
```

### 添加测试用例
- 由于库中每个组件都有单独版本，所以对于新加入的组件，需要开发者为其准备单元测试环境。(也可使用自动化脚本为新组件生成环境所需文件，例如: `npm build:test radio`)
- 对于已有组件，直接在组件 `demo/` 目录下新建 `${your component name}.spec.json` 文件后编写测试脚本。
- 若组件 demo 目录中已经存在 `${your component name}.spec.json` 文件，则直接在此文件中修改用例。

TinyNG 使用 [Jasmine 测试框架](https://jasmine.github.io/) 对组件库内容进行单元测试。
`npm test` 命令在**监视模式**下构建应用，并启动 [karma 测试运行器](https://karma-runner.github.io/)。
运行结束后，控制台会输出测试结果，内容格式如下：

```
✔ Browser application bundle generation complete.
28 11 2022 08:40:17.804:WARN [karma]: No captured browser, open http://localhost:9876/
28 11 2022 08:40:17.824:INFO [karma-server]: Karma v6.3.20 server started at http://localhost:9876/
28 11 2022 08:40:17.825:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
28 11 2022 08:40:17.833:INFO [launcher]: Starting browser Chrome
28 11 2022 08:40:19.278:INFO [Chrome 107.0.0.0 (Windows 10)]: Connected on socket swhnqYi_RwdYbu8uAAAB with id 55443332
Chrome 107.0.0.0 (Windows 10): Executed 5 of 5 SUCCESS (0.562 secs / 0.815 secs)
TOTAL: 5 SUCCESS
```

它还会打开 Chrome 浏览器并在 [Jasmine HTML 报告器](https://github.com/dfederm/karma-jasmine-html-reporter)中显示测试输出。可以点击某一行用例，来单独重跑这个用例，或者点击一行描述信息来重跑所选的测试套件中的那些测试。

单元测试用例及相关配置在 `/src/test/` 目录下。

更多详细内容可以通过查阅 [Angular 官网关于测试的介绍](https://angular.cn/guide/testing)获得。

### 代码规范
遵循 [ESLint](eslint-rules/)