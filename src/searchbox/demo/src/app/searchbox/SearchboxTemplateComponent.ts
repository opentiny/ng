import { Component } from '@angular/core';
import { TiSearchboxComponent } from '@opentiny/ng';

@Component({
  templateUrl: './searchbox-template.html'
})
export class SearchboxTemplateComponent {
  value: string = '';
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];

  onSuggest(searchbox: TiSearchboxComponent): void {
    searchbox.setSuggestions(this.getSuggestion(searchbox.model));
  }

  private getSuggestion(value: string): Array<any> {
    const options: Array<any> = value
      ? [
          {
            label: value + '@example.com',
            url: `${this.baseUrl}assets/food/cake.png`
          },
          {
            label: value + '@example.com',
            url: `${this.baseUrl}assets/food/coffee.png`
          },
          {
            label: value + '@example.com',
            url: `${this.baseUrl}assets/food/cola.png`
          }
        ]
      : [];

    return options;
  }
}
