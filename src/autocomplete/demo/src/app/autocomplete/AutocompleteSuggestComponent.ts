import { Component, OnDestroy } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-suggest.html'
})
export class AutocompleteSuggestComponent implements OnDestroy {
  value1: string = '';
  value2: string = '';
  timeout: any;

  // 设置建议项-加载有数据
  onSuggest1(autocomplete: TiAutocompleteComponent): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    autocomplete.setLoading(true);
    // 模拟后台异步请求
    this.getData(autocomplete.model).then((result: any) => {
      autocomplete.setLoading(false);
      autocomplete.setSuggestions(result.data);
    });
  }

  // 设置建议项-加载无数据
  onSuggest2(autocomplete: TiAutocompleteComponent): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    autocomplete.setLoading(true);
    // 模拟后台异步请求
    this.getNoData(autocomplete.model).then((result: any) => {
      autocomplete.setLoading(false);
      autocomplete.setSuggestions(result.data);
    });
  }

  private getSuggestionData(value: string): Array<object> {
    const options: Array<object> = value
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

  private getData(inputValue: string): Promise<any> {
    return new Promise((resolve: any, reject: any): any => {
      let result: Array<any> = this.getSuggestionData(inputValue);
      this.timeout = setTimeout(() => {
        resolve({ data: result });
      }, 1500);
    });
  }

  private getNoData(inputValue: string): Promise<any> {
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
