import { Component } from '@angular/core';

@Component({
  templateUrl: './foldtext-basic.html'
})
export class FoldtextBasicComponent {
  texts: Array<string> = [];
  ngOnInit(): void {
    this.texts = ['《送元二使安西》——王维(唐)', '渭城朝雨悒轻尘,', '客舍青青柳色新。', '劝君更尽一杯酒,', '西出阳关无故人。'];
  }
}
