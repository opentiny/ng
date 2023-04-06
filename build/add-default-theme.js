const fs = require('fs-extra');
const path = require('path');

const baseDir = process.cwd();
const basicVarListPath = path.resolve(baseDir, './build/basicVarList.json');
const baseVarPath = path.resolve(baseDir, './src/themes/basic/basic-var.css');
const writeFileArr = ['.less']; // 需要插入的文件后缀
const args = process.argv;
const filePath = args[2] === 'themes' ? `${args[2]}/basic` : `${args[2]}/lib/src`;
const fullPath = path.resolve(baseDir, `./src/${filePath}`);

// 备份lib内容
try {
  if (fs.pathExistsSync(fullPath)) {
    fs.copySync(fullPath, path.resolve(baseDir, `./src_bak/${filePath}`));
    console.log('copy success');
  }
} catch (error) {
  console.log(error);
}

// 将basic-var.css转换成basicVar对象
const getBasicVar = () => {
  const baseList = []; // 直接使用的变量集合
  const varList = []; // 使用 var 的队列
  const calcBaseValue = 4; // 使用 calc 的基础值
  const reg = /(\-\-ti\-\b(common|base)\b(.+?))(?=;)/g;
  const baseVar = fs.readFileSync(baseVarPath, "utf8").match(reg);
  for (let i = 0; i < baseVar.length; i++) {
    const item = baseVar[i];
    const [key, value] = item.split(':');
    if (item.match(/\b(calc)\b/)) {
      // 这里计算一下通过 calc 的特殊值
      const value = parseInt(item.match(/[0-9]+/)[0]) * calcBaseValue + 'px';
      baseList.push({ key: key.trim(), value: value.trim() });
    } else if (item.match(/\b(var)\b/)) {
      varList.push({ key: key.trim(), value: value.trim() });
    } else {
      baseList.push({ key: key.trim(), value: value.trim() })
    }
  }
  while (varList?.length) {
    const item = varList.shift();
    const replacedObj = baseList.find(i => item.value.indexOf(i.key) !== -1);
    if (replacedObj) {
      baseList.unshift({ key: item.key, value: replacedObj.value }); // 这里添加到数组第二轮循环开始优先查找这些变量
    }
  }
  return baseList;
}

// 将basicvar数据保存在./build/basicVarList.json
const writeBasicVarData = () => {
  try {
    fs.writeFileSync(basicVarListPath, JSON.stringify(getBasicVar()))
  } catch (err) {
    console.log(err);
  }
}

// 读取basicVar数据
const getBasicVarList = (path) => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.log(err);
  }
}

if (!fs.pathExistsSync(basicVarListPath)) {
  writeBasicVarData();
}
const basicVarList = JSON.parse(getBasicVarList(basicVarListPath));

const readFiles = (filePath) => {
  if (fs.pathExistsSync(filePath)) {
    const readDir = fs.readdirSync(filePath);
    for (let i = 0; i < readDir.length; i++) {
      const curDir = `${filePath}/${readDir[i]}`
      const stat = fs.statSync(curDir);
      if (stat.isDirectory()) {
        readFiles(curDir);
      }
      if (stat.isFile()) {
        const isWrite = writeFileArr.some(file => curDir.endsWith(file));
        if (isWrite) {
          addDefaultVar(curDir);
        }
      }
    }
  }
}

// 读取less并在var函数中添加默认值
const addDefaultVar = (path) => {
  const reg = /(?<=var\()(\-\-ti\-\b(common|base)\b(.+?))(?=\))/g;
  const addDefaultVal = fs.readFileSync(path, "utf-8").replace(reg, (str) => {
    const val = str.split(',')[0];
    const defVal = basicVarList.find(item => item.key === val);
    return defVal && `${defVal.key}, ${defVal.value}`;
  });
  console.log(`当前文件 ${path} 需要插入; 正在插入中...`);
  fs.writeFileSync(path, addDefaultVal, 'utf-8');
}

readFiles(fullPath);
