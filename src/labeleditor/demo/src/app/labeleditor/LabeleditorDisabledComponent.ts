import { Component } from '@angular/core';

@Component({
  templateUrl: './labeleditor-disabled.html',
  styles: [
    `
      .demo-labeleditor-container {
        line-height: 30px;
        max-width: 300px;
        display: inline-block;
      }
    `
  ]
})
export class LabeleditorDisabledComponent {
  label: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  iconTip: string = '当前为受限状态，不可编辑';
  disabled: boolean = true;
}
