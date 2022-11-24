import { Component, ViewChild } from '@angular/core';
import { TiHalfmodalComponent } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-beforehide.html'
})

export class HalfmodalBeforehideComponent {
    @ViewChild('modal', { static: true }) halfmodal: TiHalfmodalComponent;

    show(): void {
        this.halfmodal.show();
    }

    hide(): void {
        this.halfmodal.hide();
    }

    beforeHide(): void {
        if (window.confirm('您确定关闭弹窗吗？')) {
            this.halfmodal.hide();
          }
    }
}
