import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './copy-table.html'
})
export class CopyTableComponent {
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  columns: Array<TiTableColumns> = [
    {
      title: 'ID',
      width: '50%'
    },
    {
      title: 'Name',
      width: '50%'
    }
  ];
  private data: Array<TiTableRowData> = [];

  ngOnInit(): void {
    for (let j: number = 0; j < 5; j++) {
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

  trackByFn(item: any): number {
    return item.id;
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Dupont-Dupont-Dupont-Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const stringList: Array<string> = ['bb8e9b52', 'df9ec29c', 'e34e8b0c', 'ee39cfcc'];
    const name: string = nameList[id % nameList.length];
    const uuid: string = `${stringList[(id * 7) % 4]}-${stringList[(id * 11) % 4]}-${stringList[(id * 13) % 4]}-${
      stringList[(id * 17) % 4]
    }`;

    return {
      name,
      uuid,
      id
    };
  }
}
