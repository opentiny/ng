const fs = require('fs-extra');
const path = require('path');
const log = require('fancy-log');

const baseDir = process.cwd();
const copyContent = {
  webdoc: ['../src/ng/demo/src/webdoc', './webdoc'],
  changelog: ['../CHANGELOG.md', './webdoc/changelog.md'],
  contributing: ['../CONTRIBUTING.md', './webdoc/contributing.md'],
  app: ['../dist/tinydoc/tinyapis', './app'],
  assets: ['../dist/apps/ng/assets', './scripts/assets'],
  wc: ['../dist/apps/ng/web-components.js', './scripts/web-components.js'],
  wcCss: ['../dist/apps/ng/styles.css', './scripts/styles.css'],
};

function copyFiles(content) {
  log('[notice]: 请确认是否已在根目录执行 `npm run build:docs` 生成文件');

  if (!content) {
    return;
  }

  Object.keys(content).forEach(async (key) => {
    console.log(key, baseDir);
    const [srcPath, distPath] = content[key].map((item) => path.resolve(baseDir, item));
    const distDir = path.dirname(distPath);
    log(`[copy ${key}]: ${srcPath} -> ${distPath}`);

    await fs.ensureDir(distDir);
    fs.copy(srcPath, distPath);
  });
}

copyFiles(copyContent);
