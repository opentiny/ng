import { Component } from '@angular/core';
import { TiRadioItem } from '@opentiny/ng';

@Component({
  templateUrl: './radio-label.html'
})
export class RadioLabelComponent {
  fruit: string = '';
  manyRadios: Array<TiRadioItem> = [
    { id: '1', label: '小猪佩奇' },
    { id: '2', label: '小红帽' },
    { id: '3', label: '花木兰' }
  ];
  selected: string = '';
}
