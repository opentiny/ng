import { Component } from '@angular/core';

@Component({
  templateUrl: './searchbox-appendtobody.html'
})
export class SearchboxAppendtobodyComponent {
  value: string = '';
  options: Array<object> = [{ label: '华北' }, { label: '华南' }, { label: '西北' }, { label: '西南' }];
}
