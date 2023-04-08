import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-columnfixed-nodata.html'
})
export class TableColumnfixedNodataComponent implements OnInit {
  noDadaInfo: string = '暂无表格数据';
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '150px',
      fixed: 'left'
    },
    {
      title: 'last name',
      width: '200px',
      show: true,
      fixed: 'left'
    },
    {
      title: 'birth date',
      width: '380px',
      fixed: 'left'
    },
    {
      title: 'balance',
      width: '340px'
    },
    {
      title: 'email',
      width: '310px'
    },
    {
      title: 'address',
      width: '340px'
    },
    {
      title: 'phone number',
      width: '210px'
    },
    {
      title: 'parents',
      width: '340px'
    },
    {
      title: 'school',
      width: '190px',
      fixed: 'right'
    }
  ];

  ngOnInit(): void {
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: [], // 源数据
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
}
