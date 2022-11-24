import { Component } from '@angular/core';
import { SuggestionItem } from './TagsinputPanelwidthComponent';

@Component({
  templateUrl: './tagsinput-null.html',
})
export class TagsinputNullComponent {
  id: string = 'tag';
  selected: Array<SuggestionItem> = [];
}
