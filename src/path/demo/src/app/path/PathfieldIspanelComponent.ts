import { Component } from '@angular/core';
import { TiPathFieldItem } from '@opentiny/ng';

@Component({
  templateUrl: './pathfield-ispanel.html'
})
export class PathfieldIspanelComponent {
  isPanel: boolean = true;
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
