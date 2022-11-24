const fs = require('fs-extra');
const log = require('fancy-log');

const version = require('../package.json').version;

let type;
let name;
if (process.env.npm_config_component) {
    type = 'component';
    name = process.env.npm_config_component;
}
if (process.env.npm_config_directive) {
    type = 'directive';
    name = process.env.npm_config_directive;
}
if (!type) {
    return;
}

function firstUpper(value) {
  return value[0].toUpperCase() + value.slice(1);
}

const pathName = '@opentiny/ng';  // 目录名
const dir = `${pathName}/${type}s/${name}`;
const prefixName = 'ti';  // 组件前缀名
const prefixNameUpper = firstUpper(prefixName);  // 组件前缀名首字母大写
let componentDeclare = '';

const typeUpper = firstUpper(type);

const nameUpper = firstUpper(name);

function createFile(name, content) {
  const filePath = `./${dir}/${name}`;
  fs.createFileSync(filePath);
  if(content) {
      fs.writeFileSync(filePath, content, 'utf-8');
  }
  log(`create ${name} success`);
}

function generateComponent(name, componentClass) {
  return `import { ${typeUpper} } from '@angular/core';
@${typeUpper}({
  ${componentDeclare}
})

export class ${componentClass} {}\r\n`
}

function generateModule(componentModule, componentClass) {
  return `import { NgModule } from '@angular/core';
import { ${componentClass} } from './${componentClass}';

@NgModule({
exports: [${componentClass}],
declarations: [${componentClass}]
})

export class ${componentModule} {}

export { ${componentClass} } from './${componentClass}';\r\n`
}

if (type === 'component') {
    // 5.生成html文件
    createFile(`${name}.html`);

    // 6. 生成less文件
    createFile(`${name}.less`);
    componentDeclare = `selector: '${prefixName}-${name}',
    templateUrl: '${name}.html'`
} else {
    componentDeclare = `selector: '[${prefixName}${nameUpper}]'`;
}

// 1.生成component.ts
const componentClass = `${prefixNameUpper}${nameUpper}${typeUpper}`;
createFile(`${componentClass}.ts`, generateComponent(name, componentClass));

// 2.生成module.ts
const componentModule = `${prefixNameUpper}${nameUpper}Module`;
createFile(`${componentModule}.ts`, generateModule(componentModule, componentClass));
