import { Component } from '@angular/core';

@Component({
  templateUrl: './textarea-none.html',
})
export class TextareaNoneComponent {
  value: string = '123';
  show: boolean = false;
  changeShow = (): void => {
    this.show = !this.show;
  };
}
