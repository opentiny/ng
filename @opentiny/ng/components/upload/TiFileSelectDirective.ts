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
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { TiFileItem, TiUploadRef } from '../../services/upload/TiFileInterface';
import { TiUploadUtil } from '../../services/upload/TiUploadUtil';

/**
 * 该指令适用于自定义上传场景，指令定义在input type='file'元素上，传入的是文件上传实例
 * 文件上传实例的生成，请参考[TiUploadService.create]{@link ../injectables/TiUploadService.html#create}
 *
 * 除自定义使用方式外，Tiny还提供了两种已进行设计的上传组件供业务使用，具体见[TiUploadComponent]{@link ../components/TiUploadComponent.html}
 *
 */
@Directive({
  selector: '[tiFileSelect]'
})
export class TiFileSelectDirective {
    /**
     * 文件上传实例
     */
    @Input() tiFileSelect: TiUploadRef;
    private nativeElement: any;
    private fileChangeEvent: any;
    constructor(private hostElementRef: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.hostElementRef.nativeElement;
        this.fileChangeEvent = this.renderer.listen(this.nativeElement, 'change', () => {
            if (!this.tiFileSelect) { // 配置的上传文件实例不存在情况下，不做后续处理
                return;
            }
            this.onFileChange(this.nativeElement); // 点选文件后的处理
        });
    }
    /**
     * @ignore
     * 选择文件后，根据浏览器差异进行处理
     */
    onFileChange(fileSel: any): void {
        const uploadInst: any = this.tiFileSelect;
        const files: any = TiUploadUtil.isHTML5 ? fileSel.files : fileSel; // 获取文件信息
        const addedItems: Array<TiFileItem> = uploadInst._addToQueue(files); // 文件选择队列
        if (TiUploadUtil.isHTML5) { // H5情况下，重置表单元素值，确保可重复选择文件
            this.nativeElement.value = '';
        } else { // 非H5情况下，确保文件下次可继续选择,分两种情况：1.已选文件有效情况下，,重新替换表单元素，确保文件点选元素不会随表单上传消失；
            // 2.文件未加入到队列（文件校验失败情况）情况下，重置点选表单，确保文件可重复选择（校验失败可能是文件队列长度不符，所以为确保用户体验，执行该操作）
            const isRemoveInput: boolean = (addedItems.length === 0); // 根据文件是否有效情况确定是否移除input
            this.replaceFileInput(fileSel, isRemoveInput);
        }

        // 自动上传情况下，进行文件上传
        if (uploadInst.config.autoUpload !== false && (addedItems.length !== 0)) {
            uploadInst.uploadItems(addedItems);
        }
        // onpush模式下，点击添加文件后，上传列表详情不展示。
        if (this.tiFileSelect._uploadComponentInstance) {
            this.tiFileSelect._uploadComponentInstance.changeDetectorRef.markForCheck();
        }
    }

    /**
     * @ignore
     * 替换单个文件选择按钮，确保后续文件选择可继续点选
     * 当前文件选择框
     * 文件选择实例对象
     */
    replaceFileInput(fileSel: any, isRemoveInput: boolean): void {
        // 清除当前文件输入框选择事件
        this.fileChangeEvent();

        // 新增input,并处理当前input
        const fileSelNew: any = fileSel.cloneNode(); // 文件元素克隆时,不会复用原有已选文件信息
        if (isRemoveInput) { // 文件选择无效情况下移除input，确保下次可正常选择
            fileSel.parentNode.appendChild(fileSelNew);
            fileSel.remove();
        } else {
            fileSel.style.display = 'none'; // 隐藏已选文件，确保点选框页面呈现的唯一性
            fileSel.parentNode.insertBefore(fileSelNew, fileSel.nextSibling); // 点选文件已放入文件队列中,替换新的文件选择按钮，确保下次点选生效
        }

        // 增加当前input事件
        this.fileChangeEvent = this.renderer.listen(fileSelNew, 'change', () => {
            this.onFileChange(fileSelNew);
        });
    }
}
