const fs = require('fs-extra');
const path = require('path');
const log = require('fancy-log');

const baseDir = process.cwd();
const copyContent = {
  webdoc: ['../../src/webdoc', './webdoc'],
  changelog: ['../../CHANGELOG.md', './webdoc/changelog.md'],
  contributing: ['../../CONTRIBUTING.md', './webdoc/contributing.md'],
  app: ['../../dist/tiny3doc/tiny3apis', './app'],
  assets: ['../../dist/tiny3doc/tiny3demo/assets', './scripts/assets'],
  wc: ['../../dist/tiny3doc/tiny3demo/web-components.js', './scripts/web-components.js'],
  wcCss: ['../../dist/tiny3doc/tiny3demo/styles.css', './scripts/styles.css'],
};

function copyFiles(content) {
  log('[notice]: 请确认是否已在根目录执行 `npm run build:docs` 生成文件');

  if (!content) {
    return;
  }

  Object.keys(content).forEach(async (key) => {
    const [srcPath, distPath] = content[key].map((item) => path.resolve(baseDir, item));
    const distDir = path.dirname(distPath);
    log(`[copy ${key}]: ${srcPath} -> ${distPath}`);

    await fs.ensureDir(distDir);
    fs.copy(srcPath, distPath);
  });
}

copyFiles(copyContent);
