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
import { TiChunked, TiFileInfo, TiFileItem } from './TiFileInterface';
import { Util } from '../../utils/Util';
import { TiFileItemUtil } from './TiFileItemUtil';
import { map, mergeAll, Observable, of } from 'rxjs';

// 上传文件服务，提供上传过程中的通用方法
/**
 * @ignore
 */
export class TiUploadUtil {
    // 已支持SSR
    public static readonly isHTML5: boolean = (typeof window !== 'undefined') && ((window as any).File && (window as any).FormData);
    /**
     * 上传多个文件
     * 上传一个或多个文件item对象
     * 无
     */
    public static uploadItems(items: Array<TiFileItem>): void {
        // 异常处理 1.入参不合法,2.正在上传的文件不允许重复上传
        for (let i: number = items.length - 1; i >= 0; i--) {
            if (!TiUploadUtil.isValidFileItem(items[i]) || items[i].isUploading) {
                items.splice(i, 1);
            }
        }
        TiUploadUtil.onBeforeSend(items); // 文件上传前处理
        for (let j: number = items.length - 1; j >= 0; j--) {
            if (items[j].isCancel) { // 已取消上传的文件不再上传(此处主要是对beforeSend中取消上传的文件进行处理)
                items.splice(j, 1);
            }
        }
        if (items.length > 0) {
            TiUploadUtil.isHTML5 ? TiUploadUtil.uploadXhr(items) : TiUploadUtil.uploadForm(items);
        }
    }

    /**
     * 取消队列中多个正在上传中的文件(只在上传时可取消)
     * 文件item对象数组
     * 无
     */
    public static cancelItems(items: Array<TiFileItem>): void {
        for (let i: number = items.length - 1; i >= 0; i--) {
            if (!TiUploadUtil.isValidFileItem(items[i])) { // 异常处理:入参不合法情况下，不做处理
                items.splice(i, 1);
            } else {
                items[i].isCancel = true;
            }
        }
        if (items[0].isUploading) { // 正在上传过程中，取消上传，上传事件中，会处理响应赋值及事件触发
            TiUploadUtil.isHTML5 ? items[0]._xhr.abort() : items[0]._form.abort();
        } else { // 未在上传过程中情况下，依然触发cancel和complete事件
            const response: string = undefined;
            const status: number = 0;
            TiUploadUtil.onCancel(items, response, status);
            TiUploadUtil.onComplete(items, response, status);
        }
    }

    /**
     * 删除队列中单个或多个上传文件
     * 文件item对象数组
     */
    public static removeItems(items: Array<TiFileItem>): void {
        const itemsArr: Array<TiFileItem> = { ...items };
        for (let i: number = items.length - 1; i >= 0; i--) {
            if (!TiUploadUtil.isValidFileItem(items[i])) {
                items.splice(i, 1);
            }
        }
        // 阻止文件上传进程
        if (items[0].isUploading) {
            TiUploadUtil.cancelItems(items);
        }
        // 删除队列中的文件对象及文件对象相关引用
        for (let j: number = items.length - 1; j >= 0; j--) {
            items[j].uploader.queue.splice(TiUploadUtil.getItemIndex(items[j]), 1);
            itemsArr[j].destroy();
        }
        // 触发外部定义的删除事件
        TiUploadUtil.onRemove(itemsArr);
    }

    /**
     * 触发onBeforeRemoveItems事件
     * 文件item对象数组
     */
    public static onBeforeRemove(items: Array<TiFileItem>): void {
        TiUploadUtil.handleEvent('BeforeRemove', items);
    }

    /**
     * 获取文件对象 index值，获取该值用于后续判断item有效性
     * 上传文件item对象
     */
    private static getItemIndex(item: TiFileItem): number {
        if (item && item.uploader) {
            return item.uploader.queue.findIndex((itemInQueue: TiFileItem) => {
                return itemInQueue.index === item.index;
            });
        }

        return -1;
    }

    /**
     * 判断文件是否为有效文件
     * 上传文件item对象
     */
    private static isValidFileItem(item: TiFileItem): boolean {
        return (TiUploadUtil.getItemIndex(item) !== -1);
    }
    // 生成上传数据
    private static generateUploadData(items: Array<TiFileItem | TiChunked>): any {
        // 上传数据组装
        const uploadDataObj: any = new FormData();
        if (items[0].formDataFirst) { // formData先于文件信息情况下，先添加formData
            addFormData();
            addFile();
        } else { // formData后于文件信息情况下，后添加formData
            addFile();
            addFormData();
        }
        function addFile(): void {
            items.forEach((item: TiFileItem) => {
                uploadDataObj.append(item.alias, item._file, item.file.name); // 添加上传文件
            });
        }
        function addFormData(): any {
            // 添加单个文件的formData对象,加入到上传对象中
            for (const key in items[0].formData) {
                if (Object.prototype.hasOwnProperty.call(items[0].formData, key)) {
                    uploadDataObj.append(key, items[0].formData[key]);
                }
            }
        }

        return uploadDataObj;
    }
    private static setXhr(xhr: any, items: Array<TiFileItem>): void {
        // 文件上传信息配置（使用XHR，支持跨域请求）
        xhr.upload.onprogress = (event: any): void => { // 文件进度获取事件
            const { lengthComputable, loaded, total } = event;
            const progress: number = Math.round(lengthComputable ? loaded * 100 / total : 0); // 读取当前进度信息
            TiUploadUtil.onProgress(items, progress);
        };

        xhr.onload = (): void => { // 上传完成事件
            const { response, status } = xhr;
            if (TiUploadUtil.isSuccessCode(status)) {
                TiUploadUtil.onSuccess(items, response, status);
            } else {
                TiUploadUtil.onError(items, response, status);
            }
            TiUploadUtil.onComplete(items, response, status);
        };

        xhr.onerror = (): void => { // 上传失败事件
            const { response, status } = xhr;
            TiUploadUtil.onError(items, response, status);
            TiUploadUtil.onComplete(items, response, status);
        };

        xhr.onabort = (): void => { // 取消回调
            const { response, status } = xhr;
            TiUploadUtil.onCancel(items, response, status);
            TiUploadUtil.onComplete(items, response, status);
        };

        // 设置单个item的_xhr,该对象用于操作单个item的上传取消等处理
        items.forEach((item: TiFileItem) => {
            item._xhr = xhr;
        });
    }
    private static setheaders(xhr: any, items: Array<TiFileItem | TiChunked>): void {
        // 设置请求头
        for (const key in items[0].headers) {
            if (Object.prototype.hasOwnProperty.call(items[0].headers, key)) {
                xhr.setRequestHeader(key, items[0].headers[key]);
            }
        }
    }
    /**
     * xhr方式上传文件
     * 上传一个或多个文件item对象，上传单个文件的情况下
     */
    private static uploadXhr(items: Array<TiFileItem>): void {
        if (items.length === 1 && items[0].uploader.config.chunkSize && items[0].file.size > items[0].uploader.config.chunkSize) {
            TiUploadUtil.uploadChunkedFile(items, items[0].uploader.config.chunkSize);
            return;
        }
        const uploadDataObj: TiFileInfo = TiUploadUtil.generateUploadData(items); // 组装上传对象
        // 生成并设置xhr
        const xhr: any = new XMLHttpRequest();
        TiUploadUtil.setXhr(xhr, items);

        // 开始上传
        xhr.open(items[0].method, items[0].url, true);
        TiUploadUtil.setheaders(xhr, items);
        xhr.send(uploadDataObj);

        // 设置对象的上传状态
        items.forEach((item: TiFileItem) => {
            item.isUploading = true;
        });
    }
    private static uploadForm(items: Array<TiFileItem>): void {
        const form: any = document.createElement('form');
        form.style.display = 'none';
        for (const item of items) {
            // 清除原有form表单
            if (item._form) {
                item._form.parentNode.replaceChild(items[0]._input, items[0]._form); // 清除先前对应的form表单对象，确保上传文件表单元素外层不被form包裹
            }
            item._form = form; // 保存当前form
        }
        items[0]._input.parentNode.insertBefore(form, items[0]._input); // form插入inputSubmit之前，使其在页面显示

        if (items[0].formDataFirst) { // formData先于文件信息情况下，先添加formData
            addFormData();
            addFile();
        } else { // formData后于文件信息情况下，后添加formData
            addFile();
            addFormData();
        }

        // 文件信息组装
        function addFile(): void {
            for (const item of items) {
                const inputSubmit: Element = item._input;
                inputSubmit.setAttribute('name', item.alias);
                form.appendChild(inputSubmit); // 在form中添加上传文件元素
            }
        }

        // formData信息组装
        function addFormData(): void {// 添加formData元素
            for (const key in items[0].formData) {
                if (Object.prototype.hasOwnProperty.call(items[0].formData, key)) {
                    const formDataDomItem: any = document.createElement('input');
                    formDataDomItem.setAttribute('type', 'hidden');
                    formDataDomItem.setAttribute('name', key);
                    formDataDomItem.value = items[0].formData[key];
                    form.appendChild(formDataDomItem);
                }
            }
        }

        // 生成iframe元素，并将form表单和iframe元素结合
        const iframe: any = document.createElement('iframe');
        const name: string = Util.getUniqueId('tiFileIframe'); // 确保iframe唯一性，保证各文件上传最终能独立返回到相应的iframe
        iframe.setAttribute('name', name);
        form.setAttribute('action', items[0].url);
        form.setAttribute('method', items[0].method);
        form.setAttribute('target', name);
        form.setAttribute('enctype', 'multipart/form-data');
        form.appendChild(iframe);

        // 表单提交
        form.submit();
        // 设置对象的上传状态
        items.forEach((item: TiFileItem) => {
            item.isUploading = true;
        });

        // 设置假进度
        let newProgress: number = 0;
        const progressInterval: any = setInterval(() => {
            if (newProgress !== 98) {
                newProgress += 2;
                this.onProgress(items, newProgress);
            }
        }, 10);

        // 表单完成事件
        const loadEvent: () => void =
            (): void => {
                let response: string = '';
                let status: number = 200;

                clearInterval(progressInterval);
                this.onProgress(items, 100);
                try {
                    response = iframe.contentDocument.body.innerHTML; // 后台正常返回情况获取返回结果
                    this.onSuccess(items, response, status);
                } catch (e) {
                    response = e;
                    status = 520; // 为方便使用者处理，失败情况下，统一返回520状态码 未知错误
                    this.onError(items, response, status);
                }

                this.onComplete(items, response, status);
            };
        iframe.addEventListener('load', loadEvent);

        // 表单取消方法定义
        form.abort = (): void => {
            clearInterval(progressInterval);
            iframe.removeEventListener('load', loadEvent); // 去除load事件
            // 表单元素还原
            for (const node of form.childNodes) {
                if ((node as any).tagName !== 'IFRAME') {
                    if (form.parentNode.lastChild === form) {
                        form.parentNode.appendChild(node);
                    } else {
                        form.parentNode.insertBefore(node, form.nextSibling);
                    }
                }
            }
            form.remove();
            items.forEach((item: TiFileItem) => {
                item._form = null;
            });

            const status: number = 0;
            const response: string = undefined;
            this.onCancel(items, response, status);
            this.onComplete(items, response, status);
        };
    }

    private static isSuccessCode(status: number): boolean {
        // 和ajax请求一致，304 代表客户端已经执行了GET，但文件未变化
        return status >= 200 && status < 300 || status === 304;
    }

    /**
     * 上传前处理
     * 上传一个或多个文件item对象
     */
    private static onBeforeSend(items: Array<TiFileItem>): void {
        // 设置当前上传文件的状态信息
        for (const item of items) {
            item.isReady = true;
            item.isUploading = false;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isError = false;
            item.isCancel = false;
            item.progress = 0;
        }
        TiUploadUtil.handleEvent('BeforeSend', items);
    }

    private static handleEvent(type: string, items: Array<TiFileItem>, params: Array<any> = []): void {
        const onEventTypeItems: any = items[0].uploader.config && items[0].uploader.config[`on${type}Items`];
        if (onEventTypeItems && (typeof onEventTypeItems === 'function')) {
            onEventTypeItems.apply(null, [items, ...params]);
        }
        // onpush模式下文件上传实例状态未及时刷新
        if (items[0].uploader._uploadComponentInstance) {
            items[0].uploader._uploadComponentInstance.changeDetectorRef.markForCheck();
        }
    }

    private static onProgress(items: Array<TiFileItem>, progress: number): void {
        TiUploadUtil.handleEvent('Progress', items, [progress]);
        for (const item of items) {
            item.progress = progress; // 设置单个文件的进度信息
        }
    }

    private static onSuccess(items: Array<TiFileItem>, response: string, status: number): void {
        // 设置当前上传文件的状态信息
        for (const item of items) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = true;
            item.isError = false;
            item.isCancel = false;
            item.progress = 100;
        }
        TiUploadUtil.handleEvent('Success', items, [response, status]);
    }

    private static onError(items: Array<TiFileItem>, response: string, status: number): void {
        // 设置当前上传文件的状态信息
        for (const item of items) {
            // 设置当前上传文件的状态信息
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = true;
            item.isSuccess = false;
            item.isError = true;
            item.isCancel = false;
            item.progress = 0;
        }
        TiUploadUtil.handleEvent('Error', items, [response, status]);
    }

    private static onComplete(items: Array<TiFileItem>, response: string, status: number): void {
        // 置位状态
        items.forEach((item: TiFileItem) => {
            item.isUploading = false;
        });
        // 上传下一个文件，对于同一序列的上传文件来说，其isReady状态均已被标识，因此此处可以通过该方法进行筛选
        const readyItemsArr: Array<TiFileItem> = items[0].uploader.getReadyItems();
        if (readyItemsArr && (readyItemsArr.length !== 0)) {
            this.uploadItems([readyItemsArr[0]]);
        } else {
            // 本次上传序列中，所有文件上传完成后回调，因为文件上传是串行上传：
            // 在一个文件上传完成后才执行下一个文件的上传操作，所以此处可以确保同一序列最终的上传完成
            TiUploadUtil.handleEvent('CompleteAll', items, [response, status]);
        }
        TiUploadUtil.handleEvent('Complete', items, [response, status]);
    }

    private static onCancel(items: Array<TiFileItem>, response: string, status: number): void {
        for (const item of items) {
            item.isReady = false;
            item.isUploading = false;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isError = false;
            item.isCancel = true;
            item.progress = 0;
        }
        TiUploadUtil.handleEvent('Cancel', items, [response, status]);
    }

    private static onRemove(items: Array<TiFileItem>): void {
        TiUploadUtil.handleEvent('Remove', items);
    }

    private static chunkedFilePromise = (items: Array<TiFileItem>, fileChunkItem: Array<TiChunked>, totalNum: number) => {
        const uploadDataObj: TiFileInfo = TiUploadUtil.generateUploadData(fileChunkItem); // 组装上传对象
        // 生成并设置xhr
        const xhr: any = new XMLHttpRequest();
        return new Promise<any>((resolve: any) => {
            if (fileChunkItem[0].index === totalNum - 1) {
                // 上传是并发上传的没法知道多个请求的进度，暂时以发起的倒数第二个请求的进度作为总体的进度吧
                xhr.upload.onprogress = (event: any): void => {
                    // 文件进度获取事件
                    const { lengthComputable, loaded, total } = event;
                    const progress: number = Math.round(lengthComputable ? (loaded * 100) / total : 0); // 读取当前进度信息
                    TiUploadUtil.onProgress(items, progress);
                };
            }

            xhr.onload = (): void => {// 上传完成事件
                const { response, status } = xhr;
                resolve({ fileChunkItem, response, status });
            };

            xhr.onerror = (): void => {// 上传失败事件
                const { response, status } = xhr;
                resolve({ fileChunkItem, response, status });
            };

            xhr.onabort = (): void => {
                // 取消回调,在请求发送时可能因为浏览器导致请求未发出，此时 reponse 也为''为了区分这里传出一个自定义的值
                const response: string = 'tiCancel';
                const status: number = xhr.status;
                resolve({ fileChunkItem, response, status });
            };
            // 开始上传
            xhr.open(fileChunkItem[0].method, fileChunkItem[0].url, true);
            TiUploadUtil.setheaders(xhr, fileChunkItem);
            xhr.send(uploadDataObj);
            fileChunkItem[0]._xhr = xhr;
        });
    };

    private static uploadChunkedFile(items: Array<TiFileItem>, chunkSize: number): void {
        const file: File = items[0]._file; // 拿到文件H5下存在_file；不考虑 ie 下_input
        const { name, type, size } = file;
        const fileTime: number = new Date().getTime();
        const fileChunkList: Array<any> = [];
        let fileSliceStart: number = 0;
        let chunkedFileIndex: number = 0;
        const chunks: number = Math.ceil(size / chunkSize);
        while (fileSliceStart < file.size) {
            chunkedFileIndex = chunkedFileIndex + 1;
            const slicedFile: Blob = file.slice(fileSliceStart,fileSliceStart + chunkSize);
            const newChunkFile = new File([slicedFile], `${fileTime}-${chunkedFileIndex}/${chunks}-${name}`, { type });
            const fileItem: TiChunked = {
                url: items[0].url,
                file: TiFileItemUtil.createFileObject(newChunkFile),
                alias: items[0].alias,
                _file: newChunkFile,
                formData: items[0].formData || {},
                formDataFirst: items[0].formDataFirst,
                headers: items[0].headers,
                method: items[0].method,
                _xhr: {},
                index: chunkedFileIndex,
            };
            fileSliceStart += chunkSize;
            fileChunkList.push(fileItem);
        }
        TiUploadUtil.uploadChunkedXhr(items, fileChunkList);
    }

    private static uploadChunkedXhr(items: Array<TiFileItem>, fileChunkList: Array<TiChunked>): void {
        items[0].isUploading = true;
        let isSuccess: boolean = true;
        let currentFileIndex: number = 0;
        const source = of(...fileChunkList);
        const chunkedUploadSub: Observable<any> = source.pipe(
            map((fileChunkItem: TiChunked) => TiUploadUtil.chunkedFilePromise(items, [fileChunkItem], fileChunkList.length)),
            mergeAll()
        );
        chunkedUploadSub.subscribe((val: any) => {
            currentFileIndex++;
            if (isSuccess && currentFileIndex === fileChunkList.length && TiUploadUtil.isSuccessCode(val.status)) {
                // 如果之前都是成功的并且是最后一次且当次也成功 那么都上传成功 走 success 回调
                TiUploadUtil.onSuccess(items, val.response, val.status);
                TiUploadUtil.onComplete(items, val.response, val.status);
            } else if (isSuccess && val.response === 'tiCancel') {
                // 如果之前都是成功的且触发了取消；那么是因为主动取消上传；走 cancel 的回调；这里需要修改标记值保证只有第一次取消才触发
                isSuccess = false;
                TiUploadUtil.onCancel(items, '', val.status);
                TiUploadUtil.onComplete(items, '', val.status);
            } else if (isSuccess && !TiUploadUtil.isSuccessCode(val.status)) {
                // 如果之前都是成功的并且上传状态码不是正确的那么上传失败；一旦失败修改标记值 走 error 回调并取消所有上传
                isSuccess = false;
                TiUploadUtil.onError(items, val.response, val.status);
                TiUploadUtil.onComplete(items, val.response, val.status);
                // 有失败且不是最后一项取消上传
                currentFileIndex !== fileChunkList.length && TiUploadUtil.cancelFileChunkList(fileChunkList);
            }
            // 这里还应该有其他情况但不需要处理，暂时考虑以下两种：
            // 1.因为 error 所以 cancel ，此时 isSuccess 为 false
            // 2.因为 cancel 所以 cancel ，此时 isSuccess 为 false
        });
        TiUploadUtil.replaceFileMethod(items, fileChunkList);
    }

    // 这里替换掉原有 items[0] 的 cancel/remove/upload 方法；因为应该触发的不是原文件而是分片之后的文件队列
    private static replaceFileMethod(items: Array<TiFileItem>, fileChunkList: Array<TiChunked>): void {
        // 覆盖原有取消方法，原有方法不是箭头函数 this 指向items[0]这个对象本身；所以以下也用funcation去定义
        items[0].cancel = function () {
            items[0].isUploading && TiUploadUtil.cancelFileChunkList(fileChunkList);
            TiUploadUtil.onCancel(items, fileChunkList[0]._xhr.response, fileChunkList[0]._xhr.status);
            TiUploadUtil.onComplete(items, fileChunkList[0]._xhr.response, fileChunkList[0]._xhr.status);
        };
        // 覆盖原有移除方法
        items[0].remove = function (isRemove?: boolean): void {
            if (!this.allowDelete) {
                return;
            }
            if (isRemove) {
                // 触发外部定义的删除前的事件
                TiUploadUtil.onBeforeRemove([this]);
                return;
            }
            // 阻止文件上传进程
            items[0].isUploading && TiUploadUtil.cancelFileChunkList(fileChunkList);
            items[0].uploader.queue.splice(TiUploadUtil.getItemIndex(items[0]), 1);
            items[0].destroy();
            TiUploadUtil.onRemove(items);
        };
        // 覆盖原有上传方法
        items[0].upload = function () {
            if (!this.allowReload) {
                return;
            }
            TiUploadUtil.onBeforeSend(items);
            TiUploadUtil.uploadChunkedFile(items, items[0].uploader.config.chunkSize);
        };
    }

    private static cancelFileChunkList(fileChunkList: Array<TiChunked>) {
        fileChunkList.forEach((i: TiChunked) => {
            i._xhr.abort();
        });
    }
}
