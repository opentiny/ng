import { Component } from '@angular/core';

@Component({
  templateUrl: 'searchbox-notsearch.html',
})
export class SearchboxNotsearchComponent {
  searchWord: string = '';
  myLogs: Array<string> = [];

  modelChange(value: string): void {
    this.myLogs = [...this.myLogs, `changed Value: ${value}`];
  }
}
