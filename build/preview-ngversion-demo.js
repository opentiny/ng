/**
 * 基于 Angular13 构建的 lib 在 Angular14/15 的应用demo中使用效果(生产环境)预览。
 * 使用方式：在根目录下，执行 `ng preview ng-demo --configuration ng14(或者 ng15)`。
 */
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

// 处理输入参数，获取目标组件名
const args = process.argv;
if (args.length !== 3) {
 throw new TypeError('请输入要预览的组件名称！');
 return;
}
const name = args[2];
console.log('name', name);
// 删除 dist、node_modules/@opentiny 等
ready();

// build 构建 lib
buildLib();

// 打包压缩 lib 为 tgz 文件
packLib();

// 在对应目录执行 npm install，并安装 demo 所依赖的 lib 的 tgz 包。
installLib();

// 打包构建 demo
buildDemo();

// // 启动 demo
serverDemo();


function ready(){
 execSync('npm run clean', { stdio: 'inherit' });
}

function buildLib() {
  console.log('---------------- build lib ---------------');
  execSync(`ng build ng`, { stdio: 'inherit' });
}

function packLib() {
  console.log('---------------- pack lib ---------------');
  execSync('ng pack ng', { stdio: 'inherit' });
}

function installLib() {
  const distLibsPath = path.resolve(__dirname, '../dist/libs');
  const dirs = fs.readdirSync(distLibsPath);
  let installs = '';
  dirs.forEach((dir) => {
    // 拼凑 npm install 时所需的 lib 库的 tgz 包路径
    const dirPath = path.resolve(distLibsPath, `${dir}`);
    const fileName = fs.readdirSync(dirPath).filter((file) => {
      return file.endsWith('.tgz');
    })[0];

    if (fileName) {
      installs += `../../../../dist/libs/${dir}/${fileName} `;
    }
  });
  console.log('---------------- install lib ---------------');
  // 安装当前组件 lib 库
  execSync(`cd src/ng/ngversion/${name} && npm install --force && npm install ${installs} --legacy-peer-deps`, { stdio: 'inherit' });
}

function buildDemo() {
  // 解决 ng16 时生产环境启动运行时报错问题
  if (name === 'ng16') {
    fs.moveSync(path.resolve(__dirname, '../src/browserslist'),path.resolve(__dirname, '../src/browserslist_bak'))
  }

  console.log(`---------------- build ${name} demo ---------------`);
  execSync(`cd src/ng/ngversion/${name} && npm run build`, { stdio: 'inherit' });

  if (name === 'ng16') {
    fs.moveSync(path.resolve(__dirname, '../src/browserslist_bak'),path.resolve(__dirname, '../src/browserslist'))
  }
}

function serverDemo() {
  console.log(`---------------- serve ${name} demo ---------------`);
  execSync(`npx live-server dist/apps/${name} --port=8022`, { stdio: 'inherit' });
}
