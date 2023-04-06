import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-head-filter-virtualscroll.html'
})
export class TableHeadFilterVirtualscrollComponent implements OnInit {
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  currentPage: number = 1;
  totalNumber: number = 30000;
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '20%',
      key: 'firstName', // 该列的 headfilter 要过滤的字段
      selected: null,
      options: [
        {
          // 该列的 headfilter 下拉选择项
          label: 'all'
        },
        {
          label: 'Pierre'
        },
        {
          label: 'Jacques'
        },
        {
          label: 'Robert'
        }
      ]
    },
    {
      title: 'last name',
      width: '8%',
      key: 'lastName', // 该列的 headfilter 要过滤的字段
      selected: null, // 该列的 headfilter 下拉选中项
      multiple: true,
      options: [
        {
          label: 'Dupont'
        },
        {
          label: 'Germain'
        },
        {
          label: 'Delcourt'
        },
        {
          label: 'bjip'
        },
        {
          label: 'Menez'
        },
        {
          label: 'Henry'
        },
        {
          label: 'Jeff'
        },
        {
          label: 'John'
        },
        {
          label: 'Elizabeth'
        }
      ]
    },
    {
      title: 'total',
      width: '20%',
      key: 'total', // 该列的 headfilter 要过滤的字段
      selected: null, // 该列的 headfilter 下拉选中项
      searchable: true,
      virtual: true, // 该列的 headfilter 的下拉中开启虚拟滚动功能
      options: []
    },
    {
      title: 'balance',
      width: '30%',
      multiple: true,
      key: 'balance', // 该列的 headfilter 要过滤的字段
      selected: null, // 该列的 headfilter 下拉选中项
      searchable: true,
      virtual: true, // 该列的 headfilter 的下拉中开启虚拟滚动功能
      options: []
    },
    {
      title: 'email',
      multiple: true,
      key: 'email', // 该列的 headfilter 要过滤的字段
      selected: null, // 该列的 headfilter 下拉选中项
      searchable: true,
      selectAll: true,
      virtual: true, // 该列的 headfilter 的下拉中开启虚拟滚动功能
      options: []
    }
  ];

  ngOnInit(): void {
    this.columns[2].options.push({ label: 'all' });
    for (let j: number = 0; j < 10000; j++) {
      this.columns[2].options.push({ label: j + ' total' });
    }

    for (let j: number = 0; j < 10000; j++) {
      this.columns[3].options.push({ label: j + ' balance' });
    }

    for (let j: number = 0; j < 10000; j++) {
      this.columns[4].options.push({ label: j + '@whatever.com' });
    }

    for (let j: number = 0; j < 30000; j++) {
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false,
        sorted: false,
        paginated: false
      }
    };
  }

  // 使 headfilter 和表格搜索联动。根据 headfilter 选中项给表格的搜索接口传入对应的搜索值，进行表格数据搜索。
  // 此示例是利用表格提供的搜索功能来搜索，也可在此事件中来自己实现搜索。
  onSelect(item: any, column: TiTableColumns): void {
    // 从每一行进行过滤筛选
    this.srcData.data = this.data.filter((rowData: TiTableRowData) => {
      // 遍历所有列
      for (const columnData of this.columns) {
        // 只有筛选列有选中项时进行筛选，如果某一筛选列选中项不包含当前行数据，则跳出循环
        if (columnData.selected) {
          // 单选过滤
          if (!Array.isArray(columnData.selected) && columnData.selected.label !== 'all') {
            if (columnData.selected.label !== rowData[columnData.key]) {
              return false;
            }
            // 多选过滤
          } else if (columnData.selected.length > 0) {
            const index: number = columnData.selected.findIndex((item: any) => {
              return item.label === rowData[columnData.key];
            });
            if (index < 0) {
              return false;
            }
          }
        }
      }

      return true;
    });
    this.totalNumber = this.srcData.data.length;
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez', 'Henry', 'Jeff', 'John', 'Elizabeth'];
    const firstName: string = nameList[((id + 3) * 19) % 5];
    const lastName: string = familyName[((id + 3) * 19) % 9];
    const total: string = (((id + 3) * 13) % 10000) + ' total';
    const email: string = (((id + 2) * 19) % 10000) + '@whatever.com';
    const balance: string = (((id + 4) * 761) % 10000) + ' balance';
    return {
      firstName,
      lastName,
      total,
      email,
      balance,
      id
    };
  }
}
