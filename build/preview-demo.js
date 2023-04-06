/**
 * 生产环境启动预览(模拟使用组件的开发者实际应用场景)组件 demo。
 * 使用方式：在根目录下，执行 `ng preview xxx-demo`。
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
const ngDemoDir = 'ng';
const isNgDemoPreview = name === ngDemoDir;

// 删除 dist、node_modules/@opentiny 等
ready();

// 打包构建 lib
buildLib();
// 修改 tsconfig.base.json 中的 compilerOptions.paths，以确保在后续构建 demo 时使用 node_modules 中的 lib 库；
// mpm install 安装 demo 所依赖的 lib 的 tgz 包。
changePathAliasAndInstallLib();

// 配置有在线切换主题样式功能的 demo(utils 和 ng)的 project.json assets，使其 demo 在build 时可以将
// node_modules/@opentiny/ng-themes/ 的主题样式放在其 demo 的 assets 目录下。
configDemoThemes();

// 打包构建 demo
buildDemo();

// 消除、还原在执行 changePathAliasAndInstallLib 后对相关文件的产生的影响
reset();

// 启动 demo
serverDemo();


function ready(){
  execSync('npm run prepreview');
}

function buildLib() {
  execSync(`ng build ${name}`);

  if (isNeedThemesBuild() && !isNgDemoPreview) {
    execSync('ng build themes');
  }
}

function changePathAliasAndInstallLib() {
  // 读取 tsconfig.base.json 文件内容
  const baseTsConfigPath = path.resolve(__dirname, '../tsconfig.base.json');
  const baseTsConfig = fs.readFileSync(baseTsConfigPath);
  const baseTsConfigData = JSON.parse(baseTsConfig);
  // 备份 tsconfig.base.json 文件中 compilerOptions.paths 配置项的内容，之后会在 resetBaseTsconfig.js 中还原
  baseTsConfigData.paths_bak = { ...baseTsConfigData.compilerOptions.paths };

  const distLibsPath = path.resolve(__dirname, '../dist/libs');
  const dirs = fs.readdirSync(distLibsPath);
  let installs = '';

  if (isNgDemoPreview) {
    delete baseTsConfigData.compilerOptions.paths;
    execSync(`ng pack ${ngDemoDir}`);
  }

  dirs.forEach((dir) => {
    // 去除掉 compilerOptions.paths 中当前组件 demo 中使用的当前组件 lib 库的路径，以便在后续构建当前组件demo 时使用 node_modules 中的当前组件 lib 库
    if (!isNgDemoPreview) {
      delete baseTsConfigData.compilerOptions.paths[`@opentiny/ng-${dir}`];
      // 打包压缩 lib 库
      execSync(`ng pack ${dir}`);
    }

    // 拼凑 npm install 时所需的 lib 库的 tgz 包路径
    const dirPath = path.resolve(distLibsPath, `${dir}`);
    const fileName = fs.readdirSync(dirPath).filter((file) => {
      return file.endsWith('.tgz');
    })[0];

    if (fileName) {
      installs += `dist/libs/${dir}/${fileName} `;
    }
  });
  // 安装当前组件 lib 库
  execSync(`npm install ${installs} --legacy-peer-deps`);

  // 将经上面处理过的 tsconfig.base.json 文件内容再写入
  fs.writeFileSync(baseTsConfigPath, JSON.stringify(baseTsConfigData, "", "\t"));
}

function configDemoThemes() {
  if (!isNeedThemesBuild()) {
    return;
  }

  const projectJsonPath = path.resolve(__dirname, `../src/${name}/demo/project.json`);
  const projectConfig = fs.readFileSync(projectJsonPath);
  const projectConfigData = JSON.parse(projectConfig);

  projectConfigData.targets.build.options.assets.push({
    "glob": "**/*",
    "input": "node_modules/@opentiny/ng-themes/",
    "output": "/assets/themes/"
  });
  fs.writeFileSync(projectJsonPath, JSON.stringify(projectConfigData, "", "\t"));
}

function buildDemo() {
  execSync(`ng build ${name}-demo`);
}

function reset() {
  const param = isNeedThemesBuild() ? ` ${name}` : '';
  execSync(`npm run resetpreview${param}`);
}

function serverDemo() {
  execSync(`npx live-server dist/apps/${name} --port=8020`);
}

function isNeedThemesBuild() {
  return name === 'utils' || name === 'ng'; // utils-demo 中的 theme 示例利用 TiTheme 在线切换主题样式文件
}


