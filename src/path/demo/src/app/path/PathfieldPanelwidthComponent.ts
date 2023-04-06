import { Component } from '@angular/core';
import { TiPathFieldItem } from '@opentiny/ng';

@Component({
  templateUrl: './pathfield-panelwidth.html'
})
export class PathfieldPanelwidthComponent {
  panelWidth: string = '100px';
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
