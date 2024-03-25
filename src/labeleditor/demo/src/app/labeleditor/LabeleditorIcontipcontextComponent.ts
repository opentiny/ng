import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  templateUrl: './labeleditor-icontipcontext.html',
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
export class LabeleditorIconTipContextComponent {
  label: string = '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪,君不见高堂明镜悲白发，朝如青丝暮成雪';
  componentClass: any = TemplateComponent;
  myLogs: Array<string> = [];
  // 定义tip显示内容的上下文
  tipContext: any = {
    label: 'Click here to edit!', // 该属性与TemplateComponent组件中的@Input属性定义对应
    outputs: {
      // 定义在outputs对象中的属性(例如click)与TemplateComponent组件中的@Output属性定义对应
      click: ($event: string): void => {
        this.myLogs = [...this.myLogs, `on ${$event}`];
      }
    }
  };

  iconContext: string = '这是一个 template';
}
// 自定义组件，此处为了方便demo展示与tip生成组件写在同一文件，项目中请将组件单独写在一个文件中
@Component({
  template: `
    <ti-icon local class="text-yellow-500" name="warn"></ti-icon>
    <span class="ml-4">{{ label }}</span>
    <div class="mt-4">
      <button id="labeleditor-iconTipContext-button" type="button" tiButton size="small" (click)="onClick()">button</button>
    </div>
  `
})
export class TemplateComponent {
  @Input() label: string;
  @Output() readonly click: EventEmitter<string> = new EventEmitter();

  onClick(): void {
    this.click.emit('click');
  }
}
