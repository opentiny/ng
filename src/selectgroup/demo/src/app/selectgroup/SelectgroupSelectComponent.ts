import { Component } from '@angular/core';
import { TiSelectgroupItem } from '@opentiny/ng';

@Component({
  templateUrl: './selectgroup-select.html'
})
export class SelectgroupSelectComponent {
  items: Array<TiSelectgroupItem> = [
    {
      title: 'Angular',
      options: [{ label: '^13.0.0' }, { label: '^14.0.0' }, { label: '^15.0.0' }],
      iconName: 'logo-angular'
    },
    {
      title: 'HTML5',
      options: [{ label: 'html5' }],
      iconName: 'logo-html5'
    }
  ];
  value: TiSelectgroupItem;
}
