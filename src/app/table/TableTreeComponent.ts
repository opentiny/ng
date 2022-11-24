import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-tree.html'
})
export class TableTreeComponent {
  displayedData: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'Name'
    },
    {
      title: 'Size'
    },
    {
      title: 'Type'
    },
  ];
  srcData: TiTableSrcData = {
    data:[
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
                show: false,
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
                show: false,
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
                show: false,
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
          },
        ],
      },
      {
        name: 'Documents',
        type: 'Folder',
        size: '-',
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
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
        ],
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
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
        ],
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
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
          {
            name: 'Work',
            type: 'Folder',
            size: '-',
            subData: [
              {
                name: 'Expenses.doc',
                type: 'Word Document',
                size: '30 KB',
              },
              {
                name: 'Resume.doc',
                type: 'Word Document',
                size: '10 KB',
              },
              {
                name: 'weike.doc',
                type: 'Word Document',
                size: '3 KB',
              },
            ],
          },
        ],
      },
    ],
    state: undefined
  };
}
