import { Component } from '@angular/core';
import { TiSearchboxComponent } from '@opentiny/ng';

@Component({
  templateUrl: './searchbox-virtualscroll.html'
})
export class SearchboxVirtualscrollComponent {
  value: string = '';
  suggestions: Array<any> = [
    {
      label: '华北'
    },
    {
      label: '华南'
    },
    {
      label: '西北'
    },
    {
      label: '西南'
    }
  ];

  onSuggest(searchbox: TiSearchboxComponent): void {
    // 模拟后台异步请求
    setTimeout(() => {
      searchbox.setSuggestions(this.getSuggestion(searchbox.model));
    }, 200);
  }

  private getSuggestion(value: string): Array<any> {
    const options: Array<any> = [];

    for (let i: number = 0; i < 10000; i++) {
      const item: any = this.suggestions[i % 4];
      options.push({ label: `${item.label}${i}${value}` });
    }

    return options;
  }
}
