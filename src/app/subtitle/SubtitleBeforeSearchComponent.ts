import { ChangeDetectorRef, Component } from '@angular/core';
import { TiSelectComponent, TiSubtitleItem, TiSubtitleListScrollLoad } from '@opentiny/ng';

@Component({
  templateUrl: './subtitle-before-search.html'
})

export class SubtitleBeforeSearchComponent {
    private size: number = 50;
    private data: Array<any> = [
      { label: '购买弹性云服务器购买弹性云服务器购买弹性云服务器' },
      { label: '美国' },
      { label: '巴西' },
      { label: '加拿大' },
      { label: '中国'  },
      { label: '法国'  },
      { label: '德国'  },
      { label: '韩国' },
      { label: '土耳其' },
      { label: '大不列颠和北爱兰联合王国' }
    ];
    private database: Array<TiSubtitleItem>;
    totalNumber: number;
    items: Array<TiSubtitleItem> = [];
    selected: TiSubtitleItem = { label: '69' + this.data[9].label };
    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getData(0, this.size).then((result: any) => {
            this.items = result.data;
            this.totalNumber = result.totalNumber;
        });
    }

    beforeSearch(selectComp: TiSelectComponent): void {
        // 获取搜索内容
        const searchWord: string = selectComp.getSearchWord();
        this.getData(0, this.size, searchWord).then((result: any) => {
            this.items = result.data;
            this.totalNumber = result.totalNumber;
        });
    }

    loadMore(scrollLoadInfo: TiSubtitleListScrollLoad): void {
        const currentOptions: Array<any> = scrollLoadInfo.selectInstance.getSearchResult();
        if (currentOptions.length >= this.totalNumber) {
            return;
        }
        // 获取搜索内容
        const searchWord: string = scrollLoadInfo.selectInstance.getSearchWord();
        scrollLoadInfo.loading = true;
        this.getData(currentOptions.length, this.size, searchWord).then((result: any) => {
            this.items = [...currentOptions, ...result.data];
            scrollLoadInfo.loading = false;
        });
    }

    // 模拟异步请求
    private getData(startIndex: number, size: number, searchWord?: string): Promise<any> {
        this.database = [];
        for (let i: number = 0; i < 10000; i++) {
            const item: any = this.data[i % 10];
            this.database.push({ ...item,  label: i + item.label });
        }

        return new Promise((resolve: any, reject: any): any => {
            setTimeout(() => {
                if (searchWord) {
                    const filteredResult: Array<any> = this.database.filter((item: any) => item.label.includes(searchWord));
                    const slicedResult: Array<any> =
                        filteredResult.slice(startIndex, startIndex + size);
                    const totalNumber: number = filteredResult.length;
                    resolve({ data: slicedResult, totalNumber});
                } else {
                    resolve({
                        data: this.database.slice(startIndex, startIndex + size),
                        totalNumber: this.database.length
                    });
                }
                // onPush模式下,setTimeout返回数据，需要使用changeDetectorRef.markForCheck()
                // 默认模式下不需要
                // 服务可根据自身变化检测策略决定是否使用该方法
                this.changeDetectorRef.markForCheck();
            }, 1000);
        });
    }
}
