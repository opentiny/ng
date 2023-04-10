import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-head-filter-test.html'
})
export class TableHeadFilterTestComponent implements OnInit {
  searchWords: Array<any> = ['', '', '', ''];
  searchKeys: Array<string> = ['firstName', 'lastName', 'gender', 'email']; // 设置过滤字段
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
      searchable: true, // 该列的 headfilter 的下拉中是否开启搜索功能
      options: [
        {
          // 该列的 headfilter 下拉选择项
          label: 'all'
        },
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
      title: 'birth date',
      width: '20%'
    },
    {
      title: 'balance',
      width: '15%'
    },
    {
      title: 'email',
      searchable: true,
      key: 'email', // 该列的 headfilter 要过滤的字段
      labelKey: 'label', // 该列的 headfilter 下拉中显示的字段
      panelWidth: '120px', // 该列的 headfilter 的下拉框宽度
      options: [
        {
          // 该列的 headfilter 下拉选择项
          label: 'all'
        },
        {
          label: 'Pierre'
        },
        {
          label: 'Pol'
        },
        {
          label: 'Jacques'
        },
        {
          label: 'Robert'
        },
        {
          label: 'Elisa'
        }
      ]
    },
    {
      title: 'classification',
      key: 'gender', // 该列的 headfilter 要过滤的字段
      selected: null,
      searchable: false,
      labelKey: 'type', // 该列的 headfilter 下拉中显示的字段
      panelWidth: '120px', // 该列的 headfilter 的下拉框宽度
      panelAlign: 'right', // 该列的 headfilter 下拉面板对齐方式，默认左对齐
      options: [
        {
          // 该列的 headfilter 下拉选择项
          type: 'all'
        },
        {
          type: 'girl'
        },
        {
          type: 'boy'
        }
      ]
    }
  ];

  ngOnInit(): void {
    // 设置初始化第一列 headfilter 的选中项
    this.columns[0]['selected'] = this.columns[0].options[1];
    // 根据 headfilter 选中项给表格的搜索接口传入对应的搜索值，进行表格搜索
    const index: number = this.searchKeys.indexOf(this.columns[0].key);
    this.searchWords[index] = this.columns[0].options[1].label;

    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
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
    const index: number = this.searchKeys.indexOf(column.key);
    const labelKey: string = column.labelKey || 'label';
    this.searchWords[index] = item[labelKey] === 'all' ? '' : item[labelKey];
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez', 'Henry', 'Jeff', 'John', 'Elizabeth'];
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
      id
    };
  }
}
