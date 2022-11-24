import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  templateUrl: './tip-content-comp.html',
})
export class TipContentCompComponent {
  myLogs: Array<string> = [];
  // 定义组件类型
  component: any = TipDemoComponent;

  // 定义tip显示内容的上下文
  tipContext: any = {
    label: 'Are you sure delete this task?', // 该属性与TipDemoComponent组件中的@Input属性定义对应
    outputs: {
      // 定义在outputs对象中的属性(例如 ok cancel)与TipDemoComponent组件中的@Output属性定义对应
      ok: ($event: string): void => {
        this.myLogs = [...this.myLogs, `ok() event = ${$event}`];
      },
      cancel: ($event: string): void => {
        this.myLogs = [...this.myLogs, `cancel() event = ${$event}`];
      },
    },
  };
}

// 自定义组件，此处为了方便demo展示与tip生成组件写在同一文件，项目中请将组件单独写在一个文件中
@Component({
  template: `
    <ti-icon local class="text-yellow-500" name="warn"></ti-icon>
    <span class="ml-4">{{ label }}</span>
    <div class="mt-4">
      <button type="button" tiButton size="small" (click)="onOk()">ok</button>
      <button
        class="ml-4"
        type="button"
        tiButton
        size="small"
        (click)="onCancel()"
      >
        cancel
      </button>
    </div>
  `,
})
export class TipDemoComponent {
  // 定义元素属性，该属性可作为Tip上下文使用
  @Input() label: string;
  @Output() readonly ok: EventEmitter<string> = new EventEmitter();
  @Output() readonly cancel: EventEmitter<string> = new EventEmitter();

  onOk(): void {
    this.ok.emit('ok event');
  }

  onCancel(): void {
    this.cancel.emit('cancel event');
  }
}
