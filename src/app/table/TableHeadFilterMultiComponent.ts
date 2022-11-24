import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-head-filter-multi.html',
})
export class TableHeadFilterMultiComponent implements OnInit {
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '20%',
      key: 'firstName', // 该列的 headfilter 要过滤的字段
      selected: null,
      options: [
        {
          // 该列的 headfilter 下拉选择项
          label: 'Pierre',
        },
        {
          label: 'Jacques',
        },
        {
          label: 'Robert',
        },
        {
          label: 'Pol',
        },
        {
          label: 'Elisa',
        },
      ],
      multiple: true,
    },
    {
      title: 'last name',
      width: '20%',
      key: 'lastName', // 该列的 headfilter 要过滤的字段
      selected: null, // 该列的 headfilter 下拉选中项
      searchable: true, // 该列的 headfilter 的下拉中是否开启搜索功能
      options: [
        {
          // 该列的 headfilter 下拉选择项
          label: 'Dupont',
        },
        {
          label: 'Germain',
        },
        {
          label: 'Delcourt',
        },
        {
          label: 'bjip',
        },
        {
          label: 'Menez',
        },
        {
          label: 'Henry',
        },
        {
          label: 'Jeff',
        },
        {
          label: 'John',
        },
        {
          label: 'Elizabeth',
        },
      ],
      multiple: true,
      selectAll: true,
    },
    {
      title: 'birth date',
      width: '20%',
    },
    {
      title: 'balance',
      width: '20%',
    },
    {
      title: 'email',
      width: '20%',
    },
  ];

  ngOnInit(): void {
    // 随机生成10条数据
    for (let j: number = 0; j < 10; j++) {
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false,
        sorted: false,
        paginated: false,
      },
    };
    // 设置初始化第一列 headfilter 的选中项
    this.columns[0].selected = [
      this.columns[0].options[0],
      this.columns[0].options[1],
    ];
    // 根据初始化第一列 headfilter 的选中项对表格筛选
    this.onSelect(this.columns[0].selected, this.columns[0]);
  }

  // 表格自带搜索功能不满足此种场景，此示例是在 onselect 事件中通过对表格的 srcData 进行处理实现过滤。
  onSelect(items: any, column: TiTableColumns): void {
    console.log('select', items);
    console.log('column', column);

    // 从每一行进行过滤筛选
    this.srcData.data = this.data.filter((rowData: TiTableRowData) => {
      // 遍历所有列
      for (const columnData of this.columns) {
        // 只有筛选列有选中项时进行筛选，如果某一筛选列选中项不包含当前行数据，则跳出循环
        if (columnData.selected && columnData.selected.length) {
          const index: number = columnData.selected.findIndex((item: any) => {
            return item.label === rowData[columnData.key];
          });
          if (index < 0) {
            return false;
          }
        }
      }

      return true;
    });
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = [
      'Pierre',
      'Pol',
      'Jacques',
      'Robert',
      'Elisa',
    ];
    const familyName: Array<string> = [
      'Dupont',
      'Germain',
      'Delcourt',
      'bjip',
      'Menez',
      'Henry',
      'Jeff',
      'John',
      'Elizabeth',
    ];
    const firstName: string = nameList[((id + 3) * 19) % 5];
    const lastName: string = familyName[((id + 3) * 19) % 9];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      id,
    };
  }
}
