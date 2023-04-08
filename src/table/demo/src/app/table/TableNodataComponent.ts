import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-nodata.html'
})
export class TableNodataComponent {
  noDataInfo: string = '暂无表格数据';
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'First Name'
    },
    {
      title: 'Last Name'
    },
    {
      title: 'Age'
    },
    {
      title: 'Email Address'
    }
  ];
}
