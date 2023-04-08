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
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { TiFileInfo, TiFileItem, TiFilter, TiUploadConfig, TiUploadRef } from './TiFileInterface';
import { TiBaseComponent } from '@opentiny/ng-base';
import { TiLocale } from '@opentiny/ng-locale';
import { TiBrowser, Util } from '@opentiny/ng-utils';
import packageInfo from '../package.json';
/**
 * 初始化显示的文件列表项目（只适用于button/textButton类型）
 */
export interface TiUploadInitFile {
  /**
   * 文件名
   */
  name: string;
  /**
   * 操作按钮（删除按钮）是否禁用
   */
  allowDelete: boolean;
  /**
   * 删除该文件方法
   *
   * **参数：**无
   *
   * **返回值：**void
   */
  remove?(): void;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}

/**
 * 初始化显示的已上传的图片文件信息
 *
 *
 */
export interface TiUploadimageInitFile {
  /**
   * 图片文件名
   */
  name: string;
  /**
   * 图片预览地址
   */
  previewUrl?: string;
  /**
   * 允许有多余的属性字段
   */
  [propName: string]: any;
}

/**
 *
 * upload基类，继承于TiBaseComponent组件
 */
@Component({
  selector: 'ti-uploadbase',
  template: ''
})
export class TiUploadbaseComponent extends TiBaseComponent implements OnInit {
  /**
   * 必选，上传地址
   */
  @Input() url: string;
  /**
   * 上传方式
   */
  @Input() method: 'get' | 'post' = 'post';
  /**
   * 自定义过滤器
   */
  @Input() filters: Array<TiFilter>;
  /**
   * 上传的文件字段名
   */
  @Input() alias: string = 'tiFile';
  /**
   * 上传文件的附带信息
   */
  @Input() formData: object;
  /**
   * 上传对象的附带信息是否先于file对象
   */
  @Input() formDataFirst: boolean = false;
  /**
   * 是否自动上传
   */
  @Input() autoUpload: boolean = true;
  /**
   * 是否一次上传多个文件。默认情况下，一次上传一个文件
   */
  @Input() batchSend: boolean = false;
  /**
   *
   * 上传文件请求头配置，自定义为对象形式
   *
   * 设置'X-Requested-With'可以判断是Ajax请求还是其他请求；'X-Requested-With':'XMLHttpRequest'返回数据是json，不设置返回普通html文本
   */
  /**
   * 上传文件请求头
   */
  @Input() headers: object;
  //  文件类型过滤配置，适用于IE10+浏览器，能做到文件弹窗中不出现非法类型的文件，主要适用于两种场景：
  //  1.过滤规则中带类型过滤，但是想要去掉文件选择框中文件过滤的场景（设置accept为空字符串即可）：此种场景应用于浏览器设置accept后导致文件窗打开很慢的情况
  //  2.不需要定义文件类型过滤条件，但是通过accept能精确的确保文件类型的场景
  /**
   * 限制文件上传类型。设置此属性后，选择文件时的资源管理窗口将自动隐藏不符合规则的文件
   */
  @Input() accept: string;

  /**
   * 是否禁用
   */
  @Input() disabled: boolean = false;

  /**
   * 分片大小，设置后开启分片上传单位是 b
   */
  @Input() chunkSize: number;

  /**
   * @ignore
   */
  title: string = TiBrowser.isChrome() ? ' ' : ''; // 禁用文件上传默认tip提示,Chrome下设置title为""时会显示默认提示，所以Chrome下需要设置为" ";而IE下设置为" "会显示文本为空的tip

  // 文件添加失败回调，可使用该回调定义上传错误提示
  // 参数为对象形式，结构如下：
  // {
  // file: [TiFileInfo]{@link ../interfaces/TiFileInfo.html}, // 上传文件信息
  // validResults: Array&lt;string&gt;  // 校验不合法的规则name数组
  // }
  /**
   * 文件添加失败时触发的回调，可使用该回调定义上传错误提示，参数：文件对象
   */
  @Output() readonly addItemFailed: EventEmitter<{
    file: TiFileInfo;
    validResults: Array<string>;
  }> = new EventEmitter<{
    file: TiFileInfo;
    validResults: Array<string>;
  }>();
  /**
   * 文件添加成功时触发的回调，参数：文件对象
   */
  @Output() readonly addItemSuccess: EventEmitter<TiFileItem> = new EventEmitter<TiFileItem>();
  // 以下回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
  /**
   * 上传文件前触发的回调，可在该回调中动态设置formData，参数：文件对象列表
   */
  @Output() readonly beforeSendItems: EventEmitter<Array<TiFileItem>> = new EventEmitter<Array<TiFileItem>>();
  // 上传文件进度改变回调
  // 该回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
  // 参数为对象形式，结构如下：
  // {
  //   fileItems: Array<[TiFileItem]{@link ../interfaces/TiFileItem.html}>, // 上传文件对象数组
  //   progress: number  // 进度信息
  // }
  /**
   * 上传进度改变时触发的回调，参数：文件对象
   */
  @Output() readonly progressItems: EventEmitter<{
    fileItems: Array<TiFileItem>;
    progress: number;
  }> = new EventEmitter<{
    fileItems: Array<TiFileItem>;
    progress: number;
  }>();
  // 文件上传完成回调，成功/失败都会触发
  // 该回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
  // 参数为对象形式，结构如下：
  // {
  //   fileItems: Array<[TiFileItem]{@link ../interfaces/TiFileItem.html}>, // 上传文件对象数组
  //   response: string  // 文件上传响应信息
  //   status: number 文件上传响应状态码
  // }
  /**
   * 上传完成（成功或失败）时触发的回调，参数：文件对象
   */
  @Output() readonly completeItems: EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }> = new EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }>();
  // 文件上传成功回调
  // 该回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
  // 参数为对象形式，结构如下：
  // {
  //   fileItems: Array<[TiFileItem]{@link ../interfaces/TiFileItem.html}>, // 上传文件对象数组
  //   response: string  // 文件上传响应信息
  //   status: number 文件上传响应状态码
  // }
  /**
   * 文件上传成功时触发的回调，参数：文件对象
   */
  @Output() readonly successItems: EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }> = new EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }>();
  // 文件上传取消回调
  // 该回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
  // 参数为对象形式，结构如下：
  // {
  //   fileItems: Array<[TiFileItem]{@link ../interfaces/TiFileItem.html}>, // 上传文件对象数组
  //   response: string  // 文件上传响应信息
  //   status: number 文件上传响应状态码
  // }
  /**
   * 文件上传失败时触发的回调，参数：文件对象
   */
  @Output() readonly errorItems: EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }> = new EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }>();
  /**
   * @ignore
   * 文件上传取消回调
   *
   * 该回调对单个或多个文件在同一url同时上传有效，可使用其进行文件上传过程中的业务处理
   *
   * 参数为对象形式，结构如下：
   *
   * {
   *
   * fileItems: Array<[TiFileItem]{@link ../interfaces/TiFileItem.html}>, // 上传文件对象数组
   *
   * response: string  // 文件上传响应信息
   *
   * status: number 文件上传响应状态码
   *
   * }
   */
  /**
   * 文件上传取消时触发的回调，参数：文件对象
   */
  @Output() readonly cancelItems: EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }> = new EventEmitter<{
    fileItems: Array<TiFileItem>;
    response: string;
    status: number;
  }>();
  /**
   * 上传删除时触发的回调，参数：被删除的文件对象列表
   */
  @Output() readonly removeItems: EventEmitter<Array<TiFileItem | TiUploadInitFile | TiUploadimageInitFile>> = new EventEmitter<
    Array<TiFileItem | TiUploadInitFile | TiUploadimageInitFile>
  >();
  /**
   * 所有文件上传完成时触发的回调，参数：文件对象列表
   */
  @Output() readonly completeAllItems: EventEmitter<Array<TiFileItem>> = new EventEmitter<Array<TiFileItem>>();
  /**
   * 上传文件删除前触发的回调，参数：将被删除的文件对象列表
   */
  @Output() readonly beforeRemoveItems: EventEmitter<Array<TiFileItem | TiUploadInitFile | TiUploadimageInitFile>> = new EventEmitter<
    Array<TiFileItem | TiUploadInitFile | TiUploadimageInitFile>
  >();

  /**
   * 上传实例配置信息
   */
  public uploadConfig: TiUploadConfig;

  /**
   * @ignore 上传文件实例
   */
  public uploadInst: TiUploadRef;

  /**
   * @ignore 是否定义beforeRemoveItems事件
   */
  isRemove: boolean;

  /**
   * @ignore 词条
   */
  protected versionInfo: string = super.getVersion(packageInfo);
  public uploadLan = TiLocale.getLocaleWords().tiUpload;

  constructor(protected hostRef: ElementRef, protected renderer: Renderer2) {
    super(hostRef, renderer);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 如果uploadConfig存在，并监听到url和headers变化
    if (this.uploadConfig) {
      // 由于uploadConfig的引用地址与实例对象的config相同，更新到实例对象的config中
      if (changes['url']) {
        this.uploadConfig.url = this.url;
      }
      if (changes['headers']) {
        this.uploadConfig.headers = this.headers;
      }
    }
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.isRemove = this.beforeRemoveItems.observers.length !== 0;
    this.uploadConfig = {
      url: this.url, // 文件上传地址配置
      method: this.method, // 上传方式，可选值为：get、post(其他方式IE9不支持)
      filters: this.filters, // 文件有效性判断条件数组
      alias: this.alias, // 向后台发送请求时对应的文件对象name属性，该name属性是后台读取文件的入口值，默认值为 'tiFile'
      formData: this.formData, // 上传文件附带信息
      autoUpload: this.autoUpload, // 是否自动上传，默认为true
      batchSend: this.batchSend || false, // 是否一次性上传多个文件
      formDataFirst: this.formDataFirst || false, // formData是否先于file对象
      headers: this.headers, // 上传文件请求头配置
      chunkSize: this.chunkSize, // 分片大小，设置后开启分片上传单位是 b
      onAddItemFailed: (file: TiFileInfo, validResults: Array<string>): void => {
        this.addItemFailed.emit({ file, validResults });
      },
      onAddItemSuccess: (fileItem: TiFileItem): void => {
        // 默认删除、禁用图标为非禁用状态
        fileItem.allowDelete = true;
        fileItem.allowReload = true;
        this.addItemSuccess.emit(fileItem);
      },
      onBeforeSendItems: (fileItems: Array<TiFileItem>): void => {
        this.beforeSendItems.emit(fileItems);
      },
      onProgressItems: (fileItems: Array<TiFileItem>, progress: number): void => {
        this.progressItems.emit({ fileItems, progress });
      },
      onCompleteItems: (fileItems: Array<TiFileItem>, response: string, status: number): void => {
        this.completeItems.emit({ fileItems, response, status });
      },
      onSuccessItems: (fileItems: Array<TiFileItem>, response: string, status: number): void => {
        this.successItems.emit({ fileItems, response, status });
      },
      onErrorItems: (fileItems: Array<TiFileItem>, response: string, status: number): void => {
        this.errorItems.emit({ fileItems, response, status });
      },
      onCancelItems: (fileItems: Array<TiFileItem>, response: string, status: number): void => {
        this.cancelItems.emit({ fileItems, response, status });
      },
      onRemoveItems: (fileItems: Array<TiFileItem>): void => {
        this.removeItems.emit(fileItems);
      },
      onBeforeRemoveItems: (fileItems: Array<TiFileItem>): void => {
        this.beforeRemoveItems.emit(fileItems);
      },
      onCompleteAllItems: (fileItems: Array<TiFileItem>): void => {
        this.completeAllItems.emit(fileItems);
      }
    };
    // 根据配置的文件类型过滤属性设置H5下的文件过滤属性,如果accept未定义,则按照type过滤条件进行设置；
    // 如果accept已定义，则按照accept定义设置：此种场景应用于浏览器设置accept后导致文件窗打开很慢的情况
    if (Util.isUndefined(this.accept) && this.filters && this.filters.length) {
      this.filters.forEach((filter: TiFilter) => {
        if (filter.name === 'type') {
          this.accept = filter.params[0];
        }

        return;
      });
    }
  }
  /**
   * 手动上传，可通过组件调用
   */
  public upload(): void {
    this.uploadInst.uploadAll();
  }

  /**
   * @ignore 获取maxCount条件下标
   */
  public getMaxCountIndex(): number {
    return this.uploadConfig.filters?.findIndex((filter: TiFilter) => {
      return filter.name === 'maxCount';
    });
  }
}
