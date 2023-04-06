// 处理用户输入参数，获取目标组件名
const ARGS = process.argv;
if (ARGS.length !== 3) {
  throw new TypeError('请输入要初始化的组件名称！');
  return;
}
const TARGET_COMPONENT = process.argv[2];

// 遍历 src/ 目录，获取所有组件名称
const { SEP, ROOT_RESOLVE_PATH : ROOT, ROOT_EXCLUDES, KARMA_TEMPLATE, TEST_TS_TEMPLATE, TSCONFIG_SPEC_TEMPLATE, PROJECT_TEST_INFO_TEMPLATE } = require('./unitTestingResources/config');
const fs = require('fs');
const ALL_COMPONENTS = fs.readdirSync(ROOT);

// 处理非法的组件名
if (ROOT_EXCLUDES.includes(TARGET_COMPONENT)) {
  throw new RangeError(`${TARGET_COMPONENT} 是保留组件，不提供单测能力！`);
  return;
}
if (!ALL_COMPONENTS.includes(TARGET_COMPONENT)) {
  throw new ReferenceError(`未能找到 ${TARGET_COMPONENT}！`);
  return;
}

// 处理已经初始化过的组件名
const DEMO_ROOT = `${ROOT}${SEP}${TARGET_COMPONENT}${SEP}demo`;
const DEMO_FILES = fs.readdirSync(DEMO_ROOT);
if (DEMO_FILES.includes('karma.conf.js')) {
  console.log(`${TARGET_COMPONENT} 的单元测试环境已经初始化，请直接新建或修改脚本。`);
  return;
}

// 写入 test.ts
fs.copyFileSync(TEST_TS_TEMPLATE, `${DEMO_ROOT}${SEP}test.ts`)
// 写入 karma.conf.js
fs.copyFileSync(KARMA_TEMPLATE, `${DEMO_ROOT}${SEP}karma.conf.js`)
// 写入 tsconfig.spec.json
fs.copyFileSync(TSCONFIG_SPEC_TEMPLATE, `${DEMO_ROOT}${SEP}tsconfig.spec.json`)

// 修改 project.json
const CURRENT_PROJECT = `${DEMO_ROOT}${SEP}project.json`
fs.open(CURRENT_PROJECT, 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
    } else {
      throw err;
    }
  } else {
    let project_test_content = fs.readFileSync(PROJECT_TEST_INFO_TEMPLATE, 'utf8')
    let project_content = fs.readFileSync(CURRENT_PROJECT, 'utf8')
    project_content = project_content.substring(0, project_content.length - 4).concat(project_test_content.replaceAll('##component##', TARGET_COMPONENT))
    fs.writeFileSync(CURRENT_PROJECT, project_content)
  }
});