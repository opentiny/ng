export default {
  column: '1',
  demos: [
    {
      demoId: 'table-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p><code>Table</code>组件的最简用法。</p>',
        'en-US': '',
      },
      apis: [
        'TiTableComponent.properties.srcData',
        'TiTableComponent.properties.displayedData',
      ],
    },
    {
      demoId: 'table-nodata',
      name: {
        'zh-CN': '空表格',
        'en-US': 'nodata',
      },
      desc: {
        'zh-CN':
          '<p>通过给<code>tr</code>标签上添加<code>ti3-table-nodata</code>样式类，在<code>td</code>标签上使用<code>tiColspan</code>属性指令配置表格数据为空时的状态。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-small',
      name: {
        'zh-CN': '紧凑型',
        'en-US': 'samll',
      },
      desc: {
        'zh-CN':
          '<p>通过给<code>ti-table</code>标签上添加<code>ti3-table-small</code>样式类配置为紧凑型表格。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-cell-tip',
      name: {
        'zh-CN': '带提示的省略',
        'en-US': 'cell ellipsis',
      },
      desc: {
        'zh-CN': `<p>通过使用<code>tiOverflow</code>属性指令使文本内容根据单元格宽度自动省略显示，并在鼠标悬浮时弹出完整内容提示，具体可查看 <a href='./overflow'>Overflow</a> 属性指令示例及
                   API。<br/>需导入：<code>import { TiOverflowModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-pagination',
      name: {
        'zh-CN': '分页',
        'en-US': 'pagination',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-pagination</code>组件实现分页功能，具体可查看 <a href='./pagination'>Pagination</a> 组件示例及 API。<br/>需导入：<code>
                  import { TiPaginationModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-sort',
      name: {
        'zh-CN': '排序',
        'en-US': 'sort',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-head-sort</code>组件(可点击的排序图标)和<code>ti-cell-text</code>组件(表头单元格文本)实现对某一列数据的排序功能。通过<code>ti-head-sort</code>组件的
                  属性<code>sortKey</code>配置该列排序时依据的数据属性，属性<code>asc</code>配置初始默认是否为升序，属性<code>compareFn</code>配置自定义排序规则函数。</p>`,
        'en-US': '',
      },
      apis: [
        'TiHeadSortComponent.properties.sortKey',
        'TiHeadSortComponent.properties.asc',
        'TiHeadSortComponent.properties.compareFn',
      ],
    },
    {
      demoId: 'table-sort-reset',
      name: {
        'zh-CN': '可控的排序',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-table</code>组件实例上<code>getDataState</code>方法的返回值对象中的<code>sort</code>属性控制当前的排序状态，其中<code>sort.sortKey</code>配置当前排序
                  的列，<code>sort.asc</code>配置是否为升序。</p>`,
        'en-US': '',
      },
      apis: [
        'TiHeadSortComponent.properties.sortKey',
        'TiHeadSortComponent.properties.asc',
        'TiHeadSortComponent.properties.compareFn',
      ],
    },
    {
      demoId: 'table-search',
      name: {
        'zh-CN': '搜索',
        'en-US': 'search',
      },
      desc: {
        'zh-CN': `<p>通过属性<code>searchWords</code>配置需被检索的字符串的集合；通过属性<code>searchKeys</code>配置搜索的字段范围；通过属性<code>searchStrictKeys</code>配置其
                  中哪些字段是精确匹配(等于)的。</p>`,
        'en-US': '',
      },
      apis: [
        'TiTableComponent.properties.searchWords',
        'TiTableComponent.properties.searchKeys',
        'TiTableComponent.properties.searchStrictKeys',
      ],
    },
    {
      demoId: 'table-server-pagi-search-sort',
      name: {
        'zh-CN': '远程加载数据',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>使用<code>Promise</code>简单模拟从服务端请求异步数据，具有分页、排序和搜索功能以及数据加载 loading 效果，开发者可接入实际从服务端获取数据的方式。设置属性
                  <code>srcData.state.paginated</code>为 true 来指定由服务端分页；设置属性<code>srcData.state.sorted</code>为 true 来指定由服务端排序；设置属性
                  <code>srcData.state.searched</code>为 true 来指定由服务端搜索。分页、排序和搜索状态改变时会触发<code>stateUpdate</code>回调，在该时机通过其参数的
                  <code>getDataState</code>方法获取服务端需要的参数后，向服务端发送请求获取数据。<br/>使用分页功能需导入：<code>import { TiPaginationModule } from '@opentiny/ng';
                  </code></p>`,
        'en-US': '',
      },
      apis: [
        'TiTableComponent.properties.srcData',
        'TiTableComponent.events.stateUpdate',
        'TiTableComponent.methods.getDataState',
      ],
    },
    {
      demoId: 'table-head-filter',
      name: {
        'zh-CN': '筛选-单选/多选菜单',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-head-filter</code>组件(筛选的漏斗图标)和<code>ti-cell-text</code>组件(表头单元格文本)来实现表头筛选功能。<code>ti-head-filter</code>组件提供筛选
                  条件的选择能力和筛选的时机，筛选的数据处理逻辑需自行控制。</p>`,
        'en-US': '',
      },
      apis: [
        'TiHeadFilterComponent.properties.multiple',
        'TiHeadFilterComponent.properties.selectAll',
        'TiHeadFilterComponent.properties.labelKey',
        'TiHeadFilterComponent.properties.panelWidth',
        'TiHeadFilterComponent.properties.options',
        'TiHeadFilterComponent.properties.searchable',
        'TiHeadFilterComponent.properties.panelAlign',
        'TiHeadFilterComponent.properties.virtual',
        'TiHeadFilterComponent.events.select',
        'TiHeadFilterComponent.slots.itemTemplate',
      ],
    },
    {
      demoId: 'table-head-filter-datetime',
      name: {
        'zh-CN': '筛选-时间日期菜单',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p><code>ti-head-filter</code>组件提供筛选条件的选择能力和筛选的时机，筛选的数据处理逻辑需自行控制。通过属性<code>isDatetime</code>配置为时间日期菜单；通过属性
                  <code>datetimeConfig</code>设置时间日期菜单中的配置信息。</p>`,
        'en-US': '',
      },
      apis: [
        'TiHeadFilterComponent.properties.isDatetime',
        'TiHeadFilterComponent.properties.datetimeConfig',
        'TiHeadFilterComponent.properties.panelAlign',
        'TiHeadFilterComponent.events.select',
      ],
    },
    {
      demoId: 'table-radio',
      name: {
        'zh-CN': '单行选择',
        'en-US': 'radio',
      },
      desc: {
        'zh-CN': `<p>通过<code>tiRadio</code>组件实现单行选择的功能，具体可查看 <a href='./radio'>Radio</a> 组件示例及 API。另外，需要在选择列的<code>th</code>和<code>td</code>
                 上添加<code>radio-column</code>属性，在<code>tr</code>上使用<code>ti3-selected-tr</code>样式类，选择列的<code>td</code>上使用<code>ti3-disabled-cell</code>样式类。
                 <br/>需导入：<code>import { TiRadioModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-checkbox',
      name: {
        'zh-CN': '多行选择',
        'en-US': 'checkbox',
      },
      desc: {
        'zh-CN': `<p>通过<code>tiCheckgroup</code>组件和<code>tiCheckitem</code>组件实现多行选择的功能，具体可查看 <a href='./checkgroup'>Checkgroup</a> 组件示例及 API。另外，需要在选择列的
                 <code>th</code>和<code>td</code>上添加<code>checkbox-column</code>属性，在<code>tr</code>上使用<code>ti3-selected-tr</code>样式类，选择列的<code>td</code>上使用
                 <code>ti3-disabled-cell</code>样式类。<br/>需导入：<code>import { TiCheckboxModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-checkbox-pagination-headmenu',
      name: {
        'zh-CN': '扩展多行选择全选菜单',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>表头的全选复选框默认选中/清空当前页数据，可通过<code>ti-head-menu</code>组件扩展多行选择全选菜单，添加选择所有数据和清空所有数据的菜单项。<code>ti-head-menu</code>
                  组件默认有 '选择所有' 和 '清空所有' 这两个菜单项，可以通过属性<code>options</code>自定义菜单项。<br/>使用分页功能需导入：<code>import { TiPaginationModule } from '@opentiny/ng';
                  </code><br/>使用多行选择功能需导入：<code>import { TiCheckboxModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
      apis: [
        'TiHeadMenuComponent.properties.options',
        'TiHeadMenuComponent.events.select',
      ],
    },
    {
      demoId: 'table-details',
      name: {
        'zh-CN': '可展开',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-details-icon</code>组件、<code>tiDetailsTr</code>结构指令和<code>tiColspan</code>属性指令实现展开功能。另外，需要在展开图标列的<code>th</code>和<code>td</code>上
                  添加<code>details-icon-column</code>属性，在展开的行里的元素使用<code>ti3-table-detail-container</code>样式类。</p>`,
        'en-US': '',
      },
      apis: [
        'TiDetailsIconComponent.properties.row',
        'TiDetailsIconComponent.properties.index',
        'TiDetailsTrDirective.properties.tiDetailsTr',
      ],
    },
    {
      demoId: 'table-dynamic-details',
      name: {
        'zh-CN': '可控的展开',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>当展开或收起时会触发<code>ti-details-icon</code>组件的<code>beforeToggle</code>事件，开发者可在该时机使用行数据的<code>showDetails</code>属性来控制是否展开及展开的时间点。</p>',
        'en-US': '',
      },
      apis: [
        'TiDetailsIconComponent.properties.row',
        'TiDetailsIconComponent.properties.index',
        'TiDetailsTrDirective.properties.tiDetailsTr',
        'TiDetailsIconComponent.events.beforeToggle',
      ],
    },
    {
      demoId: 'table-details-nesttable',
      name: {
        'zh-CN': '嵌套子表格',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>在展开的行里嵌入表格，注意嵌入的表格组件需自己定义，可以给嵌入的表格组件里的<code>ti-table</code>标签上添加<code>ti3-table-nest</code>样式类。</p>',
        'en-US': '',
      },
      apis: [
        'TiTableComponent.properties.closeOtherDetails',
        'TiDetailsIconComponent.properties.row',
        'TiDetailsIconComponent.properties.index',
        'TiDetailsTrDirective.properties.tiDetailsTr',
      ],
    },
    {
      demoId: 'table-cols-toggle',
      name: {
        'zh-CN': '列设置',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-cols-toggle</code>组件和<code>ti-table</code>组件上的属性<code>columns</code>实现列设置功能。通过属性<code>columns</code>配置所有列数据，
                 在<code>th</code>和<code>td</code>上利用每列数据中的<code>show</code>属性值设置<code>ngIf</code>来控制列的显示/隐藏，<code>ti-cols-toggle</code>组件需
                 要放在<code>ti-table</code>元素内部，具体呈现位置布局由开发者自行控制。</p>`,
        'en-US': '',
      },
      apis: [
        'TiTableComponent.properties.columns',
        'TiColsToggleComponent.properties.searchable',
        'TiColsToggleComponent.properties.selectAll',
      ],
    },
    {
      demoId: 'table-cols-resizable',
      name: {
        'zh-CN': '拖拽调整列宽',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过在<code>ti-table</code>组件上使用<code>tiColsResizable</code>属性指令和属性<code>columns</code>实现拖拽调整列宽的功能。另外，<code>table</code>元素需要一个
                  带有<code>ti3-resize-wrapper</code>样式类的父容器。如果要使某一列不能拖拽调整列宽，可以给该列表头的<code>th</code>标签上添加<code>not-resizable</code>属性。</p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-fixed-head',
      name: {
        'zh-CN': '固定表头',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过双表实现固定表头功能，实际显示的表头(第一个表格)在带有样式类<code>ti3-table-fixed-head</code>的容器里，表体(第二个表格)在带有样式类<code>ti3-table-container</code>的容器里。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-column-fixed',
      name: {
        'zh-CN': '固定列',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过在<code>th</code>标签上使用<code>tiColumnFixed</code>属性指令实现固定前后列的功能。通过属性<code>tiColumnFixed</code>配置是固定的左右位置。另外，<code>table</code>
                  元素需要一个带有<code>ti3-resize-wrapper</code>的父容器。</p>`,
        'en-US': '',
      },
      apis: ['TiColumnFixedDirective.properties.tiColumnFixed'],
    },
    {
      demoId: 'table-columnfixed-headfixed',
      name: {
        'zh-CN': '固定头和列',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>同时固定头和列，适合同时有大量列和数据的展示。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-col-align',
      name: {
        'zh-CN': '对齐方式',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>单元格内容默认左对齐，可直接在单元格中使用<code>text-align</code>样式设置居中或右对齐。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-rowspan',
      name: {
        'zh-CN': '行/列合并',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>像<code>W3C</code>标准<code>table</code>一样，使用<code>colspan</code>和<code>rowspan</code>合并行/列。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-virtualscroll',
      name: {
        'zh-CN': '虚拟滚动',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>结合<code>@angular/cdk/scrolling</code>实现虚拟滚动。虚拟滚动是和固定表头功能搭配使用的，在有<code>ti3-table-container</code>样式类的元素标签(第二个表格的父容器)
                 上使用属性<code>itemSize</code>设置每行数据占据的高度，并且给其设置最大高度或高度，另外在<code>div.ti3-table-container > table > tbody > tr</code>上用
                 <code>cdkVirtualFor</code>结构指令替换原有的<code>ngFor</code>。<br/>需导入：<code>import { ScrollingModule } from '@angular/cdk/scrolling';</code></p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-actionmenu',
      name: {
        'zh-CN': '操作列',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>通过<code>ti-actionmenu</code>组件实现最后一列操作列，具体可查看 <a href='./actionmenu'>Actionmenu</a> 组件示例及 API。<br/>需导入：<code>
                  import { TiActionmenuModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-editrow',
      name: {
        'zh-CN': '可编辑行',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>自由编辑行内容，开发者可以参照该示例根据自己需求自由定制表格的行编辑功能。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-editall',
      name: {
        'zh-CN': '可编辑表格',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>自由编辑表格全部内容，开发者可以参照该示例根据自己需求自由定制表格的编辑功能。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-row-drag2',
      name: {
        'zh-CN': '行拖拽排序',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>使用<code>H5</code>的拖拽能力。在<code>dragstart</code>事件中获取当前拖拽元素起始下标，<code>dragover</code>事件中获取拖拽终止下标，<code>drop</code>
                 事件中根据拖拽起始和终止下标操作移动数据。</p>`,
        'en-US': '',
      },
    },
    {
      demoId: 'table-tree',
      name: {
        'zh-CN': '深度确定的树形数据展示',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>深度确定的树形数据可利用树形结构的<code>HTML</code>展示，开发者可以参照该示例根据自己需求自由展示树形数据。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-tree-unknowdeepth',
      name: {
        'zh-CN': '深度不确定的树形数据展示',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>深度不确定的树形数据，将其转换成扁平化数据之后再展示，本示例中提供了树形结构与扁平化数据之间的转换函数，实际业务中请根据需求修改。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'table-storage',
      name: {
        'zh-CN': '排序、分页和列宽状态缓存',
        'en-US': '',
      },
      desc: {
        'zh-CN': `<p>排序和分页的当前页码是<code>SessionStorage</code>缓存，分页每页显示几条和拖拽调整后的列宽是<code>LocalStorage</code>缓存。通过属性<code>storageId</code>配置
                 缓存表格状态的唯一标志值，一旦配置了<code>storageId</code>，那么表格各状态就会缓存，如果想使某一状态不缓存，可使用属性<code>storageConfig</code>进行配置。
                 <br/>使用分页功能需导入：<code>import { TiPaginationModule } from '@opentiny/ng';</code></p>`,
        'en-US': '',
      },
      apis: [
        'TiTableComponent.properties.storageId',
        'TiTableComponent.properties.storageConfig',
      ],
    },
  ],
  ignoreApis: [
    'TiHeadFilterComponent.properties.appendToBody',
    'TiHeadFilterComponent.properties.clearable',
    'TiHeadFilterComponent.properties.maxLine',
    'TiHeadFilterComponent.properties.placeholder',
    'TiHeadFilterComponent.properties.reserveSearchword',
    'TiHeadFilterComponent.properties.searchKeys',
    'TiHeadFilterComponent.properties.selectedNumberTipPosition',
    'TiHeadFilterComponent.properties.selectedTipPosition',
    'TiHeadFilterComponent.properties.showSelectedNumber',
    'TiHeadFilterComponent.properties.showSelectedNumberTip',
    'TiHeadFilterComponent.properties.tipMaxWidth',
    'TiHeadFilterComponent.properties.tipPosition',
    'TiHeadFilterComponent.properties.disabled',
    'TiHeadFilterComponent.properties.tabindex',
    'TiHeadFilterComponent.events.beforeOpen',
    'TiHeadFilterComponent.events.beforeSearch',
    'TiHeadFilterComponent.events.clear',
    'TiHeadFilterComponent.events.scrollToBottom',
    'TiHeadFilterComponent.events.blur',
    'TiHeadFilterComponent.events.focus',
    'TiHeadFilterComponent.slots.footerTemplate',
    'TiHeadFilterComponent.slots.placeholderTemplate',
    'TiHeadFilterComponent.slots.selectedTemplate',
    'TiHeadFilterComponent.methods.getSearchResult',
    'TiHeadFilterComponent.methods.getSearchWord',
    'TiHeadFilterComponent.methods.open',
    'TiHeadFilterComponent.methods.blur',
    'TiHeadFilterComponent.methods.focus',
    'TiColsToggleComponent.properties.appendToBody',
    'TiColsToggleComponent.properties.clearable',
    'TiColsToggleComponent.properties.labelKey',
    'TiColsToggleComponent.properties.maxLine',
    'TiColsToggleComponent.properties.multiple',
    'TiColsToggleComponent.properties.options',
    'TiColsToggleComponent.properties.panelMaxHeight',
    'TiColsToggleComponent.properties.placeholder',
    'TiColsToggleComponent.properties.reserveSearchword',
    'TiColsToggleComponent.properties.searchKeys',
    'TiColsToggleComponent.properties.selectedNumberTipPosition',
    'TiColsToggleComponent.properties.selectedTipPosition',
    'TiColsToggleComponent.properties.showSelectedNumber',
    'TiColsToggleComponent.properties.showSelectedNumberTip',
    'TiColsToggleComponent.properties.tipMaxWidth',
    'TiColsToggleComponent.properties.virtual',
    'TiColsToggleComponent.properties.valueKey',
    'TiColsToggleComponent.properties.tabindex',
    'TiColsToggleComponent.properties.idKey',
    'TiColsToggleComponent.events.beforeOpen',
    'TiColsToggleComponent.events.beforeSearch',
    'TiColsToggleComponent.events.clear',
    'TiColsToggleComponent.events.scrollToBottom',
    'TiColsToggleComponent.slots.footerTemplate',
    'TiColsToggleComponent.slots.placeholderTemplate',
    'TiColsToggleComponent.slots.selectedTemplate',
    'TiColsToggleComponent.slots.itemTemplate',
    'TiColsToggleComponent.methods.getSearchResult',
    'TiColsToggleComponent.methods.getSearchWord',
    'TiColsToggleComponent.methods.open',
    'TiColsToggleComponent.methods.blur',
    'TiColsToggleComponent.methods.focus',
  ],
};
