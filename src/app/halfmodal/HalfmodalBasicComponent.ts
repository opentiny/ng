import { Component } from '@angular/core';
import { TiHalfmodalComponent } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-basic.html'
})

export class HalfmodalBasicComponent {
    steps: Array<any> = [
        {
            label: 'General'
        },
        {
            label: 'Host Group Family'
        },
        {
            label: 'Currency Policy'
        }
    ];
    activeStep: any = this.steps[2];

    click(halfmodal: TiHalfmodalComponent): void {
        halfmodal.show();
    }

}
