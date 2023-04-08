import { Component } from '@angular/core';
import { TiSelectgroupItem } from '@opentiny/ng';

@Component({
  templateUrl: './selectgroup-template.html'
})
export class SelectgroupTemplateComponent {
  items: Array<TiSelectgroupItem> = [
    {
      title: 'Angular',
      content: '^15.0.0',
      iconName: 'logo-angular'
    },
    {
      title: 'HTML5',
      content: 'html5',
      iconName: 'logo-html5'
    }
  ];
  value: TiSelectgroupItem;
}
