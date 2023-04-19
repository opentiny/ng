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
- Internationalization support for 5 languages.

## Environment Support

* Angular `>=13.0.0`
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







