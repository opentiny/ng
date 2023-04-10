import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';
import { Util } from '@opentiny/ng-utils';

@Component({
  templateUrl: './foldtext-table.html'
})
export class FoldtextTableComponent {
  // 表格模拟数据
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  data: Array<TiTableRowData> = [];

  columns: Array<TiTableColumns> = [
    {
      title: '名称',
      width: '15%'
    },
    {
      title: '可用'
    },
    {
      title: '朝代'
    },
    {
      title: '是否使用'
    },
    {
      title: '详细内容',
      width: '20%'
    }
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 5; j++) {
      this.data.push(this.createRandomRow(j));
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

  // 模拟数据
  private createRandomRow(id: number): TiTableRowData {
    const nameList: Array<string> = ['送元二使安西', '送元二使安西'];
    const name: string = nameList[this.random(0, 2)] + '_' + this.random(0, 100);

    return {
      name_id: {
        name,
        id: Util.getUniqueId('foldtext')
      },
      access: '可用区' + this.random(0, 1000),
      status: id % 5 === 0 ? '已冻结' : '使用中',
      users: this.getAuthUsers(id),
      id
    };
  }

  private getAuthUsers(id: number): Array<string> {
    return ['《送元二使安西》——王维(唐)', '渭城朝雨悒轻尘,', '客舍青青柳色新。', '劝君更尽一杯酒,', '西出阳关无故人。'];
  }

  // 模拟数据
  private random(start: number, end: number): number {
    const span: number = end - start;

    return Math.floor(span * Math.random());
  }
}
