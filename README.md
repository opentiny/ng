<p align="center">
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <a href="">
    <img width="230" src="logo.png" alt="logo 图片">
  </a>
</p>

<h1 align="center">
TinyNG
</h1>

<div align="center">

An enterprise-class Angular UI component library.

</div>

English | [简体中文](README-zh_CN.md)

## Features

- 70+ high-quality Angular components out of the box.
- Support OnPush mode.
- Use TypeScript.
- Powerful theme customization with CSS variables.
- Internationalization support for 5 languages.

## Environment Support

* Angular `^14.0.0`
* Modern browsers

| Edge | Firefox | Chrome | Safari |
| --------- | --------- | --------- | --------- |
| last 3 versions | last 3 versions | last 3 versions | last 2 versions |

## Installation


```bash
$ npm install @opentiny/ng
```

## Usage

Import the component modules you want to use into your module files.

```ts
import { TiButtonModule } from '@opentiny/ng';

@NgModule({
  imports: [ TiButtonModule ]
})
export class AppModule {
}
```

And import style file link in `angular.json`.

```diff
{
  "styles": [
+    "node_modules/@opentiny/ng/themes/styles.css",
+    "node_modules/@opentiny/ng/themes/theme-default.css",
  ]
}
```

See [Getting Started](https://www.opentiny.design/tiny-ng/docs/getstart) for more details. 

## Development

```bash
$ git clone 代码仓 clone 地址
$ cd ng
$ npm install
$ npm start
```

Browser would open automatically.

## Changelog

Detailed changes for each release are documented in the [change logs](CHANGELOG.md). 

## FAQ

We have collected some [frequently asked questions](https://www.opentiny.design/tiny-ng/docs/faq). Before reporting an issue, please search if the FAQ has the answer to your problem.

## Contributing

We welcome all contributions. Please feel free to contribute code or discuss your idea.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) before submitting any ideas.

## LICENSE

[MIT](LICENSE)








## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/HappyJun0331"><img src="https://avatars.githubusercontent.com/u/110035681?v=4?s=100" width="100px;" alt="HappyJun0331"/><br /><sub><b>HappyJun0331</b></sub></a><br /><a href="https://github.com/opentiny/ng/commits?author=HappyJun0331" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!