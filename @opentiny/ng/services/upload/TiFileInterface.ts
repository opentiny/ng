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
/**
 * 单个文件基础信息接口，与浏览器中读取到的文件信息基本一致
 *
 * 以下使用会用到该类型：
 *
 * 1.[TiUploadComponent.addItemFailed]{@link ../components/TiUploadComponent.html#addItemFailed}回调的参数类型
 *
 * 2.[TiFileItem.file]{@link TiFileItem#file}的对象类型
 */
export interface TiFileInfo {
    /**
     * 文件修改时间
     */
    lastModifiedDate: Date;
    /**
     * 文件真实大小值,单位为B
     */
    size: number;
    /**
     * 文件大小，此处做了单位转换，方便界面详情显示，该数值根据文件大小单位区间显示，并保留两位小数
     */
    sizeWithUnit: string; // 做单位转换后的文件大小，方便界面详情显示
    /**
     * 文件名称
     */
    name: string;
    /**
     * 文件类型，此处是取的文件后缀名
     */
    type: string; // 确保浏览器形式的一致性
    /**
     * @ignore
     */
    _file: File; // 文件对象，只在H5方式下有效
    /**
     * @ignore
     */
    _input: Element; // 文件input对象，只在IE9 form表单提交方式下有效
}
/**
 * 单个文件详细信息接口，包含业务配置的上传信息、上传状态及方法等
 *
 * 作为文件上传回调中的参数类型使用，如[TiUploadComponent.completeAllItems]{@link ../components/TiUploadComponent.html#completeAllItems}回调中的参数类型
 */
export interface TiFileItem {
    /**
     * 文件是否处于待上传状态（beforeSend前设置）
     */
    isReady: boolean;
    /**
     * 文件是否正在上传
     */
    isUploading: boolean;
    /**
     * 文件是否已上传
     */
    isUploaded: boolean;
    /**
     * 文件是否取消上传
     */
    isCancel: boolean;
    /**
     * 文件是否上传成功
     */
    isSuccess: boolean;
    /**
     * 文件是否上传错误
     */
    isError: boolean;
    /**
     * 文件上传进度值
     */
    progress: number;

    /**
     * @ignore
     */
    isHover: boolean;
    /**
     * @ignore
     * 文件名称是否溢出
     */
    isOverflow: boolean;
    /**
     * @ignore
     */
    _xhr: any;
    /**
     * 文件在已选文件队列中的次序
     */
    index: number;
    /**
     * @ignore
     * 文件上传地址，为业务配置信息，只可获取
     */
    url: string; // 后台地址
    /**
     * 单个文件基础信息，只包含文件名及类型等信息，为业务配置信息，只可获取
     */
    file: TiFileInfo; // 文件详细信息情况
    /**
     * @ignore
     * 向后台发送请求时对应的文件对象name属性，该name属性是后台读取文件的入口值，为业务配置信息，只可获取
     */
    alias: string; // 文件name
    /**
     * @ignore
     */
    _file: File;
    /**
     * @ignore
     */
    _input: Element;
    /**
     * @ignore
     */
    _form: any;
    /**
     * 上传文件附带信息，为对象形式，可在beforeSend事件回调中进行单个文件的formData动态设置
     */
    formData: object; // 业务可自定义为对象形式
    /**
     * @ignore
     */
    formDataFirst: boolean;
    /**
     * @ignore
     */
    batchSend: boolean;
    /**
     * @ignore
     */
    headers: object; // 业务可自定义为对象形式
    /**
     * @ignore
     */
    method: string;
    /**
     * 该文件对应的上传实例对象
     */
    uploader: TiUploadRef; // 上传实例对象
    /**
     * 是否允许重新上传reload
     */
    allowReload?: boolean;
    /**
     * 是否允许reload
     */
    allowDelete?: boolean;
    /**
     * 上传该文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    upload(): void;
    /**
     * 取消上传该文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    cancel(): void;
    /**
     * 删除该文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    remove(): void;
    /**
     * 销毁该文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    destroy(): void;
}
/**
 * 文件过滤条件自定义接口
 *
 * 作为[TiUploadComponent.filters]{@link ../components/TiUploadComponent.html#filters}中的类型使用
 *
 * 当前支持四种过滤类型：
 *
 * maxCount：最大选择文件个数，当参数为1时，代表单文件上传
 *
 * type：文件选择类型，参数需使用文件扩展名分开，为了确保各浏览器的一致性，文件类型使用扩展名判断
 *
 * minSize/maxSize：文件大小限制，参数为number类型，代表文件大小，单位为b，IE9不支持文件大小的获取，因此不支持该条规则
 */
export interface TiFilter {
    /**
     * 规则名称
     */
    name: string;
    /**
     * 规则参数
     */
    params?: Array<any>;
    /**
     * 规则函数
     *
     * **参数：**
     *
     * fileItem: [TiFileInfo]{@link TiFileInfo}  文件信息
     *
     * params: Array<any> 传入的规则参数
     *
     * fileQueue: Array<[TiFileItem]{@link TiFileItem}> 文件队列
     *
     * **返回值：**
     *
     * 是否符合规则 boolean
     */
    fn?(fileObj: TiFileInfo, params: Array<any>, fileQueue: Array<TiFileItem>): boolean;
}
/**
 * 创建文件实例方法的配置信息接口
 *
 * 作为[TiUploadService.create]{@link ../injectables/TiUploadService.html#create}方法中的参数类型使用
 */
export interface TiUploadConfig {
    /**
     * 文件上传地址配置
     */
    url: string; // 文件上传地址配置
    /**
     * 上传方式，可选值为：get、post(其他方式IE9不支持)
     * @default 'post'
     */
    method?: string; // 上传方式，可选值为：get、post(其他方式IE9不支持)
    /**
     * 文件有效性判断条件数组
     */
    filters?: Array<TiFilter>; // 文件有效性判断条件数组
    /**
     * 向后台发送请求时对应的文件对象name属性，该name属性是后台读取文件的入口值
     * @default 'tiFile'
     */
    alias?: string; // 向后台发送请求时对应的文件对象name属性，该name属性是后台读取文件的入口值，默认值为 'tiFile'
    /**
     * 上传文件附带信息对象
     */
    formData?: object; // 上传文件附带信息
    /**
     * 是否自动上传
     * @default true
     */
    autoUpload?: boolean;
    /**
     * 是否一次请求传输多个文件，默认情况下一次请求上传一个文件
     * @default false
     */
    batchSend?: boolean;
    /**
     * 上传数据中，formData是否在file信息之前
     * @default false
     */
    formDataFirst?: boolean;
    /**
     * 上传文件请求头配置，自定义为对象形式
     */
    headers?: object; // 上传文件请求头配置
    /**
     * 分片上传每片大小
     */
    chunkSize?: number; // 分片大小，设置后开启分片上传单位是 b
    /**
     * 文件添加失败回调，可使用该回调定义上传错误时的错误提示
     *
     * **参数：**
     *
     * file: [TiFileInfo]{@link TiFileInfo} 上传文件信息
     *
     * validResults: Array&lt;string&gt; 校验不合法的规则name数组
     */
    onAddItemFailed?(fileObject: TiFileInfo, validResults: Array<string>): void; // 文件添加失败回调，可使用该回调定义上传错误时的错误提示
    /**
     * 文件添加成功回调
     *
     * **参数：**
     *
     * fileItem: [TiFileItem]{@link TiFileItem} 上传文件对象
     */
    onAddItemSuccess?(fileItem: TiFileItem): void;
    // 以下回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
    /**
     * 上传文件前回调，可在该回调中动态设置formData
     *
     * **参数：**
     * fileItems: Array<[TiFileItem]{@link TiFileItem}> 上传的文件对象
     */
    onBeforeSendItems?(fileItems: Array<TiFileItem>): void;
    /**
     * 上传进度更新回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}> 上传的文件对象
     *
     * progress: number 上传进度信息
     */
    onProgressItems?(fileItems: Array<TiFileItem>, progress: number): void;
    /**
     * 文件上传完成回调，成功/失败都会触发
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     *
     * response: string  // 文件上传响应信息
     *
     * status: number 文件上传响应状态码
     */
    onCompleteItems?(fileItems: Array<TiFileItem>, response: string, status: number): void;
    /**
     * 文件上传成功回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     *
     * response: string  // 文件上传响应信息
     *
     * status: number 文件上传响应状态码
     */
    onSuccessItems?(fileItems: Array<TiFileItem>, response: string, status: number): void;
    /**
     * 文件上传失败回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     *
     * response: string  // 文件上传响应信息
     *
     * status: number 文件上传响应状态码
     */
    onErrorItems?(fileItems: Array<TiFileItem>, response: string, status: number): void;
    /**
     * 文件上传取消回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     *
     * response: string  // 文件上传响应信息
     *
     * status: number 文件上传响应状态码
     */
    onCancelItems?(fileItems: Array<TiFileItem>, response: string, status: number): void;
    /**
     * 文件删除回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     */
    onRemoveItems?(fileItems: Array<TiFileItem>): void;
    /**
     * 文件删除前回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     */
    onBeforeRemoveItems?(fileItems: Array<TiFileItem>): void;
    /**
     * 所有文件上传完成回调
     *
     * **参数：**
     *
     * fileItems: Array<[TiFileItem]{@link TiFileItem}>, // 上传文件对象数组
     */
    onCompleteAllItems?(fileItems: Array<TiFileItem>): void; // 一个序列中所有文件上传完成回调：适用于串行上传，当最后一个文件上传完成时，触发该回调
}

/**
 * 文件上传实例对象接口
 *
 * 以下使用会用到该类型：
 *
 * 1.[TiUploadService.create]{@link ../injectables/TiUploadService.html#create}方法的返回值类型
 *
 * 2.[TiFileItem.uploader]{@link TiFileItem#uploader}对象类型
 *
 * 3.[tiFileSelect]{@link ../directives/TiFileSelectDirective.html}属性的配置类型
 */
export interface TiUploadRef {
    /**
     * 上传文件队列，只可读
     */
    queue: Array<TiFileItem>;
    /**
     * @ignore
     * 文件是否有单文件选择限制，只可读
     */
    isSingleFile: boolean;
    /**
     * @ignore
     */
    config: TiUploadConfig;
    /**
     * @ignore
     */
    _uploadComponentInstance: /* TiUploadComponent | TiUploadimageComponent | */ any;
    /**
     * @ignore
     */
    _addToQueue(files: FileList): Array<TiFileItem>; // 文件添加方法
    /**
     * 获取文件队列中未上传完成文件方法
     *
     * **参数：**无
     *
     * **返回值：**文件对象数组 Array<[TiFileItem]{@link TiFileItem}>
     */
    getNotUploadedItems():  Array<TiFileItem>;
    /**
     * 获取文件队列中已提交上传，但还未上传文件方法
     *
     * **参数：**无
     *
     * **返回值：**文件对象数组 Array<[TiFileItem]{@link TiFileItem}>
     */
    getReadyItems(): Array<TiFileItem>;
    /**
     * 上传队列中所有还未执行过上传的文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    uploadAll(): void;
    /**
     * 获取上传队列中是否有未上传过的文件方法
     *
     * **参数：**无
     *
     * **返回值：**boolean
     */
    isUploadedAll(): boolean;
    /**
     * 删除队列中所有文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    removeAll(): void;
    /**
     * 取消队列中所有上传文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    cancelAll(): void;
    /**
     * 重新上传队列中所有文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    reloadAll(): void;
    /**
     * 重新上传队列中所有上传错误文件方法
     *
     * **参数：**无
     *
     * **返回值：**void
     */
    reloadAllError(): void;
    /**
     * 上传队列中某几项文件方法
     *
     * **参数：**Array<[TiFileItem]{@link TiFileItem}>
     *
     * **返回值：**void
     */
    uploadItems(items: Array<TiFileItem>): void;
    /**
     * 删除队列中某几项文件方法
     *
     * **参数：**Array<[TiFileItem]{@link TiFileItem}>
     *
     * **返回值：**void
     */
    removeItems(items: Array<TiFileItem>): void;
    /**
     * 取消队列中某几项文件方法
     *
     * **参数：**Array<[TiFileItem]{@link TiFileItem}>
     *
     * **返回值：**void
     */
    cancelItems(items: Array<TiFileItem>): void;
}
/**
 * @ignore
 *
 * 分片上传的每片文件接口；暂时没有对外暴露
 */
export interface TiChunked {
    /**
     * 文件上传地址配置
     */
    url: string;
    /**
     * 上传方式，可选值为：get、post
     */
    method?: string;
    /**
     * 单个文件基础信息，只包含文件名及类型等信息，为业务配置信息，只可获取
     */
    file: TiFileInfo;
    /**
     * @ignore
     * 向后台发送请求时对应的文件对象name属性，该name属性是后台读取文件的入口值，为业务配置信息，只可获取
     */
    alias: string;
    /**
     * 上传文件附带信息对象
     */
    formData?: object;
    /**
     * 单个文件基础信息，只包含文件名及类型等信息，为业务配置信息，只可获取
     */
    _file: any;
    /**
     * 上传数据中，formData是否在file信息之前
     * @default false
     */
    formDataFirst?: boolean;
    /**
     * 上传文件请求头配置，自定义为对象形式
     */
    headers?: object;
    /**
     * @ignore
     */
    _xhr: any;
    /**
     * 分片上传时第几项文件
     */
    index: number;
}