import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './datedominator.html', // 指定组件模板
  styleUrls: ['./datedominator.less'], // 样式路径
  encapsulation: ViewEncapsulation.None,
})
export class DateDominatorComponent {
  containerWidth: string = '200px';
  model: string = '2018/12/5';
  model1: string = '2011-07-02 ─ 2017-09-27';
  format: string = 'yyyy-MM-dd';
  clear: boolean = true;
  clear1: boolean = true;
  disabled: boolean = true;

  clearClick(): void {
    if (this.disabled) {
      console.log('点击删除按钮');
      return;
    }
    this.clear = false;
    this.model = null;
    console.log('点击删除按钮');
  }

  clickFn(): void {
    console.log('点击dominator');
  }

  clearClick1(): void {
    this.clear1 = false;
    this.model1 = null;
    console.log('点击删除按钮');
  }

  clickFn1(): void {
    console.log('点击dominator');
  }

  showLineClick(): void {
    this.model1 = '2011-07-02 ─ 2017-09-27';
  }

  showLineClick1(): void {
    this.model1 = '';
  }
}
