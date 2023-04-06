import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-head-filter.html'
})
export class TableHeadFilterComponent {
  displayedData: Array<TiTableRowData> = [];
  noDadaInfo: string = '暂无数据';
  baseData: Array<TiTableRowData> = [
    {
      firstName: 'Pierre',
      lastName: 'Dupont',
      age: 20,
      gender: 'male',
      email: 'Pierre@example.com'
    },
    {
      firstName: 'Jacques',
      lastName: 'Germain',
      age: 42,
      gender: 'female',
      email: 'Jacques@example.com'
    },
    {
      firstName: 'Robert',
      lastName: 'Delcourt',
      age: 15,
      gender: 'male',
      email: 'Robert@example.com'
    },
    {
      firstName: 'Elisa',
      lastName: 'Menez',
      age: 36,
      gender: 'female',
      email: 'Elisa@example.com'
    }
  ];
  srcData: TiTableSrcData = {
    data: this.baseData,
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'First Name',
      key: 'firstName',
      selected: null,
      labelKey: 'label', // 默认值
      panelAlign: 'left', // 默认值
      panelWidth: 'auto', // 默认值
      options: [
        {
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
        },
        {
          label: 'Elisa'
        }
      ]
    },
    {
      title: 'Last Name',
      key: 'lastName',
      selected: null,
      multiple: true,
      searchable: true,
      labelKey: 'label',
      panelAlign: 'left',
      panelWidth: 'auto',
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
          label: 'Menez'
        }
      ]
    },
    {
      title: 'Age',
      key: 'age',
      labelKey: 'label',
      panelAlign: 'left',
      panelWidth: '100px',
      virtual: true,
      searchable: true,
      options: this.getAgeOptions()
    },
    {
      title: 'Gender',
      key: 'gender',
      labelKey: 'type',
      multiple: true,
      selectAll: true,
      panelAlign: 'left',
      panelWidth: 'auto',
      options: [
        {
          type: 'female'
        },
        {
          type: 'male'
        }
      ]
    },
    {
      title: 'Email Address',
      key: 'email',
      panelAlign: 'right',
      options: [
        {
          label: 'all'
        },
        {
          label: '@example.com'
        },
        {
          label: '@example.com'
        },
        {
          label: '@example.com'
        },
        {
          label: '@example.com'
        }
      ]
    }
  ];

  onSelect(option: any): void {
    this.srcData.data = this.baseData.filter((rowData: TiTableRowData) => {
      for (const column of this.columns) {
        const labelKey: string = column.labelKey || 'label';
        if (!column.multiple && column.selected) {
          if (column.selected[labelKey] === 'all') {
            continue;
          }
          const isMatched: boolean =
            column.key === 'email'
              ? rowData[column.key].indexOf(column.selected[labelKey]) >= 0
              : column.selected[labelKey] === rowData[column.key];
          if (!isMatched) {
            return false;
          }
        }
        if (column.multiple && column.selected && column.selected.length > 0) {
          const index: number = column.selected.findIndex((item: any) => {
            return item[labelKey] === rowData[column.key];
          });
          if (index < 0) {
            return false;
          }
        }
      }

      return true;
    });
  }

  private getAgeOptions(): Array<{ label: any }> {
    const options: Array<{ label: any }> = [{ label: 'all' }];
    for (let i = 12; i <= 90; i++) {
      options.push({ label: i });
    }

    return options;
  }
}
