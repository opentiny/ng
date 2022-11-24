import { Component } from '@angular/core';
import { TiHalfmodalComponent } from '@opentiny/ng';
import { TiModalService } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-modalselect.html',
    styleUrls: ['./halfmodalTest.less']
})

export class HalfmodalModalselectComponent {
    constructor(private tiModal: TiModalService) {
    }

    myOptions =  [
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
    mySelected1 =  undefined;
    click(halfmodal: TiHalfmodalComponent): void {
        halfmodal.show();
    }

    show(content: any): void {
        this.tiModal.open(content, {
            id: 'myModal', // 定义id防止同一页面出现多个相同弹框
            // 模板上下文：一般通过context定义的是与弹出动作相关的数据，大部分数据还是建议在外部定义
            // 双向绑定的值，建议放在context对象中，每次打开弹窗都重新就行赋值。
            context: {
                myOptions: this.myOptions,
                mySelected1 : this.myOptions[0]
            }
        });
    }
}