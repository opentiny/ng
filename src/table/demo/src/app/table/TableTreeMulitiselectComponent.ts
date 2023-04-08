import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData, Util } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-tree-mulitiselect.html'
})
export class TableTreeMulitiselectComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  checkedList: Array<TiTableRowData> = []; // 默认选中项
  youCheckedList: Array<TiTableRowData> = []; // 默认选中项
  sonCheckedList: Array<TiTableRowData> = []; // 默认选中项

  data: Array<TiTableRowData> = [
    {
      name: 'Documents',
      type: 'Folder',
      size: '-',
      showSub: true,
      subData: [
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          showSub: true,
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB',
              show: false
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB',
              show: false
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB',
              show: false
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-'
        }
      ]
    },
    {
      name: 'Documents',
      type: 'Folder',
      size: '-'
    },
    {
      name: 'Documents',
      type: 'Folder',
      size: '-',
      subData: [
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        }
      ]
    },
    {
      name: 'Documents',
      type: 'Folder',
      size: '-',
      subData: [
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        }
      ]
    },
    {
      name: 'Documents',
      type: 'Folder',
      size: '-',
      subData: [
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        },
        {
          name: 'Work',
          type: 'Folder',
          size: '-',
          subData: [
            {
              name: 'Expenses.doc',
              type: 'Word Document',
              size: '30 KB'
            },
            {
              name: 'Resume.doc',
              type: 'Word Document',
              size: '10 KB'
            },
            {
              name: 'weike.doc',
              type: 'Word Document',
              size: '3 KB'
            }
          ]
        }
      ]
    }
  ];
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

  // 设置各层级复选组绑定items数据
  private static getCheckgroupItems(treeData: Array<any>, items: Array<any>, parentData?: Array<any>): any {
    if (treeData) {
      for (const data of treeData) {
        if (data.subData) {
          this.getCheckgroupItems(data.subData, items);
        } else {
          items.push(data);
        }
      }
    } else {
      items.push(parentData);
    }

    return items;
  }

  ngOnInit(): void {
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者没有设置分页、搜索和排序这些特性，因此tiny不会对数据进行进一步的处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };
  }
  onMyChange(checkedList: Array<any>): void {
    console.log(checkedList);
  }

  // 获取数据
  getItems(data: Array<any>, parentData?: Array<any>): Array<any> {
    const items: Array<any> = [];

    return TableTreeMulitiselectComponent.getCheckgroupItems(data, items, parentData);
  }
}
