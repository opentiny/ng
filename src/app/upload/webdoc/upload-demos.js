export default {
  column: '2',
  demos: [
    {
      demoId: 'upload-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>Upload 组件的最简用法。通过属性<code>url</code>配置上传地址。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiUploadComponent.properties.url'],
    },
    {
      demoId: 'upload-button',
      name: {
        'zh-CN': '按钮类型',
        'en-US': 'Button Type',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>type</code>配置上传按钮的类型，包括<code>button</code>、<code>textButton</code>、<code>inputField</code>，通过属性<code>buttonText</code>配置按钮文字。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadComponent.properties.type',
        'TiUploadComponent.properties.buttonText',
      ],
    },
    {
      demoId: 'upload-props',
      name: {
        'zh-CN': '常用属性',
        'en-US': 'Used props',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>note</code>配置 note 信息；通过属性<code>errorMessage</code>配置文件上传失败的提示信息；通过属性<code>listMaxHeight</code>配置文件列表区域最大高度；通过属性<code>method</code>配置请求方式，包括<code>get</code>、<code>post</code>；通过属性<code>disabled</code>配置禁用状态；通过属性<code>showUploadList</code>配置是否显示文件列表，注意：不会隐藏初始文件；通过属性<code>showErrorMessage</code>配置是否在文件上传失败时显示提示信息；通过属性<code>initFiles</code>配置初始文件列表；</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadComponent.properties.note',
        'TiUploadComponent.properties.errorMessage',
        'TiUploadComponent.properties.listMaxHeight',
        'TiUploadComponent.properties.disabled',
        'TiUploadComponent.properties.showUploadList',
        'TiUploadComponent.properties.showErrorMessage',
        'TiUploadComponent.properties.initFiles',
      ],
    },
    {
      demoId: 'upload-custom',
      name: {
        'zh-CN': '自定义上传信息',
        'en-US': 'Used props',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>method</code>配置请求方式，包括<code>get</code>、<code>post</code>；通过属性<code>headers</code>配置上传时的头信息；通过属性<code>alias</code>配置上传文件字段唯一标识的键值；通过属性<code>formData</code>配置文件上传的附带信息；通过属性<code>formDataFirst</code>配置附带信息是否先于上传文件对象。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadComponent.properties.method',
        'TiUploadComponent.properties.alias',
        'TiUploadComponent.properties.headers',
        'TiUploadComponent.properties.formData',
        'TiUploadComponent.properties.formDataFirst',
      ],
    },
    {
      demoId: 'upload-filter',
      name: {
        'zh-CN': '条件过滤',
        'en-US': 'Filter',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>filter</code>配置文件过滤条件，通过事件<code>addItemFailed</code>处理不符合条件的文件，通过事件<code>addItemSuccess</code>处理符合条件的文件。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiUploadComponent.properties.filters'],
    },
    {
      demoId: 'upload-auto-upload',
      name: {
        'zh-CN': '手动上传',
        'en-US': 'Manual Upload',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>autoUpload</code>定义是否自动上传；通过上传实例的<code>upload</code>方法触发上传。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadComponent.properties.autoUpload',
        'TiUploadComponent.methods.upload',
      ],
    },
    {
      demoId: 'upload-batch-send',
      name: {
        'zh-CN': '合并上传',
        'en-US': 'Batch',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>batchSend</code>配置是否将所有文件上传任务合并为一次请求，默认状态会单独依次处理每个文件上传任务。仅适用于手动上传场景。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiUploadComponent.properties.batchSend'],
    },
    {
      demoId: 'upload-event',
      name: {
        'zh-CN': '常用事件',
        'en-US': 'Used events',
      },
      desc: {
        'zh-CN':
          '<p>通过事件<code>addItemFailed</code>配置添加文件失败事件回调；通过事件<code>addItemSuccess</code>配置添加文件成功事件回调；通过事件<code>beforeSendItems</code>配置发送文件前置事件回调，常用于上传前添加表单内容；通过事件<code>progressItems</code>配置发送文件过程事件回调；通过事件<code>successItems</code>配置发送文件成功事件回调；通过事件<code>errorItems</code>配置发送文件失败事件回调；通过事件<code>cancelItems</code>配置发送文件取消事件回调；通过事件<code>removeItems</code>配置删除文件事件回调；<code>completeItems</code>事件在文件上传后，不论成功或失败都必定被调用；<code>completeAllItems</code>事件在所有文件上传后，不论成功或失败都必定被调用。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadComponent.events.addItemFailed',
        'TiUploadComponent.events.addItemSuccess',
        'TiUploadComponent.events.beforeSendItems',
        'TiUploadComponent.events.progressItems',
        'TiUploadComponent.events.successItems',
        'TiUploadComponent.events.errorItems',
        'TiUploadComponent.events.cancelItems',
        'TiUploadComponent.events.beforeRemoveItems',
        'TiUploadComponent.events.removeItems',
        'TiUploadComponent.events.completeAllItems',
        'TiUploadComponent.events.completeItems',
      ],
    },
    {
      demoId: 'upload-service',
      name: {
        'zh-CN': '指令',
        'en-US': 'Directives',
      },
      desc: {
        'zh-CN':
          '<p>通过指令<code>tiFileSelect</code>定义上传实例对象；通过上传实例的<code>queue</code>属性访问文件信息及方法；通过属性<code>accept</code>配置文件类型，使用逗号分隔。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiFileSelectDirective.properties.tiFileSelect',
        'TiUploadComponent.properties.accept',
      ],
    },
    ,
    {
      demoId: 'upload-chunksize',
      name: {
        'zh-CN': '分片上传',
        'en-US': 'Chunk',
      },
      desc: {
        'zh-CN':
          '<p>通过接口<code>chunkSize</code>配置分片上传每片文件大小，单位是<code>b</code>；配置后对大于该值的文件开启分片上传。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadComponent.properties.chunkSize'
      ],
    },
  ],
};
