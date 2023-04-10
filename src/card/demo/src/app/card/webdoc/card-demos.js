export default {
  column: '1',
  demos: [
    {
      demoId: 'card-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'card',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>active</code>配置卡片是否为激活状态，通过属性<code>disabled</code>配置卡片是否为禁用状态。',
        'en-US': '<p>card</p>',
      },
      apis: [
        'TicardComponent.properties.active',
        'TicardComponent.properties.disabled'
      ]
    },
    {
      demoId: 'card-add',
      name: {
        'zh-CN': '可添加的卡片',
        'en-US': 'card add',
      },
      desc: {
        'zh-CN': '<p><code>ti-card-add</code>是一种特殊的<code>ti-card</code>，用于卡片添加的入口。',
        'en-US': '<p>card add</p>',
      },
      apis: [
        'TiCardAddComponent.properties.active',
        'TiCardAddComponent.properties.disabled',
        'TiCardAddComponent.events.add'
      ]
    },
    {
      demoId: 'card-header',
      name: {
        'zh-CN': '卡片头部',
        'en-US': 'card header',
      },
      desc: {
        'zh-CN': '<p>通过组件<code>ti-card-header</code>配置卡片头部。</p>',
        'en-US': '<p>card header</p>',
      },
      apis: [
        'TiCardAddComponent.properties.active',
        'TiCardAddComponent.properties.disabled'
      ]
    },
    {
      demoId: 'card-grid',
      name: {
        'zh-CN': '栅格布局固定列',
        'en-US': 'card grid',
      },
      desc: {
        'zh-CN': '<p>使用栅格布局需要导入<code>TiGridModule</code>模块，根据栅格体系，自适应依据规范定义的四种分辨率 xs：1280~1439【1280、1366】， sm:1440~1599【1440】，md:1600~1759【1680】, lg: 1760~1920【1920】，通过不同的样式类设置子元素的宽度，使用 ti-row 定义一行，使用 ti-col-xs-[num] 设置一行所所占的比。</p>',
        'en-US': '<p>card icon</p>',
      }
    },
    {
      demoId: 'card-grid2',
      name: {
        'zh-CN': '栅格布局自适应',
        'en-US': 'card grid2',
      },
      desc: {
        'zh-CN':
          '<p>使用栅格布局需要导入<code>TiGridModule</code>模块，ti-col-xs-12 样式类设置 1440 以下屏幕分辨率一张卡片所占的宽度，一行显示 2 张卡片，ti-col-sm-8 样式类设置 1440~1599 屏幕分辨率一张卡片所占的宽度，一行显示 3 张卡片，ti-col-md-6 样式类设置 1600~1759 屏幕分辨率一张卡片所占的宽度，一行显示 4 张卡片，ti-col-lg-4 样式类设置 1760~1920 屏幕分辨率一张卡片所占的宽度，一行显示 6 张卡片。</p>',
        'en-US': '<p>card grid2</p>',
      }
    }
  ],
};
