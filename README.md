<p align="center">
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
- Internationalization support for 7 languages.

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

See [Getting Started](官网快速上手地址) for more details. 

## Development

```bash
$ git clone 代码仓 clone 地址
$ cd ng
$ npm install
$ npm start
```

Browser would open automatically.

## Changelog

Detailed changes for each release are documented in the [change logs](官网更新日志地址). 

## FAQ

We have collected some [frequently asked questions](官网常见问题地址). Before reporting an issue, please search if the FAQ has the answer to your problem.

## Contributing

We welcome all contributions. Please feel free to contribute code or discuss your idea.

Please read our [CONTRIBUTING.md](官网贡献指南地址) before submitting any ideas.

## LICENSE

[MIT](LICENSE)







