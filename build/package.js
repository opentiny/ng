const path = require('path');
const fs = require('fs-extra');
const log = require('fancy-log');
const wcSrc = './dist/apps/ng';

function read(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(path.resolve(fileName), (err, str) => {
      if (err)
        rej(err);
      res(str);
    });
  })
}

function write(fileName, outFile) {
  return new Promise((res, rej) => {
    fs.writeFile(path.resolve(fileName), outFile, (err) => {
      if (err)
        return rej(err);
      return res(outFile);
    });
  });
}
function concatFile(files) {
  return new Promise((res, rej) => {
    return Promise.all(files.map(read))
      .then(src => {
        return res(src.join('\n'))
      })
      .catch(rej);
  });
}

function concat(files, outFile) {
  return new Promise((res, rej) => {
    const concated = concatFile(files);
    if (outFile) {
      concated.then((out) => write(outFile, out)
        .then(res)
        .catch(rej)).catch(rej);
    }
    else {
      concated.then(res).catch(rej);
    }
  });
}

const package = async () => {
  const files = [
    `${wcSrc}/runtime.js`,
    `${wcSrc}/polyfills.js`,
    `${wcSrc}/main.js`,
  ];

  try {
    await concat(files, `${wcSrc}/web-components.js`);
  } catch (e) {
    log(e);
  }
};

package();
