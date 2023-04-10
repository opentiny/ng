const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

execSync('npx lessc src/themes/basic/build.less dist/libs/themes/styles.css');

execSync('npx lessc src/themes/theme-default/build.less dist/libs/themes/theme-default.css');
execSync('npx lessc src/themes/theme-blue/build.less dist/libs/themes/theme-blue.css');
execSync('npx lessc src/themes/theme-green/build.less dist/libs/themes/theme-green.css');
execSync('npx lessc src/themes/theme-purple/build.less dist/libs/themes/theme-purple.css');
execSync('npx lessc src/themes/theme-red/build.less dist/libs/themes/theme-red.css');

fs.copy(path.resolve(__dirname, '../src/themes/package.json') , path.resolve(__dirname, '../dist/libs/themes/package.json'));