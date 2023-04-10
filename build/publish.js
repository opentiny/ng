/**
 * 发布 ng 全量组件或单个组件。
 * 在 lib 的 project.json 文件中的 publish 中使用。
 * 调用使用方式：在根目录下，执行 `ng publish xxx`。
 */
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv;
if (args.length !== 4) {
  console.log('请输入组件名');
  return;
}

// 组件名
const compDir = args[2];
// tag信息
const tag = args[3].slice(6);

if (compDir === 'ng') {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../dist/libs'));
  dirs.forEach(dir => {
    publishFile(dir);
  });
} else {
  publishFile(compDir);
}


function publishFile(dir) {
  const baseDir = path.resolve(__dirname, `../dist/libs/${dir}`);
  if (!fs.pathExistsSync(baseDir)) {
    return;
  }

  const files = fs.readdirSync(baseDir);
  const tgzFile = files.filter((file) => {
      return file.endsWith('.tgz');
  })[0];

  if (!tgzFile) {
    return;
  }

  // 没有 tag 信息时
  if (tag === 'undefined') {
    try {
      console.log(`npm publish dist/libs/${dir}/${tgzFile} --access public`);
      // execSync(`npm publish dist/libs/${dir}/${tgzFile} --access public`); // 实际发布时 publish 命令
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      console.log(`npm publish dist/libs/${dir}/${tgzFile} --access public --tag ${tag}`);
      // execSync(`npm publish dist/libs/${dir}/${tgzFile} --access public --tag ${tag}`); // 实际发布时 publish 命令
    } catch (error) {
      console.log(error);
    }
  }
}



