::请用Window记事本编辑此文件，默认存为ANSI，方便bat时显示中文提示。
::不要用VSCode编辑。
::Please use Window editor edit me，save as ANSI，for bat showing Chinese
::Do not use VSCode edit me

@echo 请关闭VSCode等占用项目文件的程序，否则中途文件夹改名失败

::如果没有安装npm包，则执行npm i
if not exist "node_modules" call npm i

::取出tinyplus版本号
for /f tokens^=4^ delims^=^" %%a in ('find "version" .\@opentiny\ng\package.json') do (set version=%%a)

::创建版本号文件夹，准备存tiny.tgz等
call npx shx rm -rf .\dist\tiny3doc\tiny3npm\%version%\*
call npx shx mkdir -p .\dist\tiny3doc\tiny3npm\%version%

::生成tinyplus库
call node --max_old_space_size=819200 node_modules/@angular/cli/bin/ng build tiny --configuration production || pause


::基础样式
call npx lessc @opentiny/ng/themes/basic/build.less dist/@opentiny/ng/themes/styles.css
::主题样式
call npx lessc @opentiny/ng/themes/theme-default/build.less dist/@opentiny/ng/themes/theme-default.css
call npx lessc @opentiny/ng/themes/theme-blue/build.less dist/@opentiny/ng/themes/theme-blue.css
call npx lessc @opentiny/ng/themes/theme-green/build.less dist/@opentiny/ng/themes/theme-green.css
call npx lessc @opentiny/ng/themes/theme-purple/build.less dist/@opentiny/ng/themes/theme-purple.css
call npx lessc @opentiny/ng/themes/theme-red/build.less dist/@opentiny/ng/themes/theme-red.css

::压缩tgz
cd dist\@opentiny
call npx jaguar -p ng
cd ../../
call npx shx mv -f .\dist\@opentiny\ng.tar.gz .\dist\tiny3doc\tiny3npm\%version%\ng.tgz

::安装tiny库
call npm install .\dist\tiny3doc\tiny3npm\%version%\ng.tgz

::改变为生产环境@opentiny/ng源码目录重命名,以便找不@opentiny/ng目录，而后续找到的是node_modules/@opentiny/ng
:: (实质上ng9默认配置，编译环境优先找node_module，已经不需要这步，但是为了程序员可理解依然保留)
call npx shx mv -f .\@opentiny .\@opentiny_bak
::2）改变theme css引用
::3）将主题css，打包时放置在asserts
call npx shx cp -f angular.build.json angular.json


::编译生产环境tiny3demo
call node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --configuration production --base-href ./  || pause
call npx shx cp -rf .\src .\dist\tiny3doc\tiny3demo\src

::恢复为调试环境
call npx shx mv -f .\@opentiny_bak .\@opentiny
call npx shx cp -f angular.serve.json angular.json

::生成文档,并打开网站
call live-serve-dist.bat

pause