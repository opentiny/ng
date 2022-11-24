import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-overflow-link.html',
})
export class TableOverflowLinkComponent implements OnInit {
  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name（默认设置）',
      width: '20%',
    },
    {
      title: 'last name（解决方案一）',
      width: '20%',
    },
    {
      title: 'email（解决方案二）',
      width: '20%',
    },
    {
      title: 'birth date',
      width: '10%',
    },
    {
      title: 'balance',
      width: '30%',
    },
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、搜索、分页操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为displayedData显示出来
      // 本示例中，开发者没有设置分页、搜索和排序这些特性，因此tiny不会对数据进行进一步的处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false, // 源数据未进行分页处理
      },
    };
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = [
      '明月几时有，把酒问青天，不知天上宫阙，今夕是何年',
      '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。',
      '起舞弄清影，何似在人间。',
      '转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆，',
      '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。',
    ];

    const familyName: Array<string> = [
      '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。',
      '人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。',
      '烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。',
      '与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵⑮，但愿长醉不复醒。',
      '古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。',
    ];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      id,
    };
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
