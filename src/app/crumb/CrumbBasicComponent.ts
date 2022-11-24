import { Component } from '@angular/core';
import { TiLink } from '@opentiny/ng';

@Component({
    templateUrl: './crumb-basic.html'
})

export class CrumbBasicComponent {
    items: Array<TiLink> = [
        {
            label: '服装'
        },
        {
            label: '女装'
        },
        {
            label: '裙子'
        },
        {
            label: '连衣裙'
        },
        {
            label: '复古'
        }
    ];
}
