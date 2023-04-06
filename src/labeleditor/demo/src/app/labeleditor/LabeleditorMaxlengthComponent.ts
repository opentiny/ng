import { Component } from '@angular/core';

@Component({
  templateUrl: './labeleditor-maxlength.html',
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
export class LabeleditorMaxlengthComponent {
  label: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  label1: string = '限制文本长度';
  maxlength: number = 10;
}
