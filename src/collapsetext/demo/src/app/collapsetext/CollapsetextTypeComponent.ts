import { Component } from '@angular/core';

@Component({
  templateUrl: './collapsetext-type.html'
})
export class CollapsetextTypeComponent {
  label: string = '标题下展';
  type: 'title' | 'content' = 'title';
  label1: string = '内容下展';
  type1: 'title' | 'content' = 'content';
}
