import { ChangeDetectorRef, Component } from '@angular/core';
import { TiPageSizeConfig } from '@opentiny/ng';

@Component({
  templateUrl: './select-pagination.html'
})
export class SelectPaginationComponent {
  data: Array<any> = [
    { label: '美国', englishname: 'America', disabled: true },
    { label: '巴西', englishname: 'Brazil', disabled: false },
    { label: '加拿大', englishname: 'Canada', disabled: true },
    { label: '中国', englishname: 'China', disabled: false },
    { label: '法国', englishname: 'France', disabled: true },
    { label: '德国', englishname: 'Germany', disabled: false },
    { label: '日本', englishname: 'Japan' },
    { label: '韩国', englishname: 'South Korea' },
    { label: '土耳其', englishname: 'Turkey' },
    { label: '大不列颠和北爱兰联合王国', englishname: 'United Kingdom' }
  ];

  options: Array<any>;
  value: any;
  totalNumber: number;
  pageSize: TiPageSizeConfig = {
    hide: true,
    size: 20
  };
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // 初始获取 options 下拉数据
    this.getData(1, this.pageSize.size).then((result: any) => {
      this.options = result.data;
      this.totalNumber = result.totalNumber;
    });
  }

  onCurrentPageChange(currentPage: number): void {
    this.getData(currentPage, this.pageSize.size).then((result: any) => {
      this.options = result.data;
    });
  }

  // 模拟异步请求
  private getData(currentPage: number, size: number): Promise<any> {
    const startIndex: number = (currentPage - 1) * size;
    const database: Array<any> = [];
    for (let i: number = 0; i < 500; i++) {
      const item: any = this.data[i % 10];
      database.push({ ...item, label: i + item.label });
    }

    return new Promise((resolve: any, reject: any): any => {
      setTimeout(() => {
        resolve({
          data: database.slice(startIndex, startIndex + size),
          totalNumber: database.length
        });
        // onPush模式下,setTimeout返回数据，需要使用changeDetectorRef.markForCheck()
        // 默认模式下不需要
        this.changeDetectorRef.markForCheck();
      }, 200);
    });
  }
}
