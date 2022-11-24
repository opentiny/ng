import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './searchbox-reactive.html'
})
export class SearchboxReactiveComponent {
  placeholder: string = '请输入内容';
  formControl: FormControl = new FormControl('');
}
