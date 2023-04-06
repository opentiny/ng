import { Component, ViewEncapsulation } from '@angular/core';
import { TiTreeNode, TiTreeUtil } from '@opentiny/ng';

@Component({
  templateUrl: './tree-search.html',
  encapsulation: ViewEncapsulation.None
})
export class TreeSearchComponent {
  data: Array<TiTreeNode> = [
    {
      label: '家用电器',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '大家电',
          expanded: true,
          checked: 'indeterminate',
          children: [
            {
              label: '空调',
              expanded: true,
              checked: 'indeterminate',
              children: [
                {
                  label: '海尔空调',
                  checked: true
                },
                {
                  label: '美的空调'
                }
              ]
            },
            {
              label: '冰箱'
            },
            {
              label: '洗衣机'
            },
            {
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器'
            },
            {
              label: '电熨斗'
            }
          ]
        }
      ]
    },
    {
      label: '服饰',
      children: [
        {
          label: '男装'
        },
        {
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      expanded: true,
      checked: true,
      children: [
        {
          label: '面部护理面部护理',
          checked: true
        },
        {
          label: '口腔护理',
          checked: true
        }
      ]
    }
  ];
  datadynamic: Array<TiTreeNode> = [
    {
      label: '家用电器',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '大家电',
          expanded: true,
          checked: 'indeterminate',
          children: [
            {
              label: '空调',
              expanded: true,
              checked: 'indeterminate',
              children: [
                {
                  label: '海尔空调',
                  checked: true
                },
                {
                  label: '美的空调'
                }
              ]
            },
            {
              label: '冰箱'
            },
            {
              label: '洗衣机'
            },
            {
              label: '热水器'
            }
          ]
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器'
            },
            {
              label: '电熨斗'
            }
          ]
        }
      ]
    },
    {
      label: '服饰',
      children: [
        {
          label: '男装'
        },
        {
          label: '女装'
        }
      ]
    },
    {
      label: '化妆',
      expanded: true,
      checked: true,
      children: [
        {
          label: '面部护理面部护理',
          checked: true
        },
        {
          label: '口腔护理',
          checked: true
        }
      ]
    }
  ];

  showData: Array<TiTreeNode> = this.data;
  showDatadynamic: Array<TiTreeNode> = this.datadynamic;

  searchWord: string = '';
  searchWorddynamic: string = '';
  noData: boolean = false;
  noDatadynamic: boolean = false;
  highlightWords: string;

  onSearch(value: string): void {
    // 树数据拷贝，服务也可自行实现
    const searchResult: Array<TiTreeNode> = TiTreeUtil.copy(this.data);
    // 根据用户传入的方法筛选
    TiTreeUtil.search(searchResult, (cnode: TiTreeNode): boolean => {
      return cnode.label.indexOf(value) >= 0;
    });
    // 展开整个树
    TiTreeUtil.traverse(searchResult, (node: TiTreeNode): void => {
      node.expanded = true;
    });
    // 将用户输入的值传入tree组件中并过滤显示高亮
    this.highlightWords = value;
    this.showData = searchResult;
    if (this.showData.length < 1) {
      this.noData = true;
    }
  }
  // 监听搜索字符串的改变，搭配search事件
  onChange(event: string): void {
    if (event === '') {
      //  如果搜索字符串清空，那么tree设置为原始数据。
      this.showData = this.data;
      this.highlightWords = ''; // 取消高亮显示
      this.noData = false;
    }
  }
  /**
   * 监听输入搜索字符串的改变,返回搜索到的内容(高亮显示)
   * @param event 搜索字符串
   */
  onChangedynamic(event: string): void {
    const searchResult: Array<TiTreeNode> = TiTreeUtil.copy(this.datadynamic);
    if (event === '') {
      //  如果搜索字符串清空，那么tree设置为原始数据。
      this.showDatadynamic = this.datadynamic;
      this.noDatadynamic = false;

      return;
    }
    TiTreeUtil.search(searchResult, (cnode: TiTreeNode): boolean => {
      return cnode.label.indexOf(event) >= 0;
    });
    TiTreeUtil.traverse(searchResult, (node: TiTreeNode): void => {
      node.expanded = true;
    });

    this.showDatadynamic = searchResult;
    this.noDatadynamic = false;
    if (this.showDatadynamic.length < 1) {
      this.noDatadynamic = true;
    }
  }
  // 在搜索结果中的每一次勾选，需要同步到原始数据也勾选
  onSelect(node: TiTreeNode): void {
    // this.showData !== this.data表示正在显示搜索结果
    if (this.showData !== this.data && TiTreeUtil.isLeaf(node)) {
      TiTreeUtil.checkedLeafNode(node) ? TiTreeUtil.selectNode(this.data, node, true) : TiTreeUtil.deSelectNode(this.data, node, true);
    }
  }
  onSelectdynamic(node: TiTreeNode): void {
    if (this.showDatadynamic !== this.datadynamic && TiTreeUtil.isLeaf(node)) {
      TiTreeUtil.checkedLeafNode(node)
        ? TiTreeUtil.selectNode(this.datadynamic, node, true)
        : TiTreeUtil.deSelectNode(this.datadynamic, node, true);
    }
  }
}
