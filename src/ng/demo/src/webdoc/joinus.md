---
title: 加入我们 | TinyNG
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

- commit 信息请遵循 [commit rules](https://github.com/opentiny/ng/blob/main/commit.template)。

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
遵循 [ESLint](https://github.com/opentiny/ng/blob/main/.eslintrc.js)

##  求贤纳士
### Web前端开发工程师

#### 岗位职责

+ 团队目前前端框架使用 Angular、Vue，使用 ES6、7 进行具体开发工作;

+ 前端工程化，打造从项目初始化、构建部署、发布、运维的端到端工程体系，打造前端 DevOps;

+ 可视化搭建技术，基于少码或无码化的搭建方式，提升活动运营的开发效率;

+ 面向对首屏和 SEO 注重的场景，研发基于 Nodejs+Vue 的同构方案，将页面首屏渲染性能做到极致;

+  Nodejs 方面，自主研发前端工程体系相关工具，需要大量使用 Nodejs 来更高效率的实现 Web 层研发，并有高并发业务场景使用 Nodejs 做服务端开发;

+ 基于 Serverless 方案，解决 Nodejs 运维及服务部署问题，提升前端研发效能。


#### 技能要求

+ 熟练使用各种前端技术，包括 HTML、CSS、JavaScript 等;

+ 具备跨终端的前端开发能力，在 Web（PC+Mobile）、Nodejs、Native App 三个方向上至少精通一个方向，具备多个的更佳，鼓励在 Native 和 Web 技术融合上的探索;

+ 对前端工程化与模块化开发有一定了解，并有实践经验（如 Webpack、Babel、AMD、CMD 等）;

+ 具备优秀的团队协作精神，能利用自身技术能力提升团队整体研发效率，提高团队影响力;

+ 对前端技术有持续的热情，个性乐观开朗，逻辑性强，沟通流畅;

+ 乐于分享，善于总结归纳沉淀，并能将好的经验在团队内进行分享;

+ 可选项：至少熟悉一门非前端的语言（如 Java、PHP、C、C++、Python、Ruby），并有实践经验。    
<br/>

### Java后端开发工程师

<h3 id="gwzz" data-label="岗位职责" tabindex="-1"><a class="header-anchor" href="#gwzz"></a> 岗位职责</h3>

+  参与核心基础框架的架构设计、详细方案设计与开发,为用户提供高可用、高性能的控制台服务； 

+  负责云原生领域服务方案设计及开发，实现云服务业务大流量、高并发； 

+  负责公共服务及中间件的孵化、设计及开发工作，构筑业界领先的平台能力。

<h3 id="jnyq" data-label="技能要求"  tabindex="-1"><a class="header-anchor" href="#jnyq"></a> 技能要求</h3>

+ 熟悉 J2EE、Java Web 编程技术,对各种开源的框架如 Spring 等有深入的应用和优化经验;

+ 熟悉 Netty ，熟悉多线程模型编程和网络IO模型;

+ 熟悉 Spring Boot、Spring MVC、Redis、MySQL;

+ 具有很强的学习能力和技术敏感度，有强烈的责任心和进取心，乐于学习和技术分享。  

<br/> 

如果您有意愿加入，请加微信咨询：ly5353523
