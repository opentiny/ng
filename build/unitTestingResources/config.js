const path = require('path');
// 系统资源管理器分隔符，Windows 上是 \，POSIX 上是 /
const SEP = path.sep;
// 组件根目录相对路径
const ROOT_RELATIVE_PATH = `..${SEP}..${SEP}src`;
// 组件根目录绝对路径
const ROOT_RESOLVE_PATH = path.resolve(__dirname, ROOT_RELATIVE_PATH);
// 单测依赖模板相对路径
const RESOURCE_RELATIVE_PATH = `..${SEP}..${SEP}build${SEP}unitTestingResources`;
// 单测依赖模板绝对路径
const RESOURCE_RESOLVE_PATH = path.resolve(__dirname, RESOURCE_RELATIVE_PATH);
// 构建配置信息模板路径
const PROJECT_TEST_INFO_TEMPLATE = `${RESOURCE_RESOLVE_PATH}${SEP}project_test.json.template`;
// test.ts 模板路径
const TEST_TS_TEMPLATE = `${RESOURCE_RESOLVE_PATH}${SEP}test.ts.template`;
// karma.conf.js 模板路径
const KARMA_TEMPLATE = `${RESOURCE_RESOLVE_PATH}${SEP}karma.conf.js.template`;
// tsconfig.spec.json 模板路径
const TSCONFIG_SPEC_TEMPLATE = `${RESOURCE_RESOLVE_PATH}${SEP}tsconfig.spec.json.template`;
// 组件目录下的保留字
const ROOT_EXCLUDES = [
  'base',
  'browserslist',
  'datebase',
  'datedominator',
  'dateedit',
  'datepanel',
  'dominator',
  'drag',
  'drop',
  'droplist',
  'dropsearch',
  'environments',
  'grid',
  'imagepreview',
  'include',
  'list',
  'ng',
  'outline',
  'popconfirm',
  'popup',
  'progresspie',
  'renderer',
  'scroll',
  'themes',
  'utils',
  'zoom',
  'browserslist',
  'polyfills.ts',
  'styles.less',
  'tsconfig.lib.json',
  'tsconfig.lib.prod.json',
];

const CONFIG = {
  SEP,
  ROOT_RESOLVE_PATH,
  ROOT_EXCLUDES,
  PROJECT_TEST_INFO_TEMPLATE,
  TEST_TS_TEMPLATE,
  KARMA_TEMPLATE,
  TSCONFIG_SPEC_TEMPLATE
}

module.exports = CONFIG