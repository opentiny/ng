import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TiHalfmodalService } from '@opentiny/ng';
@Component({
    templateUrl: './halfmodal-service-test.html'
})

export class HalfmodalServiceTestComponent {
    constructor(private tiHalfmodalservice: TiHalfmodalService) {}
    @ViewChild('service1', {static: false}) tempRef: TemplateRef<any>;
    @ViewChild('service2', {static: false}) templateRef: TemplateRef<any>;

    public openModal(): void {
        this.tiHalfmodalservice.open(this.tempRef, {
            backdrop: true,
            dismiss: (): void => {
                console.log('dismiss');
            },
            close: (context: any): void => {
                console.log('close');
            }
        });
    }
    public openModal1(): void {
        this.tiHalfmodalservice.open(this.templateRef, {
            width: '450px',
            backdrop: true,
            dismiss: (): void => {
                console.log('dismiss');
            },
            close: (context: any): void => {
                console.log('close');
            }
        });
    }
}