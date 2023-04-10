export default {
  column: '2',

  demos: [
    {
      demoId: 'tagsinput-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '<p>TagsInput 组件的最简用法。</p>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.suggestions', 'TiTagsInputComponent.properties.placeholder']
    },
    {
      demoId: 'tagsinput-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.disabled']
    },
    {
      demoId: 'tagsinput-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events'
      },
      desc: {
        'zh-CN': '<p>当元素内容发生变化的时候触发<code>ngModelChange</code>事件。</p>',
        'en-US': 'tagsinput events description'
      }
    },
    {
      demoId: 'tagsinput-labelkey',
      name: {
        'zh-CN': '显示文本',
        'en-US': 'labelkey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置显示文本的键值。</p>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.labelKey']
    },
    {
      demoId: 'tagsinput-panelwidth',
      name: {
        'zh-CN': '下拉面板宽度',
        'en-US': 'panelwidth'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelWidth</code>配置下拉面板宽度，包含<code>auto</code>、<code>justified</code>、<code>string</code>三种类型。</p>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.panelWidth']
    },
    {
      demoId: 'tagsinput-valid',
      name: {
        'zh-CN': '校验',
        'en-US': 'tagsinput validation'
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'tagsinput-valuekey',
      name: {
        'zh-CN': '绑定值为基础类型',
        'en-US': 'valuekey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>valueKey</code>配置绑定值为基础类型的值。</p>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.valueKey']
    },
    {
      demoId: 'tagsinput-separators',
      name: {
        'zh-CN': '自动分词',
        'en-US': 'separators'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>separators</code>配置自动分词的分隔符，试着粘贴下<code>中文 Chinese,法语 French|泰文</code>。</>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.separators']
    },
    {
      demoId: 'tagsinput-reactive',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'reactive-form'
      },
      desc: {
        'zh-CN': '<p>响应式表单的基本用法。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'tagsinput-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'template'
      },
      desc: {
        'zh-CN': '<p>通过<code>#item</code>配置下拉面板中选项的模板。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'tagsinput-maxlength',
      name: {
        'zh-CN': '允许的最大字符数',
        'en-US': 'maxlength'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxlength</code>配置输入框中允许的最大字符数。</p>',
        'en-US': ''
      },
      apis: ['TiTagsInputComponent.properties.maxlength']
    }
  ]
};
