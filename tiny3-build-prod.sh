# 伏羲发包脚本

node --max_old_space_size=819200 node_modules/@angular/cli/bin/ng build tiny --configuration production

node node_modules/less/bin/lessc @opentiny/ng/themes/basic/build.less dist/@opentiny/ng/themes/styles.css

node node_modules/less/bin/lessc @opentiny/ng/themes/theme-default/build.less dist/@opentiny/ng/themes/theme-default.css
node node_modules/less/bin/lessc @opentiny/ng/themes/theme-blue/build.less dist/@opentiny/ng/themes/theme-blue.css
node node_modules/less/bin/lessc @opentiny/ng/themes/theme-green/build.less dist/@opentiny/ng/themes/theme-green.css
node node_modules/less/bin/lessc @opentiny/ng/themes/theme-purple/build.less dist/@opentiny/ng/themes/theme-purple.css
node node_modules/less/bin/lessc @opentiny/ng/themes/theme-red/build.less dist/@opentiny/ng/themes/theme-red.css
