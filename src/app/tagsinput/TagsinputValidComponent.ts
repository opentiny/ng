import { Component } from '@angular/core';
import { SuggestionItem } from './TagsinputPanelwidthComponent';

@Component({
  templateUrl: './tagsinput-valid.html',
})
export class TagsinputValidComponent {
  suggestions: Array<SuggestionItem> = [
    { id: '1', label: '中文 Chinese' },
    { id: '2', label: '英文 English' },
    { id: '3', label: '拉美西语 Latin American' },
    { id: '4', label: '欧洲西语 European Spanish' },
    { id: '5', label: '法语 French' },
    { id: '6', label: '葡萄牙语 Portuguese' },
  ];

  selected: Array<SuggestionItem> = [this.suggestions[0]];
}
