export default {
  column: '1',
  demos: [
    {
      demoId: 'layout-basic',
      name: {
        'zh-CN': '基本布局',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '',
        'en-US': '<p>basic</p>'
      },
      codeFiles: [
        'layout-basic.html',
        'LayoutBasicComponent.ts',
        'layout-basic.less'
      ]
    },
    {
      demoId: 'layout-single',
      name: {
        'zh-CN': '单列布局',
        'en-US': 'single'
      },
      desc: {
        'zh-CN': '',
        'en-US': '<p>single</p>'
      },
      codeFiles: [
        'layout-single.html',
        'LayoutSingleComponent.ts',
        'layout-simple.less'
      ]
    },
    {
      demoId: 'layout-multi-column',
      name: {
        'zh-CN': '多列布局',
        'en-US': 'multiColumn'
      },
      desc: {
        'zh-CN': '',
        'en-US': '<p>multiColumn</p>'
      },
      codeFiles: [
        'layout-multi-column.html',
        'LayoutMultiColumnComponent.ts',
        'layout-column.less'
      ]
    },
    {
      demoId: 'layout-basic-simple',
      name: {
        'zh-CN': '固定居中布局',
        'en-US': 'basic-simple'
      },
      desc: {
        'zh-CN': '<p>固定居中布局内容区宽度一直固定为<code>1192px</code>。</p>',
        'en-US': '<p>basic-simple</p>'
      },
      codeFiles: [
        'layout-basic-simple.html',
        'LayoutBasicSimpleComponent.ts',
        'layout-simple.less'
      ]
    },
    {
      demoId: 'layout-basic-simple-responsive',
      name: {
        'zh-CN': '响应式布局',
        'en-US': 'basic-simple-responsive'
      },
      desc: {
        'zh-CN':
          '<p>响应式布局内容区宽度自适应策略：<code>2560</code> ≥ 分辨率 > <code>1920</code> ，内容区宽度固定为<code>1832px</code>；<code>1920</code> ≥ 分辨率 ≥ <code>1280</code>，左右间距固定为 <code>20px</code>，内容区宽度自适应；分辨率 < <code>1280</code>时，显示不下则出滚动条。</p>',
        'en-US': '<p>basic-simple-responsive</p>'
      },
      apis: [
        'TiLayoutContentComponent.properties.responsive',
        'TiLayoutHeaderComponent.properties.responsive'
      ],
      codeFiles: [
        'layout-basic-simple-responsive.html',
        'LayoutBasicSimpleResponsiveComponent.ts',
        'layout-simple.less'
      ]
    },
  ],
}
