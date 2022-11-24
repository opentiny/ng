::请用Window记事本编辑此文件，默认存为ANSI，方便bat时显示中文提示。
::不要用VSCode编辑。
::Please use Window editor edit me，save as ANSI，for bat showing Chinese
::Do not use VSCode edit me

@echo 请关闭VSCode等占用项目文件的程序，否则中途文件夹改名失败
@echo 适用于：已@opentiny/ng.tgz，修改测试时用例后，仅编译测试用例。

::改变为生产环境@opentiny/ng源码目录重命名,以便找不@opentiny/ng目录，而后续找到的是node_modules/@opentiny/ng
:: (实质上ng9默认配置，编译环境优先找node_module，已经不需要这步，但是为了程序员可理解依然保留)
call npx shx mv -f .\@opentiny .\@opentiny_bak
::2）改变theme css引用
::call npx ng config projects.tiny3demo.architect.build.options.styles ["""node_modules/@opentiny/ng/themes/styles.css""","""node_modules/prismjs/themes/prism.css""","""src/styles.less"""]
::3）将主题css，打包时放置在asserts
::call npx ng config projects.tiny3demo.architect.build.options.assets ["""src/favicon.ico""","""src/assets""",{"""glob""":"""**/*""","""input""":"""node_modules/@opentiny/ng/themes/""","""output""":"""/assets/tiny3/themes/"""}]
call npx shx cp -f angular.build.json angular.json

::编译生产环境tiny3demo
call node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng  build --prod --base-href ./  || pause
call npx shx cp -rf .\src .\dist\tiny3doc\tiny3demo\src

::恢复为调试环境
call npx shx mv -f .\@opentiny_bak .\@opentiny
::call npx ng config projects.tiny3demo.architect.build.options.styles ["""@opentiny/ng/themes/basic/build.less""","""@opentiny/ng/themes/theme-hws/build.less""","""node_modules/prismjs/themes/prism.css""","""src/styles.less"""]
::call npx ng config projects.tiny3demo.architect.build.options.assets ["""src/favicon.ico""","""src/assets"""]
call npx shx cp -f angular.serve.json angular.json

::打开网站
call live-serve-dist.bat

pause