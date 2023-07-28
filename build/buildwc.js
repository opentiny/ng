const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
// 1.删除 dist 目录
execSync('npm run clean');

// 2.编译生产环境 tinyng-demo
execSync('ng run ng-demo:build:wc --skip-nx-cache');
// 3.编译基础样式
execSync('npx lessc src/themes/basic/build.less dist/apps/ng/assets/themes/styles.css');
// 4.编译主题样式
execSync('npx lessc src/themes/theme-default/build.less dist/apps/ng/assets/themes/theme-default.css');
execSync('npx lessc src/themes/theme-blue/build.less dist/apps/ng/assets/themes/theme-blue.css');
execSync('npx lessc src/themes/theme-green/build.less dist/apps/ng/assets/themes/theme-green.css');
execSync('npx lessc src/themes/theme-purple/build.less dist/apps/ng/assets/themes/theme-purple.css');
execSync('npx lessc src/themes/theme-red/build.less dist/apps/ng/assets/themes/theme-red.css');

