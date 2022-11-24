import { Component } from '@angular/core';

@Component({
  templateUrl: './tagsinput-labelkey.html',
})
export class TagsinputLabelkeyComponent {
  suggestions: Array<any> = [
    { id: '1', label: '中文', english: 'Chinese' },
    { id: '2', label: '英文', english: 'English' },
    { id: '3', label: '拉美西语', english: 'Latin American' },
    { id: '4', label: '欧洲西语', english: 'European Spanish' },
    { id: '5', label: '法语', english: 'French' },
    { id: '6', label: '葡萄牙语', english: 'Portuguese' },
  ];
  selected: Array<any> = [this.suggestions[0]];
}
