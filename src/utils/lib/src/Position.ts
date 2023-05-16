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
import { TiLog } from './TiLog';
import { Util } from './Util';
/**
 * 位置显示类型定义，其中auto代表自适应位置显示
 */
export type TiPositionType =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'center'
  | 'auto'
  | 'none';
export type TiPositionEventType = 'tiScroll' | 'resize' | 'hashchange';
interface TiPositionLayout {
  hostLayout: TiHostLayout;
  targetLayout: TiEleLayout;
  avilableLayout: TiAvilableLayout;
  hostOffsetLayout?: TiHostLayout;
}
export interface TiHostLayout {
  top: number;
  left: number;
  width: number;
  height: number;
  // 最近的fixed定位的祖先元素
  fixedAncestor: any;
}
interface TiEleLayout {
  top: number;
  left: number;
  width: number;
  height: number;
}
interface TiAvilableLayout {
  left: number;
  maxLeft: number;
  right: number;
  maxRight: number;
  top: number;
  maxTop: number;
  bottom: number;
  maxBottom: number;
  clientHeight: number;
  clientWidth: number;
}
export interface TiPositionResult {
  position: TiPositionType;
  avilableHeight: number;
  hostLayout?: TiHostLayout;
}
interface TiLayoutParams {
  left: number;
  top: number;
  bottom?: number;
  avilableHeight: number;
}
interface TiVerticalParams {
  avilableHeight: number;
  top: number;
  bottom?: number;
}
/**
 * @ignore
 * 该类提供公共静态类方法，用于设置在body定位元素基于参照元素的位置信息,提供的核心方法如下：
 * setPosition()
 * 1. 入参为对象，参数信息如下：
 * {
 *   targetEle:需要定位的元素
 *   hostEle：参照元素
 *   position:定位位置
 *   hostSpace：待定位元素和参照元素间距
 *   browserSpace ：待定位元素和浏览器间距, 暂时只在上下位置生效
 *   consoleHeaderHeight: console页面头部高度
 *   hOffset: 自定义水平方向的偏移（在定位基础上的水平偏移，向左偏移为负值，向右偏移为正值）
 *   fixMaxHeight: 定位元素最大高度是否固定不变(显示不下时不用压缩高度)
 *   determinPositionFn：决定位置的函数
 * }
 * 2. 返回值为对象，信息如下：
 * {
 *   position:string 最终元素定位位置（当外部定义位置非13个可选位置时，会重新计算合适的位置进行定位，因此提供此位置信息供外部使用）
 *   avilableHeight:number 元素可用高度占位信息(外部可使用该信息进行高度的重新定义)
 * }
 */
export class Position {
  private static positionArr: Array<string> = [
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'left-top',
    'left-bottom',
    'right',
    'right-top',
    'right-bottom',
    'center'
  ];
  /* tip 针对较小元素做位置自适应处理，保证 tip 的箭头在被提示元素的中间，这是宽度或者高度的阈值
   * 取值为 15 的原因： 箭头定位偏移量9 + 箭头宽度的一半6 = 15px 相关变量变化时需要修改该常量
   */
  private static readonly ADAPTIVE_SIZE: number = 15;
  public static setPosition(options: {
    targetEle: any;
    hostEle: any;
    hostEleX?: any; // 决定定位元素水平方向的元素，用于宿主元素水平方向位置与host元素不一致的场景，暂不对外开放
    // 定位的参考元素，是离targetEle最近的absolute或relative元素，不传入时，是指targetEle以body为参考元素进行定位
    referElem?: any;
    position?: TiPositionType;
    hostSpace?: number;
    browserSpace?: number; // 与浏览器距离像素
    consoleHeaderHeight?: number;
    hOffset?: number; // 自定义水平方向的偏移（在定位基础上的水平偏移，向左偏移为负值，向右偏移为正值）
    fixMaxHeight?: boolean; // 定位元素最大高度是否固定不变(显示不下时不用压缩高度)
    hasOffsetFix?: boolean; // 是否存在定位偏差量（针对 tip 组件：当被提示元素尺寸较小时，保证 tip 的箭头在被提示元素的中间）
    bottomPostion?: boolean; // 计算位置的结果在上方时，以bottom属性定位，不用top定位，只在定位drop时使用
    determinPositionFn?(layout: any): string;
  }): TiPositionResult {
    // 入参非有效元素情况下，不做处理
    if (!Util.isElement(options.hostEle) || !Util.isElement(options.targetEle)) {
      TiLog.warn('position: hostEle or targetEle type is not element');

      // 防止外部使用报错，此处做返回值处理
      return {
        position: 'top',
        avilableHeight: 9999
      };
    }
    // 分别获取宿主和待定位元素当前位置
    const curLayout: TiPositionLayout = Position.getLayout(
      options.hostEle,
      options.targetEle,
      options.hostEleX,
      options.referElem,
      options.consoleHeaderHeight || 0
    );
    const hostSpace: number = options.hostSpace || 0;
    // 判断元素位置
    const position: any = options.determinPositionFn
      ? options.determinPositionFn(curLayout)
      : Position.determinPosition(options.position, curLayout, hostSpace, options.browserSpace || 0);
    const elePos: TiLayoutParams = Position.getLayoutParam(
      curLayout,
      position,
      options.bottomPostion,
      hostSpace,
      options.browserSpace || 0,
      options.hasOffsetFix || false
    );
    const hOffset: number = options.hOffset || 0;
    Position.setLayout(options.targetEle, elePos, curLayout, hOffset);
    Position.setMaxHeight(options.targetEle, elePos, curLayout, options.fixMaxHeight);
    Position.setDominatorDropDetachState(options.targetEle, elePos, curLayout, options.fixMaxHeight);

    return {
      position, // 最终元素定位位置
      avilableHeight: elePos.avilableHeight, // 元素可用高度占位
      hostLayout: curLayout.hostLayout
    };
  }

  /**
   * 添加影响host position的事件并返回其事件句柄
   * 由于Angular listen不支持多事件定义，因此在此处封装函数进行单独处理；此外，事件也不支持定义命名空间
   * 监听全局事件，用于处理页面位置出现变化导致宿主元素位置偏移，而tip的特殊情况下tip消失，
   * 并定义组件事件监听句柄，事件取消时会用到
   * 特殊场景包括：
   * 1. 拖动弹框位置导致的宿主元素位置变化
   * 2. 页面局部出滚动条，滚动条位置变化导致的宿主元素位置变化
   *    鼠标导致的滚轮事件可通过mousewheel/DOMMouseScroll监听（有冒泡的特性）
   *    拖拽导致的滚轮变化，需要业务通过trigger Tiny自定义事件tiScroll进行处理（无事件冒泡的特性）
   * 3.页面缩放
   * 4.路由切换页面
   */
  public static addPosChangeEvts(eventCallback: any, render: any, eventTypes?: Array<TiPositionEventType>): Array<() => void> {
    const eventHandles: Array<() => void> = [];
    // 修复SSR报错：ERROR ReferenceError: document is not defined
    if (typeof document === 'undefined') {
      return [];
    }
    // 需要添加的事件数据抽象
    let eventArr: Array<any> = [
      {
        // 鼠标拖动页面内滚动条场景，该事件需要业务通过trigger tiScroll事件进行处理
        ele: typeof document !== 'undefined' ? document : null,
        eventType: 'tiScroll',
        callback: eventCallback
      },
      {
        // 页面缩放
        ele: typeof window !== 'undefined' ? window : null,
        eventType: 'resize',
        callback: eventCallback
      },
      {
        // 路由切换页面
        ele: typeof window !== 'undefined' ? window : null,
        eventType: 'hashchange',
        callback: eventCallback
      }
    ];
    if (eventTypes) {
      eventArr = eventArr.filter((item: any) => eventTypes.includes(item.eventType));
    }
    eventArr.forEach((item: any) => {
      // 修复SSR问题： ERROR TypeError: Cannot read property 'addEventListener' of null
      if (item.ele) {
        return eventHandles.push(render.listen(item.ele, item.eventType, item.callback));
      }
    });

    return eventHandles;
  }
  /**
   * 清除绑定事件，与addPosChangeEvts对称
   */
  public static removePosChangeEvts(eventHandles: any): void {
    eventHandles.forEach((item: any) => {
      if (item) {
        item();
      }
    });
  }
  // 获取host和target元素的布局参数
  private static getLayout(
    hostEle: any,
    targetEle: any,
    horizonHostEle: any,
    referElem?: any,
    consoleHeaderHeight?: number
  ): TiPositionLayout {
    const hostLayout: TiHostLayout = Position.getHostEleLayout(hostEle, horizonHostEle);
    const layout = {
      hostLayout,
      targetLayout: Position.getEleLayout(targetEle),
      avilableLayout: Position.getAvilableLayout(hostLayout, consoleHeaderHeight)
    };
    if (Util.isElement(referElem)) {
      const hostOffsetLayout: any =
        referElem === hostEle
          ? {
              left: 0,
              top: 0
            }
          : {
              left: hostEle.offsetLeft,
              top: hostEle.offsetTop
            };
      layout['hostOffsetLayout'] = hostOffsetLayout;
    }

    return layout;
  }
  /**
   * 根据高亮浮层位置及提示弹窗位置情况计算具体显示位置
   * @param  position 元素位置定义信息
   * @param  layout 宿主和待定位元素位置信息
   * @param  hostSpace 宿主和待定位元素间距
   * @param  browserSpace 浏览器和待定位元素间距
   * @returns 提示弹窗呈现位置
   */
  private static determinPosition(position: TiPositionType, layout: TiPositionLayout, hostSpace: number, browserSpace: number): string {
    // position定义有效情况下，不做处理
    if (Position.isValidPosition(position, layout, hostSpace, browserSpace)) {
      return position;
    }
    const targetLayout: TiEleLayout = layout.targetLayout;
    const avilableLayout: TiAvilableLayout = layout.avilableLayout;
    // 元素位置距各部分位置
    const avilableLeft: number = avilableLayout.left;
    const avilableRight: number = avilableLayout.right;
    const avilableTop: number = avilableLayout.top;
    const avilableBottom: number = avilableLayout.bottom;
    const targetMaxWidth: number = targetLayout.width + hostSpace + browserSpace;
    const targetMaxHeight: number = targetLayout.height + hostSpace + browserSpace;
    const hostLayout: TiHostLayout = layout.hostLayout;
    if (avilableTop >= targetMaxHeight) {
      // 上方可显示完全
      const positionTop: string = Position.determinHorizon(layout, hostLayout);
      if (positionTop !== undefined) {
        return 'top' + positionTop;
      }
    }
    if (avilableRight >= targetMaxWidth) {
      // 右侧可显示完全，具体思路同上方可显示完全情况
      const positionRight: string = Position.determinVertical(layout, hostLayout);
      if (positionRight !== undefined) {
        return 'right' + positionRight;
      }
    }
    if (avilableBottom >= targetMaxHeight) {
      // 下方可显示完全，具体思路同上方可显示完全情况
      const positionBottom: string = Position.determinHorizon(layout, hostLayout);
      if (positionBottom !== undefined) {
        return 'bottom' + positionBottom;
      }
    }
    if (avilableLeft >= targetMaxWidth) {
      // 左侧足够显示情况下，左侧居中显示
      const positionLeft: string = Position.determinVertical(layout, hostLayout);
      if (positionLeft !== undefined) {
        return 'left' + positionLeft;
      }
    }

    return 'center'; // 上下左右均无法足够显示情况下，居中显示内容
  }
  /**
   * 垂直位置确定后，确定水平位置
   */
  private static determinHorizon(layout: TiPositionLayout, hostLayout: TiHostLayout): string {
    const targetLayout: TiEleLayout = layout.targetLayout;
    const avilableLayout: TiAvilableLayout = layout.avilableLayout;
    const avilableLeft: number = avilableLayout.left;
    const avilableMaxLeft: number = avilableLayout.maxLeft;
    const avilableRight: number = avilableLayout.right;
    const avilableMaxRight: number = avilableLayout.maxRight;
    const targetWidth: number = targetLayout.width;
    const targetCenterWidth: number = (targetLayout.width - hostLayout.width) / 2; // 水平居中情况下，左右侧占用的宽度分别比宿主元素宽多少
    if (avilableRight >= targetCenterWidth && avilableLeft >= targetCenterWidth) {
      // 提示元素超出被提示元素部分足够显示的情况下，优先居中显示
      return '';
    }
    if (avilableMaxRight >= targetWidth) {
      // 提示元素可在被提示元素左边界靠右完全显示情况下，向右显示
      return '-left';
    }
    if (avilableMaxLeft >= targetWidth) {
      // 提示元素可在被提示元素左边界靠左完全显示情况下，向左显示
      return '-right';
    }
  }
  /**
   * 水平位置确定后，确定垂直位置
   */
  private static determinVertical(layout: TiPositionLayout, hostLayout: TiHostLayout): string {
    const targetLayout: TiEleLayout = layout.targetLayout;
    const avilableLayout: TiAvilableLayout = layout.avilableLayout;
    const avilableTop: number = avilableLayout.top;
    const avilableMaxTop: number = avilableLayout.maxTop;
    const avilableBottom: number = avilableLayout.bottom;
    const avilableMaxBottom: number = avilableLayout.maxBottom;
    const targetHeight: number = targetLayout.height;
    const targetMiddleHeight: number = (targetLayout.height - hostLayout.height) / 2; // 垂直居中情况下，上下两侧占用的高度分别比宿主元素高多少
    if (avilableTop >= targetMiddleHeight && avilableBottom >= targetMiddleHeight) {
      return '';
    }
    if (avilableMaxBottom >= targetHeight) {
      return '-top';
    }
    if (avilableMaxTop >= targetHeight) {
      return '-bottom';
    }
  }

  // 判断定义的position是否为有效位置
  private static isValidPosition(position: TiPositionType, layout: TiPositionLayout, hostSpace: number, browserSpace: number): boolean {
    if (Position.positionArr.indexOf(position) === -1) {
      return false;
    }
    // 判断在指定的position是否能显示下
    const positionFragments: Array<string> = position.split('-');
    const targetLayout: TiEleLayout = layout.targetLayout;
    const avilableLayout: TiAvilableLayout = layout.avilableLayout;
    // 元素位置距各部分位置
    const avilableLeft: number = avilableLayout.left;
    const avilableRight: number = avilableLayout.right;
    const avilableTop: number = avilableLayout.top;
    const avilableBottom: number = avilableLayout.bottom;
    const targetMaxWidth: number = targetLayout.width + hostSpace + browserSpace;
    const targetMaxHeight: number = targetLayout.height + hostSpace + browserSpace;
    if (positionFragments[0] === 'top') {
      if (avilableTop < targetMaxHeight) {
        return false;
      }

      return Position.isValidHorizonPosition(positionFragments[1], layout);
    }
    if (positionFragments[0] === 'bottom') {
      if (avilableBottom < targetMaxHeight) {
        return false;
      }

      return Position.isValidHorizonPosition(positionFragments[1], layout);
    }
    if (positionFragments[0] === 'left') {
      if (avilableLeft < targetMaxWidth) {
        return false;
      }

      return Position.isValidVerticalPosition(positionFragments[1], layout);
    }
    if (positionFragments[0] === 'right') {
      if (avilableRight < targetMaxWidth) {
        return false;
      }

      return Position.isValidVerticalPosition(positionFragments[1], layout);
    }

    return true;
  }

  // 确定垂直位置是有效的后，判断水平位置是否有效
  private static isValidHorizonPosition(horizonPosition: string, layout: TiPositionLayout): boolean {
    const targetLayout: TiEleLayout = layout.targetLayout;
    const avilableLayout: TiAvilableLayout = layout.avilableLayout;
    const hostLayout: TiHostLayout = layout.hostLayout;
    const avilableLeft: number = avilableLayout.left;
    const avilableRight: number = avilableLayout.right;
    const avilableMaxLeft: number = avilableLayout.maxLeft;
    const avilableMaxRight: number = avilableLayout.maxRight;
    const targetWidth: number = targetLayout.width;
    const targetCenterWidth: number = (targetLayout.width - hostLayout.width) / 2; // 水平居中情况下，左右侧占用的宽度分别比宿主元素宽多少
    if (!horizonPosition) {
      return avilableRight >= targetCenterWidth && avilableLeft >= targetCenterWidth;
    }
    if (horizonPosition === 'left') {
      return avilableMaxRight >= targetWidth;
    }
    if (horizonPosition === 'right') {
      return avilableMaxLeft >= targetWidth;
    }

    return false;
  }

  // 确定水平位置是有效的后，判断垂直位置是否有效
  private static isValidVerticalPosition(verticalPosition: string, layout: TiPositionLayout): boolean {
    const targetLayout: TiEleLayout = layout.targetLayout;
    const avilableLayout: TiAvilableLayout = layout.avilableLayout;
    const hostLayout: TiHostLayout = layout.hostLayout;
    const avilableTop: number = avilableLayout.top;
    const avilableBottom: number = avilableLayout.bottom;
    const avilableMaxTop: number = avilableLayout.maxTop;
    const avilableMaxBottom: number = avilableLayout.maxBottom;
    const targetHeight: number = targetLayout.height;
    const targetMiddleHeight: number = (targetLayout.height - hostLayout.height) / 2; // 垂直居中情况下，上下两侧占用的高度分别比宿主元素高多少
    if (!verticalPosition) {
      return avilableTop >= targetMiddleHeight && avilableBottom >= targetMiddleHeight;
    }
    if (verticalPosition === 'top') {
      return avilableMaxBottom >= targetHeight;
    }
    if (verticalPosition === 'bottom') {
      return avilableMaxTop >= targetHeight;
    }

    return false;
  }

  // 设置提示弹窗位置
  private static setLayout(ele: any, position: TiLayoutParams, layoutParam: TiPositionLayout, hOffset: number): void {
    if (layoutParam.hostLayout.fixedAncestor && !layoutParam.hostOffsetLayout) {
      // fixed定位情况下，滚动条对其不受影响，因此此处需要减掉滚动条的位置影响
      // 如果是跟随宿主元素，也不能改为fixed定位，会脱离文档流，定位偏离
      ele.style.position = 'fixed';
      const top: string = position.top !== undefined ? `${position.top - window.pageYOffset}px` : '';
      const bottom: string = position.bottom !== undefined ? `${position.bottom + window.pageYOffset}px` : '';
      ele.style.left = `${position.left - window.pageXOffset + hOffset}px`;
      ele.style.top = top;
      ele.style.bottom = bottom;
    } else {
      const top: string = position.top !== undefined ? `${position.top}px` : '';
      const bottom: string = position.bottom !== undefined ? `${position.bottom}px` : '';
      ele.style.left = `${position.left + hOffset}px`;
      ele.style.top = top;
      ele.style.bottom = bottom;
    }
  }
  // 设置提示弹窗的MaxHeight
  private static setMaxHeight(ele: any, position: any, layoutParam: any, fixMaxHeight: boolean): void {
    if (fixMaxHeight || position.avilableHeight >= layoutParam.targetLayout.height) {
      return;
    }
    ele.style.maxHeight = `${position.avilableHeight}px`;
  }
  /**
   * 当drop固定高度（设置fixMaxHeight=ture)，且空间不足时，dominator和drop不相邻，此场景需要隐藏drop中的边框覆盖线，
   * 添加样式类'ti3-detach-dominator-drop'标记drop的这种场景状态，通过css样式控制drop中边框覆盖线的隐藏和显示
   * 目前该场景出现在日期类组件中
   */
  public static setDominatorDropDetachState(ele: HTMLElement, position: any, layoutParam: any, fixMaxHeight: boolean): void {
    if (!fixMaxHeight) {
      return;
    }
    if (position.avilableHeight < layoutParam.targetLayout.height) {
      ele.classList.add('ti3-detach-dominator-drop');
    } else {
      ele.classList.remove('ti3-detach-dominator-drop');
    }
  }

  private static getEleLayout(ele: any): TiEleLayout {
    // 修复SSR报错：ERROR TypeError: ele.getBoundingClientRect is not a function
    return {
      top: ele.offsetTop,
      left: ele.offsetLeft,
      width: typeof ele.getBoundingClientRect === 'function' ? ele.getBoundingClientRect().width : 0,
      height: typeof ele.getBoundingClientRect === 'function' ? ele.getBoundingClientRect().height : 0
    };
  }
  public static getHostEleLayout(hostEle: any, horizonHostEle?: any): TiHostLayout {
    let horizonEle = hostEle;
    if (Util.isElement(horizonHostEle)) {
      horizonEle = horizonHostEle;
    }
    // 修复SSR报错：ERROR TypeError: hostEle.getBoundingClientRect is not a function
    // 元素相对于windows的位置
    let top: number = typeof hostEle.getBoundingClientRect === 'function' ? hostEle.getBoundingClientRect().top : 0;
    let left: number = typeof hostEle.getBoundingClientRect === 'function' ? horizonEle.getBoundingClientRect().left : 0;
    // 修复SSR报错：ERROR ReferenceError: getComputedStyle is not defined
    // 下面利用body相对于windows的位置，计算元素相对于body的位置。
    const bodyPositon: string = typeof getComputedStyle === 'function' ? getComputedStyle(document.body, null).position : 'static';
    // body是static|relative|absolute|fixed都已测试，Chrome高低版本/Firefox/IE11已测。
    if (bodyPositon === 'static') {
      // static时，body对window没有偏移，但是需要考虑页面滚动条
      if (typeof window !== 'undefined') {
        top += window.pageYOffset;
        left += window.pageXOffset;
      }
    } else {
      // relative|fix|absolute时，需要考虑body相对于windows的偏移。
      top -= document.body.getBoundingClientRect().top;
      left -= document.body.getBoundingClientRect().left;
    }

    return {
      top,
      left,
      width: horizonEle.offsetWidth,
      height: hostEle.offsetHeight,
      fixedAncestor: this.getFixedAncestor(hostEle)
    };
  }

  private static getAvilableLayout(hostLayout: TiHostLayout, consoleHeaderHeight?: number): TiAvilableLayout {
    // 修复报错：ERROR ReferenceError: document is not defined
    // 当前浏览器可视区域的宽高
    const curBrowseWidth: number = typeof document !== 'undefined' ? document.documentElement.clientWidth : 0;
    const curBrowseheight: number = typeof document !== 'undefined' ? document.documentElement.clientHeight : 0;
    // 元素位置距各部分位置:
    // 1.以元素四个边为边界，上下左右预留的可用宽高，用avilableLeft等标识
    // 2.去掉元素的宽高占位，计算的最大可用宽高，用avilableMax...标识
    // 修复SSR错误：ERROR ReferenceError: pageXOffset is not defined
    const avilableLeft: number = hostLayout.left - (typeof window !== 'undefined' ? window.pageXOffset : 0);
    const avilableMaxLeft: number = avilableLeft + hostLayout.width;
    const avilableRight: number = curBrowseWidth - avilableMaxLeft;
    const avilableMaxRight: number = curBrowseWidth - avilableLeft;
    // document.body.scrollTop  document.documentElement.scrollTop存在浏览器差异，chrome高低版本表现不同。
    const curTop: number = hostLayout.top - (typeof window !== 'undefined' ? window.pageYOffset : 0); // pageYOffset支持IE9以上。
    const curMaxTop: number = curTop + hostLayout.height;
    const avilableTop: number = curTop - consoleHeaderHeight;
    const avilableMaxTop: number = avilableTop + hostLayout.height;
    const avilableBottom: number = curBrowseheight - curMaxTop;
    const avilableMaxBottom: number = curBrowseheight - curTop;

    return {
      left: avilableLeft,
      maxLeft: avilableMaxLeft,
      right: avilableRight,
      maxRight: avilableMaxRight,
      top: avilableTop,
      maxTop: avilableMaxTop,
      bottom: avilableBottom,
      maxBottom: avilableMaxBottom,
      clientHeight: curBrowseheight,
      clientWidth: curBrowseWidth
    };
  }
  // 确定元素是否为fixed定位
  private static getFixedAncestor(ele: any): any {
    if (!ele || ele.nodeName === 'HTML') {
      return null;
    }
    // 修复SSR报错：ERROR ReferenceError: getComputedStyle is not defined
    if (typeof getComputedStyle === 'undefined') {
      return null;
    }
    if (getComputedStyle(ele).position === 'fixed') {
      return ele;
    }

    return this.getFixedAncestor(ele.parentNode);
  }
  private static getLayoutParam(
    layout: TiPositionLayout,
    position: string,
    bottomPostion: boolean,
    hostSpace: number,
    browserSpace: number,
    hasOffsetFix: boolean
  ): TiLayoutParams {
    const positionArr: Array<string> = position.split('-'); // 跟上面静态变量重名,最好改一下
    const left: number = Position.getHorizionParam(layout, positionArr, hostSpace, hasOffsetFix);
    const verticalParam: TiVerticalParams = Position.getVerticalParam(
      layout,
      positionArr,
      bottomPostion,
      hostSpace,
      browserSpace,
      hasOffsetFix
    );

    return {
      left,
      top: verticalParam.top,
      bottom: verticalParam.bottom,
      avilableHeight: verticalParam.avilableHeight
    };
  }
  private static getHorizionParam(curLayout: TiPositionLayout, posArr: Array<string>, space: number, hasOffsetFix: boolean): number {
    const {
      hostOffsetLayout,
      hostLayout,
      targetLayout
    }: {
      hostOffsetLayout?: any;
      hostLayout: TiHostLayout;
      targetLayout: TiEleLayout;
    } = curLayout;

    // 定位偏差调整量（该偏差量针对较小元素，保证 tip 的箭头在被提示元素的中间）
    const offset = hasOffsetFix ? this.getOffsetFixVal(curLayout.hostLayout.width) : 0;
    const hostLeft: number = hostOffsetLayout ? hostOffsetLayout.left : hostLayout.left;

    // 'left', 'left-top', 'left-bottom'
    if (posArr[0] === 'left') {
      return hostLeft - targetLayout.width - space;
    }
    // 'right', 'right-top', 'right-bottom'
    if (posArr[0] === 'right') {
      return hostLeft + hostLayout.width + space;
    }
    // 'top-left', 'bottom-left'
    if (posArr[1] === 'left') {
      return hostLeft - offset;
    }
    // 'top-right', 'bottom-right'
    if (posArr[1] === 'right') {
      return hostLeft + hostLayout.width - targetLayout.width + offset;
    }

    // 'top', 'bottom', 'center'
    /**
     * 问题修复：当left为负值时，tip会超出页面，显示不全，此处进行优化。
     */
    const leftTemp: number = hostLeft - (targetLayout.width - hostLayout.width) / 2;

    return leftTemp >= 0 || hostOffsetLayout ? leftTemp : 0;
  }
  private static getVerticalParam(
    curLayout: TiPositionLayout,
    posArr: Array<string>,
    bottomPostion: boolean,
    hostSpace: number,
    browserSpace: number,
    hasOffsetFix: boolean
  ): TiVerticalParams {
    const avilableLayout: TiAvilableLayout = curLayout.avilableLayout; // 宿主元素对应的可用位置参数
    const hostHeight: number = curLayout.hostLayout.height; // 宿主元素本身高度
    const targetLayout: TiEleLayout = curLayout.targetLayout;
    const hostLayout: TiHostLayout = curLayout.hostLayout;
    const hostOffsetLayout: TiHostLayout = curLayout.hostOffsetLayout;

    // 定位偏差调整量（该偏差量针对较小元素，保证 tip 的箭头在被提示元素的中间）
    const offset = hasOffsetFix ? this.getOffsetFixVal(curLayout.hostLayout.height) : 0;
    const hostTop: number = hostOffsetLayout ? hostOffsetLayout.top : hostLayout.top;
    // 纵向可用高度是根据位置中top、bottom、居中情况进行的处理,因此,此处先将position进行分割，再根据其情况进行可用高度计算
    // 弹出元素下边线与宿主元素上边线相接后，弹出元素向上延伸情况，对应位置包含'top', 'top-left', 'top-right'
    if (posArr[0] === 'top') {
      const avilableHeight: number = avilableLayout.top - hostSpace - browserSpace;
      let bottom: number;
      let top: number;
      if (bottomPostion) {
        // 有hostOffsetLayout，target跟随宿主元素定位 否则target插入body；
        bottom = hostOffsetLayout ? hostHeight + hostSpace : avilableLayout.bottom + hostHeight + hostSpace - window.scrollY;
      } else {
        top =
          avilableHeight >= targetLayout.height ? hostTop - targetLayout.height - hostSpace : hostTop - avilableLayout.top + browserSpace;
      }

      return {
        avilableHeight,
        top,
        bottom
      };
    }
    // 弹出元素上边线与宿主元素下边线相接后，弹出元素向下延伸情况，对应位置包含'bottom', 'bottom-left', 'bottom-right'
    if (posArr[0] === 'bottom') {
      return {
        avilableHeight: avilableLayout.bottom - hostSpace - browserSpace,
        top: hostTop + hostLayout.height + hostSpace
      };
    }
    // 弹出元素上边线与宿主元素上边线对齐情况，对应位置包含'left-top', 'right-top'
    if (posArr[1] === 'top') {
      return {
        avilableHeight: avilableLayout.bottom + hostHeight,
        top: hostTop - offset
      };
    }
    // 弹出元素上边线与宿主元素下边线对齐情况，对应位置包含'right-bottom', 'left-bottom'
    if (posArr[1] === 'bottom') {
      return {
        avilableHeight: avilableLayout.top + hostHeight,
        top: hostTop + hostLayout.height - targetLayout.height + offset
      };
    }

    // 弹出元素中线与宿主元素中线对齐情况，对应位置包含'left', 'right', 'center'
    const avilableHeight: number = avilableLayout.clientHeight - browserSpace;
    const topTemp: number =
      avilableHeight >= targetLayout.height
        ? hostTop - (targetLayout.height - hostLayout.height) / 2
        : hostTop - avilableLayout.top + browserSpace;

    return {
      avilableHeight,
      top: topTemp >= 0 || hostOffsetLayout ? topTemp : 0
    };
  }
  // 获取定位偏差调整量
  private static getOffsetFixVal(hostLayoutSize: number): number {
    return hostLayoutSize / 2 < Position.ADAPTIVE_SIZE ? Position.ADAPTIVE_SIZE - hostLayoutSize / 2 : 0;
  }
}
