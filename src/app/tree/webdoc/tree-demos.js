export default {
  column: '2',
  demos: [
    {
      demoId: 'tree-radioselect',
      name: {
        'zh-CN': '单选树',
        'en-US': 'tree radioselect',
      },
      desc: {
        'zh-CN': '<p>单选树的基本用法。</p>',
        'en-US': 'tree radioselect',
      },
      apis: ['TiTreeComponent.properties.data'],
    },
    {
      demoId: 'tree-multiselect',
      name: {
        'zh-CN': '多选树',
        'en-US': 'tree multiselect',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>multiple</code>配置是否为多选树。</p>',
        'en-US': 'tree multiselect',
      },
      apis: ['TiTreeComponent.properties.multiple'],
    },
    {
      demoId: 'tree-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'tree disabled',
      },
      desc: {
        'zh-CN':
          '<p>通过数据项的<code>disabled</code>属性配置树节点是否为禁用状态；10.1.3 版本到 10.1.14 版本父节点禁用，展开收起图标也禁用；10.1.15 版本及之后：父节点禁用，展开收起图标不禁用。</p>',
        'en-US': 'tree disabled',
      },
    },
    {
      demoId: 'tree-parentcheckable',
      name: {
        'zh-CN': '父节点是否支持选中',
        'en-US': 'tree parentcheckable',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>parentCheckable</code>配置多选树时父节点是否支持选中。</p>',
        'en-US': 'tree parentcheckable',
      },
      apis: ['TiTreeComponent.properties.parentCheckable'],
    },
    {
      demoId: 'tree-check-relation',
      name: {
        'zh-CN': '不关联父子节点',
        'en-US': 'tree check-relation',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>checkRelation</code>配置父子节点选中时是否具有关联关系。</p>',
        'en-US': 'tree check relation',
      },
      apis: ['TiTreeComponent.properties.checkRelation'],
    },
    {
      demoId: 'tree-changedbycheckbox',
      name: {
        'zh-CN': '只有点击checkbox能选中',
        'en-US': 'tree changedbycheckbox',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>changedByCheckbox</code>配置是否只有点击 checkbox 能选中树节点，仅为多选树时生效。</p>',
        'en-US': 'tree changedbycheckbox',
      },
      apis: ['TiTreeComponent.properties.changedByCheckbox'],
    },
    {
      demoId: 'tree-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'tree template',
      },
      desc: {
        'zh-CN':
          '<p>通过模板<code>item</code>配置树节点的内容。</p>',
        'en-US': 'tree template',
      },
      apis: ['TiTreeComponent.slots.itemTemplate'],
    },
    {
      demoId: 'tree-shortcutkey',
      name: {
        'zh-CN': '支持快捷键操作',
        'en-US': 'tree shortcutkey',
      },
      desc: {
        'zh-CN':
          '<p>支持快捷键操作；上下键：在同级的树节点移动，左右键：展开收起树节点及跨层级移动焦点，Enter 键或 Space 键：选中或取消当前焦点的树节点。</p>',
        'en-US': 'tree shortcutkey',
      },
    },
    {
      demoId: 'tree-drag',
      name: {
        'zh-CN': '支持拖拽',
        'en-US': 'tree drag',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>nodeDraggable</code>配置是否支持拖拽；当拖拽入目标树节点的时候触发<code>nodeDrop</code>事件。</p>',
        'en-US': 'tree drag',
      },
      apis: [
        'TiTreeComponent.properties.nodeDraggable',
        'TiTreeComponent.events.nodeDrop',
      ],
    },
    {
      demoId: 'tree-drag-beforedrop',
      name: {
        'zh-CN': '部分拖拽',
        'en-US': 'tree drag beforedrop',
      },
      desc: {
        'zh-CN':
          '<p>通过数据项的<code>draggable</code>属性配置当前树节点是否支持拖拽；当当前树节点将要拖拽入目标树节点的时候触发<code>beforeDrop</code>事件。</p>',
        'en-US': 'tree drag beforedrop',
      },
      apis: ['TiTreeComponent.events.beforeDrop', 'TiTreeDragNode'],
    },
    {
      demoId: 'tree-operate',
      name: {
        'zh-CN': '支持操作按钮',
        'en-US': 'tree operate',
      },
      desc: {
        'zh-CN':
          '<p>组件提供增加、编辑、删除三种悬浮操作按钮，分别通过数据项的<code>addable</code>、<code>editable</code>、<code>deleteable</code>属性控制；当点击增加按钮的时候触发<code>nodeAdded</code>事件，传递出去的树节点 <code>parent</code>属性；当点击编辑按钮的时候触发<code>nodeEdited</code>事件；当点击删除按钮的时候触发<code>nodeDeleted</code>事件。</p>',
        'en-US': 'tree operate',
      },
      apis: [
        'TiTreeComponent.events.nodeAdded',
        'TiTreeComponent.events.nodeEdited',
        'TiTreeComponent.events.nodeDeleted',
        'TiTreeComponent.events.afterNodeEdit',
        'TiTreeComponent.events.afterNodeAdd',
      ],
    },
    {
      demoId: 'tree-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'tree event',
      },
      desc: {
        'zh-CN':
          '<p>当选中树节点的时候触发<code>select</code>事件；当选中项发生改变的时候触发<code>change</code>事件；<code>expand</code>和<code>collapse</code>事件,当父节点展开时候触发<code>expand</code>事件；当父节点收起触发<code>collapse</code>事件。</p>',
        'en-US': 'tree event',
      },
      apis: [
        'TiTreeComponent.events.select',
        'TiTreeComponent.events.change',
        'TiTreeComponent.events.expand',
        'TiTreeComponent.events.collapse',
        'TiTreeNode',
      ],
    },
    {
      demoId: 'tree-before-expand',
      name: {
        'zh-CN': '异步请求',
        'en-US': 'tree before expand',
      },
      desc: {
        'zh-CN':
          '<p>当树节点将要展开的时候触发<code>beforeExpand</code>事件，一般用于异步数据获取，异步加载状态分为 loading(正在加载)、success(加载成功)、error(加载失败)三种状态。</p>',
        'en-US': 'tree before expand',
      },
      apis: [
        'TiTreeComponent.events.beforeExpand',
        'TiTreeComponent.methods.getBeforeExpandNode',
        'TiTreeComponent',
      ],
    },
    {
      demoId: 'tree-before-more',
      name: {
        'zh-CN': '分段加载数据',
        'en-US': 'tree before-more',
      },
      desc: {
        'zh-CN':
          '<p>当点击更多按钮的时候触发<code>beforeExpand</code>事件，一般用于大数据需要分段加载的场景。</p>',
        'en-US': 'tree before more',
      },
      apis: ['TiTreeComponent.events.beforeMore'],
    },
    {
      demoId: 'tree-search',
      name: {
        'zh-CN': '树搜索',
        'en-US': 'tree search',
      },
      desc: {
        'zh-CN': '<p>使用<code>searchbox</code>组件配合实现树搜索的场景。</p>',
        'en-US': 'tree search',
      },
      apis: ['TiTreeComponent.properties.highlightWords'],
    },
    {
      demoId: 'tree-small',
      name: {
        'zh-CN': '紧凑型',
        'en-US': 'tree small',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>small</code>配置树组件是否为紧凑型。</p>',
        'en-US': 'tree small',
      },
      apis: ['TiTreeComponent.properties.small'],
    },
    {
      demoId: 'tree-util',
      name: {
        'zh-CN': '公共方法',
        'en-US': 'tree util',
      },
      desc: {
        'zh-CN': '<p>树组件实现对树节点的增删查等操作的公共方法。</p>',
        'en-US': 'tree util',
      },
      apis: [
        'TiTreeUtil.methods.copy',
        'TiTreeUtil.methods.addNode',
        'TiTreeUtil.methods.deSelectNode',
        'TiTreeUtil.methods.expandNode',
        'TiTreeUtil.methods.getParentNode',
        'TiTreeUtil.methods.getSelectedData',
        'TiTreeUtil.methods.removeNode',
        'TiTreeUtil.methods.search',
        'TiTreeUtil.methods.selectNode',
        'TiTreeUtil.methods.traverse',
        'TiTreeUtil.methods.updateChecked',
      ],
    },
    {
      demoId: 'tree-virtualscroll',
      name: {
        'zh-CN': '虚拟滚动',
        'en-US': 'tree virtualscroll',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>virtual</code>配置是否开启虚拟滚动，虚拟滚动时需要设置高度。</p>',
        'en-US': 'tree virtualscroll',
      },
      apis: ['TiTreeComponent.properties.virtual'],
    },
  ],
};
