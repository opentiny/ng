import { Component } from '@angular/core';
import { TiSearchboxComponent } from '@opentiny/ng';

@Component({
  templateUrl: './searchbox-test.html',
})
export class SearchboxTestComponent {
  value: string = '';
  disabled: boolean = true;
  value1: string = '2234244';
  placeholderText: string = '请输入关键字';
  maxlength: number = 10;
  myLogs: Array<string> = [];
  private static getSuggestion(value: string): Array<any> {
    const options: Array<any> = value
      ? [
          {
            label: value + '1',
          },
          {
            label: value + value,
          },
          {
            label: value + value + value,
          },
        ]
      : [
          {
            label: 'a',
          },
          {
            label: 'b',
          },
          {
            label: 'c',
          },
        ];

    return options;
  }
  changeSearch(): void {
    this.value1 = 'aaa';
  }
  onFocus(): any {
    this.myLogs = [...this.myLogs, 'on focus'];
  }
  onBlur(): any {
    this.myLogs = [...this.myLogs, 'on blur'];
  }
  search = (value: string): any => {
    this.myLogs = [...this.myLogs, `search value: ${value}`];
  }
  onInputChange(searchbox: TiSearchboxComponent): void {
    setTimeout(() => {
      searchbox.setSuggestions(
        SearchboxTestComponent.getSuggestion(searchbox.model)
      );
    }, 500);
  }
}
