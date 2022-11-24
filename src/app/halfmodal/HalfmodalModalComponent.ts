import { Component } from '@angular/core';
import { TiHalfmodalComponent } from '@opentiny/ng';
import { TiMessageService } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-modal.html',
    styleUrls: ['./halfmodalTest.less']
})

export class HalfmodalModalComponent {
    constructor(private message: TiMessageService) {}
    click(halfmodal: TiHalfmodalComponent): void {
        halfmodal.show();
    }

    openMessage(): void {
        this.message.open({
            content: '操作弹窗不会关闭半屏弹窗'
        });
    }
}
