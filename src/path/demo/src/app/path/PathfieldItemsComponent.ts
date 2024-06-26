import { Component } from '@angular/core';
import { TiPathFieldItem } from '@opentiny/ng';

@Component({
  templateUrl: './pathfield-items.html'
})
export class PathfieldItemsComponent {
  items: Array<TiPathFieldItem> = [
    {
      label: 'window'
    },
    {
      label: 'document'
    },
    {
      label: 'body'
    },
    {
      label: 'container'
    },
    {
      label: 'content'
    }
  ];
}
