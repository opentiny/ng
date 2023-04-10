const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');

const rootPath = path.join(__dirname, '../src');
const ejsPath = path.join(__dirname, './libProject.json.ejs');
const compDirs = fs.readdirSync(rootPath);
const blackFiles = ['ng', 'themes'];

compDirs.forEach(dir => {
  if (blackFiles.includes(dir)) {
    return;
  }

  const dirPath = path.join(rootPath, `${dir}/lib`);
  if (fs.pathExistsSync(dirPath)) {
    ejs.renderFile(ejsPath, { libDir: dir }, {}, function (err, str) {
      fs.writeFileSync(path.join(dirPath, 'project.json'), str);
  });
  }
});