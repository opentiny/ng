import { Component } from '@angular/core';
import { TiModalService, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './path-select.html'
})
export class PathSelectComponent {
  constructor(tiModal: TiModalService) {
    this.tiModal = tiModal;
  }
  private tiModal: TiModalService;
  pathValue: string = 'd/code/TinyUI';
  TiPathListItems = [];
  TiPathFieldItems = [
    {
      label: 'd'
    },
    {
      label: 'code'
    },
    {
      label: 'TinyUI'
    }
  ];

  // 表格相关数据
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  checkedList: Array<TiTableRowData> = []; // 默认选中项
  columns: Array<TiTableColumns> = [
    {
      title: 'Name',
      width: '40%'
    },
    {
      title: 'Time',
      width: '35%'
    },
    {
      title: 'Size',
      width: '25%'
    }
  ];
  currentPage: number = 0;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50],
    size: 10
  };
  noDadaInfo: string = '暂无表格数据';

  // 模拟路径数据（为演示方便，此处数据仅为示意）
  private pathDataMock = [
    {
      label: 'd',
      type: 'file',
      time: '2019-11-22',
      size: '5',
      children: [
        {
          label: 'code',
          type: 'file',
          time: '2019-08-22',
          size: '10',
          children: [
            {
              label: 'TinyUI',
              type: 'file',
              time: '2020-11-11',
              size: '15',
              children: [
                {
                  label: 'item_1',
                  type: 'file',
                  time: '2020-06-18',
                  size: '20',
                  children: [
                    {
                      label: 'item_1',
                      type: 'document',
                      time: '2020-02-20',
                      size: '2'
                    },
                    {
                      label: 'item_2',
                      type: 'document',
                      time: '2020-01-03',
                      size: '20'
                    },
                    {
                      label: 'item_3',
                      type: 'document',
                      time: '2020-06-18',
                      size: '200'
                    },
                    {
                      label: 'empty',
                      type: 'file',
                      time: '2019-08-23',
                      size: '0',
                      children: []
                    }
                  ]
                },
                {
                  label: 'item_2',
                  type: 'file',
                  time: '2020-02-20',
                  size: '2',
                  children: [
                    {
                      label: 'item_1',
                      type: 'document',
                      time: '2020-02-20',
                      size: '2'
                    },
                    {
                      label: 'item_2',
                      type: 'document',
                      time: '2020-01-03',
                      size: '20'
                    },
                    {
                      label: 'empty',
                      type: 'file',
                      time: '2019-08-23',
                      size: '0',
                      children: []
                    }
                  ]
                },
                {
                  label: 'item_3',
                  type: 'document',
                  time: '2020-03-15',
                  size: '16'
                },
                {
                  label: 'item_4',
                  type: 'document',
                  time: '2020-05-01',
                  size: '28'
                },
                {
                  label: 'item_5',
                  type: 'document',
                  time: '2020-11-11',
                  size: '35'
                },
                {
                  label: 'empty',
                  type: 'file',
                  time: '2019-08-23',
                  size: '0',
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: 'empty',
          type: 'file',
          time: '2019-08-23',
          size: '0',
          children: []
        }
      ]
    }
  ];

  ngOnInit(): void {
    // 模拟获取当前页面数据
    this.data = this.queryPageItems();
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者设置了分页特性，且对源数据未进行分页处理，因此tiny会对数据进行分页处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };
    // 表格选中项
    this.checkedList = [this.data[0], this.data[2]];
    // 路径列表组件同步表格选中项
    this.setPathList();
  }

  // 模拟获取当前页面数据
  private queryPageItems() {
    let temp: any = [...this.pathDataMock];
    for (let i = 0; i < this.TiPathFieldItems.length; i++) {
      temp = temp.find((item) => {
        return item.label === this.TiPathFieldItems[i].label;
      })?.children;
    }
    return temp;
  }

  // pathList组件项目清除事件
  onPathListClear(item) {
    // 表格选中项同步路径列表组件
    this.checkedList = this.checkedList.filter((_item) => {
      return _item.label !== item.label;
    });
  }

  // pathField组件路径变化事件
  onPathfieldChange() {
    if (this.TiPathFieldItems.length === 0) {
      this.srcData.data = this.pathDataMock;
    } else {
      this.srcData.data = this.queryPageItems();
    }
    // 清空表格选中项
    this.checkedList = [];
  }

  // 表格项目双击事件
  onTrDblclick(row) {
    if (row.type === 'file') {
      this.TiPathFieldItems = [...this.TiPathFieldItems, row];
      this.srcData.data = this.queryPageItems();
      this.checkedList = [];
    }
  }

  // 路径列表组件同步表格选中项
  private setPathList() {
    this.TiPathListItems = [...this.checkedList];
  }

  // 改变路径内容
  private setPathValue(): void {
    const pathArray: Array<string> = [];
    this.TiPathFieldItems.forEach((item, index) => {
      pathArray.push(item.label);
    });
    this.pathValue = pathArray.join('/');
  }

  // 打开弹窗
  showModal(content: any): void {
    // 备份路径及已选项
    const TiPathFieldItemsOld = [...this.TiPathFieldItems];
    const checkedListOld = [...this.checkedList];
    this.tiModal.open(content, {
      id: 'myModal', // 定义id防止同一页面出现多个相同弹框
      animation: false,
      // 模板上下文：一般通过context定义的是与弹出动作相关的数据，大部分数据还是建议在外部定义
      // 双向绑定的值，建议放在context对象中，每次打开弹窗都重新就行赋值。
      context: {
        name: 'select'
      },
      close: (): void => {
        console.log('on close event');
        this.TiPathListItems = [];
        // 改变路径内容
        this.setPathValue();
        // 路径列表组件同步表格选中项
        this.setPathList();
      },
      dismiss: (): void => {
        console.log('on dismiss event');
        // 还原所有路径和已选项
        this.TiPathFieldItems = [...TiPathFieldItemsOld];
        this.onPathfieldChange();
        this.checkedList = [...checkedListOld];
      }
    });
  }
}
