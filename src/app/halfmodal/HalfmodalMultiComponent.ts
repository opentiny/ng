import { Component } from '@angular/core';

@Component({
    templateUrl: './halfmodal-multi.html',
    styleUrls: ['./halfmodalTest.less']
})

export class HalfmodalMultiComponent {
    data: any = {
        actionGuide: 'document',
        mySelected1: {},
        myOptions: [
            { label: '中国'},
            { label: '美国'},
            { label: '巴西'},
            { label: '加拿大'}
        ],
        answer: (key: number) => {
            this.answer = this.answerArray[key - 1];
        }
    };

    answerArray: Array<any> = [
        {
            q: '5乘以3等于几？',
            a: '等于15'
        }, {
            q: '1加1等于几？',
            a: '等于2'
        }, {
            q: '做人呐，最重要的是什么',
            a: '是开心'
        }
    ];
    answer: any = {};
}
