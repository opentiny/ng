import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TiValidationConfig, TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './labeleditor-validation.html',
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
export class LabeleditorValidationComponent {
  label: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  label1: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  control: FormControl = new FormControl(this.label);
  validation: TiValidationConfig = {
    tip: '请输入'
  };
  validationRules: any = [TiValidators.equal('aa'), TiValidators.required];
}
