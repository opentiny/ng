/**
 * 基于 CompoDoc 导出的组件数据，提取组件 api
 * 使用方式：在根目录下，执行 `npm run build:api`
 * 如组件源码无变化，可使用 `npm run build:api -- --quick` 跳过 CompoDoc 导出
 */
const { execSync } = require('child_process');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const log = require('fancy-log');
const JSON5 = require('json5');
const minimist = require('minimist');

chalk.enabled = true;
chalk.level = 1;

const processArgvs = minimist(process.argv.slice(2));
const baseDir = process.cwd();
const compoDocJsonFile = path.resolve(baseDir, './dist/tiny3doc/documentation.json');
const docDir = path.resolve(baseDir, './src/app/');
const outputDocDir = path.resolve(baseDir, './dist/tiny3doc/tiny3apis/');
// 全局性的文档
const globalDocDir = ['interfaces', 'types'];
// 过滤的目录
const excludeDocDir = [
  'allcomp',
  'code',
  'datedominator',
  'dateedit',
  'dominator',
  'drag',
  'droplist',
  'drop',
  'imagepreview',
  'list',
  'many',
  'progresspie',
  'tab-old',
  'tokens',
  'utils',
  'vars',
  'webdoc',
  'zoom',
  // 接口和类型额外处理
  ...globalDocDir,
];

const TipsConfig = {
  exportJsonSuccess: 'CompoDoc 导出文档 JSON 成功',
  exportJsonFail: 'CompoDoc 导出文档 JSON 失败',
  copyDocFail: '拷贝源目录失败',
  getDemosDataFail: '获取组件 demos 数据失败',
  getDisplayApis: '解析 demos 数据获取需展示 apis 项',
  getApisFail: '提取下列 apis 内容失败',
  unExistedCodeFiles: 'CodeFiles 不存在',
  generateSuccess: '文档生成成功',
  generateFail: '文档生成失败',
};

const Logger = {
  types: {
    success: 'success',
    warn: 'warn',
    error: 'error',
  },

  colors: {
    success: 'green',
    warn: 'yellow',
    error: 'red',
  },

  log: (message) => {
    if (typeof message === 'object') {
      const { type = Logger.types.success, title = '', info = '' } = message;
      const color = Logger.colors[type];

      log(`${chalk[color](`[${title}]:`)} ${info}`);
    } else {
      log(message);
    }
  },
};

const Utils = {
  firstUpperCase: (str) => {
    return str.replace(/^\S/, (s) => s.toUpperCase());
  },

  hyphenToCamelCase: (str, isPascalCase) => {
    const ret = str.replace(/-(\w)/g, (match, $1) => {
      return $1.toUpperCase();
    });

    return isPascalCase ? Utils.firstUpperCase(ret) : ret;
  },

  convertListToMap: (list, key, lowerCaseKey) => {
    const map = new Map();

    list.forEach((item) => {
      map.set(lowerCaseKey ? item[key].toLowerCase() : item[key], item);
    });

    return map;
  },

  getTinyPathPrefix: (path) => {
    const reg = /^@cloud\/tiny3\/([components|directives|services]\/)?[\S]+\//;
    const match = path.match(reg);

    return match ? match[0] : '';
  },

  escape: (str) => {
    if (!str) {
      return str;
    }

    const replacements = {
      '<': '&lt;',
      '>': '&gt;',
    };

    return str.replace(/[<>]/g, (match) => replacements[match]);
  },
};

const DocItemType = {
  interface: 'interface',
  pipe: 'pipe',
  class: 'class',
  injectable: 'injectable',
  component: 'component',
  directive: 'directive',
  service: 'service',
  typealias: 'typealias',
};

/**
 * 处理 api 数据
 */
const ApiFormatter = {
  format: function (data) {
    // typealias 中字段为 subtype
    const { name, type, subtype } = data;
    const itemType = type || subtype;
    let ret = {};

    switch (itemType) {
      case DocItemType.interface:
      case DocItemType.pipe:
      case DocItemType.class:
      case DocItemType.injectable:
        ret = this.formatCommonElement(data);
        break;
      case DocItemType.component:
      case DocItemType.directive:
        ret = this.formatCompOrDirective(data);
        break;
      case DocItemType.typealias:
        ret = this.formatTypealias(data);
        break;
    }

    return {
      name,
      type: itemType === DocItemType.injectable ? DocItemType.service : itemType,
      ...ret,
    };
  },

  /**
   * 提取 typealias 的 api 数据
   */
  formatTypealias: function (data) {
    const { rawtype } = data;

    return {
      value: rawtype,
      desc: this.formatDescription(data),
    };
  },

  /**
   * 提取 interface | pipe | class | injectable 的 api 数据
   */
  formatCommonElement: function (data) {
    const { properties = [], methods = [] } = data;

    return {
      properties: this.formatApis(properties),
      methods: this.formatMethods(methods),
    };
  },

  /**
   * 提取 Components | Directive api 数据
   */
  formatCompOrDirective: function (data) {
    const { inputsClass = [], outputsClass = [], propertiesClass = [], methodsClass = [] } = data;

    return {
      properties: this.formatApis(inputsClass),
      events: this.formatApis(outputsClass),
      slots: this.getSlots(propertiesClass),
      methods: this.formatMethods(methodsClass),
    };
  },

  formatApis: function (data, itemFormatter) {
    if (!data || !data.length) {
      return;
    }

    return data.map((item) => (typeof itemFormatter === 'function' ? itemFormatter(item) : this.formatApiItem(item)));
  },

  formatApiItem: function (data) {
    const { name, defaultValue, type, jsdoctags } = data;
    const jsdocTags = this.formatJsdocTags(jsdoctags) || [];
    const customTypeTag = jsdocTags.find((item) => item.tagName === 'customType');
    // 优先级：jsdoc @customType > 代码中 type
    const outputType = customTypeTag ? customTypeTag.comment : Utils.escape(type);
    // 优先级：代码中默认值 > jsdoc 中默认值
    let outputDefault = Utils.escape(defaultValue);

    if (!outputDefault) {
      const defaultTag = jsdocTags.find((item) => item.tagName === 'default');

      if (defaultTag) {
        outputDefault = defaultTag.comment;
      }
    }

    return {
      name,
      type: outputType,
      defaultValue: outputDefault,
      desc: this.formatDescription(data),
    };
  },

  formatMethods: function (data) {
    return this.formatApis(data, this.formatMethodItem.bind(this));
  },

  formatMethodItem: function (data) {
    const { args, returnType } = data;
    const argsStr = `${args
      .map((arg) => {
        const { name, type, optional } = arg;
        return `${name}${optional ? '?' : ''}${type ? `: ${type}` : ''}`;
      })
      .join(', ')}`;
    const funcType = `(${argsStr}) => ${returnType ? returnType : 'void'}`;

    return {
      ...this.formatApiItem(data),
      type: Utils.escape(funcType),
    };
  },

  formatJsdocTags: function (data = []) {
    const ret = [];

    data.forEach((item) => {
      const { tagName = {}, comment = '' } = item;
      let text = tagName.escapedText;

      if (text === 'defaultvalue') {
        text = 'default';
      }

      if (text) {
        ret.push({
          tagName: text,
          comment: comment.replace(/\n/g, ''),
        });
      }
    });

    return ret;
  },

  /**
   * 描述数据，暂时用 name 作为英文描述
   */
  formatDescription: function (data) {
    const { name, description = '' } = data;

    return {
      'zh-CN': description.replace(/\n/g, '').replace(/\[([^\[\]]*)\]\{@link[^\{\}]*\}/g, (match, $1) => $1),
      'en-US': name,
    };
  },

  /**
   * 是否插槽属性
   */
  isSlotApi: function (prop) {
    const { decorators } = prop;
    const slotDecorators = ['ContentChild', 'ContentChildren'];

    return decorators && decorators.find((item) => slotDecorators.includes(item.name));
  },

  /**
   * props 中提取 slots
   */
  getSlots: function (props) {
    return this.formatApis(props.filter((prop) => this.isSlotApi(prop)));
  },
};

/**
 * 解析 compocDoc 导出的 json，获取组件 api 数据
 */
function getDocData() {
  const isQuickMode = processArgvs.quick;
  const isFileExisted = fs.existsSync(compoDocJsonFile);

  if (!isQuickMode) {
    fs.removeSync(compoDocJsonFile);
  }

  if (!isQuickMode || !isFileExisted) {
    Logger.log(`${chalk.green.bold('======> CompoDoc 导出文档 JSON 中，稍等一小会...')}`);
    execSync('npx compodoc --exportFormat json');

    if (fs.existsSync(compoDocJsonFile)) {
      Logger.log({
        title: TipsConfig.exportJsonSuccess,
        info: `path -> ${compoDocJsonFile}`,
      });
    } else {
      Logger.log({
        type: Logger.types.error,
        title: TipsConfig.exportJsonFail,
        info: '请执行 `npx compodoc --exportFormat json` 检查',
      });

      return;
    }
  }

  const docJson = fs.readJSONSync(compoDocJsonFile, { encoding: 'utf8' });
  const { components = [], directives = [], interfaces = [], injectables = [], classes = [], pipes = [] } = docJson;
  const key = 'name';

  return {
    ...docJson,
    componentMap: Utils.convertListToMap(components, key),
    directiveMap: Utils.convertListToMap(directives, key),
    serviceMap: Utils.convertListToMap(injectables, key),
    interfaceMap: Utils.convertListToMap(interfaces, key),
    pipeMap: Utils.convertListToMap(pipes, key),
    classMap: Utils.convertListToMap(classes, key),
  };
}

/**
 * 获取组件文档文件夹列表
 */
function getDocDirList() {
  return fs.readdirSync(docDir).filter((file) => {
    const filePath = path.resolve(docDir, file);
    const stat = fs.statSync(filePath);

    return !excludeDocDir.includes(file) && stat.isDirectory();
  });
}

/**
 * 根据 demos 中配置的 apis 字段，获取需要展示的文档元素(Components, Directives, etc.)
 */
function getDisplayDocItems(demosData) {
  if (!demosData) {
    return;
  }

  const { displayApis = [], demos = [] } = demosData;
  const ret = [...displayApis];

  demos.forEach((demo) => {
    const { apis } = demo;
    if (!apis || !apis.length) {
      return;
    }

    apis.forEach((item) => {
      // 取第一段
      const name = item.split('.')[0];
      ret.push(name);
    });
  });

  return [...new Set(ret)];
}

/**
 * apis 增加 demoId 字段
 */
function appendDemoIdToApis(demos, apis) {
  if (!demos || !apis) {
    return;
  }

  const apisMap = new Map();
  const demosMap = new Map();

  // 收集 demo 下 apis 字段
  demos.forEach((demo) => {
    const { apis: demoApis, demoId } = demo;
    if (!demoApis || !demoApis.length) {
      return;
    }

    demoApis.forEach((item) => {
      if (!demosMap.get(item)) {
        demosMap.set(item, demoId);
      }
    });
  });

  if (!demosMap.size) {
    return;
  }

  // 转成 map 如：{ 'TiButtonComponent.properties.disabled': {} }
  apis.forEach((api) => {
    const { name } = api;
    const keys = ['properties', 'events', 'slots', 'methods'];

    keys.forEach((key) => {
      const item = api[key];
      if (!item) {
        return;
      }

      item.forEach((subItem) => {
        apisMap.set(`${name}.${key}.${subItem.name}`, subItem);
      });
    });
  });

  // 打上 demoId
  demosMap.forEach((val, key) => {
    const target = apisMap.get(key);

    if (target) {
      Object.assign(target, {
        demoId: val,
      });
    }
  });
}

/**
 * demos 增加 tag 和 codeFiles 数据, 如果已手动填写，以手动填写为准。
 * 自动生成规则：
 * demoId = 'button-color' => tag: `website-tiny-button-color`, codeFiles: ['button-color.html', 'ButtonColorComponent.ts']
 */
function appendMetaToDemos(demos) {
  demos.forEach((demo, idx) => {
    const { demoId, tag, codeFiles } = demo;

    if (!demoId) {
      return;
    }

    const addedMeta = {
      tag: tag || `website-tiny-${demoId}`.toLowerCase(),
      codeFiles: codeFiles || [`${demoId}.html`, `${Utils.hyphenToCamelCase(demoId, true)}Component.ts`],
    };

    demos[idx] = {
      ...demo,
      ...addedMeta,
    };
  });
}

/**
 * 类型打上锚点链接
 */
function appendLinkToType(apis = [], linkMap = {}) {
  const urlPrefix = '/tiny-ng/components';
  const ownApiList = apis.map((item) => item.name);
  const itemList = [];

  apis.forEach((api) => {
    const keys = ['properties', 'events', 'slots', 'methods'];

    keys.forEach((key) => {
      const list = api[key];

      if (list) {
        itemList.push(...list);
      }
    });
  });

  itemList.forEach((item) => {
    const keys = ['type', 'defaultValue'];

    keys.forEach((key) => {
      const str = item[key];

      if (!str) {
        return;
      }

      item[key] = str.replace(/Ti[A-Za-z]+/g, (name) => {
        let href = '';

        if (ownApiList.includes(name)) {
          href = `#${name}`;
        } else if (linkMap[name]) {
          href = `${urlPrefix}/${linkMap[name]}#${name}`;
        }

        return href ? `<a href="${href}">${name}</a>` : name;
      });
    });
  });
}

/**
 * 检查 demos 是否符合规范
 */
function validDemos(demos, dir) {
  demos.forEach((demo) => {
    const { codeFiles, demoId } = demo;

    if (!codeFiles || !codeFiles.length) {
      return;
    }

    const dirPath = path.resolve(docDir, `./${dir}/`);
    const unExistedFiles = codeFiles.filter((file) => !fs.existsSync(`${dirPath}/${file}`));

    if (unExistedFiles.length) {
      Logger.log({
        type: Logger.types.warn,
        title: TipsConfig.unExistedCodeFiles,
        info: `demoId: ${demoId} 下 codeFiles: ${unExistedFiles.join(' ')} 不存在, 请检查 demoId 和示例文件是否正确！`,
      });
    }
  });
}

/**
 * 获取组件 demos 数据，文件为 `${组件目录名}-demos.js`
 */
function getDemosData(dir) {
  const demosFile = path.resolve(docDir, `./${dir}/webdoc/${dir}-demos.js`);
  let data;

  if (!fs.existsSync(demosFile)) {
    return {
      message: `Demos 文档不存在, 请补充 ${dir}-demos.js!`,
    };
  }

  const demosFileStr = fs.readFileSync(demosFile, { encoding: 'utf8' });
  const match = demosFileStr
    // 兼容 demo.js 中字符串模板
    .replace(/[\n\r\t]\s*/g, '')
    .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (str) => {
      return str.replace(/^`(.*)`$/, ($0, $1) => `"${$1.trim()}"`);
    })
    .match(/(?![\s\S]*export\s*default[\s\S]*){[\s\S]*}/);

  try {
    data = match && JSON5.parse(match[0]);
  } catch (err) {
    return {
      message: `JSON.parse 失败, ${err}`,
    };
  }

  if (typeof data === 'object') {
    return { data };
  } else {
    return {
      message: `${dir}-demo.js 无有效数据！`,
    };
  }
}

/**
 * 过滤组件中不需要显示的 apis
 */
function filterApis(apiData, ignoreApis = []) {
  if (!ignoreApis.length) {
    return apiData;
  }

  const ret = { ...apiData };
  const { name } = ret;
  const keys = ['properties', 'events', 'slots', 'methods'];

  keys.forEach((key) => {
    const list = ret[key];

    if (!list || !list.length) {
      return;
    }

    ret[key] = list.filter((item) => {
      const { name: attrName } = item;
      const attrKey = `${name}.${key}.${attrName}`;

      return !ignoreApis.includes(attrKey);
    });
  });

  return ret;
}

/**
 * 获取组件 apis 数据
 * types 统一放到单独页面，displayItems 中的 types 不会呈现在组件文档中
 */
function getApisData(docData, displayItems, ignoreApis = []) {
  const ret = [];
  // interface | class 无命名规则
  const reg = /^(?:\w)+(component|directive|service|pipe)$/i;

  displayItems.forEach((name) => {
    const match = name.match(reg);
    const type = match && match[1].toLowerCase();
    let apiData;

    if (type) {
      const key = `${type}Map`;
      apiData = docData[key] && docData[key].get(name);
    } else {
      const { classMap, interfaceMap } = docData;
      apiData = classMap.get(name) || interfaceMap.get(name);
    }

    if (apiData) {
      const formattedData = filterApis(ApiFormatter.format(apiData), ignoreApis);

      ret.push(formattedData);
    }
  });

  return ret;
}

/**
 * 获取 interfaces & types
 */
function getInterfacesAndTypes(docData) {
  const { interfaces = [], miscellaneous = {} } = docData;
  const { typealiases = [] } = miscellaneous;
  const formatList = (list) => list.map((item) => ApiFormatter.format(item));

  return {
    interfaces: formatList(interfaces),
    types: formatList(typealiases),
  };
}

/**
 * 拷贝文档源目录到 dist, 只复制文件夹部分
 */
async function copyDocDirToDist() {
  await fs.remove(outputDocDir);
  const dirList = await fs.readdir(docDir);

  return Promise.all(
    dirList.map(async (dir) => {
      const filePath = `${docDir}/${dir}`;
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        return fs.copy(filePath, `${outputDocDir}/${dir}`);
      }
    })
  );
}

/**
 * 全局性文档( interfaces & types )数据
 */
function getGlobalDocData(docDirList = [], docData) {
  const globalData = getInterfacesAndTypes(docData);

  return docDirList.map((dir) => {
    const apisData = globalData[dir];

    return {
      dir,
      apisData,
    };
  });
}

function handleDatas(docDirList, docData, types) {
  return docDirList.map((dir) => {
    // 收集处理过程中的 log 信息，生成文件时再输出
    const logs = [];
    const { data: demosData, message } = getDemosData(dir);
    if (!demosData) {
      logs.push({
        type: Logger.types.error,
        title: TipsConfig.getDemosDataFail,
        info: message,
      });
      return { dir, logs };
    }

    const displayItems = getDisplayDocItems(demosData) || [];
    const hasDisplayItems = displayItems.length;

    if (hasDisplayItems) {
      logs.push({
        title: TipsConfig.getDisplayApis,
        info: `${displayItems.join(' ')}`,
      });
    } else {
      logs.push({
        type: Logger.types.warn,
        title: TipsConfig.getDisplayApis,
        info: `需展示 apis 项为空，请检查 ${dir}-demos.js 下 apis 字段是否填写正确！`,
      });
    }

    // ignoreApis 用于过滤组件中的某个属性、方法等
    const { ignoreApis } = demosData;
    const apisData = hasDisplayItems ? getApisData(docData, displayItems, ignoreApis) : [];

    if (apisData.length < displayItems.length) {
      const list = apisData.map((item) => item.name);
      // types 统一放到单独页面，不会呈现在组件文档，不提示不存在
      const unExistedItems = displayItems.filter((item) => !list.includes(item) && !types.includes(item));

      if (unExistedItems.length) {
        logs.push({
          type: Logger.types.warn,
          title: TipsConfig.getApisFail,
          info: `${unExistedItems.join(' ')}, 请检查是否存在或被 ignore !`,
        });
      }
    }
    return { dir, logs, demosData, apisData };
  });
}


/**
 * 普通组件文档数据
 */
function getCompsDocData(docDirList = [], docData, globalDocData = []) {
  // 收集 interface & type name 列表
  const globalApiList = globalDocData.reduce((acc, cur) => {
    const { dir, apisData = [] } = cur;
    const list = apisData.map((item) => item.name);
    acc[dir] = list;
    return acc;
  }, {});
  const { types = [] } = globalApiList;

  return handleDatas(docDirList, docData, types);
}

/**
 * 获取组件、指令等等和目录的对应关系
 */
function getLinkMap(data) {
  if (!data || !data.length) {
    return;
  }

  const linkMap = {};

  data.forEach((item) => {
    const { dir, apisData } = item;

    if (!apisData || !apisData.length) {
      return;
    }

    apisData.forEach((item) => {
      const { name } = item;

      // 以第一个收集到的为准
      if (!linkMap[name]) {
        linkMap[name] = dir;
      }
    });
  });

  return linkMap;
}

/**
 * 写入组件文档 js
 */
function writeDocFile(json, dir) {
  const outputWebdocPath = path.resolve(outputDocDir, `./${dir}/webdoc/`);
  const apiFilePath = `${outputWebdocPath}/${dir}.js`;
  const apisJsonStr = JSON5.stringify(json, {
    space: 2,
    quote: '"',
  });

  // 删除 output 下的不需要的 demos js
  fs.remove(`${outputWebdocPath}/${dir}-demos.js`);
  fs.ensureDirSync(outputWebdocPath);
  // 改为同步，log 信息不会乱
  try {
    fs.writeFileSync(apiFilePath, `export default ${apisJsonStr}`);

    Logger.log({
      title: TipsConfig.generateSuccess,
      info: `path -> ${apiFilePath}`,
    });
  } catch (err) {
    Logger.log({
      type: Logger.types.error,
      title: TipsConfig.generateFail,
      info: err,
    });
  }
}

function dealAllDocData(allDocData) {
  // 收集组件、指令等等和目录的对应关系，处理锚点用
  const linkMap = getLinkMap(allDocData);
  const defaultData = {
    column: 2,
  };
  allDocData.forEach((item) => {
    const { dir, logs = [], demosData, apisData } = item;
    const isCompDocDir = !globalDocDir.includes(dir);
    const apisKey = dir === 'types' ? 'types' : 'apis';

    Logger.log(`${chalk.green.bold(`======> ${dir} 文档生成中...`)}`);

    // 输出处理数据时收集的 logs
    logs.forEach((item) => Logger.log(item));

    // 一般组件文档
    if (isCompDocDir) {
      if (!demosData) {
        Logger.log({
          type: Logger.types.error,
          title: TipsConfig.generateFail,
          info: `${dir} demos 数据获取失败！`,
        });

        return;
      }

      const { demos = [] } = demosData;

      // apis 数据增加 demoId
      appendDemoIdToApis(demos, apisData);
      // demos 数据增加 tag & codeFiles 字段
      appendMetaToDemos(demos);
      // 检查 demos 下的 codefiles 是否存在
      validDemos(demos, dir);
    }

    // 类型打锚点
    appendLinkToType(apisData, linkMap);

    const json = {
      ...(isCompDocDir ? { ...defaultData, ...demosData } : {}),
      [apisKey]: apisData,
    };

    writeDocFile(json, dir);
  });
}

/**
 * 生成 api 文档
 */
async function generateApiDoc() {
  const docData = getDocData();
  if (!docData) {
    return;
  }

  Logger.log(`${chalk.green.bold('======> 组件文档生成中...')}`);

  try {
    await copyDocDirToDist();
  } catch (err) {
    Logger.log({
      type: Logger.types.error,
      title: TipsConfig.copyDocFail,
      info: err,
    });

    return;
  }

  // interface & type 文档
  const globalDocData = getGlobalDocData(globalDocDir, docData);
  // 一般组件文档
  const docDirList = getDocDirList();
  const compsDocData = getCompsDocData(docDirList, docData, globalDocData);
  const allDocData = [...globalDocData, ...compsDocData];

  dealAllDocData(allDocData)
}

generateApiDoc();
