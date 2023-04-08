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
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TiIntroServiceModule } from './TiIntroModule';
import { TiModalRef } from '@opentiny/ng-modal';
import { TiModalService } from '@opentiny/ng-modal';
import { TiTipService } from '@opentiny/ng-tip';
import { TiTipRef } from '@opentiny/ng-tip';
import { Position, TiKeymap, TiLog, TiPositionEventType, Util } from '@opentiny/ng-utils';

import { TiIntromodalComponent } from './TiIntromodalComponent';
import { TiIntrotipComponent } from './TiIntrotipComponent';
import { TiIntroConfig, TiIntroRef, TiIntroShape, TiIntroStep } from './TiIntroInterface';

/**
 * 新手引导组件，适用于服务中内容（入口）新增和变动等指引提醒
 *
 * <p><span style="color: red">使用此组件时需要开发者在项目模块(建议在根模块)中引入BrowserAnimationsModule。</span>
 * 这是因为此组件中使用了 TiModalService，TiModalService需要BrowserAnimationsModule
 * （具体原因可以查看 [TiModalService]{@link ../injectables/TiModalService.html}），
 * 但是 BrowserAnimationsModule 不能在懒加载模块被重复引入，所以需要开发者来引入BrowserAnimationsModule，保证其引入一次。</p>
 *
 */
@Injectable({
  providedIn: TiIntroServiceModule
})
export class TiIntroService {
  // 视觉规范调整：modal、halfmodal、intro的蒙层统一调整为1200；弹窗体、intro的气泡是1300
  private static readonly BACKDROP_Z_INDEX: number = 1200;
  private static readonly TIP_Z_INDEX: number = 1300;
  private render: Renderer2;
  private unListenWindowResize: () => void;
  private unListenWindowHashchange: () => void;
  private closeMultiTipEleClickListener: () => void;
  private unListenDocumentKeydown: () => void;
  // 可聚焦元素
  private focusableElementsString: string = `a[href], area[href], input:not([disabled]):not([tabindex=\'-1\']),
    button:not([disabled]):not([tabindex=\'-1\']),select:not([disabled]):not([tabindex=\'-1\']),
    textarea:not([disabled]):not([tabindex=\'-1\']),
    iframe, object, embed, *[tabindex]:not([tabindex=\'-1\']), *[contenteditable=true]`;
  constructor(
    private tipService: TiTipService,
    private modalService: TiModalService,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.render = rendererFactory.createRenderer(null, null);
  }
  /**
   * intro的公共配置，不是默认配置，不能修改
   */
  private commonConfig: any = {
    trigger: 'manual',
    theme: 'white',
    maxWidth: '400px',
    zIndex: TiIntroService.TIP_Z_INDEX,
    registerVisibilityChangeEvent: false,
    /**
     * position在定位时注册了三个全局事件，intro都不需要，用空数组覆盖position中的事件类型数组
     */
    positionEventTypes: []
  };

  private static clearCircle(x: number, y: number, radius: number, stepClear: number, ctx: any): void {
    const calcWidth: number = radius - stepClear;
    const calcHeight: number = Math.sqrt(radius * radius - calcWidth * calcWidth);

    const posX: number = x - calcWidth;
    const posY: number = y - calcHeight;

    const widthX: number = calcWidth * 2;
    const heightY: number = calcHeight * 2;

    if (stepClear < radius) {
      ctx.clearRect(posX, posY, widthX, heightY);
      const newStepClear: number = stepClear + 1;
      TiIntroService.clearCircle(x, y, radius, newStepClear, ctx);
    }
  }

  private static scrollToViewport(element: any): void {
    // 修复SSR错误：ERROR TypeError: element.getBoundingClientRect is not a function
    if (typeof element.getBoundingClientRect !== 'function') {
      return;
    }
    const layout: any = element.getBoundingClientRect();

    const scrollTop: number = document.body.scrollTop || document.documentElement.scrollTop;
    // 修复SSR报错：ERROR ReferenceError: window is not defined
    if (typeof window === 'undefined') {
      return;
    }
    if (layout.top < 0) {
      // 上边界溢出屏幕
      window.scrollTo({ top: layout.top + scrollTop - 20 });
    } else if (layout.bottom > document.documentElement.clientHeight) {
      // 下边界溢出屏幕
      window.scrollTo({
        top: scrollTop + layout.bottom + 20 - document.documentElement.clientHeight
      });
    }
  }

  /**
   * 创建intro实例
   */
  public create(config: TiIntroConfig): TiIntroRef {
    let introRef: TiIntroRef; // create方法创建并返回的intro实例
    const steps: Array<TiIntroStep> = config.steps;
    let introModalRef: TiModalRef; // modal实例，用于隐藏弹窗
    let introTipRef: TiTipRef; // 是生成的tip，有show & hide
    let introMultiTipRefs: Array<TiTipRef> = []; // 多个tip场景下生成的tip实例数组
    let curStep: number = 0; // 在整个create方法中，标识当前步数
    let onResize: () => void; // 广义的resize事件，包括正常的resize和console UI顶部的弹出内容出现或隐藏
    let isAddConsoleDataOnChange: boolean = false; // 是否监听了 consoleDataService 的 OnChange 事件
    let consoleDataService: any;
    const lastStep: number = steps[steps.length - 1].step; // 最后一TiIntroStep的step属性值，即总步数
    // 关闭多个tip的操作元素
    const closeMultiTipEle: Element =
      steps.filter((item: TiIntroStep) => item.isAction).length > 0
        ? steps.filter((item: TiIntroStep) => item.isAction)[0].element
        : undefined;
    // 先隐藏closeMultiTipEle，并注册事件
    if (closeMultiTipEle) {
      this.render.setStyle(closeMultiTipEle, 'display', 'none');
    }
    this.unListenDocumentKeydown = this.render.listen(document, 'keydown', (event: KeyboardEvent): void => {
      switch (event.which) {
        case TiKeymap.KEY_TAB: // tab键用于处理在提示框内循环获取焦点
          this.clickTab(event);
          break;
        default:
          break;
      }
    });

    /**
     * @param flag boolean true:完成intro引导；false：未完成intro引导，但是退出
     */
    const close: (flag: boolean) => void = (flag: boolean): void => {
      if (introMultiTipRefs.length > 0) {
        introMultiTipRefs.forEach((item: TiTipRef) => {
          this.hidePreStep(item);
        });
        introMultiTipRefs = [];
        this.render.setStyle(closeMultiTipEle, 'display', 'none');
      } else {
        this.hidePreStep(introTipRef);
      }

      this.destroyBackdrop();

      if (flag && typeof config.onFinish === 'function') {
        config.onFinish();
      } else if (!flag && typeof config.onExit === 'function') {
        config.onExit();
      }
      if (this.unListenWindowResize) {
        this.unListenWindowResize();
        this.unListenWindowResize = undefined;
      }
      if (this.unListenWindowHashchange) {
        this.unListenWindowHashchange();
        this.unListenWindowHashchange = undefined;
      }
      if (this.closeMultiTipEleClickListener) {
        this.closeMultiTipEleClickListener();
      }
      if (this.unListenDocumentKeydown) {
        this.unListenDocumentKeydown();
        this.unListenDocumentKeydown = undefined;
      }
      if (consoleDataService?.offChange) {
        consoleDataService.offChange(onResize);
      }
    };

    /**
     * 无效步数条件：
     * 1.不是有效数字
     * 2.等于currentNumber，等于0除外
     * 3.小于0 或 大于 totalNumber
     * 使用curStep 和 lastStep，没有提为private方法
     */
    const isInvalidStepNum: (number: number) => boolean = (num: number): boolean => {
      return isNaN(num) || (curStep === num && num !== 0) || num < 0 || num > lastStep;
    };
    /**
     * 即将进入某一步的引导
     *
     * 需要在进入前做一些合法性判断，清除上一步信息等
     */
    const wantStep: (number: number) => void = (num: number): void => {
      if (isInvalidStepNum(num)) {
        TiLog.error('stepNumber is not valid');

        return;
      }
      this.hidePreStep(introTipRef);
      curStep = num;
      // 如果是在console环境下，进入第一步时，onChange的回调函数传入onResize事件，会在console变化时，重新绘制intro和backdrop
      if ((<any>window).getConsoleContext && !isAddConsoleDataOnChange) {
        consoleDataService = (<any>window).getConsoleContext()?.get({ name: 'safearea' });
        // 头部高度变化会触发此事件
        if (consoleDataService?.onChange) {
          consoleDataService.onChange(onResize);
          isAddConsoleDataOnChange = true;
        }
      }
      if (typeof config.beforeStep === 'function') {
        config.beforeStep(introRef, num);
      } else {
        goStep(num);
      }
      // 延时为了保证遮罩dom已经绘制完毕。
      setTimeout((): void => {
        // 在引导的时候，把焦点调整为遮罩层。为后续把焦点圈在提示框内做准备。
        const backdropEle: HTMLElement = document.querySelector('#ti3-intro-backdrop');
        if (backdropEle) {
          backdropEle.focus();
        }
      }, 100);
    };

    // 开始某一步的引导
    const goStep: (number: number) => void = (num: number): void => {
      const currentSteps: Array<TiIntroStep> = steps.filter((item: TiIntroStep) => item.step === num);
      // curIntroStep curIntroStep
      let currentStep: TiIntroStep;
      if (currentSteps.length === 1) {
        currentStep = currentSteps[0];
      }
      // 先关闭之前的canvas
      this.destroyBackdrop();
      /**
       * 具体的引导步骤分为3种
       * 1.总览页： 一个正常弹窗，用modal实现 intromodal
       * 2.分布页：带按钮的tip，用tipService实现
       * 3.提示： 没有按钮的普通tip，用tipService实现
       */
      // 第一种情况，弹窗
      if (currentStep && !currentStep.element) {
        introModalRef = this.modalService.open(TiIntromodalComponent, {
          id: 'ti3-intro-modal',
          context: {
            title: currentStep.title,
            content: currentStep.content,
            totalNumber: lastStep,
            currentNumber: curStep,
            finishButtonText: config.finishButtonText,
            id: config.id + '_' + num,
            close: (): void => {
              introModalRef.close();
            },
            wantStep,
            skipable: config.skipable
          },
          dismiss(): void {
            close(false);
          },
          draggable: false
        });

        return;
      }
      // 如果有弹窗的话，关闭弹窗
      if (introModalRef) {
        introModalRef._remove();
        introModalRef = undefined;
      }
      // 重新绘制canvas
      this.drawBackdrop();

      // 第二种情况，带按钮的tip
      if (currentStep && currentStep.title) {
        TiIntroService.scrollToViewport(currentStep.element);
        introTipRef = this.tipService.create(currentStep.element, {
          ...this.commonConfig,
          position: currentStep.position
        });
        introTipRef.show(TiIntrotipComponent, {
          title: currentStep.title,
          content: currentStep.content,
          totalNumber: lastStep,
          currentNumber: curStep,
          finishButtonText: config.finishButtonText,
          id: config.id + '_' + num,
          close,
          wantStep,
          skipable: config.skipable
        });

        this.highlight(currentStep.element, currentStep.shape);
      }

      // 第三种情况，普通tip，并且是多个，有一个是关闭按钮。和第二种情况是if else 的关系，重新列为一个if分支是为了让三种情况称为并列的if
      if (currentSteps && currentSteps.length > 1) {
        currentSteps.forEach((item: TiIntroStep): void => {
          if (item.isAction) {
            this.render.setStyle(item.element, 'display', 'block');
            this.closeMultiTipEleClickListener = this.render.listen(item.element, 'click', () => {
              close(true);
            });
          } else {
            TiIntroService.scrollToViewport(item.element);
            const introtipRef: TiTipRef = this.tipService.create(item.element, {
              ...this.commonConfig,
              position: item.position
            });
            introtipRef.show(item.content);
            introMultiTipRefs.push(introtipRef);

            this.highlight(item.element, item.shape);
          }
        });
      }
      // 修复SSR报错：ERROR ReferenceError: window is not defined
      if (!this.unListenWindowResize && typeof window !== 'undefined') {
        this.unListenWindowResize = this.render.listen(window, 'resize', () => {
          onResize();
        });
      }
      if (!this.unListenWindowHashchange && typeof window !== 'undefined') {
        this.unListenWindowHashchange = this.render.listen(window, 'hashchange', () => {
          close(false);
        });
      }
    };
    // 定义resize事件
    onResize = () => {
      this.hidePreStep(introTipRef);
      this.destroyBackdrop();
      goStep(curStep);
    };

    // 对外暴露的intro实例
    introRef = {
      start(): void {
        wantStep(0);
      },
      end(): void {
        close(true);
      },
      step: (number: number): void => {
        wantStep(number);
      },
      proceed(): void {
        goStep(curStep);
      }
    };

    return introRef;
  }
  /**
   * @ignore
   */
  public clickTab(event: KeyboardEvent): void {
    const introModal: HTMLElement = document.querySelector('.ti3-intromodal-wrapper');
    const focusableElements: NodeList = introModal?.querySelectorAll(this.focusableElementsString);

    Util.focusInDialogOnTabchange(event, focusableElements);
  }
  private destroyBackdrop(): void {
    const canvas: any = this.document.body.querySelector('#ti3-intro-backdrop');

    if (canvas) {
      // canvas.remove() IE报错；canvas.removeNode() Chrome报错；可以使用removeChild方法
      canvas.parentNode.removeChild(canvas);
    }
  }

  private hidePreStep(introTipRef: TiTipRef): void {
    if (introTipRef) {
      introTipRef.hide();
    }
  }

  private drawBackdrop(): void {
    if (typeof document === 'undefined') {
      return;
    }
    const canvas: any = this.render.createElement('canvas');
    this.render.setStyle(canvas, 'z-index', TiIntroService.BACKDROP_Z_INDEX);
    this.render.setStyle(canvas, 'position', 'absolute');
    this.render.setStyle(canvas, 'top', 0);
    this.render.setStyle(canvas, 'left', 0);
    this.render.setStyle(canvas, 'outline', 'none');
    this.render.setAttribute(canvas, 'tabindex', '0'); // 非表单元素想要使用focus()函数聚焦，需要设置tabindex属性。
    canvas.id = 'ti3-intro-backdrop';
    const ctx: any = canvas.getContext('2d');
    // _drawBackDrop(canvas, ctx) {
    // 获取整个页面宽高，用于计算canvas宽高
    // 获取整个页面的宽高,包括滚动条部分及body margin等
    let browserWidth: number = this.document.documentElement.scrollWidth;
    let browserHeight: number = this.document.documentElement.scrollHeight;
    // 获取整个页面可视区域宽高，页面不出滚动条情况下，该值原则上应该是与上述browser宽高相等的
    // 但是由于浏览器的计算差异，可能存在不相等的情况
    const clientWidth: number = this.document.documentElement.clientWidth;
    const clientHeight: number = this.document.documentElement.clientHeight;

    // 由于在IE下该宽高计算不精确，可能会导致页面本身无滚动条的情况下，
    // 当使用该值设置canvas宽度后，出现滚动条，因此需要对宽高进行特殊处理
    // 根据多次试验经验，发现当实际页面实际宽度为小数时，clientWidth取值为去掉小数点后的值，
    // scrollWidth则会自动+1，导致使用scrollWidth设置会出现滚动条，
    // 因此，通过两者之差小于1的方式判断该情况下，取小值设置canvas宽度即可解决该问题
    if (browserWidth - clientWidth <= 1) {
      browserWidth = clientWidth;
    }
    // 纵向情况下处理同上
    if (browserHeight - clientHeight <= 1) {
      browserHeight = clientHeight;
    }

    canvas.width = browserWidth;
    canvas.height = browserHeight;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, browserWidth, browserHeight);

    this.render.appendChild(this.document.body, canvas);
  }
  private highlight(element: any, shape: TiIntroShape): void {
    const layout: any = Position.getHostEleLayout(element, element);
    const canvas: any = this.document.body.querySelector('#ti3-intro-backdrop');
    // 修复SSR报错：ERROR TypeError: Cannot read property 'getContext' of undefined
    if (!canvas) {
      return;
    }
    const ctx: any = canvas.getContext('2d');
    const highlightLayout: any = { ...layout };
    if (layout.fixedAncestor) {
      // 如果被高亮的元素是fixed定位，以元素相对于视口的位置为高亮区域的定位
      this.render.setStyle(canvas, 'position', 'fixed');
      highlightLayout.top = element.getBoundingClientRect().top;
      highlightLayout.left = element.getBoundingClientRect().left;
    }
    if (shape === 'circle') {
      const radius: number = (highlightLayout.width < highlightLayout.height ? highlightLayout.width : highlightLayout.height) / 2;
      const x: number = highlightLayout.left + highlightLayout.width / 2;
      const y: number = highlightLayout.top + highlightLayout.height / 2;
      TiIntroService.clearCircle(x, y, radius, 1, ctx);
    } else {
      ctx.clearRect(highlightLayout.left, highlightLayout.top, highlightLayout.width, highlightLayout.height);
    }
  }
}
