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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { TiFileInfo, TiFileItem, TiFilter } from './TiFileInterface';
import { TiUploadService } from './TiUploadService';
import { TiModalService } from '@opentiny/ng-modal';
import { TiFilePreviewInfo, TiImagepreviewComponent } from '@opentiny/ng-imagepreview';
import { TiUploadbaseComponent, TiUploadimageInitFile } from './TiUploadbaseComponent';
import { DomSanitizer } from '@angular/platform-browser';

/**
 *
 * 该组件基于TiUploadService和已设计好的交互规范，实现上传图片功能（但不限于上传图片），包含两种样式：
 *
 * 1.带上传结果展示的样式(type为block)
 *
 * 2.不展示上传结果的样式(type为drag)
 *
 * 负责人：谭莉
 */
@Component({
  selector: 'ti-upload[type="block"], ti-upload[type="drag"]',
  templateUrl: './uploadimage.html',
  styleUrls: ['./uploadimage.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiUploadimageComponent extends TiUploadbaseComponent {
  /**
   * 上传文件的最大数量
   */
  @Input() maxCount: number;

  /**
   * 上传成功后是否可删除
   */
  @Input() deletable: boolean = true;

  /**
   * 必选，上传按钮样式
   * @customType 'block'
   */
  @Input() type: 'block' | 'drag';

  /**
   * 初始时显示已上传的图片列表
   */
  @Input() initFiles: Array<TiUploadimageInitFile>;

  /**
   * 图片预览时弹出框样式
   */
  @Input() modalClass: string = 'ti3-image-preview-modal';

  /**
   * @ignore
   * 上传结果展示，目前只有一种，picture-card；
   * 当type设置为drag时无效
   */
  listType: string = 'picture-card';

  /**
   * 文件上传数量达到上限时触发的回调，参数：文件预览信息列表
   */
  @Output() readonly uploadLimit: EventEmitter<Array<TiFilePreviewInfo>> = new EventEmitter<Array<TiFilePreviewInfo>>();

  /**
   * @ignore 内部变量
   */
  @ViewChild('uploadBtn', { static: false }) uploadBtn: ElementRef;
  /**
   * @ignore
   * 上传组件对应的input元素
   */
  @ViewChild('uploadInput', { static: false }) uploadInputEle: ElementRef;
  /**
   * 自定义上传样式
   * @ignore
   */
  @ContentChild('uploadContainer', { static: true })
  uploadContainerTemplate: ElementRef;

  /**
   * 上传按钮的宽度，只适用于 type 为 drag 的上传按钮
   * @ignore
   */
  @Input() uploadBtnWidth: string = '100px';

  /**
   * 上传按钮的高度，只适用于 type 为 drag 的上传按钮
   * @ignore
   */
  @Input() uploadBtnHeight: string = '100px';

  /**
   * @ignore 需要展示的文件列表
   */
  fileList: Array<TiFilePreviewInfo> = [];
  constructor(
    private uploaderService: TiUploadService,
    hostEle: ElementRef,
    renderer: Renderer2,
    private tiModal: TiModalService,
    public sanitizer: DomSanitizer,
    private zone: NgZone,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostEle, renderer);
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    super.ngOnInit();
    // 设置上传实例配置
    this.setUploadConfig();
    // 创建uploader实例
    this.uploadInst = this.uploaderService.create(this.uploadConfig, this);
    if (this.initFiles && this.maxCount) {
      // 在创建服务实例时，如果存在特殊情况最大数量-初始化文件长度=1时，service会判断文件为单文件上传，但实际上场景应该为多文件上传
      // 因此在setUploadConfig时根据实际传入的maxcount设置一次，在实例判断是否是单文件上传之后再修改为还允许上传的文件数
      const maxCountIndex: number = this.getMaxCountIndex();
      if (maxCountIndex !== -1) {
        this.uploadConfig.filters[maxCountIndex].params[0] = this.maxCount - this.initFiles.length;
      }
    }
    if (this.type === 'drag') {
      this.listType = '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['initFiles']) {
      if (changes['initFiles'].currentValue?.length > 0) {
        this.setInitFiles();
      }
      if (!changes['initFiles'].firstChange) {
        const maxCountIndex: number = this.getMaxCountIndex();
        if (maxCountIndex !== -1) {
          this.uploadConfig.filters[maxCountIndex].params[0] = this.maxCount - this.initFiles.length;
        }
      }
    }
  }

  ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    // 拖拽添加/上传时，设置上传按钮的高度和宽度
    if (this.uploadBtn && this.type === 'drag') {
      this.renderer.setStyle(this.uploadBtn.nativeElement, 'width', this.uploadBtnWidth);
      this.renderer.setStyle(this.uploadBtn.nativeElement, 'height', this.uploadBtnHeight);
    }
  }

  /**
   * 重新设置上传实例配置
   */
  private setUploadConfig(): void {
    this.setFilters();
    this.uploadConfig.onAddItemFailed = (file: TiFileInfo, validResults: Array<string>): void => {
      // 文件上传达上限，触发回调
      if (validResults.includes('maxCount')) {
        this.uploadLimit.emit(this.fileList);
      }
      this.addItemFailed.emit({ file, validResults });
    };
    this.uploadConfig.onAddItemSuccess = (fileItem: TiFileItem): void => {
      // 为了兼容适配 TiUploadComponent 对相关 allowDelete 和 allowReload 的处理
      fileItem.allowDelete = true;
      fileItem.allowReload = true;
      this.addPreviewList(fileItem);
      this.addItemSuccess.emit(fileItem);
    };
    this.uploadConfig.onSuccessItems = (fileItems: Array<TiFileItem>, response: string, status: number): void => {
      this.setPreviewInfo(fileItems[0]);
      this.successItems.emit({ fileItems, response, status });
    };
    this.uploadConfig.onRemoveItems = (fileItems: Array<TiFileItem>): void => {
      this.removePreviewList(fileItems[0]);
      this.removeItems.emit(fileItems);
    };
  }

  /**
   * 将初始时要显示的已上传的图片文件添加到预览列表
   */
  private setInitFiles(): void {
    this.initFiles.forEach((item: TiUploadimageInitFile) => {
      const file: TiFilePreviewInfo = {
        imgFileItem: { isSuccess: true, isUploaded: true },
        name: item.name,
        previewUrl: item.previewUrl,
        isImage: this.isImage(item.name, item.previewUrl),
        fromInitFiles: true
      };
      item.remove = (): void => {
        const index: number = this.fileList.findIndex((fileItem: TiFilePreviewInfo): boolean => {
          return fileItem === file;
        });
        if (index !== -1) {
          this.fileList.splice(index, 1);
          this.changeDetectorRef.markForCheck();
        }
      };
      file.imgFileItem.remove = (): void => {
        // 获取需要删除的数据的索引
        const deleteIndex: number = this.fileList.findIndex((fileItem: TiFilePreviewInfo): boolean => {
          return fileItem === file;
        });
        const maxCountIndex: number = this.getMaxCountIndex();
        if (maxCountIndex !== -1) {
          this.uploadConfig.filters[maxCountIndex].params[0] += 1;
        }
        if (this.isRemove) {
          this.beforeRemoveItems.emit([item]);
        } else {
          this.fileList.splice(deleteIndex, 1);
          this.removeItems.emit([item]);
        }
      };
      this.fileList.push(file);
    });
  }

  /**
   * 设置过滤条件
   */
  private setFilters(): void {
    let uploadFilters: Array<TiFilter> = this.filters || [];
    if (typeof this.maxCount === 'number' && this.maxCount > 0) {
      uploadFilters = uploadFilters.concat({
        name: 'maxCount',
        params: [this.maxCount]
      });
    }
    this.uploadConfig.filters = uploadFilters;
  }

  /**
   * 添加文件成功后，增加一个预览对象
   */
  private addPreviewList(fileItem: TiFileItem): void {
    const imgInfoItem: TiFilePreviewInfo = {
      imgFileItem: fileItem,
      name: fileItem._file.name,
      previewUrl: '',
      isImage: false
    };
    this.fileList.push(imgInfoItem);
  }

  /**
   * 删除时，将文件信息从预览列表中移除
   */
  private removePreviewList(fileItem: TiFileItem): void {
    // 获取需要删除的数据的索引
    const deleteIndex: number = this.fileList.findIndex((item: TiFilePreviewInfo): boolean => {
      return fileItem._file === item.imgFileItem._file;
    });
    this.fileList.splice(deleteIndex, 1);
  }

  /**
   * 上传成功后，更新预览地址
   */
  private setPreviewInfo(fileItem: TiFileItem): void {
    // 生成预览url
    const url: string = window.URL.createObjectURL(fileItem._file);
    const isImagePromise: Promise<boolean> = this.isImage(fileItem._file.name, url);
    isImagePromise.then((result: boolean) => {
      this.fileList.forEach((item: TiFilePreviewInfo): void => {
        if (item.imgFileItem._file === fileItem._file) {
          item.previewUrl = url;
          item.isImage = result;
        }
      });
      this.changeDetectorRef.markForCheck();
    });
  }

  /**
   * @ignore 在弹框中预览上传的图片
   * 参数i: 表示被点击图片的索引
   */
  public preview(i: number): void {
    const previewList: Array<TiFilePreviewInfo> = [];
    let firstIndex: number = i;
    this.fileList.forEach((item: TiFilePreviewInfo, index: number): void => {
      if (item.imgFileItem.isSuccess && item.isImage) {
        // 上传成功并且是图片
        previewList.push(item);
      } else {
        // 非图片或上传失败，并且在被点击的文件之前，第一个预览的索引需要-1
        if (i >= index) {
          firstIndex -= 1;
        }
      }
    });
    this.tiModal.open(TiImagepreviewComponent, {
      id: 'imagePreviewModal',
      modalClass: this.modalClass,
      context: {
        index: firstIndex, // 当前文件索引
        fileList: previewList // 预览列表
      }
    });
  }

  /**
   * 判断是否是图片类型
   * 参数fileName: 文件名称
   * 参数previewUrl: 预览地址
   */
  private isImage(fileName: string, previewUrl: string): Promise<boolean> {
    const tempArray: Array<string> = fileName.split('.');
    const extension: string = tempArray[tempArray.length - 1].toLocaleLowerCase();
    const supportTypes: Array<string> = ['jpg', 'png', 'jpeg', 'svg', 'gif', 'bmp'];

    return new Promise((resolve) => {
      if (!supportTypes.includes(extension)) {
        resolve(false);

        return;
      }
      this.zone.runOutsideAngular(() => {
        // 测试图片能否加载成功，能加载成功，则认为可预览；否则，认为不可预览
        const img: any = document.createElement('img');
        img.src = previewUrl;
        img.onerror = (event: any): void => {
          resolve(false);
        };
        img.onload = (event: any): void => {
          resolve(true);
        };
      });
    });
  }

  /**
   * @ignore 禁用上传时，阻止默认事件、停止冒泡
   */
  selectFile(event: any): void {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();

      return;
    }
    // 焦点转移
    this.uploadBtn.nativeElement.focus();
  }

  /**
   * @ignore
   */

  public onKeydown(): void {
    this.uploadInputEle.nativeElement.focus();
  }
}
