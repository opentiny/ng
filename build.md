<b>TinyNG 基于 [Angular CLI](https://angular.cn/cli) 和 [Nx CLI](https://nx.dev/reference/commands) 封装了以下(windows系统下)适用本项目的命令：<b>

<b>建议使用 cmd 命令窗口运行。<b>

### <b>新增一个 library </b>
   执行命令行：
   ```bash
   ng workspace-generator ti-lib-generator (运行该命令时，会询问你要创建的 library 的名称和版本号，按要求输入即可)
   ```
   或可直接执行命令行：
   ```bash
   ng workspace-generator ti-lib-generator lib库名 lib版本号 (例如：ng workspace-generator ti-lib-generator alert 1.2.0)
   ```

### <b>调试环境启动运行命令</b>
1. 启动单个组件 demo 项目

   执行命令行：
   ```bash
   ng serve xxx-demo  ('xxx' 是组件名，例如：ng serve alert-demo)
   ```

   或执行命令行：
   ```bash
   ng run xxx-demo:serve (例如：ng run alert-demo:serve)
   ```

   可在 angular.json 文件中的 projects 配置中查看各组件 demo 项目名称。

2. 启动全部组件 demo 项目

   执行命令行：
   ```bash
   ng serve ng-demo
   ```

   或执行命令行：
   ```
   ng run ng-demo:serve
   ```

### <b>生产环境常用打包命令</b>
1. 打包单个组件

   执行命令行：
   ```bash
   ng build xxx  (例如：ng build alert)
   ```

   或执行命令行：
   ```bash
   ng run xxx:build (例如：ng run alert:build)
   ```

   可在 angular.json 文件中的 projects 配置中查看各组件项目名称。

2. 打包多个组件

   执行命令行：
   ```bash
   ng run-many --target=build --projects=xxx1,xxx2  (例如：ng run-many --target=build --projects=alert,select)
   ```

   可在 angular.json 文件中的 projects 配置中查看各组件项目名称。

3. 打包全部组件

   执行命令行：
   ```bash
   ng build ng
   ```

   或执行命令行：
   ```bash
   ng run ng:build
   ```

### <b>生产环境启动预览命令</b>

1. 生产环境启动预览(模拟使用组件的开发者实际应用场景)单个组件 demo 项目

   执行命令行：
   ```bash
   ng preview xxx-demo  (例如：ng preview alert-demo)
   ```

   或执行命令行：
   ```bash
   ng run xxx-demo:preview (例如：ng run alert-demo:preview)
   ```

   功能：1. 构建打包相关 @opentiny/ng-xxx 发布包(.tgz)；2. 在 xxx-demo 项目中 npm install 安装 .tgz 包；3. xxx-demo 项目生产环境构建；4. 启动浏览器在8020 端口运行

2. 生产环境启动预览(模拟使用组件的开发者实际应用场景)全部组件 demo 项目

   执行命令行：
   ```bash
   ng preview ng-demo
   ```

   或执行命令行：
   ```bash
   ng run ng-demo:preview
   ```

   功能：1. 构建打包相关 @opentiny/ng-xxx 发布包(.tgz)；2. 在 ng-demo 项目中 npm install 安装 .tgz 包；3. ng-demo 项目生产环境构建；4. 启动浏览器在8020 端口运行

### <b>基于 Angular13 构建的 lib 在 Angular14/15 的应用中使用效果预览命令</b>

   执行命令行：
   ```bash
   ng preview ng-demo --configuration ng14(或者 ng15)
   ```

   或执行命令行：
   ```bash
   ng run ng-demo:preview --configuration ng14(或者 ng15)
   ```

   功能：
   1. 基于 Angular13 构建打包相关 @opentiny/ng-xxx 发布包(.tgz)；
   2. 在 src/ng/ngversion 项目中 npm install 安装 Angular14/15，同时安装 @opentiny/ng-xxx 的 tgz 包；
   3. 基于 Angular14/15 对 ng-demo 项目进行生产环境构建；
   4. 启动浏览器在 8020 端口运行，查看 Angular13 的 lib 在 Angular14/15 demo中的使用效果。

### <b>发布组件</b>

1. 发布全量组件：

   执行命令行：
   ```bash
   ng publish ng --args="--tag=xxxx"  (例如：ng publish ng --args="--tag=latest")
   ```

   或执行命令行：
   ```bash
   ng run ng:publish --args="--tag=xxxx"
   ```

2. 发布单个组件：

   执行命令行：
   ```bash
   ng publish 组件名 --args="--tag=xxxx"   (例如：ng publish select --args="--tag=latest")
   ```

   或执行命令行：
   ```bash
   ng run 组件名:publish --args="--tag=xxxx"
   ```

   
