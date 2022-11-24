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
import { Component, Input, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { TiBaseComponent } from '../../components/base/TiBaseModule';

/**
 * @ignore
 */
@Component({
    selector: 'ti-intromodal',
    templateUrl: './intromodal.html',
    styleUrls: ['./intro.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ti3-intromodal-wrapper]': 'true'
    }
})

export class TiIntromodalComponent extends TiBaseComponent implements OnInit {
    @Input() title: string;
    @Input() content: string | TemplateRef<any>;
    @Input() image: string;
    @Input() totalNumber: number;
    @Input() currentNumber: number;
    @Input() finishButtonText: string;
    @Input() skipable: boolean;
    @Input() close: (flag?: boolean) => void;
    @Input() wantStep: (num: number) => void;

    public totalArray: Array<number>; // 通过totalNumber生成的数组
    public isStringContent: boolean; // content是否为string
    public templateContent: TemplateRef<any>; // 用户传入的templateRef类型content

    ngOnInit(): void {
        super.ngOnInit();
        this.totalArray = new Array(this.totalNumber + 1);
        this.isStringContent = typeof this.content === 'string';
        this.templateContent =  this.content instanceof TemplateRef ? this.content : undefined;
    }

    /**
     * @ignore
     * 模板中实际调用的是Modal服务dismiss方法，并非此处定义的方法；在此处定义dismiss方法只是为了避免生产环境打包时报错
     */
    public dismiss(): void { }

}
