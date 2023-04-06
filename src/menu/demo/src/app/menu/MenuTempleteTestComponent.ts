import { Component } from '@angular/core';
import { TiMenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './menu-templete-test.html'
})
export class MenuTempleteTestComponent {
  labelKey: string = 'title';
  panelMaxWidth: string = '200px';

  options: Array<TiMenuItem> = [];
  options1: Array<TiMenuItem> = this.options;
  options2: Array<TiMenuItem> = this.options;
  constructor() {
    const num: number = 5;

    for (let i: number = 1; i < num; i++) {
      const option: TiMenuItem = {
        label: '',
        title: '',
        disabled: false,
        children: []
      };
      if (i === 1) {
        option.label = '定制行。。。。。。。。。。。。。。。' + '。。。。。。。。。。。。。。。。。。。。。。。';
        option.title = '这是定制行：显示指定key';
        option.disabled = true;
      } else {
        option.label = `第${i}条item1`;
        option.title = `第${i}条title1`;
        option.disabled = false;
      }

      option.children = [];
      for (let j: number = 1; j < num; j++) {
        const option1: TiMenuItem = {
          label: '',
          title: '',
          disabled: false,
          children: []
        };

        if (j === 2) {
          option1.label = '定制行。。。。。。。。。。。。';
          option1.title = '定制行。。。。。。。。。。。。';
          option1.disabled = false;
        } else {
          option1.label = `第${j}条item2`;
          option1.title = `第${j}条title2`;
          option1.disabled = true;
        }

        option1.children = [];
        for (let k: number = 1; k < num; k++) {
          const option2: TiMenuItem = {
            label: '',
            title: '',
            disabled: false,
            groupId: ''
          };
          option2.label = `第${k}条item3`;
          option2.title = `第${k}条title3`;
          option2.disabled = false;
          option2.groupId = k < 2 ? 'a' : k > 3 ? 'b' : 'c';
          option1.children.push(option2);
        }

        option.children.push(option1);
      }

      this.options.push(option);
    }
  }
}
