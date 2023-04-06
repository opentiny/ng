const fs = require('fs');
const path = require('path');
const reg = /(?<=import.*from\s*')[@a-zA-z/-]+/g;
const dirList = fs.readdirSync('../src');
const ignoreComs = ['ng', 'themes', 'environments', 'browserslist'];
console.log(dirList);
dirList.forEach(dir => {
  if (ignoreComs.indexOf(dir) === -1 && fs.statSync(path.join(__dirname, '../src', dir)).isDirectory()) {
    const libDir = path.join(__dirname, '../src', dir, 'lib/src');
    const dependenciesArr = [];
    readFile(libDir, dependenciesArr);
    updatePackage(libDir, dependenciesArr);
  }
})
function readFile(dir, dependenciesArr) {
  const dirList = fs.readdirSync(dir);
  dirList.forEach((file) => {
    const fileDir = path.join(dir, file);
    if (fs.statSync(fileDir).isDirectory()) {
      readFile(fileDir,dependenciesArr);
    } else if (file.endsWith('ts')) {
      getDependencies(fileDir, dependenciesArr);
    }
  });
}
function getDependencies(file, dependenciesArr) {
  const data = fs.readFileSync(file, 'utf-8').match(reg);
  if (data) {
    dependenciesArr.splice(-1, 0, ...data);
  }
}
function updatePackage(libDir, dependenciesArr) {
  const dir = path.join(libDir, '../package.json');
  const dependenciesSet = Array.from(new Set(dependenciesArr));
  const data = JSON.parse(fs.readFileSync(dir, 'utf-8'));
  data.peerDependencies = createObj(dependenciesSet, '>=13.0.0');
  fs.writeFileSync(dir, JSON.stringify(data, null, '  '));
}
function createObj(arr, version) {
  const obj = {};
  arr.forEach((i) => {
    if(i.startsWith('@angular')){
    obj[i] =  '>=13.0.0';

    }else{
       obj[i] =  '~1.0.0';

    }
  });
  return obj;
}
