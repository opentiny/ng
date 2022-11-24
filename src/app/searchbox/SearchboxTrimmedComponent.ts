import { Component } from '@angular/core';

@Component({
  templateUrl: './searchbox-trimmed.html'
})
export class SearchboxTrimmedComponent {
  value: string;
  searchContent: string = '';
  onSearch(value: string): void {
    this.searchContent = value;
  }
  onModelChange(value: string): void {
    this.searchContent = value;
  }
}
