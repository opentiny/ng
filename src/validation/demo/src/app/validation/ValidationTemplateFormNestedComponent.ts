import { Component, ElementRef } from '@angular/core';
import { ControlContainer, FormGroup, NgForm, ValidationErrors } from '@angular/forms';
import { TiValidators } from '@opentiny/ng';

@Component({
  templateUrl: './validation-template-form-nested.html'
})
export class ValidationTemplateFormNestedComponent {
  value1: string = 'a';
  value2: string = '';
  value3: string = 'b';
  value4: string = '';

  constructor(private elementRef: ElementRef) {}

  // 表单整体校验，通过调用check方法实现整体校验的相关呈现
  checkGroup(form: FormGroup): void {
    console.log(form.controls);
    const errors: ValidationErrors | null = TiValidators.check(form);
    console.log(errors);

    // 整体校验后如果需要聚焦到第一个校验不通过元素，请参考以下代码
    if (errors) {
      const firstError: any = Object.keys(errors)[0];
      this.elementRef.nativeElement.querySelector(`[name=${firstError}]`).focus();
    }
  }
}

@Component({
  selector: 'custom-child1-test',
  template: `
    <div style="width: 200px;border: 1px solid #ccc">
      <p>子组件区域：</p>
      <input tiValidation tiEqual="cc" name="child11" [(ngModel)]="value1" tiText /><br /><br />
      <input tiValidation tiRequired name="child12" [(ngModel)]="value2" tiText />
    </div>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // 有该行的配置时，才会将该组件中的表单控件添加到父级组件的 FormGroup(NgForm) 中去
})
export class CustomChild1TestComponent {
  value1: string = 'c';
  value2: string = '';
}

@Component({
  selector: 'custom-child2-test',
  template: `
    <div style="width: 200px;border: 1px solid #ccc">
      <p>子组件区域：</p>
      <!-- ngModelGroup 可以使其下的表单控件自成一组(FormGroup), 它会作为父级组件的 FormGroup中的一个子FormGroup -->
      <div ngModelGroup="child">
        <input tiValidation tiEqual="cc" name="child21" [(ngModel)]="value1" tiText />
        <input tiValidation tiRequired name="child22" [(ngModel)]="value2" tiText />
      </div>
    </div>
  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }] // 有该行的配置时，才会将该组件中的表单控件添加到父级组件的 FormGroup(NgForm) 中去
})
export class CustomChild2TestComponent {
  value1: string = 'c';
  value2: string = '';
}
