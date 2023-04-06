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
 * @ignore
 */
export type HandlerFnType = (key: any, value: any, add: boolean, from?: any) => void;
// TODO:未来看typescript如何继承Map
/**
 * @ignore
 */
export class ObservableMap {
  // 代理模式
  private map: Map<any, any> = new Map<any, any>();
  get size(): number {
    return this.map.size;
  }
  constructor() {
    this.map = new Map();
  }
  // 观察者模式
  private handlerSet: Set<HandlerFnType> = new Set<HandlerFnType>();
  public addObserver(handlerFn: HandlerFnType): void {
    this.handlerSet.add(handlerFn);
  }
  public removeObserver(handlerFn: HandlerFnType): void {
    this.handlerSet.delete(handlerFn);
  }
  // 通知函数，不会通知到发起源
  private notify(key: any, value: any, add: boolean, from: any): void {
    this.handlerSet.forEach((handlerFn: HandlerFnType) => {
      handlerFn(key, value, add, from);
    });
  }
  //  设置，可以添加发起源，那么消息不会通知到发起源。
  public set(key: any, value: any, from?: any): this {
    if (!this.map.has(key) || (this.map.has(key) && this.map.get(key) !== value)) {
      this.map.set(key, value);
      this.notify(key, value, true, from);
    }

    return this;
  }
  //  删除，可以添加发起源，那么消息不会通知到发起源。
  public delete(key: any, from?: any): boolean {
    if (this.map.has(key)) {
      this.map.delete(key);
      this.notify(key, undefined, false, from);

      return true;
    }

    return false;
  }
  public has(key: any): boolean {
    return this.map.has(key);
  }
  public get(key: any): boolean {
    return this.map.get(key);
  }
  public getMap(): Map<any, any> {
    // 方便遍历Map，所有有了这个方法。
    return this.map;
  }
}
