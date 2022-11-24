::如果没有安装npm包，则执行npm i
if not exist "node_modules" call npm i
::设置为调试用css样式
::call npx ng config projects.tiny3demo.architect.build.options.styles ["""@opentiny/ng/themes/basic/build.less""","""@opentiny/ng/themes/theme-hws/build.less""","""node_modules/prismjs/themes/prism.css""","""src/styles.less"""]
::call npx ng config projects.tiny3demo.architect.build.options.assets ["""src/favicon.ico""","""src/assets"""]
call npx shx cp -f angular.serve.json angular.json
::如果已经安装，则卸载
if exist node_modules/@opentiny/ng/package.json (call npm uninstall @opentiny/ng)
call npx shx rm -rf  .\src\assets\tiny3\themes
::调试
call npx ng serve --open
pause