const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const baseDir = process.cwd();
// 1.删除 dist 目录
execSync('rimraf dist');
// 2.复制 angular.serve.json 到 angular.json
const serverfile = path.resolve(baseDir,'./angular.serve.json')
const angularfile = path.resolve(baseDir,'./angular.json')
fs.copy(`${serverfile}`, `${angularfile}`);
// 3.编译生产环境 tiny3demo
execSync('node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --output-hashing=none --configuration wc');
// 4.编译基础样式
execSync('npx lessc @opentiny/ng/themes/basic/build.less dist/tiny3doc/tiny3demo/assets/tiny3/themes/styles.css');
// 5.编译主题样式
execSync('npx lessc @opentiny/ng/themes/theme-default/build.less dist/tiny3doc/tiny3demo/assets/tiny3/themes/theme-default.css');
execSync('npx lessc @opentiny/ng/themes/theme-blue/build.less dist/tiny3doc/tiny3demo/assets/tiny3/themes/theme-blue.css');
execSync('npx lessc @opentiny/ng/themes/theme-green/build.less dist/tiny3doc/tiny3demo/assets/tiny3/themes/theme-green.css');
execSync('npx lessc @opentiny/ng/themes/theme-purple/build.less dist/tiny3doc/tiny3demo/assets/tiny3/themes/theme-purple.css');
execSync('npx lessc @opentiny/ng/themes/theme-red/build.less dist/tiny3doc/tiny3demo/assets/tiny3/themes/theme-red.css');
