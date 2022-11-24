<b>Angular 已经提供了命令行界面工具 [Angular CLI](https://angular.cn/cli)，可用于初始化、开发、构建和维护 Angular 应用。</b>

<b>基于 Angular CLI 封装了以下(windows系统下)适用本项目的命令：<b>

### <b>调试环境命令</b>
1. 启动项目

   直接双击运行根目录下的 ng-serve--open.bat 文件，

   或执行命令行：
   ```
   npm start
   ```

### <b>生产环境常用打包命令</b>
1. 启动项目demo

   直接双击运行根目录下的 ng-build-prod.bat 文件，

   或执行命令行：
   ```
   npm run build
   ```
   
   功能：1.构建打包tiny发布包；2.在测试用例中安装tiny包；3.测试用例生产环境构建；4.启动浏览器运行

### <b>其它命令</b>

1. 创建component/directive

   1）创建component：
   npm [--component=componentName] run-script new:component
   如：npm --component=test run-script new:component

   2）创建directive：
   npm [--directive=directiveName] run-script new:component
   如：npm --directive=test run-script new:component




