const fs = require('fs-extra');

const args = process.argv;
const filePath = args[2] === 'themes' ? `${args[2]}/basic` : `${args[2]}/lib/src`;
try {
  if(fs.pathExistsSync(`./src_bak/${filePath}`)) {
    fs.copySync(`./src_bak/${filePath}`, `./src/${filePath}`);
    fs.removeSync(`./src_bak/${args[2]}`);
  }
} catch (error) {
  console.log(error);
}