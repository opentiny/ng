import { Component } from '@angular/core';
import { TiAutocompleteComponent } from '@opentiny/ng';

@Component({
  templateUrl: './autocomplete-events.html',
})
export class AutocompleteEventsComponent {

  myLogs: Array<string> = [];
  value: string = '';

  onFocus(): void {
    this.myLogs = [...this.myLogs, 'on focus'];
  }
  onBlur(): void {
    this.myLogs = [...this.myLogs, 'on blur'];
  }
  onChange(value: string): void {
    this.myLogs = [...this.myLogs, `input value: ${value}`];
  }
  onClear(event: MouseEvent): void {
    this.myLogs = [...this.myLogs, `on clear: ${this.value}`];
  }
  onSelect(option: any): void {
    this.myLogs = [...this.myLogs, `select: ${JSON.stringify(option)}`];
  }

  // 设置建议项
  onSuggest(autocomplete: TiAutocompleteComponent): void {
    const suggestions: Array<object> = this.getSuggestionData(
      autocomplete.model
    );
    autocomplete.setSuggestions(suggestions); // 关键点
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
