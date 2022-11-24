import { Component, DoCheck } from '@angular/core';

@Component({
    templateUrl: './rate-id.html',
})
export class RateIdComponent implements DoCheck {
    value = 2;
    rateId = 'rate';

    public idExistMap: Map<string, boolean> = new Map<string, boolean>();
    public ids: Array<string> = ['rate_icon_0', 'rate_icon_1', 'rate_icon_2', 'rate_icon_3', 'rate_icon_4'];
    public allIdExist = false;

    ngDoCheck(): void {
        this.allIdExist = true;
        this.ids.forEach((id: string) => {
            const idExist: boolean = document.getElementById(id) != undefined;
            this.idExistMap.set(id, idExist);
            if (!idExist) {
                this.allIdExist = false;
            }
        });
    }
}
