import { Component, ViewChild } from '@angular/core';
import { TiHalfmodalComponent } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-backdrop.html'
})

export class HalfmodalBackdropComponent {
    @ViewChild('modal', { static: true }) halfmodal: TiHalfmodalComponent;

    show(): void {
        this.halfmodal.show();
    }
}
