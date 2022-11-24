import { Component } from '@angular/core';

@Component({
  templateUrl: './tag-default.html',
})
export class TagDefaultComponent {
  disabled: boolean = false;
  student1: any = {
    id: 1,
    name: '苏轼',
    age: 36,
  };
  onDelete(data: any): void {
    console.log('onDelete:' + data.name);
  }
  onClick(event: MouseEvent): void {
    console.log('onClick:原生事件');
    console.log(event);
  }
  changeDisabled(): void {
    this.disabled = !this.disabled;
  }
}
