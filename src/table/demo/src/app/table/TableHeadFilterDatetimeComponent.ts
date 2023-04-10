import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-head-filter-datetime.html'
})
export class TableHeadFilterDatetimeComponent {
  displayedData: Array<TiTableRowData> = [];
  noDadaInfo: string = '暂无数据';
  baseData: Array<TiTableRowData> = [
    {
      name: 'Pierre Dupont',
      birthday: '1993-07-22',
      hireDate: '2015-04-28',
      start: '2018-07-21 00:00:00',
      expired: '2022-07-21 23:59:59'
    },
    {
      name: 'Jacques Germain',
      birthday: '1996-09-02',
      hireDate: '2018-12-08',
      start: '2019-07-03 08:00:00',
      expired: '2028-07-21 22:00:00'
    },
    {
      name: 'Robert Delcourt',
      birthday: '1989-06-20',
      hireDate: '2014-05-30',
      start: '2015-08-11 06:00:12',
      expired: '2019-07-11 21:12:59'
    },
    {
      name: 'Elisa Menez',
      birthday: '2000-06-16',
      hireDate: '2022-02-20',
      start: '2022-11-01 13:15:00',
      expired: '2024-10-01 18:32:59'
    }
  ];
  srcData: TiTableSrcData = {
    data: this.baseData,
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Name'
    },
    {
      title: 'Birthday',
      key: 'birthday',
      selected: null,
      panelAlign: 'left',
      isDatetime: true,
      datetimeConfig: {
        onlyDate: true,
        max: new Date(2000, 11, 1),
        min: new Date(1989, 5, 1)
      }
    },
    {
      title: 'Hire Date',
      key: 'hireDate',
      panelAlign: 'left',
      isDatetime: true,
      datetimeConfig: {
        onlyDate: true,
        format: 'yyyy-MM-dd'
      }
    },
    {
      title: 'start',
      key: 'start',
      panelAlign: 'left',
      isDatetime: true,
      datetimeConfig: {
        format: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss'
        }
      }
    },
    {
      title: 'Expired',
      key: 'expired',
      panelAlign: 'right',
      isDatetime: true,
      datetimeConfig: {
        max: new Date(2026, 12, 25, 21, 59, 59),
        min: new Date(2019, 6, 1, 0, 0, 0)
      }
    }
  ];

  onSelect(selected: { start: Date; end: Date; type: string }): void {
    this.srcData.data = this.baseData.filter((rowData: TiTableRowData) => {
      for (const column of this.columns) {
        if (column.isDatetime && column.selected) {
          const startTimestamp: number = column.selected.start && Date.parse(column.selected.start);
          const endTimestamp: number = column.selected.end && Date.parse(column.selected.end);
          const dataTimestamp: number = rowData[column.key] && Date.parse(rowData[column.key]);
          let isMatched: boolean = true;

          if (startTimestamp && endTimestamp) {
            isMatched = startTimestamp <= dataTimestamp && dataTimestamp <= endTimestamp;
          }

          if (startTimestamp && !endTimestamp) {
            isMatched = startTimestamp <= dataTimestamp;
          }

          if (!startTimestamp && endTimestamp) {
            isMatched = dataTimestamp <= endTimestamp;
          }

          if (!isMatched) {
            return false;
          }
        }
      }

      return true;
    });
  }
}
