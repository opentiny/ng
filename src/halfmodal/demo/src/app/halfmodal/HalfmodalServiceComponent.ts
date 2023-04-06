import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';
import { TiHalfmodalService } from '@opentiny/ng';
@Component({
  templateUrl: './halfmodal-service.html'
})
export class HalfmodalServiceComponent {
  constructor(private tiHalfmodalservice: TiHalfmodalService) {}
  @ViewChild('service1', { static: false }) tempRef: TemplateRef<any>;
  @ViewChild('service2', { static: false }) templateRef: TemplateRef<any>;

  myOptions: Array<any> = selectOptions;
  items: Array<TiButtonItem> = buttongroupItems;
  myLogs: Array<string> = [];

  mySelected1: any = this.myOptions[1];
  click1(): void {
    this.tiHalfmodalservice.open(this.tempRef, {
      nomaskCloseable: false
    });
  }
  click2(): void {
    this.tiHalfmodalservice.open(this.templateRef, {
      width: '500px',
      closeIcon: false,
      clientRectTop: '100px'
    });
  }
  click3(): void {
    this.tiHalfmodalservice.open(ContentComponent, {
      backdrop: true,
      context: {
        text: 'Tiny',
        data: {
          s: this.mySelected1,
          t: 'tiny',
          b: this.items[0]
        }
      },
      close: (context: any): void => {
        this.myLogs = [...this.myLogs, `on close = ${JSON.stringify(context)}`];
      },
      dismiss: (context: any): void => {
        this.myLogs = [...this.myLogs, `on dismiss = ${JSON.stringify(context)}`];
      }
    });
  }
}

@Component({
  template: `
    <ti-halfmodal-header>Component</ti-halfmodal-header>
    <ti-halfmodal-body>
      <span class="title">This is a demo from {{ text }}!</span>
      <ti-formfield>
        <ti-item [label]="'text'" [required]="true">
          <input type="text" tiText style="width:200px" [(ngModel)]="data.myValue" />
        </ti-item>
        <ti-item [label]="'textarea'">
          <textarea tiTextarea [(ngModel)]="data.t"></textarea>
        </ti-item>
        <ti-item [label]="'select'">
          <ti-select [options]="options" [(ngModel)]="data.s"></ti-select>
        </ti-item>
        <ti-item [label]="'buttongroup'">
          <ti-button-group [items]="items" [(ngModel)]="data.b"></ti-button-group>
        </ti-item>
      </ti-formfield>
    </ti-halfmodal-body>
    <ti-halfmodal-footer>
      <button style="margin-right: 8px;" id="halfmodal-service-ok" tiButton color="danger" (click)="close()">确定</button>
      <button id="halfmodal-service-cancel" tiButton (click)="dismiss()">取消</button>
    </ti-halfmodal-footer>
  `
})
export class ContentComponent {
  text: string;
  options: Array<any> = selectOptions;
  items: Array<TiButtonItem> = buttongroupItems;
  data: any = {
    myValue: '',
    t: '',
    s: undefined,
    b: undefined
  };
  dismiss(): void {} // 类似TiModalService，此处的dismiss和close只是为了编译，实际调用的是open()的参数的dismiss和close
  close(): void {}
}

export let selectOptions: Array<any> = [
  { label: '美国', englishname: 'America' },
  { label: '巴西', englishname: 'Brazil' },
  { label: '加拿大', englishname: 'Canada' },
  { label: '中国', englishname: 'China' },
  { label: '法国', englishname: 'France' },
  { label: '德国', englishname: 'Germany' },
  { label: '日本', englishname: 'Japan' },
  { label: '韩国', englishname: 'South Korea' },
  { label: '土耳其', englishname: 'Turkey' },
  { label: '大不列颠和北爱兰联合王国', englishname: 'United Kingdom' }
];

export let buttongroupItems: Array<TiButtonItem> = [{ text: '云服务器' }, { text: '裸金属服务器' }, { text: '虚拟IP地址' }];
