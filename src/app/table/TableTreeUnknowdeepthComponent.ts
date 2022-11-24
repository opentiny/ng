import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-tree-unknowdeepth.html'
})
export class TableTreeUnknowdeepthComponent implements OnInit {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Name'
    },
    {
      title: 'Size'
    },
    {
      title: 'Type'
    },
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
              type: 'tree_0_0_0_type',
            },
            {
              name: 'tree_0_0_1',
              size: 'tree_0_0_1_size',
              type: 'tree_0_0_1_type',
              children: [
                {
                  name: 'tree_0_0_1_0',
                  size: 'tree_0_0_1_0_size',
                  type: 'tree_0_0_1_0_type',
                },
                {
                  name: 'tree_0_0_1_1',
                  size: 'tree_0_0_1_1_size',
                  type: 'tree_0_0_1_1_type',
                },
              ],
            },
          ],
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
              type: 'tree_0_1_0_type',
            },
          ],
        },
        {
          name: 'tree_0_2',
          size: 'tree_0_2_size',
          type: 'tree_0_2_type',
        },
      ],
    },
    {
      name: 'tree_1',
      size: 'tree_1_size',
      type: 'tree_1_type',
    },
    {
      name: 'tree_2',
      size: 'tree_2_size',
      type: 'tree_2_type',
    },
    {
      name: 'tree_3',
      size: 'tree_3_size',
      type: 'tree_3_type',
      children: [
        {
          name: 'tree_3_0',
          size: 'tree_3_0_size',
          type: 'tree_3_0_type',
        },
        {
          name: 'tree_3_1',
          size: 'tree_3_1_size',
          type: 'tree_3_1_type',
        },
      ],
    },
    {
      name: 'tree_4',
      size: 'tree_4_size',
      type: 'tree_4_type',
    },
  ];

  ngOnInit(): void {
    this.srcData.data = this.getFlatData(this.treeData);
  }

  toggle(node: TiTableRowData): void {
    node.expand = !node.expand;
    this.srcData.data = this.getFlatData(this.treeData);
  }

  getLevelStyle(node: TiTableRowData): { 'padding-left': string } {
    return {
      'padding-left': `${node.level * 24 + 10}px`, // 图标16px + 间距8px = 24px
    };
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
