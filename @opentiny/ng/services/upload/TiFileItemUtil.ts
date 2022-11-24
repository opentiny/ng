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
import { TiUploadUtil } from './TiUploadUtil';
import { TiFileInfo, TiFileItem, TiUploadConfig, TiUploadRef } from './TiFileInterface';
import { Util } from '../../utils/Util';

// 单个文件对象服务封装，包括文件基本信息统一、文件状态信息、文件基本方法封装
/**
 * @ignore
 */
export class TiFileItemUtil {
    /**
     * 创建文件对象，该返回值用作后续文件的上传和文件操作，可作为文件回调参数传递
     * fileObject 文件信息对象
     * fileOrInpt 原始文件对象 H5下为file对象，非H5下为fileInput
     * config 文件上传配置信息
     * uploader 上传文件对应的文件实例
     * return 文件对象
     */
    public static createFileItem(tifileObject: TiFileInfo, fileOrInput: Element | File,
                                 config: TiUploadConfig, uploader: TiUploadRef): TiFileItem {
        function upload(): void {
            if(!this.allowReload) {
                return;
            }
            TiUploadUtil.uploadItems([this]);
        }
        function cancel(): void {
            TiUploadUtil.cancelItems([this]);
        }

        function remove(isRemove?: boolean): void {
            if (!this.allowDelete) {
                return;
            }
            if (isRemove) {
                // 触发外部定义的删除前的事件
                TiUploadUtil.onBeforeRemove([this]);

                return;
            }

            TiUploadUtil.removeItems([this]);
        }

        function destroy(): void {
            if (this._input) { // 删除页面残留dom
                this._input.remove();
            }
            if (this._form) {
                this._form.remove();
            }
            this._input = null; // 清除引用
            this._form = null;
        }

        // 上传文件对象赋值
        let _file: any = null;
        let _input: any = null;
        if (!(fileOrInput instanceof Element)) {
            _file = fileOrInput;
        } else {
            _input = fileOrInput;
        }

        return {
            url: config.url || '/', // 后台地址
            file: tifileObject,
            alias: config.alias || 'tiFile', // 文件name
            _file,
            _input,
            formData: config.formData || {},
            formDataFirst: config.formDataFirst || false,
            headers: config.headers || {},
            method: config.method || 'post',
            batchSend: config.batchSend || false,
            uploader, // 上传实例对象

            upload,
            cancel,
            remove,
            destroy,

            isReady: false,
            isUploading: false,
            isUploaded: false,
            isCancel: false,
            isSuccess: false,
            isError: false,
            progress: 0,

            isHover: false,
            isOverflow: false,
            _xhr: {},
            index: 0,
            _form: undefined
        };
    }

    /**
     * 创建文件对象，统一H5和非H5情况下的文件信息
     * file {FileList|FileInput} 原始文件对象 H5为file对象形式，非H5为fileinput对象
     * return 类文件对象
     */
    public static createFileObject(fileThis: any): TiFileInfo {
        if (TiUploadUtil.isHTML5) {
            const fileName: string = fileThis.name;

            return {
                lastModifiedDate: fileThis.lastModifiedDate,
                size: fileThis.size, // 读取的文件真实大小值,单位为B
                sizeWithUnit: TiFileItemUtil.formatSize(fileThis.size), // 做单位转换后的文件大小，方便界面详情显示显示
                name: fileThis.name,
                type: fileName.slice(fileName.lastIndexOf('.') + 1)
                        .toLowerCase(), // 确保浏览器形式的一致性
                _file: fileThis, // 文件对象，只在H5方式下有效
                _input: null // 文件input对象，只在IE9 form表单提交方式下有效
            };
        }
        const path: string = fileThis.value;
        // 非H5情况下,浏览器不打开ActiveX,获取不到文件大小,该种情况下文件大小为null
        const fileSize: number = Util.isUndefined(fileThis.size) ? null : fileThis.size;

        return {
            lastModifiedDate: null, // 非H5情况下,获取不到该值
            size: fileSize,
            sizeWithUnit: isNaN(fileSize) ? '' : this.formatSize(fileSize / 1024), // 做单位转换后的文件大小，方便界面详情显示显示
            name: path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2),
            type: path.slice(path.lastIndexOf('.') + 1)
                    .toLowerCase(),
            _file: null, // 文件对象，只在H5方式下有效
            _input: fileThis // 文件input对象，只在IE9 form表单提交方式下有效
        };
    }

    /**
     * 将文件大小显示标准化：根据文件大小做不同单位的显示，文件大小保留两位小数
     * 文件大小
     * 带单位文件大小
     */
    private static formatSize(size: number): string {
        let sizeWithUnit: string;
        const kbSize: number = size / 1024;
        if (kbSize < 1) {
            sizeWithUnit = size.toFixed(2) + 'B';
        } else if (kbSize < 1024) {
            sizeWithUnit = kbSize.toFixed(2) + 'KB';
        } else if (kbSize < 1024 * 1024) {
            sizeWithUnit = (kbSize / 1024).toFixed(2) + 'MB';
        } else {
            sizeWithUnit = (kbSize / 1024 / 1024).toFixed(2) + 'GB';
        }

        return sizeWithUnit;
    }
}
