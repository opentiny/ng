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
import { ComponentRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TiRenderer } from '@opentiny/ng-renderer';
import { TiLog, TiPositionType, Util } from '@opentiny/ng-utils';
import { TiTipRef, TiTipService, TiTipShowInfo } from '@opentiny/ng-tip';
import { TiOverflowServiceModule } from './TiOverflowServiceModule';

/**
 * @ignore
 * overflow配置项接口，用于[TiOverflowService.create]{@link ../injectables/TiOverflowService.html#create}参数使用
 */
export interface TiOverflowConfig {
  /**
   * tip显示时所依据的元素，使用该元素位置显示tip位置，默认为宿主元素,当tip显示所依赖的元素的和宿主元素不一致时才需要定义
   */
  tipElement?: Element | Function;
  /**
   * tip内容，默认为宿主元素文本
   */
  tipContent?: string;
  /**
   * tip位置
   */
  tipPosition?: TiPositionType;
  /**
   * tip最大宽度
   */
  tipMaxWidth?: string;
  /**
   * @ignore
   * 决定定位元素水平方向的元素，用于宿主元素水平方向位置与host元素不一致的场景，暂不对外开放
   */
  tipHostEleX?: Element;
}
/**
 * @ignore
 * create方法返回值
 */
export interface TiOverflowRef {
  destroy(): void;
}
/**
 * @ignore
 * 文本过长出...并tip提示配置项，使用该服务时需要引入模块TiOverflowServiceModule，该组件提供了两种使用方式:
 *
 * 1.服务方式（见如下说明）
 *
 * 2.指令方式：[TiOverflowDirective]{@link ../directives/TiOverflowDirective.html}
 *
 */
@Injectable({
  providedIn: TiOverflowServiceModule
})
export class TiOverflowService {
  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2, private tiRenderer: TiRenderer, private tipService: TiTipService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  /**
   * 生成tip提示方法
   * @param hostElement 文本过长的宿主对象
   * @param config overflow配置项
   * 返回 {destroy(): void} 销毁文本过长的tip提示，使用服务方式时，需要在宿主元素销毁时，通过调用该方法销毁文本过长的tip提示
   */
  create(hostElement: Element, config?: TiOverflowConfig): TiOverflowRef {
    this.tiRenderer.setStyles(hostElement, {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    });
    // 非法情况处理
    if (!Util.isElement(hostElement)) {
      TiLog.warn('overflow: hostEle type is not element');

      // 防止外部使用报错，此处做返回值处理
      return {
        destroy(): void {}
      };
    }
    // 如果该元素为inline元素时，宽度不生效会导致元素出...样式不生效，因此此处做处理
    // 修复SSR报错：ERROR ReferenceError: getComputedStyle is not defined
    if (typeof getComputedStyle !== 'undefined' && getComputedStyle(hostElement).display === 'inline') {
      this.renderer.setStyle(hostElement, 'display', 'inline-block');
    }
    const tipInstance: TiTipRef = this.generateTip(hostElement, config || {});

    return {
      destroy(): void {
        if (tipInstance) {
          tipInstance.hide();
        }
      }
    };
  }
  /**
   * @ignore
   */
  public isOverflow(element: Element): boolean {
    // 复制DOM，并计算元素宽度
    // 此处使用clone方式而不使用scrollWidth方式,是因为目前发现scrollWidth在IE下获取到的值有问题，不可作为文本溢出的判断条件
    const eleStyles: any = getComputedStyle(element);
    const cloneEle: any = element.cloneNode(true);
    this.tiRenderer.setStyles(cloneEle, {
      // 涉及内容字体的相关样式处理
      fontSize: eleStyles.fontSize,
      fontWeight: eleStyles.fontWeight,
      fontFamily: eleStyles.fontFamily,
      padding: eleStyles.padding,
      paddingLeft: eleStyles.paddingLeft, // 处理在IE和火狐下获取padding为空问题：在火狐和IE下只能用只能用padding+[方位]的方式来获取元素的padding值
      paddingRight: eleStyles.paddingRight,
      border: eleStyles.border,
      boxSizing: eleStyles.boxSizing,
      height: eleStyles.height,
      // 涉及宽度布局的相关样式处理
      maxWidth: 'none', // 清除最大宽度样式，确保内容可显示完全
      width: 'auto',
      overflow: 'visible',
      display: 'inline-block', // display block的情况下，元素父容器设置margin时，导致导致body变宽，从而与元素本身宽度不匹配，会导致可显示完全但出tip的问题，因此此处改变其display方式
      visibility: 'hidden', // 元素隐藏但做占位处理
      whiteSpace: 'nowrap',
      position: 'absolute', // 避免克隆元素影响页面高度，导致出滚动条
      left: '-9999px',
      top: '-9999px'
    });
    this.renderer.appendChild(document.body, cloneEle);
    // 使用getBoundingClientRect而不使用getComputedStyle,是因为getComputedStyle在
    // 各浏览器获取到的宽度不一致（IE下取到的是内容宽度，而在Chrome和FF下取到的是整个元素宽度）。
    // IE下计算精度高(小数点后15位)，多数中文和数字或英文混排的文本计算出来的 maxWidth 和 textWidth
    // 由于精度高而导致有微小差距，从而影响了 isOverflow 的判断结果，从实际测试得来结论：保留两位小数能够保证判断结果更准确些。
    const maxWidth: number = parseFloat(element.getBoundingClientRect().width.toFixed(2));
    const textWidth: number = parseFloat(cloneEle.getBoundingClientRect().width.toFixed(2));
    // 此处没有使用angular的Renderer2是因为Renderer2.removeChild必须有变化检测才能在dom上生效，
    // 此处考虑到性能不触发变化检测，所以选择使用原生的removeChild方法。
    document.body.removeChild(cloneEle);

    return textWidth > maxWidth;
  }
  private generateTip(element: Element, options: TiOverflowConfig): TiTipRef {
    // 文本超长时，显示tip提示：
    // tip显示位置元素设置：默认为element
    const config: TiOverflowConfig = options || {};
    let hostEleConfig: any = config.tipElement;
    if (typeof hostEleConfig === 'function') {
      hostEleConfig = hostEleConfig(element);
    }
    const tipHostEle: Element = hostEleConfig || element;

    return this.tipService.create(tipHostEle, {
      hostEleX: config.tipHostEleX,
      position: config.tipPosition,
      maxWidth: config.tipMaxWidth,
      trigger: 'mouse',
      showFn: (): TiTipShowInfo => {
        // tipContent 为空 或者 未溢出情况下，不显示tip
        // tipPosition设置为none是去除Select默认超长tip，改由template内容自定义tip
        if (config.tipPosition === 'none' || config.tipContent === '' || !this.isOverflow(element)) {
          return;
        }
        // tip内容设置：默认为元素中的文本内容
        let tipContent: string = config.tipContent;
        if (Util.isUndefined(tipContent)) {
          // content可能为""，因此此处判断undefined而不使用||
          // 使用element.textContent不能解析html片段
          tipContent = element.innerHTML;
        }

        return { content: tipContent };
      }
    });
  }
}
