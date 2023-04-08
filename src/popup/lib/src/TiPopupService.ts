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
/* eslint-disable no-param-reassign */
/**
 * 该类提供一个服务，用于管理弹出类组件的创建和销毁
 * 服务中提供三个方法:
 * create(componentType) 生成一个popup实例并返回对象，
 *   componentType：包裹内容的父容器元素类
 * 返回的实例对象中提供方法:
 * {
 *  show({ // 生成元素并在指定容器中显示
 *   content:弹出组件内容
 *   context:弹出组件上下文
 *   container:弹出组件最终放置的容器位置
 * }) : componentRef // 返回生成的组件实例
 *  hide():隐藏并销毁元素
 * }
 */
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
  SecurityContext,
  TemplateRef,
  ViewRef,
  Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { TiPopupModule } from './TiPopupModule';
import { Util } from '@opentiny/ng-utils';
/**
 * @ignore
 * 类型中any代表组件形式
 */
export type TiContentType = string | TemplateRef<any> | any;
/**
 * @ignore
 * popup show方法配置
 */
interface TiPopUpShowConfig {
  content?: TiContentType; // 弹出组件内容
  context?: any; // 弹出组件上下文
  contentContext?: any; // 内容部分的组件上下文
  contentParentInjector?: Injector; // 内容部分的组件父级注入器
  container?: any; // 弹出组件最终放置的容器位置
}
/**
 * @ignore
 * popup create返回值
 */
export interface TiPopUpRef {
  show(config: TiPopUpShowConfig | {}): ComponentRef<any>;
  hide(): void;
}
/**
 * @ignore
 */
class ContentRef {
  constructor(public nodes: Array<any>, public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}
/**
 * @ignore
 */
@Injectable({
  providedIn: TiPopupModule
})
export class TiPopupService<T> {
  /**
   * 由于该服务可能被其他服务使用到，并以服务的形式提供给外部；
   * 而Renderer2本身不能脱离于component之外定义或依赖，所以使用RendererFactory2方式实例化进行处理
   * 具体说明见如下：
   *  https://stackoverflow.com/questions/43070308/using-renderer-in-angular-4
   */
  private renderer: Renderer2;
  constructor(
    private injector: Injector,
    rendererFactory: RendererFactory2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private getParentEle(containerOpt: string | ElementRef): Element {
    if (containerOpt instanceof ElementRef) {
      // 父元素为正常element元素情况下
      return containerOpt.nativeElement;
    } else if (containerOpt === 'body') {
      // 父容器为body元素情况下
      return this.document.body;
    }
  }

  // 销毁组件相关内容
  private static destroyComponentRef(_componentRef: ComponentRef<any>): void {
    if (!_componentRef) {
      return;
    }
    // 销毁组件实例
    _componentRef.destroy();
    _componentRef = null;
  }

  // 销毁弹出内容相关内容
  private static destroyContentRef(contentRef: ContentRef): void {
    // 弹出内容如果有组件实例对象时，销毁组件实例
    if (contentRef.componentRef) {
      contentRef.componentRef.destroy();
    }
    // 销毁页面视图实例
    if (contentRef.viewRef) {
      contentRef.viewRef.destroy();
    }
    // 销毁内容实例
    contentRef = null;
  }
  public create(componentType: any): TiPopUpRef {
    let _contentRef: ContentRef; // 弹出内容实例
    let _componentRef: ComponentRef<T> | any; // 生成的组件实例对象

    return {
      show: (options?: TiPopUpShowConfig): ComponentRef<T> => {
        // component已生成情况下，不再重复生成
        if (_componentRef) {
          return _componentRef;
        }
        // 获取内容相关信息,包括：组件节点信息、组件实例信息、组件最小视图信息
        _contentRef = this.getContentRef(
          options && options.content,
          options && options.contentContext,
          options && options.contentParentInjector
        );

        // 创建组件实例：为内容本身再包一层父容器组件，用于控制组件（componentType）
        _componentRef = this.createCompoentRef({
          componentType,
          nodes: _contentRef.nodes,
          context: options && options.context
        });

        // 将元素放置在指定容器中
        const parentEle: Element = this.getParentEle(options && options.container);
        if (parentEle) {
          parentEle.appendChild(_componentRef.location.nativeElement);
        }

        // 这时弹出内容已经append,可以对弹出内容进行解析了。
        // 弹出内容中某些元素会在初始化时需要获取自身DOM宽高等，所以要保证弹出内容先append，然后再解析。
        // 解析ng-template形式的弹出内容实例
        if (options.content instanceof TemplateRef) {
          // 确保数据变化均可以被检测到
          _contentRef.viewRef.markForCheck();
          // 执行一次变化检测
          _contentRef.viewRef.detectChanges();
        }

        // 使用trycatch是为了组件实例化时产生错误控制台报错)的情况下，后续逻辑能够继续执行(不阻塞)。
        // 主要是为了弹框内容传入的是自定义组件 Component 情况下，当点击按钮打开弹窗，自定义的组件实例化时
        // 产生错误(控制台报错)的情况下，弹窗能正常的打开，且能正常的关闭。
        try {
          // 解析component形式的弹出内容实例
          if (typeof options.content === 'function') {
            // 在组件的 metadata 中如果设置了OnPush 条件，那么变化检测不会再次执行,
            // 但是调用该方法，可以确保数据变化被检测到
            _contentRef.componentRef.changeDetectorRef.markForCheck();
            // 从该组件到其子组件执行一次变化检测
            _contentRef.componentRef.changeDetectorRef.detectChanges();
          }
        } catch (error) {
          console.error(error);
        }

        _componentRef.tiContentRef = _contentRef;

        return _componentRef;
      },
      hide: (): void => {
        if (!_componentRef) {
          return;
        }
        TiPopupService.destroyComponentRef(_componentRef);
        TiPopupService.destroyContentRef(_contentRef);
        // 由于该变量在destroyComponentRef函数中赋为null不会改变外部值的改变，导致下次show时判断错误，因此此处需要做处理
        _componentRef = null;
      }
    };
  }

  private getContentRef = (content: TiContentType, context?: any, contentParentInjector?: Injector): ContentRef => {
    // ng-template形式
    if (content instanceof TemplateRef) {
      // 将template实例化为内嵌视图,并将其放在可运行环境中进行解析
      const embeddedViewRef: EmbeddedViewRef<any> = content.createEmbeddedView({
        context
      });
      this.applicationRef.attachView(embeddedViewRef); // 不做此处处理，ng-template中的标签不会解析

      return new ContentRef([embeddedViewRef.rootNodes], embeddedViewRef);
    }
    // 组件形式
    if (typeof content === 'function') {
      // 根据传入的component类（即content）创建组件引用
      const componentRef: ComponentRef<any> = this.createCompoentRef({
        componentType: content,
        context,
        notDetectChanges: true,
        parentInjector: contentParentInjector
      });

      return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
    }
    // element Dom形式
    if (content instanceof HTMLElement) {
      return new ContentRef([[content]]);
    }

    // string形式 或 SafeHtml(object类型) 形式，
    if (typeof content === 'string' || typeof content === 'object') {
      const wrapEle: Element = this.renderer.createElement('div');
      wrapEle.innerHTML = this.domSanitizer.sanitize(SecurityContext.HTML, content);

      return new ContentRef([wrapEle.childNodes]);
    }

    return new ContentRef([]);
  };
  /**
   * 创建组件实例
   * options {
   *   componentType: 组件类
   *   nodes：组件中的可注入节点
   *   context: 组件属性配置,inputs属性均可在此配置
   * }
   */
  public createCompoentRef(options: {
    componentType?: any;
    nodes?: Array<any>;
    context?: { outputs?: Object; [propName: string]: any };
    notDetectChanges?: boolean;
    parentInjector?: Injector;
  }): ComponentRef<any> {
    const injector: Injector = Injector.create({
      parent: options.parentInjector || this.injector,
      providers: []
    });
    // 1. 根据component类创建组件引用
    const componentRef: ComponentRef<any> = this.componentFactoryResolver
      .resolveComponentFactory(options.componentType)
      .create(injector, options.nodes);

    // 2. 将组件绑定在ng component树上，不做绑定情况下，内容中的指令无法解析
    this.applicationRef.attachView(componentRef.hostView);

    // 3. 绑定组件上下文定义
    Object.assign(componentRef.instance, options.context);
    // outputs事件绑定
    if (options.context && !Util.isUndefined(options.context.outputs)) {
      for (const key in options.context.outputs) {
        if (Object.prototype.hasOwnProperty.call(options.context.outputs, key)) {
          componentRef.instance[key].subscribe(options.context.outputs[key]);
        }
      }
    }

    // 4. 确保组件视图根据数据能实时刷新上。
    // 通过该处理可以确保组件及子组件都完成解析
    if (!options.notDetectChanges) {
      // 在组件的 metadata 中如果设置了OnPush 条件，那么变化检测不会再次执行,
      // 但是调用该方法，可以确保数据变化被检测到
      componentRef.changeDetectorRef.markForCheck();
      // 从该组件到其子组件执行一次变化检测
      componentRef.changeDetectorRef.detectChanges();
    }

    return componentRef;
  }
}
