/**
 * 该脚本用于自动化生成AppWcModules.ts文件、组件的md文件 js文件
 * 在根目录下，执行`npm run createfiles`命令即可生效
 * 如果有需要忽略的文件，使用ignore参数处理，例如：npm run createfiles --ignore button,alert
*/
const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
var argv = require('minimist')(process.argv.slice(2));
const ignoreComs = argv._;
const blackFiles = ['app.html', 'app.server.module.ts', 'AppComponent.ts', 'AppModule.ts',
'AppWcModule.ts', 'DemoModules.ts', 'IndexComponent.ts', 'NoneComponent.ts',
'app\\zoom', 'app\\vars', 'app\\datedominator', 'app\\dateedit','app\\tab-old',
'app\\droplist', 'app\\drop', 'app\\dominator', 'app\\drag',
'app\\list', 'app\\many', 'app\\tokens', 'table-row-drag1.html', 'app\\allcomp'
]; // 文件黑名单

const appDir = path.resolve(__dirname, '../src/app/'); // __dirname是当前模块的目录名

const filesList = [];
const selectors = [];
const importComs = [];


function isContain(fullPath, blackFiles) {
    let ans = false;
    for (let i = 0; i < blackFiles.length; i++) {
        if (fullPath.includes(blackFiles[i])) {
            ans = true;
            break;
        }
    }

    return ans;
}

function getFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir); // 返回一个指定目录下的数组对象。
  files.forEach((item, index) => {
    var fullPath = path.resolve(dir, item); // 将路径或路径片段的序列解析为绝对路径。给定的路径序列从右到左处理
    const stat = fs.statSync(fullPath); // 获取路径的<fs.Stats>
    if (stat.isDirectory()) {
        getFileList(fullPath, filesList); //递归读取文件
    } else {
        if (!isContain(fullPath, blackFiles) && fullPath.endsWith('.html')) {
            let pathArr = fullPath.split('\\');
            let appIndex = pathArr.indexOf('app');
            let compName = pathArr[appIndex + 1]; // 组件名称是app目录的下一层
            filesList.push({
                component: compName,
                path: pathArr.slice(appIndex + 1).join('/')
            });
        }
    }
  });

  return filesList;
}

function transform2CamelCase(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i];
        res.push(temp[0].toUpperCase() + temp.slice(1));
    }

    return res.join('');
}

function getSelectorAndComp(filesList) {
    filesList.forEach((item, index) => {
        let lastItem = item.path.split('/').slice(-1).join('');
        let temp = lastItem.replace('.html', '');
        let com = `${transform2CamelCase(temp.split('-'))}${'Component'}`

        let tempSelector = {
            selector: `\'${'website-tiny-'}${temp}\'`,
            component: com,
        };

        let pathArr= item.path.split('/');
        let dir = pathArr.slice(0, pathArr.length - 1).join('/');
        let tempData = `import { ${com} } from \'./${dir}/${com}\'`;

        importComs.push(tempData);
        selectors.push(tempSelector);
    })
}

const ejsConfig = {
    imports: {
        ejsFile: path.resolve(__dirname, './AppWcModule.ts.ejs'), // 模板文件
        file: path.resolve(__dirname, './autoAppWcModule.ts') // 生成的文件
    }
}

const generatorAppCode = () => {
    Object.keys(ejsConfig).forEach((key) => {
        ejs.renderFile(ejsConfig[key].ejsFile, {imports: importComs, WCS: selectors}, {}, function (err, str) {
            fs.writeFileSync(ejsConfig[key].file, str);
        });
    });
}
const copy = async () => {
    await fs.copy(
        path.resolve(__dirname, 'autoAppWcModule.ts'),
        path.resolve(__dirname, '../src/app/AppWcModule.ts')
    )

    fs.removeSync(path.resolve(__dirname, 'autoAppWcModule.ts'))
}

const componentejsConfig = {
    cn: {
        file: path.resolve(__dirname, './component.cn.ejs'), // 模板文件
    },
    en: {
        file: path.resolve(__dirname, './component.en.ejs'), // 模板文件
    },
    js: {
        file: path.resolve(__dirname, './component.ejs'), // 模板文件
    }
}

const deleteWebdoc = () =>  {
    const folderPath = path.resolve(__dirname, '../src/app/');
    filesList.forEach((item, index) => {
        if(ignoreComs[0]?.includes(item.component)) {
            return;
        }
        fs.remove(`${folderPath}/${item.component}/webdoc/`, ()=> {});
    });
}
const generatorComponentCode = () => {
    const folderPath = path.resolve(__dirname, '../src/app/');
    filesList.forEach((item, index) => {
        if(ignoreComs[0]?.includes(item.component)) {
            return;
        }
        fs.ensureDir(`${folderPath}/${item.component}/webdoc`, function (err) {
            const filePath = path.resolve(folderPath, `${item.component}/webdoc`);
            const pathMap = new Map([
                ['cn', path.resolve(filePath, `${item.component}.cn.md`)],
                ['en', path.resolve(filePath, `${item.component}.en.md`)],
                ['js', path.resolve(filePath, `${item.component}.js`)]]);
            Object.keys(componentejsConfig).forEach((key) => {
                ejs.renderFile(componentejsConfig[key].file, {}, {}, function (err, str) {
                    let filePath = pathMap.get(key);
                    if (!fs.existsSync(filePath)) {
                        fs.writeFileSync(filePath, str);
                    }
                });
            });
        });

    });
}

getFileList(appDir, filesList);
getSelectorAndComp(filesList);
generatorAppCode();
copy();
// deleteWebdoc(); // 删除webdoc中目录
generatorComponentCode();

