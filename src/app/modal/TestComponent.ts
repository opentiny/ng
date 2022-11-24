import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TiValidationConfig } from '@opentiny/ng';

@Component({
  template: `
    <ti-modal-header>
      <span>I'm a {{ name }} modal!</span>
    </ti-modal-header>
    <ti-modal-body>
      <span>body</span>
      <ti-formfield>
        <ti-item [label]="label">
          <button tiButton type="button">Default</button>
        </ti-item>
        <ti-item [label]="label">
          <textarea
            tiTextarea
            [tiValidation]="myValidationConfig"
            name="aa"
            [(ngModel)]="myValue"
          ></textarea>
        </ti-item>
        <ti-item [label]="label">
          <ti-ip
            tiRequired
            [(ngModel)]="tipValue"
            [tiValidation]="myValidationConfig"
            [version]="4"
            tiIpv4
          >
          </ti-ip>
        </ti-item>
        <ti-item [label]="label">
          <ti-select
            tiRequired
            tiEmail
            [options]="options"
            [(ngModel)]="myValue1"
            [tiValidation]="myValidationConfig"
          >
          </ti-select>
        </ti-item>
        <ti-item [label]="label">
          <input
            autofocus
            tiRequired
            tiEmail
            [tiValidation]="myValidationConfig"
            style="margin-top:400px"
            name="aa"
            tiText
            [(ngModel)]="myValue"
          />
        </ti-item>
      </ti-formfield>
    </ti-modal-body>
    <!-- 可根据是否设置color="danger" 区分主要和次要按钮  -->
    <ti-modal-footer>
      <button type="button" color="danger" (click)="close()" tiButton>
        OK
      </button>
      <button type="button" (click)="dismiss()" tiButton>Cancel</button>
    </ti-modal-footer>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class TestComponent {
  @Input() myValue: string = '';
  @Input() name: string = '';
  value: string = 'sdf';
  placeholder: string = '请输入';
  myValue1: string = '';
  options: Array<any> = [];
  label: string = 'aaa';
  constructor() {
    for (let i: number = 0; i < 20; i++) {
      const option: Object = {
        id: String(i),
        label: `myemail${i}@example.com很长很长`,
        pic: `pic${i}.png`,
        disabled: i % 2 === 1 && i > 10,
      };
      this.options.push(option);
    }
  }
  myValidationConfig: TiValidationConfig = {
    tip: 'should input email',
    type: 'change',
  };
  tipValue: string = '';
  close(): void {}
  dismiss(): void {}
}
