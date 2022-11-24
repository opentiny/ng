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
import { Component, Input, SimpleChange, SimpleChanges, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { TiBaseComponent } from '../base/TiBaseModule';
import { Util } from '../../utils/Util';
//
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

// TODO：如果封装为胶囊样式，DOM内部多一层，比现在优劣？
/**
 *  Icon组件
 *
 *  Icon组件可以设置显示Icon。
 *
 */
@Component({
  selector: 'ti-icon:not([local])',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TiIconComponent extends TiBaseComponent {
  /**
   * Icon基路径
   */
  private static path: string = '';
  /**
   * 保存url和观察者，避免并发的重复请求。
   */
  private static urlObservableMap: Map<string, Observable<string>> = new Map<
    string,
    Observable<string>
  >();
  /**
   * 保存url和Data，相同的url，只发一次http。
   */
  private static urlDataMap: Map<string, string> = new Map<string, string>();
  /**
   * 图标名称
   */
  @Input() name: string;

  constructor(
    protected hostRef: ElementRef,
    protected renderer: Renderer2,
    private http: HttpClient
  ) {
    super(hostRef, renderer);
  }

  /**
   * 设置icon下载地址，默认是''
   * @param path
   */
  public static setPath(path: string): void {
    TiIconComponent.path = path;
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const nameChange: SimpleChange = changes['name'];
    if (nameChange && !Util.isEmptyString(nameChange.currentValue)) {
      // 拼接URL
      const url: string = `${TiIconComponent.path}${nameChange.currentValue}.svg`;
      // 取出缓存数据
      const data: string = TiIconComponent.urlDataMap.get(url);
      // 如果曾经下载过，有缓存数据
      if (data) {
        // 将<svg>挂在<ti-icon>下
        this.nativeElement.innerHTML = data;
      } else {
        // 如果并没有下载过，无缓存数据
        // 取出观察者
        let ob: Observable<string> = TiIconComponent.urlObservableMap.get(url);
        if (!ob) {
          // 如果不存在观察者，则发起http请求。share()是为了避免每次订阅都发起http请求。
          ob = this.http.get(url, { responseType: 'text' }).pipe(share());
          // 保存ur和观察者
          TiIconComponent.urlObservableMap.set(url, ob);
        }
        // 订阅http请求结果
        ob.subscribe((svgText: string): void => {
          // 将<svg>挂在<ti-icon>下
          this.nativeElement.innerHTML = svgText;
          // 删除url和观察者
          TiIconComponent.urlObservableMap.delete(url);
          // 保存数据
          TiIconComponent.urlDataMap.set(url, svgText);
        });
      }
    }
  }
}
/* ti-icon组件，为了防止多个组件重复使用字体图标文件，导致最终用户打包文件成倍增大。
因此封装该组件，确保最终打包只引用一份字体图标样式及文件 */
