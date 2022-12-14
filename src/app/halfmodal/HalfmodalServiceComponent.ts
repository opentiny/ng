import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { TiButtonItem } from '@opentiny/ng';
import { TiHalfmodalService } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-service.html'
})

export class HalfmodalServiceComponent {
    constructor(private tiHalfmodalservice: TiHalfmodalService) {}
    @ViewChild('service1', {static: false}) tempRef: TemplateRef<any>;
    @ViewChild('service2', {static: false}) templateRef: TemplateRef<any>;

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
            <ti-item [label]="'text'" [required]="true" >
                <input type="text" tiText style="width:200px"  [(ngModel)]="data.myValue">
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
        <button style="margin-right: 8px;" id="halfmodal-service-ok" tiButton color="danger" (click)="close()">??????</button>
        <button id="halfmodal-service-cancel" tiButton (click)="dismiss()">??????</button>
    </ti-halfmodal-footer>
    `
})
export class ContentComponent {
    text: string;
    options: Array<any> = selectOptions;
    items: Array<TiButtonItem>  = buttongroupItems;
    data: any = {
        myValue: '',
        t: '',
        s: undefined,
        b:  undefined
    };
    dismiss(): void {} // ??????TiModalService????????????dismiss???close???????????????????????????????????????open()????????????dismiss???close
    close(): void {}
}

export let selectOptions: Array<any> = [
    { label: '??????', englishname: 'America' },
    { label: '??????', englishname: 'Brazil' },
    { label: '?????????', englishname: 'Canada' },
    { label: '??????', englishname: 'China' },
    { label: '??????', englishname: 'France' },
    { label: '??????', englishname: 'Germany' },
    { label: '??????', englishname: 'Japan' },
    { label: '??????', englishname: 'South Korea' },
    { label: '?????????', englishname: 'Turkey' },
    { label: '????????????????????????????????????', englishname: 'United Kingdom' }
];

export let buttongroupItems: Array<TiButtonItem> = [
    { text: '????????????'},
    { text: '??????????????????' },
    { text: '??????IP??????'}];
