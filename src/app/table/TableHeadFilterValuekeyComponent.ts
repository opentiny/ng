import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-head-filter-valuekey.html',
})
export class TableHeadFilterValuekeyComponent implements OnInit {
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
          label: 'all',
          value: '',
        },
        {
          label: 'Pierre',
          value: '皮特',
        },
        {
          label: 'Jacques',
          value: '杰克',
        },
        {
          label: 'Robert',
          value: '罗伯特',
        },
      ],
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
          label: 'all',
          value: '',
        },
        {
          label: 'Dupont',
          value: '李白',
        },
        {
          label: 'Germain',
          value: '杜甫',
        },
        {
          label: 'Delcourt',
          value: '杜牧',
        },
        {
          label: 'bjip',
          value: '王维',
        },
        {
          label: 'Menez',
          value: '李清照',
        },
        {
          label: 'Henry',
          value: '白居易',
        },
        {
          label: 'Jeff',
          value: '范仲淹',
        },
        {
          label: 'John',
          value: '陆游',
        },
        {
          label: 'Elizabeth',
          value: '孟浩然',
        },
      ],
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
    {
      title: 'classification',
      width: '20%',
    },
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
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
    // 设置初始化第一列 headfilter 的选中项，此处的选中项根基于valueKey进行设置
    this.columns[0].selected = this.columns[0].options[1].value;
    const items: Array<any> = this.columns[0].options[0];
    // 根据初始化第一列 headfilter 的选中项对表格筛选
    this.onSelect(items, this.columns[0]);
  }

  // 表格自带搜索功能不满足此种场景，此示例是在 onselect 事件中通过对表格的 srcData 进行处理实现过滤。
  /**
   * @param items 当前的选中项
   * @param column 当前列的数据 column.selected的值是通过keyValue获得的当前选中项
   */
  onSelect(item: any, column: TiTableColumns): void {
    this.srcData.data = this.data.filter((rowData: TiTableRowData) => {
      // 遍历所有列
      for (const columnData of this.columns) {
        // 只有筛选列有选中项时进行筛选，如果某一筛选列选中项不包含当前行数据，则跳出循环
        if (columnData.selected) {
          const isExit: boolean =
            columnData.selected === rowData[columnData.key].value;
          if (!isExit) {
            return false;
          }
        }
      }

      return true;
    });
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<any> = [
      {
        label: 'Pierre',
        value: '皮特',
      },
      {
        label: 'Jacques',
        value: '杰克',
      },
      {
        label: 'Robert',
        value: '罗伯特',
      },
      {
        label: 'Pol',
        value: '玫瑰',
      },
      {
        label: 'Elisa',
        value: '安蕾斯',
      },
    ];
    const familyName: Array<any> = [
      {
        label: 'Dupont',
        value: '李白',
      },
      {
        label: 'Germain',
        value: '杜甫',
      },
      {
        label: 'Delcourt',
        value: '杜牧',
      },
      {
        label: 'bjip',
        value: '王维',
      },
      {
        label: 'Menez',
        value: '李清照',
      },
      {
        label: 'Henry',
        value: '白居易',
      },
      {
        label: 'Jeff',
        value: '范仲淹',
      },
      {
        label: 'John',
        value: '陆游',
      },
      {
        label: 'Elizabeth',
        value: '孟浩然',
      },
    ];
    const firstName: string = nameList[((id + 3) * 19) % 5];
    const lastName: string = familyName[((id + 3) * 19) % 9];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;
    const gender: string = ['girl', 'boy'][((id + 3) * 19) % 2];

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      gender,
      id,
    };
  }
}
