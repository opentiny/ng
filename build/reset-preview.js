/**
 * ng preview xxx-demo 命令所需。
 * 消除、还原在 preview-demo.js 执行后的影响。
 */
const path = require('path');
const fs = require('fs-extra');

// 还原对 tsconfig.base.json 文件中 compilerOptions.paths 的修改
resetTsBaseConfig();

// 还原对有在线切换主题样式功能的 demo(utils 和 ng)的 project.json assets 的修改
resetDemoProjectJson();

// TODO: 是否需要还原 ng preview xxx-demo 执行过程中 npm install tgz 文件产生的影响(比如，根目录下 package.json 文件)

function resetTsBaseConfig() {
  const baseTsConfigPath = path.resolve(__dirname, '../tsconfig.base.json');
  const baseTsConfig = fs.readFileSync(baseTsConfigPath);
  const baseTsConfigData = JSON.parse(baseTsConfig);

  // 还原在 preview-demo.js 中对 tsconfig.base.json 文件中 compilerOptions.paths 配置项的内容修改
  if (baseTsConfigData.paths_bak) {
    baseTsConfigData.compilerOptions.paths = baseTsConfigData.paths_bak;
    delete baseTsConfigData.paths_bak;
    fs.writeFileSync(baseTsConfigPath, JSON.stringify(baseTsConfigData, "", "\t"));
  }
}

function resetDemoProjectJson() {
  const args = process.argv;
  // 没有指定组件名称时不需处理
  if (args.length !== 3) {
    return;
  }
  const name = args[2];
  const projectJsonPath = path.resolve(__dirname, `../src/${name}/demo/project.json`);
  const projectConfig = fs.readFileSync(projectJsonPath);
  const projectConfigData = JSON.parse(projectConfig);

  if (projectConfigData.targets.build.options.assets.length > 3) {
    projectConfigData.targets.build.options.assets.pop();
    fs.writeFileSync(projectJsonPath, JSON.stringify(projectConfigData, "", "\t"));
  }
}

