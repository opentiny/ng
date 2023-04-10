import { ChangeDetectorRef, Component } from '@angular/core';
import { TiSelectComponent } from '@opentiny/ng';

@Component({
  templateUrl: './select-beforesearch.html'
})
export class SelectBeforesearchTestComponent {
  options: Array<any> = [];
  myOptions1: Array<any> = [];
  value: any;
  mySelecteds1: Array<any>;

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
    { label: '大不列颠和北爱兰联合王国' }
  ];

  baseOptions1: Array<any> = [
    { label: '美国' },
    {
      label: '巴西',
      disabled: true
    },
    { label: '加拿大' },
    { label: '中国' },
    {
      label: '法国',
      disabled: true
    },
    {
      label: '德国',
      disabled: true
    },
    { label: '日本' },
    { label: '韩国' },
    {
      label: '土耳其',
      disabled: true
    },
    {
      label: '大不列颠和北爱兰联合王国'
    }
  ];

  changedOptions: Array<any> = [
    { label: 'America' },
    { label: 'Brazil' },
    { label: 'Canada' },
    { label: 'China' },
    { label: 'France' },
    { label: 'Germany' },
    { label: 'Japan' },
    { label: 'South Korea' },
    { label: 'Turkey' },
    { label: 'United Kingdom' }
  ];
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.options = [...this.baseOptions].slice(0, 3);
    this.myOptions1 = [...this.baseOptions1].slice(0, 3);
    this.value = this.options[2];
    this.mySelecteds1 = [this.myOptions1[1], this.myOptions1[2]];
  }

  onBeforeSearch(selectComp: TiSelectComponent): void {
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();
    this.getData(this.baseOptions, searchWord).then((result: any) => {
      // 设置搜索结果
      this.options = result.data;
    });
  }
  onBeforeSearch1(selectComp: TiSelectComponent): void {
    const searchWord: string = selectComp.getSearchWord();
    this.getData(this.baseOptions1, searchWord).then((result: any) => {
      // 设置搜索结果
      this.myOptions1 = result.data;
    });
  }

  changeOptions(): void {
    this.baseOptions = this.changedOptions;
    this.options = [...this.baseOptions].slice(0, 3);
    this.value = undefined;
  }

  changeOptions1(): void {
    this.baseOptions1 = this.changedOptions;
    this.myOptions1 = [...this.baseOptions1].slice(0, 3);
    this.mySelecteds1 = undefined;
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
            data: [...source.slice(0, 3)]
          });
        }
        // onPush模式下,setTimeout返回数据，需要使用changeDetectorRef.markForCheck()
        // 默认模式下不需要
        // 服务可根据自身变化检测策略决定是否使用该方法
        this.changeDetectorRef.markForCheck();
      }, 500);
    });
  }
}
