import { Component } from '@angular/core';

@Component({
  templateUrl: './collapsebutton-customtext.html'
})
export class CollapsebuttonCustomtextComponent {
  collapsed: boolean = false;
  customText: string = '自定义按钮文本';
}
