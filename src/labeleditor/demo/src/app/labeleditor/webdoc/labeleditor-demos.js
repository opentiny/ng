export default {
  column: '2',
  demos: [
    {
      demoId: 'labeleditor-basic',
      name: {
        'zh-CN': '基础',
        'en-US': 'labeleditor basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>multiline</code>配置是多/单行文本编辑。</p>',
        'en-US': 'labeleditor basic'
      },
      apis: ['TiLabeleditorComponent.properties.multiline']
    },
    {
      demoId: 'labeleditor-maxline',
      name: {
        'zh-CN': '最大行数',
        'en-US': 'labeleditor maxline'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxline</code>配置最大行数，该属性只在<code>autoTip</code>为<code>true</code>时生效。</p>',
        'en-US': 'labeleditor maxline'
      },
      apis: ['TiLabeleditorComponent.properties.maxLine']
    },
    {
      demoId: 'labeleditor-autotip',
      name: {
        'zh-CN': '智能提示',
        'en-US': 'labeleditor autotip'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>autoTip</code>配置编辑完成状态时文本是否自动溢出并提示。</p>',
        'en-US': 'labeleditor autotip'
      },
      apis: ['TiLabeleditorComponent.properties.autoTip']
    },
    {
      demoId: 'labeleditor-icontipcontext',
      name: {
        'zh-CN': '图标提示为模板或组件',
        'en-US': 'labeleditor iconTipContext'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>iconTip</code>配置编辑文本图标提示内容；通过属性<code>iconTipContext</code>配置图标提示上下文。</p>',
        'en-US': 'labeleditor iconTipContext'
      },
      apis: ['TiLabeleditorComponent.properties.iconTip', 'TiLabeleditorComponent.properties.iconTipContext']
    },
    {
      demoId: 'labeleditor-maxlength',
      name: {
        'zh-CN': '文本长度',
        'en-US': 'labeleditor maxlength'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxlength</code>配置文本最大长度。</p>',
        'en-US': 'labeleditor maxlength'
      },
      apis: ['TiLabeleditorComponent.properties.maxlength']
    },
    {
      demoId: 'labeleditor-resize',
      name: {
        'zh-CN': '多行文本框调整大小',
        'en-US': 'labeleditor resize'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>resize</code>配置多行文本编辑框调整的方向，包含<code>both、none、vertical、horizontal</code>四种类型</p>',
        'en-US': 'labeleditor resize'
      },
      apis: ['TiLabeleditorComponent.properties.resize']
    },
    {
      demoId: 'labeleditor-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'labeleditor disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置禁用状态。</p>',
        'en-US': 'labeleditor disabled'
      },
      apis: ['TiLabeleditorComponent.properties.disabled']
    },
    {
      demoId: 'labeleditor-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'labeleditor events'
      },
      desc: {
        'zh-CN':
          '<p>当点击编辑图标时触发<code>editor</code>事件；当点击完成图标时触发<code>confirm</code>事件；当点击取消图标时触发<code>cancel</code>事件。</p>',
        'en-US': 'labeleditor events'
      },
      apis: ['TiLabeleditorComponent.events.editor', 'TiLabeleditorComponent.events.confirm', 'TiLabeleditorComponent.events.cancel']
    },
    {
      demoId: 'labeleditor-multiline-size',
      name: {
        'zh-CN': '多行文本框可设置宽高',
        'en-US': 'labeleditor multiline size'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>width</code>和<code>height</code>配置多行文本编辑框的宽高。</p>',
        'en-US': 'labeleditor multiline size'
      },
      apis: ['TiLabeleditorComponent.properties.width', 'TiLabeleditorComponent.properties.height']
    },
    {
      demoId: 'labeleditor-validation',
      name: {
        'zh-CN': '同步校验',
        'en-US': 'labeleditor validation'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>validation</code>配置校验相关信息，详见接口<code>TiValidationConfig</code>；通过属性<code>validationRules</code>配置校验规则。</p>',
        'en-US': 'labeleditor validation'
      },
      apis: [
        'TiLabeleditorComponent.properties.validation',
        'TiLabeleditorComponent.properties.validationRules',
        'TiValidationConfig.properties.errorMessage',
        'TiValidationConfig.properties.errorMessageWrapper',
        'TiValidationConfig.properties.passwordConfig',
        'TiValidationConfig.properties.tip',
        'TiValidationConfig.properties.tipMaxWidth',
        'TiValidationConfig.properties.tipPosition',
        'TiValidationConfig.properties.type'
      ]
    },
    {
      demoId: 'labeleditor-validation-async',
      name: {
        'zh-CN': '异步校验',
        'en-US': 'labeleditor validation async'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>asyncValidatorRules</code>配置单行文本编辑时异步校验规则。</p>',
        'en-US': 'labeleditor validation async'
      },
      apis: ['TiLabeleditorComponent.properties.asyncValidatorRules']
    }
  ]
};
