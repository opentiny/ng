import { Component } from '@angular/core';
import { TiLink } from '@opentiny/ng';

@Component({
    templateUrl: './crumb-tip.html'
})

export class CrumbTipComponent {
    items: Array<TiLink> = [
        {
            label: '超长文本超长文本超长文本超长文本超长文本溢出出tip'
        },
        {
            label: '文本2'
        },
        {
            label: '文本3'
        },
        {
            label: '这样那样这样那样这样那样这样那样这样那样这样那样这样那样这样那样这样那样'
        }
    ];

    public onClick(item: any): void {
        console.log(item);
    }
    public labelmodify(): void {
        this.items[0].label = '文本1';
    }
}
