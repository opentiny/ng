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
import { Component, ElementRef, Input, Renderer2, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TiFileItem } from '../../services/upload/TiFileInterface';
import { TiUploadService } from '../../services/upload/TiUploadService';
import { Util } from '../../utils/Util';
import { TiOverflowService } from '../../services/overflow/TiOverflowService';
import { TiUploadbaseComponent, TiUploadInitFile } from './TiUploadbaseComponent';


/**
 * 该组件用于实现已设计好的交互完整的文件上传组件，包含两种样式：
 *
 * 1.带输入框的样式(type为inputField)
 *
 * 2.按钮样式(type为button)
 *
 * 如果以上两种样式不满足业务场景，可使用自定义方式实现，具体实现请参考[tiFileSelect]{@link ../directives/TiFileSelectDirective.html}
 *
 */
@Component({
    selector: 'ti-upload:not([type]), ti-upload[type="inputField"], ti-upload[type="button"], ti-upload[type="textButton"]',
    templateUrl: './upload.html',
    styleUrls: ['./upload.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TiUploadComponent extends TiUploadbaseComponent {
    constructor(private uploaderService: TiUploadService, hostEle: ElementRef, renderer: Renderer2,
                private tiOverflow: TiOverflowService, public changeDetectorRef: ChangeDetectorRef) {
        super(hostEle, renderer);
    }
    /**
     * 上传样式类型，'textButton' 类型
     */
    @Input() type: 'inputField' | 'button' | 'textButton' = 'inputField';
    /**
     * 按钮文字
     */
    @Input() buttonText: string; // 配置按钮文字,type 为 button 形式时,为文件选择按钮文字；type 为 inputField 时,为上传按钮文字

    // inputField 形式文件上传的相关配置
    /**
     * 设置上传文件选择框宽度，只适用于 inputField 类型
     * @ignore
     */
    @Input() inputFieldWidth: string;
    /**
     * 是否显示提交按钮，只适用于 inputField 类型
     * @ignore
     */
    @Input() showSubmitButton: boolean;
    /**
     * 占位文本，只适用于 inputField 类型
     * @ignore
     */
    @Input() placeholder: string;
    /**
     * 是否自动聚焦，只适用于 inputField 类型
     * @ignore
     */
    @Input() autofocus: boolean = false;
    /**
     * 设置已上传文件列表的提示信息，只适用于 button/textButton 类型
     */
    @Input() note: string;
    /**
     * 初始化显示的文件列表，只适用于 button/textButton 类型
     */
    @Input() initFiles: Array<TiUploadInitFile>;
    /**
     * 是否显示上传列表
     */
    @Input() showUploadList: boolean = true;
    /**
     * 错误提示信息，只适用于 button/textButton 类型
     */
    @Input() errorMessage: string;
    /**
     * 是否显示错误提示，只适用于 button/textButton 类型
     */
    @Input() showErrorMessage: boolean = true;
    /**
     * 文件列表区域最大高度，只适用于 button/textButton 类型
     */
    @Input() listMaxHeight: string;
    /**
     * @ignore
     */
    @ViewChild('fileInput') fileInput: any;
    /**
     * @ignore 多文件上传的状态提示信息
     */
    stateInfo: string;
    /**
     * 是否禁用重新上传
     */
    public reloadAllDisable: boolean = true;
    /**
     * @ignore 点击上传按钮时触发的回调
     */
    onSelectClick(): void {
        this.fileInput.nativeElement.click();
    }
    /**
     * @ignore
     */
    ngOnInit(): void {
        super.ngOnInit();
        // 创建uploader实例
        const autoUpload: boolean = Util.isUndefined(this.autoUpload) ? true : this.autoUpload;
        this.uploadConfig.autoUpload = autoUpload;
        this.uploadInst = this.uploaderService.create(this.uploadConfig, this);
        if (this.initFiles && this.filters) {
            const maxCountIndex: number = this.getMaxCountIndex();
            if (maxCountIndex !== -1) {
                this.uploadConfig.filters[maxCountIndex].params[0] -= this.initFiles.length;
            }
        }
        this.placeholder = this.setPlaceholder();
        // 设置submit按钮的显示状态
        this.showSubmitButton = Util.isUndefined(this.showSubmitButton) ?
            !autoUpload : this.showSubmitButton;
        // 是否定义beforeRemoveItems事件
        // 为初始显示文件增加各自的remove方法（仅在button/textButton类型时）
        if ((this.type === 'button' || this.type === 'textButton') && this.initFiles) {
            this.initFiles.forEach((item: TiUploadInitFile) => {
                if (Util.isUndefined(item.allowDelete)) {
                    item.allowDelete = true;
                }
                item.remove = (): void => {
                    if (!item.allowDelete) {
                        return;
                    }
                    const index: number = this.initFiles.findIndex((_item: TiUploadInitFile) => {
                        return _item === item;
                    });
                    this.removeItem(index);
                    this.changeDetectorRef.markForCheck();
                };
            });
        }
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        // 处理autofocus
        if (this.autofocus === true) {
            this.focus();
        }
    }

    /**
     * @ignore
     * 移除显示的文件项目（button/textButton类型的showList项目接口）
     */
    removeInitFiles(item: TiUploadInitFile): void {
        if (!item.allowDelete) {
            return;
        }
        const index: number = this.initFiles.findIndex((_item: TiUploadInitFile) => {
            return _item === item;
        });
        // 若有beforeRemoveItems事件，则触发该事件
        if (this.isRemove) {
          this.beforeRemoveItems.emit([item]);
        } else { // 否则直接删除，并触发removeItems事件
          this.removeItem(index);
          this.removeItems.emit([item]);
        }
    }
    // 提供focus/blur方法，供外部调用
    /**
     * @ignore
     * 聚焦方法，只适用于inputField类型
     */
    focus(): void {
        this.fileInput.nativeElement.nextElementSibling.focus();
    }
    /**
     * @ignore
     * 失焦方法，只适用于inputField类型
     */
    blur(): void {
        this.fileInput.nativeElement.nextElementSibling.blur();
    }
    // 通过item元素的移入移出事件控制元素的hover状态，该hover状态会决定item中部分按钮的显示状态
    /**
     * @ignore
     */
    onItemMouseenter(item: TiFileItem, event: any): void {
        if (this.disabled) {
            return;
        }
        item.isHover = true;
        // 文件名超长溢出时，显示名称
        const fileNameEle: Element = event.target.querySelector('.ti3-aui-file-name');
        item.isOverflow = this.tiOverflow.isOverflow(fileNameEle);
    }
    /**
     * @ignore
     */
    onItemMouseleave(item: TiFileItem): void {
        if (this.disabled) {
            return;
        }
        item.isHover = false;
    }
    // 获取上传文件状态，同时根据状态设置状态详细信息
    /**
     * @ignore
     */
    getUploadState(): string {
        let uploadingLen: number = 0;
        let uploadErrLen: number = 0;
        let uploadSuccLen: number = 0;
        this.uploadInst.queue.forEach((item: TiFileItem) => {
            if (item.isUploading) {
                uploadingLen++;
            } else if (item.isError) {
                uploadErrLen++;
            } else if (item.isSuccess) {
                uploadSuccLen++;
            }
            if (item.allowReload) {
                this.reloadAllDisable = false;
            }
        });
        const fileQueueLen: number = this.uploadInst.queue.length;
        if (uploadSuccLen === fileQueueLen) {
            this.stateInfo = this.uploadLan.successInfo;

            return 'success';
        }
        if (uploadErrLen !== 0) {
            this.stateInfo = Util.formatEntry(this.uploadLan.errorMultiInfo, [uploadErrLen]);

            return 'error';
        }
        if (uploadingLen !== 0) {
            this.stateInfo = Util.formatEntry(this.uploadLan.uploadingMutiInfo, [`${uploadingLen}/${fileQueueLen}`]);

            return 'uploading';
        }
        this.stateInfo = Util.formatEntry(this.uploadLan.addSuccessMutiInfo, [fileQueueLen]);

        return 'addSuccess';
    }
    /**
     * 初始设置输入框内提示文本
     * 四种场景：自动单文件上传，自动多文件上传，手动单文件上传，手动多文件上传
     */
    private setPlaceholder(): string {
        if (this.placeholder) {
            return this.placeholder;
        }

        if (this.autoUpload) {
            if (this.uploadInst.isSingleFile) {
                return this.uploadLan.autoUploadFilePlaceholder;
            }

            return this.uploadLan.autoUploadFilesPlaceholder;
        }

        if (this.uploadInst.isSingleFile) {
            return this.uploadLan.notAutoUploadFilePlaceholder;
        }

        return this.uploadLan.notAutoUploadFilesPlaceholder;
    }

    /**
     * 移除初始文件
     */
    private removeItem(index: number): void {
        this.initFiles.splice(index, 1);
        if (this.filters) {
            const maxCountIndex: number = this.getMaxCountIndex();
            if (maxCountIndex !== -1) {
                this.uploadConfig.filters[maxCountIndex].params[0] += 1;
            }
        }
    }
}
