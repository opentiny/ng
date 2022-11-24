import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TipDemoComponent } from './TipContentCompComponent';

@Component({
  templateUrl: './tip-empty.html',
  styleUrls: ['./tipTest.less'],
})
export class TipEmptyComponent implements AfterViewInit {
  // tip内容为string, tip内容为null
  tipStr: string = null;

  // tip内容为组件
  component: any = TipDemoComponent;

  // 获取tip内容模板，实际上获取不到模板时，tipTemplate为undefined
  @ViewChild('tipTempContent') tipTemplate: TemplateRef<any>;

  // 当tip内容是模板时，控制tip是否显示
  showTipTemplate: boolean = true;

  tipTempContext: any = {
    label: 'this is a tip of template.',
  };

  tipCompContext: any = {
    label: 'name:', // 该属性与TipDemoComponent组件中的@Input属性定义对应
    value: 'this is a tip of component.', // 该属性与TipDemoComponent组件中的@Input属性定义对应
    outputs: {
      // 定义在outputs对象中的属性(例如 ok cancel)与TipDemoComponent组件中的@Output属性定义对应
      ok: ($event: string): void => {
      },
      cancel: ($event: string): void => {
      },
    },
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // 处理ExpressionChangedAfterItHasBeenCheckedError报错
    this.cd.detectChanges();
    console.log(this.tipTemplate);
  }

  onClickTemp(event: any): void {
    this.showTipTemplate = !this.showTipTemplate;
    // 处理ExpressionChangedAfterItHasBeenCheckedError报错
    this.cd.detectChanges();
    console.log(this.tipTemplate);
  }

  onClickComp(event: any): void {
    this.component
      ? (this.component = null)
      : (this.component = TipDemoComponent);
    console.log(this.component);
  }

  onClickStr(event: any): void {
    this.tipStr ? (this.tipStr = null) : (this.tipStr = 'tip内容');
    console.log(this.tipStr);
  }
}
