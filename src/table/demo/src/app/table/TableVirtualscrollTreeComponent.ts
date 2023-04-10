import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-virtualscroll-tree.html'
})
export class TableVirtualscrollTreeComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  noDadaInfo: string = '暂无表格数据';
  columns: Array<TiTableColumns> = [
    {
      title: 'Name'
    },
    {
      title: 'Size'
    },
    {
      title: 'Type'
    }
  ];
  treeData: Array<any> = [
    {
      name: 'tree_0',
      size: 'tree_0_size',
      type: 'tree_0_type',
      expand: true,
      children: [
        {
          name: 'tree_0_0',
          size: 'tree_0_0_size',
          type: 'tree_0_0_type',
          expand: true,
          children: [
            {
              name: 'tree_0_0_0',
              size: 'tree_0_0_0_size',
              type: 'tree_0_0_0_type'
            },
            {
              name: 'tree_0_0_1',
              size: 'tree_0_0_1_size',
              type: 'tree_0_0_1_type'
            }
          ]
        },
        {
          name: 'tree_0_1',
          size: 'tree_0_1_size',
          type: 'tree_0_1_type',
          expand: true,
          children: [
            {
              name: 'tree_0_1_0',
              size: 'tree_0_1_0_size',
              type: 'tree_0_1_0_type'
            }
          ]
        },
        {
          name: 'tree_0_2',
          size: 'tree_0_2_size',
          type: 'tree_0_2_type'
        }
      ]
    },
    {
      name: 'tree_1',
      size: 'tree_1_size',
      type: 'tree_1_type'
    },
    {
      name: 'tree_2',
      size: 'tree_2_size',
      type: 'tree_2_type'
    },
    {
      name: 'tree_3',
      size: 'tree_3_size',
      type: 'tree_3_type',
      expand: true,
      children: [
        {
          name: 'tree_3_0',
          size: 'tree_3_0_size',
          type: 'tree_3_0_type'
        },
        {
          name: 'tree_3_1',
          size: 'tree_3_1_size',
          type: 'tree_3_1_type'
        }
      ]
    },
    {
      name: 'tree_4',
      size: 'tree_4_size',
      type: 'tree_4_type'
    },
    {
      name: 'tree_5',
      size: 'tree_5_size',
      type: 'tree_5_type',
      expand: true,
      children: [
        {
          name: 'tree_5_0',
          size: 'tree_5_0_size',
          type: 'tree_5_0_type',
          expand: true,
          children: [
            {
              name: 'tree_5_0_0',
              size: 'tree_5_0_0_size',
              type: 'tree_5_0_0_type'
            },
            {
              name: 'tree_5_0_1',
              size: 'tree_5_0_1_size',
              type: 'tree_5_0_1_type'
            }
          ]
        },
        {
          name: 'tree_5_1',
          size: 'tree_5_1_size',
          type: 'tree_5_1_type',
          expand: true,
          children: [
            {
              name: 'tree_5_1_0',
              size: 'tree_5_1_0_size',
              type: 'tree_5_1_0_type'
            }
          ]
        },
        {
          name: 'tree_5_2',
          size: 'tree_5_2_size',
          type: 'tree_5_2_type'
        }
      ]
    },
    {
      name: 'tree_6',
      size: 'tree_6_size',
      type: 'tree_6_type'
    },
    {
      name: 'tree_7',
      size: 'tree_7_size',
      type: 'tree_7_type'
    },
    {
      name: 'tree_8',
      size: 'tree_8_size',
      type: 'tree_8_type',
      expand: true,
      children: [
        {
          name: 'tree_8_0',
          size: 'tree_8_0_size',
          type: 'tree_8_0_type'
        },
        {
          name: 'tree_8_1',
          size: 'tree_8_1_size',
          type: 'tree_8_1_type'
        }
      ]
    },
    {
      name: 'tree_9',
      size: 'tree_9_size',
      type: 'tree_9_type'
    },
    {
      name: 'tree_10',
      size: 'tree_10_size',
      type: 'tree_10_type',
      expand: true,
      children: [
        {
          name: 'tree_10_0',
          size: 'tree_10_0_size',
          type: 'tree_10_0_type',
          expand: true,
          children: [
            {
              name: 'tree_10_0_0',
              size: 'tree_10_0_0_size',
              type: 'tree_10_0_0_type'
            },
            {
              name: 'tree_10_0_1',
              size: 'tree_10_0_1_size',
              type: 'tree_10_0_1_type'
            }
          ]
        },
        {
          name: 'tree_10_1',
          size: 'tree_10_1_size',
          type: 'tree_10_1_type',
          expand: true,
          children: [
            {
              name: 'tree_10_1_0',
              size: 'tree_10_1_0_size',
              type: 'tree_10_1_0_type'
            }
          ]
        },
        {
          name: 'tree_10_2',
          size: 'tree_10_2_size',
          type: 'tree_10_2_type'
        }
      ]
    },
    {
      name: 'tree_11',
      size: 'tree_11_size',
      type: 'tree_11_type'
    },
    {
      name: 'tree_12',
      size: 'tree_12_size',
      type: 'tree_12_type'
    },
    {
      name: 'tree_13',
      size: 'tree_13_size',
      type: 'tree_13_type',
      expand: true,
      children: [
        {
          name: 'tree_13_0',
          size: 'tree_13_0_size',
          type: 'tree_13_0_type'
        },
        {
          name: 'tree_13_1',
          size: 'tree_13_1_size',
          type: 'tree_13_1_type'
        }
      ]
    },
    {
      name: 'tree_14',
      size: 'tree_14_size',
      type: 'tree_14_type'
    }
  ];

  ngOnInit(): void {
    this.srcData = {
      data: this.getFlatData(this.treeData), // 源数据
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };
  }

  toggle(node: TiTableRowData): void {
    node.expand = !node.expand;
    this.srcData.data = this.getFlatData(this.treeData);
  }

  getLevelStyle(node: TiTableRowData): { 'padding-left': string } {
    return {
      'padding-left': `${node.level * 24 + 10}px` // 图标16px + 间距8px = 24px
    };
  }

  changeEmpty(): void {
    this.srcData.data = [];
  }

  changeMany(): void {
    this.srcData.data = this.getFlatData(this.treeData);
  }

  /**
   * 对树形结构数据做扁平化处理
   * @param nodes 同层级且隶属同一父节点的节点集合
   * @param level 节点层级，根节点层级为0，往下依次类推
   */
  private getFlatData(nodes: Array<TiTableRowData>, level?: number): Array<TiTableRowData> {
    let result: Array<TiTableRowData> = [];
    if (!nodes) {
      return result;
    }
    nodes.forEach((item: TiTableRowData, index: number): void => {
      item.level = level ? level : 0;
      item.hasChildren = item.children && item.children.length > 0;
      result.push(item);
      if (item.expand && item.hasChildren) {
        result = result.concat(this.getFlatData(item.children, item.level + 1));
      }
    });

    return result;
  }
}
