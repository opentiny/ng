import { ChangeDetectorRef, Component } from '@angular/core';
import { TiSelectComponent, TiListScrollLoad } from '@opentiny/ng';

@Component({
  templateUrl: './select-scroll-load.html',
})
export class SelectScrollLoadComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  optionsTotalNumber: number;
  private size: number = 50;
  private data: Array<any> = [
    {
      label: '美国',
    },
    {
      label: '巴西',
    },
    {
      label: '加拿大',
    },
    {
      label: '中国',
    },
    {
      label: '法国',
    },
    {
      label: '德国',
    },
    {
      label: '日本',
    },
    {
      label: '韩国',
    },
    {
      label: '土耳其',
    },
    {
      label: '大不列颠和北爱兰联合王国',
    },
  ];

  private database: Array<any> = [];
  options: Array<any> = [];
  value: any;

  beforeOpen(selectComp: TiSelectComponent) {
    if (this.options.length === 0) {
      // 第一次打开面板需要从后台获取部分数据
      this.getData(0, this.size).then((result: any) => {
        this.options = result.data; // 下拉数据赋值
        this.optionsTotalNumber = result.totalNumber;
        setTimeout(() => {
          // 有搜索时，在beforeOpen中给 options 赋值后需要延迟再打开面板
          selectComp.open(); // 打开面板
        }, 0);
      });
    } else {
      selectComp.open(); // 非第一次(已经获取到了下拉数据)时直接打开面板
    }
  }

  beforeSearch(selectComp: TiSelectComponent): void {
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();
    this.getData(0, this.size, searchWord).then((result: any) => {
      // 设置搜索结果
      this.options = result.data;
      this.optionsTotalNumber = result.totalNumber;
    });
  }

  loadMore(scrollLoadInfo: TiListScrollLoad, selectComp: TiSelectComponent): void {
    const currentOptions: Array<any> = selectComp.getSearchResult();
    if (currentOptions.length >= this.optionsTotalNumber) {
      return;
    }
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();
    scrollLoadInfo.loading = true;
    this.getData(currentOptions.length, this.size, searchWord).then((result: any) => {
      this.options = [...currentOptions, ...result.data];
      scrollLoadInfo.loading = false;
    });
  }

  // 模拟异步请求
  private getData(startIndex: number, size: number, searchWord?: string): Promise<any> {
    this.database = [];
    for (let i: number = 0; i < 10000; i++) {
      const item: any = this.data[i % 10];
      this.database.push({ ...item, label: i + item.label });
    }

    return new Promise((resolve: any, reject: any): any => {
      setTimeout(() => {
        if (searchWord) {
          const filteredResult: Array<any> = this.database.filter((item: any) => item.label.includes(searchWord));
          const slicedResult: Array<any> = filteredResult.slice(startIndex, startIndex + size);
          const totalNumber: number = filteredResult.length;
          resolve({ data: slicedResult, totalNumber });
        } else {
          resolve({
            data: this.database.slice(startIndex, startIndex + size),
            totalNumber: this.database.length,
          });
        }
        // onPush模式下,setTimeout返回数据，需要使用changeDetectorRef.markForCheck()
        // 默认模式下不需要
        // 服务可根据自身变化检测策略决定是否使用该方法
        this.changeDetectorRef.markForCheck();
      }, 300);
    });
  }
}
