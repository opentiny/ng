export default {
  column: '2',
  demos: [
    {
      demoId: 'avatar-size',
      name: {
        'zh-CN': '尺寸',
        'en-US': 'avatar size',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>size</code>配置头像的尺寸，包括 xl、large、middle（默认）、small、xs 五种类型，也可以使用 string 类型自定义。</p>',
        'en-US': '<p>avatar size</p>',
      },
      apis: [
        'TiAvatarComponent.properties.size'
      ],
    },
    {
      demoId: 'avatar-shape',
      name: {
        'zh-CN': '形状',
        'en-US': 'avatar shape',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>shape</code>配置头像的形状，包括 circle（默认）、square 两种类型。</p>',
        'en-US': '<p>avatar shape</p>',
      },
      apis: [
        'TiAvatarComponent.properties.shape'
      ],
    },
    {
      demoId: 'avatar-image',
      name: {
        'zh-CN': '图像类头像',
        'en-US': 'avatar image',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>imgSrc</code>配置图像类头像，也可以同时配置<code>text</code>属性使文字悬浮于图片上，当图片加载不成功时出发回调。</p>',
        'en-US': '<p>avatar type</p>',
      },
      apis: [
        'TiAvatarComponent.properties.imgSrc',
        'TiAvatarComponent.properties.imgAlt',
        'TiAvatarComponent.properties.text'
      ],
    },
    {
      demoId: 'avatar-text',
      name: {
        'zh-CN': '文本类头像',
        'en-US': 'avatar text',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>text</code>配置文本类头像，根据用户输入的字自动调整文本大小。</p>',
        'en-US': '<p>avatar type</p>',
      },
      apis: [
        'TiAvatarComponent.properties.text'
      ],
    },
    {
      demoId: 'avatar-style',
      name: {
        'zh-CN': '自定义样式',
        'en-US': 'avatar style',
      },
      desc: {
        'zh-CN': '<p>通过原生属性<code>style</code>配置头像的样式。</p>',
        'en-US': '<p>avatar style</p>',
      },
      apis: [
      ],
    },
  ],
};
