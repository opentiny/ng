import { Component } from '@angular/core';
import { TiPathFieldItem } from '@opentiny/ng';

@Component({
  templateUrl: './pathfield-editable.html'
})
export class PathfieldEditableComponent {
  editable: boolean = false;
  keepEditState: boolean = true;
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
  items1: Array<TiPathFieldItem> = [
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
