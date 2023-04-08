import { Component, ChangeDetectorRef } from '@angular/core';
import { TiPageSizeConfig, TiSelectComponent } from '@opentiny/ng';

@Component({
  templateUrl: './select-pagin-beforesearch.html'
})
export class SelectPaginBeforesearchComponent {
  constructor(private cdRef: ChangeDetectorRef) {}
  private database: Array<any> = [
    { label: 'America', disabled: true },
    { label: 'Brazil' },
    { label: 'Canada', disabled: true },
    { label: 'China' },
    { label: 'France', disabled: true },
    { label: 'Germany' },
    { label: 'Japan' },
    { label: 'South Korea' },
    { label: 'Turkey' },
    { label: 'United Kingdom' }
  ];
  private data: Array<any>;
  myOptions1: Array<any>;
  myOptions2: Array<any>;
  myOptions3: Array<any>;
  myOptions4: Array<any>;

  mySelected1: any;
  mySelected2: any;
  mySelected3: Array<any> = [{ label: '3China' }];
  mySelected4: Array<any> = [{ label: '3China' }];

  totalNumber1: number;
  totalNumber2: number;
  totalNumber3: number;
  totalNumber4: number;

  currentPage1: number = 1;
  currentPage2: number = 1;
  currentPage3: number = 1;
  currentPage4: number = 1;

  pageSize: TiPageSizeConfig = {
    hide: true,
    // 如果想修改size，需要配置pageSize.option数组，size是option数组的一项，具体参考TiPaginationComponent组件API说明。
    size: 5,
    options: [5, 10]
  };

  ngOnInit(): void {
    this.getdatas(this.currentPage1).then((result) => {
      this.myOptions1 = result.data;
      this.totalNumber1 = result.totalNumber;
    });

    this.getdatas(this.currentPage3).then((result) => {
      this.myOptions3 = result.data;
      this.totalNumber3 = result.totalNumber;
    });
  }

  onCurrentPageChange1(currentPage: number, selectComp: TiSelectComponent): void {
    // 模拟后台分页
    this.getdatas(currentPage, selectComp.getSearchWord()).then((result) => {
      this.myOptions1 = result.data;
    });
  }

  onBeforeSearch1(selectComp: TiSelectComponent): void {
    console.log('onBeforeSearch1'); // 为了展示onBeforeSearch事件触发了几次
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();

    this.currentPage1 = 1;
    // 模拟后台搜索
    this.getdatas(this.currentPage1, searchWord).then((result) => {
      this.myOptions1 = result.data;
      this.totalNumber1 = result.totalNumber;
    });
  }

  onBeforeOpen2(selectComp: TiSelectComponent): void {
    // this.currentPage2 = 1; 每次重新打开下拉列表，需要显示第几页数据就请求第几页数据，并更新currentPage
    this.getdatas(this.currentPage2).then((result) => {
      this.myOptions2 = result.data;
      this.cdRef.detectChanges();
      this.totalNumber2 = result.totalNumber;
      selectComp.open();
    });
  }

  onCurrentPageChange2(currentPage: number, selectComp: TiSelectComponent): void {
    // 模拟后台分页
    this.getdatas(currentPage, selectComp.getSearchWord()).then((result) => {
      this.myOptions2 = result.data;
    });
  }

  onBeforeSearch2(selectComp: TiSelectComponent): void {
    console.log('onBeforeSearch2'); // 为了展示onBeforeSearch事件触发了几次
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();

    this.currentPage2 = 1;
    // 模拟后台搜索
    this.getdatas(this.currentPage2, searchWord).then((result) => {
      this.myOptions2 = result.data;
      this.totalNumber2 = result.totalNumber;
    });
  }

  onCurrentPageChange3(currentPage: number, selectComp: TiSelectComponent): void {
    // 模拟后台分页
    this.getdatas(currentPage, selectComp.getSearchWord()).then((result) => {
      this.myOptions3 = result.data;
    });
  }

  onBeforeSearch3(selectComp: TiSelectComponent): void {
    console.log('onBeforeSearch3'); // 为了展示onBeforeSearch事件触发了几次
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();

    this.currentPage3 = 1;
    // 模拟后台搜索
    this.getdatas(this.currentPage3, searchWord).then((result) => {
      this.myOptions3 = result.data;
      this.totalNumber3 = result.totalNumber;
    });
  }

  onBeforeOpen4(selectComp: TiSelectComponent): void {
    // this.currentPage4 = 1; 每次重新打开下拉列表，需要显示第几页数据就请求第几页数据，并更新currentPage
    this.getdatas(this.currentPage4).then((result) => {
      this.myOptions4 = result.data;
      this.cdRef.detectChanges();
      this.totalNumber4 = result.totalNumber;
      selectComp.open();
    });
  }

  onCurrentPageChange4(currentPage: number, selectComp: TiSelectComponent): void {
    // 模拟后台分页
    this.getdatas(currentPage, selectComp.getSearchWord()).then((result) => {
      this.myOptions4 = result.data;
    });
  }

  onBeforeSearch4(selectComp: TiSelectComponent): void {
    console.log('onBeforeSearch4'); // 为了展示onBeforeSearch事件触发了几次
    // 获取搜索内容
    const searchWord: string = selectComp.getSearchWord();

    this.currentPage4 = 1;
    // 模拟后台搜索
    this.getdatas(this.currentPage4, searchWord).then((result) => {
      this.myOptions4 = result.data;
      this.totalNumber4 = result.totalNumber;
    });
  }

  private getdatas(pageNumber?: number, searchWord?: string): Promise<any> {
    this.data = [];
    for (let i: number = 0; i < 136; i++) {
      const item: any = this.database[i % 10];
      this.data.push({ ...item, label: i + item.label });
    }
    const promise: Promise<any> = new Promise((resolve: any, rejects: any): void => {
      setTimeout(() => {
        if (pageNumber === undefined && searchWord === undefined) {
          rejects(new Error('没有参数'));
        }
        if (searchWord) {
          const filteredResult: Array<any> = this.data.filter((item) => item.label.toLowerCase().includes(searchWord.toLowerCase()));
          const slicedResult: Array<any> = filteredResult.slice(this.pageSize.size * (pageNumber - 1), this.pageSize.size * pageNumber);
          const totalNumber: number = filteredResult.length;
          resolve({ data: slicedResult, totalNumber });
        } else if (pageNumber) {
          resolve({
            data: this.data.slice(this.pageSize.size * (pageNumber - 1), this.pageSize.size * pageNumber),
            totalNumber: this.data.length
          });
        }
      }, 300);
    });

    return promise;
  }
}
