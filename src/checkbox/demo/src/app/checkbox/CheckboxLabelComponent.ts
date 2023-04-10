import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkbox-label.html'
})
export class CheckboxLabelComponent {
  items: Array<TiCheckboxItem> = [
    { id: '1', label: '小猪佩琪' },
    { id: '2', label: '小红帽' },
    { id: '3', label: '花木兰' }
  ];
  value: Array<any> = [];
}
