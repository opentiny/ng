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
      demoId: 'icon-setpath',
      name: {
        'zh-CN': '引入外部图标',
        'en-US': 'icon-setpath',
      },
      desc: {
        'zh-CN': '<p>通过 <code>setPath</code> 方法配置外部图标的 HTTP 请求路径。</p>',
        'en-US': '<p>setpath</p>',
      },
    },
  ],
};
