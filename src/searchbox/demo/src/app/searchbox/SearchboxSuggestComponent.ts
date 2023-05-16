import { Component, OnDestroy } from '@angular/core';
import { TiSearchboxComponent } from '@opentiny/ng';

@Component({
  templateUrl: './searchbox-suggest.html'
})
export class SearchboxSuggestComponent implements OnDestroy {
  value: string = '';
  value1: string = '';
  value2: string = '3345266';
  timeout: any;

  onSuggest(searchbox: TiSearchboxComponent): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    searchbox.setSuggestions(this.getSuggestion(searchbox.model));
  }

  onSuggest1(searchbox: TiSearchboxComponent): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    searchbox.setLoading(true);
    // 模拟后台异步请求
    this.getData(searchbox.model).then((result: any) => {
      searchbox.setLoading(false);
      searchbox.setSuggestions(result.data);
    });
  }

  onSuggest2(searchbox: TiSearchboxComponent): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    searchbox.setLoading(true);
    // 模拟后台异步请求
    this.getNoData(searchbox.model).then((result: any) => {
      searchbox.setLoading(false);
      searchbox.setSuggestions(result.data);
    });
  }

  private getSuggestion(value: string): Array<any> {
    const options: Array<any> = value
      ? [
          {
            label: value + '@a.com'
          },
          {
            label: value + '@b.com'
          },
          {
            label: value + '@c.com'
          },
          {
            label: value + '@d.com'
          },
          {
            label: value + '@e.com'
          },
          {
            label: value + '@f.com'
          }
        ]
      : [
          {
            label: '@a.com'
          },
          {
            label: '@b.com'
          },
          {
            label: '@c.com'
          },
          {
            label: '@d.com'
          },
          {
            label: '@e.com'
          },
          {
            label: '@f.com'
          }
        ];

    return options;
  }

  private getData(searchWord: string): Promise<any> {
    return new Promise((resolve: any, reject: any): any => {
      let result: Array<any> = this.getSuggestion(searchWord);
      this.timeout = setTimeout(() => {
        resolve({ data: result });
      }, 1500);
    });
  }

  private getNoData(searchWord: string): Promise<any> {
    return new Promise((resolve: any, reject: any): any => {
      this.timeout = setTimeout(() => {
        resolve({ data: [] });
      }, 1500);
    });
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
