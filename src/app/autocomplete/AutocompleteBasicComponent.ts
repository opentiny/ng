import { Component } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-basic.html',
})
export class AutocompleteBasicComponent {
  optionsValue: string = '';
  suggestValue: string = '';
  backendValue: string = '';

  options: Array<object> = [
    {
      label: '华北',
    },
    {
      label: '华南',
    },
    {
      label: '西北',
    },
    {
      label: '西南',
    },
  ];

  // 设置建议项
  onSuggest(autocomplete: TiAutocompleteComponent): void {
    const suggestions: Array<object> = this.getSuggestionData(
      autocomplete.model
    );
    autocomplete.setSuggestions(suggestions); // 关键点
  }

  // 设置建议项
  onBackendSuggest(autocomplete: TiAutocompleteComponent): void {
    // 模拟后台异步请求
    setTimeout(() => {
      const suggestions: Array<object> = this.getSuggestionData(
        autocomplete.model
      );
      autocomplete.setSuggestions(suggestions); // 关键点
    }, 200);
  }

  private getSuggestionData(value: string): Array<object> {
    let options: Array<object>
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['@example.com', '@example1.com', '@example2.com'].map(domain => {
        return {label: `${value}@${domain}`};
      });
    }
    return options;
  }
}
