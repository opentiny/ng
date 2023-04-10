import { Component } from '@angular/core';
import { TiActionmenuItem, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './table-actionmenu.html'
})
export class TableActionmenuComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: [
      {
        name: 's2.small.2',
        createTime: new Date(2003, 2, 6),
        operator: 'Pierre Dupont',
        state: 'on'
      },
      {
        name: 's2.xlarge.2',
        createTime: new Date(2013, 9, 1),
        operator: 'Jacques Germain',
        state: 'off'
      },
      {
        name: 's2.medium.1',
        createTime: new Date(2015, 1, 1),
        operator: 'Robert Delcourt',
        state: 'disabled'
      },
      {
        name: 's2.large.1',
        createTime: new Date(2008, 5, 12),
        operator: 'Elisa Menez',
        state: 'stop'
      }
    ],
    state: undefined
  };
  columns: Array<TiTableColumns> = [
    {
      title: 'Name'
    },
    {
      title: 'create Time'
    },
    {
      title: 'Operator'
    },
    {
      title: 'State'
    },
    {
      title: 'Action'
    }
  ];

  onSelect(item: TiActionmenuItem, row: TiTableRowData): void {
    row.state = item.label;
  }

  dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    let items: Array<TiActionmenuItem> = [
      {
        label: 'on'
      },
      {
        label: 'stop'
      },
      {
        label: 'off'
      },
      {
        label: 'disabled'
      }
    ];
    if (data.operator === 'Robert Delcourt') {
      items = [{ ...items[0], disabled: true }, items[3]];
    }

    return items;
  };
}
