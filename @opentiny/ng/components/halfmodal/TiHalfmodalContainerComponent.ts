/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, Renderer2, TemplateRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { TiHalfmodalComponent } from './TiHalfmodalComponent';

/**
 * @ignore
 */
/**
 * 通过service打开半屏弹窗时，该组件作为弹窗容器
 *
 */
@Component({
    selector: 'ti-halfmodalcontainer',
    templateUrl: './halfmodal.html',
    styleUrls: ['./halfmodal.less'],
    host: {
        '[style.width]': 'width',
        '[style.top]': 'clientRectTop',
        '[style.right]': '"-" + width',
        '[class]': '"ti3-halfmodal-layout-container"',
        '[hidden]': '!isShow',
        '[@halfmodalAnimate]': 'isShow'
    },
    animations: [ // 由于动画创建需要在元数据中解析，因此动画定义必须在此处定义
        trigger('halfmodalAnimate', [
            state('show', style({
                right: 0
            })),
            transition('* => show', animate('0.25s'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TiHalfmodalContainerComponent extends TiHalfmodalComponent {
    constructor(protected elementRef: ElementRef, protected renderer2: Renderer2, public zone: NgZone,
                protected changeDetector: ChangeDetectorRef) {
        super(elementRef, renderer2, zone, changeDetector);
    }

    public dismiss: (halfmodal: TemplateRef<any> | any, content: TemplateRef<any> | any) => void;
    public beforeClose: (content: TemplateRef<any> | any) => void;
    public halfmodal: TemplateRef<any> | any;
    public content: any;
    public destroyCallback: (reason: boolean) => void;

    ngOnInit(): void {
        super.ngOnInit();
        this.show();
    }

    /**
     * 点击弹窗外和右上角叉号的触发事件
     */
     public wantHide(): void {
        this.dismiss(this.halfmodal, this.content);
    }
}
