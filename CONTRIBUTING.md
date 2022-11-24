---
title: 贡献指南 | TinyNG
---

## 贡献指南

### Issue 规范

- Issue 仅用于提交 Bug 或 Feature 以及用户体验相关的内容，其它内容可能会被直接关闭。

- 在提交 Issue 之前，请搜索相关内容是否已被提出。

- 在提 Bug 时请说明清楚使用的 @opentiny/ng 的版本号及相关环境。

### Pull Request 规范

- 请先 fork 一份到自己的项目下，新建一个分支用于变更。

  ```bash
  git checkout -b my-branch master
  ```

- commit 信息请遵循 [commit rules](commit.template)。

- 提交 PR 前请先进行 rebase，确保 commit 记录的整洁。
  ```bash
  git rebase master -i
  git push -f
  ```

- 如果是修复 `bug` 或者 `issues`，请在 PR 中描述清楚。


### 开发

```bash

# fork && git clone
...
# my-branch
npm install 
npm start

```

### 代码规范
遵循 [ESLint](eslint-rules/)