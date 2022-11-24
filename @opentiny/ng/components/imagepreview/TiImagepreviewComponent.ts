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
import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TiBaseComponent } from '../base/TiBaseModule';

// 文件预览信息接口
export interface TiFilePreviewInfo {
    /**
     * 文件名称
     */
    name?: string;

    /**
     * 预览地址
     */
    previewUrl?: string;

    /**
     * 允许有多余的属性字段
     */
    [propName: string]: any;
}

/**
 * @ignore
 *
 *
 * 该组件主要用于图片放大预览
 *
 */
@Component({
    selector: 'ti-imagepreview',
    templateUrl: './imagepreview.html',
    styleUrls: ['./imagepreview.less'],
    changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TiImagepreviewComponent extends TiBaseComponent implements AfterViewInit {

    /**
     * 需要预览的文件列表
     */
    @Input() fileList: Array<TiFilePreviewInfo> = [];

    /**
     * 是否展示文件名称，默认展示
     */
    @Input() showFileName: boolean = true;

    /**
     * 默认展示的图片的索引
     */
    @Input() index: number = 0;

    /**
     * @ignore 内部变量
     */
    @ViewChild('imgTemplate', {static: true}) imgTemplate: ElementRef;
    /**
     * @ignore 内部变量
     */
    @ViewChild('switchBtn', {static: true}) switchBtnTemplate: ElementRef;

    constructor(public sanitizer: DomSanitizer,protected renderer: Renderer2, private elementRef: ElementRef) {
            super(elementRef, renderer);
    }

    ngAfterViewInit(): void {
        this.addImgLoadListener();
    }

    /**
     * @ignore 翻到上一张图片
     */
    public toNext(): void {
        if (this.index === (this.fileList.length - 1)) {
            return;
        }
        this.addImgLoadListener();
        this.index++;
    }

    /**
     * @ignore 翻到下一张图片
     */
    public toPrevious(): void {
        if (this.index === 0) {
            return;
        }
        this.addImgLoadListener();
        this.index--;
    }

    // 由于图片高度不确定，需动态设置top值，所以增加load事件。
    private addImgLoadListener(): void {
        this.imgTemplate.nativeElement.onload = (): void => {
            const imgHeight: number = this.imgTemplate.nativeElement.height;
            if (imgHeight !== 0) {
                const top: number = (imgHeight - 48) / 2;
                this.renderer.setStyle(this.switchBtnTemplate.nativeElement, 'top', top + 'px');
            }
            // 防止循环触发load事件
            this.imgTemplate.nativeElement.onload = null;
        };
    }
}
