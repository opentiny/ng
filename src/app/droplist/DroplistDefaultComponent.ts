import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TiDroplistComponent } from '@opentiny/ng';

@Component({
  templateUrl: 'droplist-default.html',
})
export class DroplistDefaultComponent implements OnInit {
  model: any;
  model1: any;
  model2: any;
  model3: any;
  options: Array<any> = [];
  options1: Array<any> = [];

  ngOnInit(): void {
    for (let i: number = 0; i < 5; i++) {
      const option: any = {
        id: i + '',
        label: 'label_' + i,
        pic: `pic${i}.png`,
      };
      this.options.push(option);
    }

    for (let i: number = 0; i < 2000; i++) {
      const option: any = {
        id: i + '',
        label: 'label_' + i,
        pic: `pic${i}.png`,
      };
      this.options1.push(option);
    }
  }

  onFocus(droplist: TiDroplistComponent): void {
    droplist.show();
  }

  onBlur(droplist: TiDroplistComponent): void {
    droplist.hide();
  }

  changeNoData(): void {
    this.options = [];
    this.options1 = [];
  }
}
