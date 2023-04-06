export default {
  column: '1',

  demos: [
    {
      demoId: 'icon-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'icon-basic',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>name</code>配置要显示的图标。</p>',
        'en-US': '<p>basic</p>',
      },
      apis: ['TiIconComponent.properties.name'],
    },
    {
      demoId: 'icon-show',
      name: {
        'zh-CN': '所有图标',
        'en-US': 'icon-show',
      },
      desc: {
        'zh-CN': '<p></p>',
        'en-US': '<p>basic</p>',
      },
    },
    {
      demoId: 'svg-setpath',
      name: {
        'zh-CN': '非本组件库图标',
        'en-US': 'svg-setpath',
      },
      desc: {
        'zh-CN':
          '<p>使用非本组件库图标时，采用 HTTP 请求的策略，需要在项目模块(建议在根模块)中引入<code>HttpClientModule</code>。本示例以使用 ionicons 图标库中的图标为例，参考如下步骤:<br />（1）<code>npm i iconicons</code><br />（2）配置 angular.json，让安装到 node_modules 里的图标转移到 assets<br /> <code> { <br /> "glob": "**/*"<br /> "input": "node_modules/ionicons/dist/ionicons/svg",<br />"output": "/assets/ionicons/"<br /> }</code> <br />（3）在 ts 文件中使用<code>setPath</code>方法配置图标路径</p>',
        'en-US': '<p>setpath</p>',
      },
      apis: ['TiSvgComponent.methods.setPath'],
    },
  ],
};
