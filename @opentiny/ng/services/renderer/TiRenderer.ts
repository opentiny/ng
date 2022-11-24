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
import {Renderer2, Injectable, RendererFactory2} from '@angular/core';
import { TiRendererModule } from './TiRendererModule';

/**
 * @ignore
 */
@Injectable({
    providedIn: TiRendererModule
  })
export class TiRenderer {
    private renderer: Renderer2;
    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * @description: 将节点插入某节点元素之后
     * @param: sourceEle 被插入节点
     * @param: targetEle 节点插入位置
     */
    public insertAfter(sourceEle, targetEle) {
        const parent = targetEle.parentNode;
        // 如果最后的节点是目标元素,则直接添加
        if (parent.lastChild === targetEle) {
            this.renderer.appendChild(parent, sourceEle);
        } else {// 如果不是,则插在目标元素的下一个兄弟节点之前
            this.renderer.insertBefore(parent, sourceEle, targetEle.nextSibling);
        }
    }
    /**
     * @description: 判读一个元素上是否存在某个样式类名
     * @param: ele 被判断的元素
     * @param: className 样式类名
     */
    public hasClass(element, className): boolean {
      const classList = element.classList;
      return classList.contains(className);
    }
    /**
     * @description: 给指定元素设置属性
     * @param: element 被设置的元素
     * @param: attr Object 属性对象
     */
    public setAttributes(element, attr: Object) {
        for (const key in attr) {
            if (Object.prototype.hasOwnProperty.call(attr, key)) {
                this.renderer.setAttribute(element, key, String(attr[key]));
            }
        }
    }

    /**
     * @description: 为元素添加多个样式
     * @param: ele 元素对象
     * @param: styles  Object 样式对象，如：{width: 100, height: 200}
     */
    public setStyles(ele, styles) {
        for (const key in styles) {
            if (Object.prototype.hasOwnProperty.call(styles, key)) {
                this.renderer.setStyle(ele, key, styles[key]);
            }
        }
    }

    /**
     * @description: 将节点插入某父容器，作为第一个元素
     * @param: parentEle 父节点元素
     * @param: sourceEle 需要插入的节点元素
     */
    public prepend(parentEle, sourceEle) {
        if (!parentEle) {
            return;
        }
        this.renderer.insertBefore(parentEle, sourceEle, parentEle.firstElementChild);
    }

    /**
     * @description: 查找一个元素下有某个样式类的子元素
     * @param: element 被查找的元素
     * @param: className 子元素的样式类名
     */
    public findChildrenByClassName(element, className): Array<any> {
        let resultChildren = [];
        resultChildren = Array.from(element.children).filter((child: any) => {
            return this.hasClass(child, className);
        });

        return resultChildren;
    }
    /**
     * @description: 查找一个元素下有某个样式类的子元素
     * @param: element 被查找的元素
     * @param: className 子元素的样式类名
     */
    public findChildrenByTagName(element, tagName: string): Array<any> {
        let resultChildren = [];
        resultChildren = Array.from(element.children).filter((child: any) => {
            return child.tagName === tagName;
        });

        return resultChildren;
    }
}
