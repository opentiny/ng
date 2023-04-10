export default {
  column: '2',
  demos: [
    {
      demoId: 'loading-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>Loading 组件的最简用法。</p>',
        'en-US': '<p></p>'
      }
    },
    {
      demoId: 'loading-type',
      name: {
        'zh-CN': '加载类型',
        'en-US': 'Type'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>type</code>配置加载显示类型，包括<code>default</code>、<code>weak</code>。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiLoadingComponent.properties.type']
    },
    {
      demoId: 'loading-size',
      name: {
        'zh-CN': '大小',
        'en-US': 'Size'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>size</code>配置加载图标的大小，包括<code>small</code>、<code>middle</code>、<code>large</code>，支持直接配置值。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiLoadingComponent.properties.size']
    },
    {
      demoId: 'loading-area',
      name: {
        'zh-CN': '区域加载',
        'en-US': 'Area'
      },
      desc: {
        'zh-CN':
          '<p>通过配置属性<code>area</code>为<code>block</code>或<code>fullscreen</code>设置局部区域加载状态或全屏加载状态，通过配置<code>showMask</code>为<code>true</code>显示遮罩层，遮罩层会阻止交互。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiLoadingComponent.properties.area', 'TiLoadingComponent.properties.showMask']
    }
  ]
};
