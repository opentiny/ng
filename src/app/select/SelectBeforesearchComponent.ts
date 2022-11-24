import { ChangeDetectorRef, Component } from '@angular/core';
import { TiSelectComponent } from '@opentiny/ng';

@Component({
  templateUrl: './select-beforesearch.html',
})
export class SelectBeforesearchComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  options: Array<any> = [];
  value: any;
  baseOptions: Array<any> = [
    { label: '美国' },
    { label: '巴西' },
    { label: '加拿大' },
    { label: '中国' },
    { label: '法国' },
    { label: '德国' },
    { label: '日本' },
    { label: '韩国' },
    { label: '土耳其' },
    {
      label: '大不列颠和北爱兰联合王国'
    },
  ];

  ngOnInit(): void {
    this.options = [...this.baseOptions].slice(0, 3);
    this.value = this.options[2];
  }

  onBeforeSearch(selectComp: TiSelectComponent): void {
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();
    this.getData(this.baseOptions, searchWord).then((result: any) => {
      // 设置搜索结果
      this.options = result.data;
    });
  }

  // 模拟异步请求
  private getData(source: Array<any>, searchWord: string): Promise<any> {
    return new Promise((resolve: any, reject: any): any => {
      setTimeout(() => {
        if (searchWord) {
          const filteredResult: Array<any> = source.filter(
            (item: any) => item.label.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1
          );
          resolve({ data: filteredResult });
        } else {
          resolve({
            data: [...source.slice(0, 3)],
          });
        }
        // onPush模式下,setTimeout返回数据，需要使用changeDetectorRef.markForCheck()
        // 默认模式下不需要
        this.changeDetectorRef.markForCheck();
      }, 500);
    });
  }
}
