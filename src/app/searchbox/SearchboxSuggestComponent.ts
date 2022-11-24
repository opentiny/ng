import { Component } from '@angular/core';
import { TiSearchboxComponent } from '@opentiny/ng';

@Component({
  templateUrl: './searchbox-suggest.html',
})
export class SearchboxSuggestComponent {
  value: string = '';

  onSuggest(searchbox: TiSearchboxComponent): void {
    searchbox.setSuggestions(this.getSuggestion(searchbox.model));
  }

  private getSuggestion(value: string): Array<any> {
    const options: Array<any> = value
      ? [
          {
            label: value + '@example.com'
          },
          {
            label: value + '@example.com'
          },
          {
            label: value + '@example.com'
          }
        ]
      : [];

    return options;
  }
}
