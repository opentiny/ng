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
import { Injectable } from '@angular/core';
import { Util } from '../../utils/Util';
import { TiFileItemUtil } from './TiFileItemUtil';
import { TiUploadUtil } from './TiUploadUtil';
import { TiUploadServiceModule } from './TiUploadServiceModule';
import { TiFileInfo, TiFileItem, TiFilter, TiUploadConfig, TiUploadRef } from './TiFileInterface';
import { TiUploadComponent } from '../../components/upload/TiUploadComponent';
import { TiUploadimageComponent } from '../../components/upload/TiUploadimageComponent';

// 文件上传服务封装，一个实例对应一个上传文件队列
// @dynamic
/**
 * 文件上传服务，通过该服务生成上传文件实例对象，一个实例对应一个上传文件队列
 *
 * 该服务适用于自定义文件上传实例方式，使用该服务时需要引入模块TiUploadServiceModule，与[tiFileSelect]{@link ../directives/TiFileSelectDirective.html}配合使用
 *
 * 除自定义使用方式外，Tiny还提供了两种已设计的上传样式供业务使用，具体见[TiUploadComponent]{@link ../components/TiUploadComponent.html}
 *
 */
@Injectable({
    providedIn: TiUploadServiceModule
})
export class TiUploadService {
    // 文件校验规则定义
    private static readonly filterRules: any = {
        maxSize: (fileObj: TiFileInfo, params: Array<any>): boolean => {
            const size: number = fileObj.size;
            if (!Util.isNumber(size)) { // 文件大小获取不到情况下，忽略该条校验规则
                return true;
            }

            return !(size > params[0]);
        },
        minSize: (fileObj: TiFileInfo, params: Array<any>): boolean => {
            const size: number = fileObj.size;
            if (!Util.isNumber(size)) { // 文件大小获取不到情况下，忽略该条校验规则
                return true;
            }

            return !(size < params[0]);
        },
        type: (fileObj: TiFileInfo, params: Array<any>): boolean => {
            // param参数需使用文件扩展名分开，为了确保各浏览器的一致性，文件类型使用扩展名判断，如果产品需要在选择时限制，请在input上设置accept属性
            let isValidType: boolean = false;
            params[0].split(',')
                .forEach((type: string) => {
                if (fileObj.name.match(new RegExp(`.(${type.replace(/\./g, '\\.')})$`, 'i')) !== null) {
                    isValidType = true;
                }
            });

            return isValidType;
        },
        maxCount: (fileObj: TiFileInfo, params: Array<any>, fileQueue: Array<TiFileItem>): boolean  => {
            return !(fileQueue.length >= params[0]);
        }
    };

    /**
     * 对单选进行过滤条件重置，单选去除maxCount条件，函数返回过滤后的生效规则
     */
    private static initFilter(rules: Array<TiFilter>, isSingleFile: boolean): Array<TiFilter> {
        if (isSingleFile) { // 单文件情况下去除maxCount设置
            return rules.filter((rule: TiFilter) => {
                return rule.name !== 'maxCount';
            });
        }

        // 多文件情况下 filter不做处理
        return rules || [];
    }
    /**
     * 根据用户配置的maxCount过滤条件，判断文件是否为单文件上传
     * 用户配置的过滤条件
     * 是否为单文件上传
     */
    private static isSingleFileFn(filters: Array<TiFilter>): boolean {
        if (!filters || !filters.length) { // 不设置filter情况下，为多文件上传
            return false;
        }
        const maxCountIndex: number = filters.findIndex((item: TiFilter): boolean => {
            return item.name === 'maxCount';
        });
        // 存在maxCount规则，并且其参数不为1的情况下，为多文件上传
        if (maxCountIndex === -1 || (filters[maxCountIndex].params && filters[maxCountIndex].params[0] !== 1)) {
            return false;
        }

        return true;
    }

    /**
     * 批量上传文件
     *   {Array} 上传文件items数组
     * 返回 无
     */
    private static uploadItems(items: Array<TiFileItem>): void {
        if (!items.length) {
            return;
        }
        // 设置上传文件标志位,文件逐个上传情况下,会根据该标志位决定下个上传文件
        items.forEach((item: TiFileItem) => {
            item.isReady = true;
        });

        // 开始上传文件
        if (items[0].batchSend) {
            TiUploadUtil.uploadItems(items);
        } else { // 上传单个文件，在upload方法中会依据isReady的设置进行其他文件的串行上传
            TiUploadUtil.uploadItems([items[0]]);
        }
    }

    /**
     * 批量取消上传文件
     * 返回 无
     */
    private static cancelItems(items: Array<TiFileItem>): void {
        if (!items.length) {
            return;
        }
        if (items[0].batchSend) { // 一个链接上传情况下，一次取消多个items，仅触发一次事件
            TiUploadUtil.cancelItems(items);
        } else { // 逐个链接上传情况下，一次仅取消一个items，触发多次事件
            items.forEach((item: TiFileItem) => {
                item.cancel();
            });
        }
    }

    /**
     * 批量删除文件,只涉及上传队列的文件删除，具体的后台删除还需要产品向后台发送文件删除请求实现
     *   {Array} 上传文件items数组
     * 返回 无
     */
    private static removeItems(items: Array<TiFileItem>): void {
        if (!items.length) {
            return;
        }
        if (items[0].batchSend) { // 一个链接上传情况下，一次删除多个items，仅触发一次事件
            TiUploadUtil.removeItems(items);
        } else { // 逐个链接上传情况下，一次仅删除一个items，触发多次事件
            items.forEach((item: TiFileItem) => {
                item.remove();
            });
        }
    }

    /**
     * 单个文件的有效性校验
     * 返回 {Array} 由不符合的规则name组成的数组
     */
    private static getInvalidRules(tifileObject: TiFileInfo, filtersRules: Array<TiFilter>, fileQueue: Array<TiFileItem>): Array<string> {
        // 无效判断
        const filterLen: number = filtersRules.length;
        if (filterLen === 0) {
            return [];
        }

        // 逐条规则校验，并返回结果数组
        const invalidRetArr: Array<string> = []; // 校验返回结果数组，该数组中返回的是不符合的校验规则name
        for (let i: number = 0; i < filterLen; i++) {
            const filterConfig: TiFilter = filtersRules[i]; // 单条校验规则配置

            // 根据配置寻找规则函数（规则分为默认规则 和 自定义规则）
            const filterName: string = filterConfig.name; // 配置规则名称
            let ruleFn: (fileObj: TiFileInfo, params: Array<any>, fileQueue: Array<TiFileItem>) => boolean; // 规则函数
            if (typeof filterConfig.fn === 'function') {
                ruleFn = filterConfig.fn;
            } else if (TiUploadService.filterRules[filterName]) { // 未定义fn的情况下，从默认规则中找
                ruleFn = TiUploadService.filterRules[filterName];
            }

            // 调用规则函数，判断文件有效性
            if ((typeof ruleFn === 'function') &&
                !ruleFn(tifileObject, filterConfig.params, fileQueue)) {
                invalidRetArr.push(filterName);
            }
        }

        return invalidRetArr;
    }
    /**
     * 获取未上传文件队列
     */
    private static getNotUploadedItems(fileQueue: Array<TiFileItem>): Array<TiFileItem> {
        return fileQueue.filter((item: TiFileItem): boolean => {
            return !item.isUploaded;
        });
    }
    /**
     * 获取待上传文件，该方法用于文件批量上传时获取上传文件队列
     * 返回 {Array} 返回待上传文件，且文件队列返回值是根据文件点选次序排列
     */
    private static getReadyItems(fileQueue: Array<TiFileItem>): Array<TiFileItem> {
        return fileQueue.filter((item: TiFileItem): boolean => {
            return item.isReady && !item.isUploading;
        })
        .sort((item1: TiFileItem, item2: TiFileItem): number  => {
            return item1.index - item2.index;
        });
    }

    /**
     * 获取上传失败文件，该方法用于文件批量上传时获取上传失败文件队列
     * 返回 {Array} 返回上传失败文件，且文件队列返回值是根据文件点选次序排列
     */
    private static getErrorItems(fileQueue: Array<TiFileItem>): Array<TiFileItem> {
        return fileQueue.filter((item: TiFileItem): boolean => {
            return item.isError;
        })
        .sort((item1: TiFileItem, item2: TiFileItem): number => {
            return item1.index - item2.index;
        });
    }

    /**
     * 重新上传列表中所有先前上传错误文件
     * 返回 无
     */
    private static reloadAllError(fileQueue: Array<TiFileItem>): void {
        const allowReloadFileItemLength = fileQueue.filter((item: TiFileItem) => item.allowReload).length;
        // 没有允许重新上传的实例对象
        if(allowReloadFileItemLength === 0) {
            return;
        }
        TiUploadService.uploadItems(TiUploadService.getErrorItems(fileQueue));
    }

    /**
     * 重新上传列表中所有文件
     * 返回 无
     */
    private static reloadAll(fileQueue: Array<TiFileItem>): void {
        TiUploadService.uploadItems(fileQueue);
    }

    /**
     * 上传列表中所有未上传过的文件
     * 返回 无
     */
    private static uploadAll(fileQueue: Array<TiFileItem>): void {
        const items: Array<TiFileItem> = this.getNotUploadedItems(fileQueue)
            .filter((item: TiFileItem): boolean => {
            return !item.isUploading;
        });
        TiUploadService.uploadItems(items);
    }

    /**
     * 判断是否有未上传的
     * 返回 boolean
     */
    private static isUploadedAll(fileQueue: Array<TiFileItem>): boolean {
        const items: Array<TiFileItem>  = this.getNotUploadedItems(fileQueue)
            .filter((item: TiFileItem): boolean => {
            return !item.isUploading;
        });

        return items.length === 0;
    }

    /**
     * 删除所有队列中的文件
     */
    private static removeAll(fileQueue: Array<TiFileItem>): void {
        while (fileQueue.length !== 0) {
            fileQueue[0].remove();
        }
    }

    /**
     * 取消所有队列中的文件(未上传和待上传文件)
     */
    private static cancelAll(fileQueue: Array<TiFileItem>): void {
        const items: Array<TiFileItem>  = this.getNotUploadedItems(fileQueue);
        TiUploadService.cancelItems(items);
    }

    /**
     * 创建文件上传实例
     */
    create(config: TiUploadConfig, uploadComInst?: TiUploadComponent | TiUploadimageComponent | any): TiUploadRef {
        const isSingleFile: boolean = TiUploadService.isSingleFileFn(config.filters); // 文件是否为单文件设置
        const filters: Array<TiFilter> = TiUploadService.initFilter(config.filters, isSingleFile); // 文件校验过滤规则

        let uploader: TiUploadRef;
        const fileQueue: Array<TiFileItem> = []; // 文件队列列表，一个实例对应一个文件列表
        let fileIndex: number = 0; // 文件次序定义，用作文件索引
        /**
         * 将选择的文件进行有效验证后加入到队列中,外部调用该方法时,认为该队列中的文件和当前uploader的配置项一致
         *   files {FileList|FileInput} 文件对象
         * 返回 {Array} 已添加文件数组
         */
        const addToQueue: (files: FileList | Element) => Array<TiFileItem> =
            (files: FileList | Element): Array<TiFileItem> => {
            // 循环列表添加文件
            const addedItems: Array<TiFileItem> = []; // 用于记录本次选择文件列表
            if (files && !Util.isUndefined((files as FileList).length)) { // H5方式
                for (let i: number = 0; i < (files as FileList).length; i++) {
                    addItem(files[i], addedItems);
                }
            } else {
                addItem(files, addedItems);
            }

            return addedItems;
        };
        const addItem: (fileOrInput: any, addedItems: Array<any>) => void =
            (fileOrInput: any, addedItems: Array<any>): void => {
            // 文件对象，该对象包含文件的基本信息，统一了浏览器的差异性，会在文件过滤失败回调中作为参数传递给外部
            const tifileObject: TiFileInfo = TiFileItemUtil.createFileObject(fileOrInput);

            // 校验单个文件的有效性，并根据校验结果进行文件操作
            const invalidArr: Array<string> = TiUploadService.getInvalidRules(tifileObject, filters, fileQueue); // 校验结果数组，数组中定义校验错误规则的name
            let isValid: boolean = !invalidArr.length; // 校验结果返回数组为空时有效

            // 单文件情况下，需要覆盖原有有效文件
            if (isSingleFile) {
                fileQueue[0]?.remove();
                uploadComInst?.initFiles && uploadComInst.initFiles[0]?.remove();
                if (invalidArr.length === 0) {
                    isValid = true; // 置位校验结果值
                }
            }
            if (isValid) { // 校验成功情况下，将文件加入到上传队列中，并触发
                // 上传文件对象,该对象中包含文件及状态信息等,在回调中传递
                const fileItem: TiFileItem = TiFileItemUtil.createFileItem(tifileObject, fileOrInput,
                    config, uploader);
                addedItems.push(fileItem);
                fileQueue.push(fileItem);
                fileItem.index = ++fileIndex; // 文件序列数增加，确保整个文件队列中该值唯一
                if (typeof config.onAddItemSuccess === 'function') {
                    config.onAddItemSuccess(fileItem);
                }
            } else if (typeof config.onAddItemFailed === 'function') {
                config.onAddItemFailed(tifileObject, invalidArr);
            }
        };
        uploader = {
            queue: fileQueue, // 上传文件队列,可读属性
            isSingleFile, // 文件是否有单文件选择限制
            config, // 上传文件配置信息
            _uploadComponentInstance: uploadComInst,
            _addToQueue: addToQueue, // 文件添加方法
            getNotUploadedItems(): Array<TiFileItem> {
                return TiUploadService.getNotUploadedItems(fileQueue);
            }, // 未上传完成文件获取
            getReadyItems(): Array<TiFileItem> {
                return TiUploadService.getReadyItems(fileQueue);
            }, // 已提交上传，但还未上传文件获取
            uploadAll(): void {
                TiUploadService.uploadAll(fileQueue);
            }, // 上传队列中所有还未执行过上传的文件
            isUploadedAll(): boolean {
                return TiUploadService.isUploadedAll(fileQueue);
            }, // 上传队列中是否有未上传过的
            removeAll(): void {
                TiUploadService.removeAll(fileQueue);
            }, // 删除队列中所有文件
            cancelAll(): void {
                TiUploadService.cancelAll(fileQueue);
            }, // 取消队列中所有上传文件
            reloadAll(): void {
                TiUploadService.reloadAll(fileQueue);
            }, // 重新上传队列中所有文件
            reloadAllError(): void {
                TiUploadService.reloadAllError(fileQueue);
            }, // 重新上传队列中所有上传错误文件
            uploadItems: TiUploadService.uploadItems, // 上传队列中某几项文件
            removeItems: TiUploadService.removeItems, // 删除队列中某几项文件
            cancelItems: TiUploadService.cancelItems // 取消队列中某几项文件
        };

        return uploader;
    }
}
