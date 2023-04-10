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
export type SetHandlerFnType = (item: any, add: boolean, from?: any) => void;
// TODO:未来看typescript如何继承Set
/**
 * @ignore
 */
export class ObservableSet {
  // 代理模式
  private set: Set<any> = new Set<any>();
  get size(): number {
    return this.set.size;
  }
  constructor(items?: any) {
    this.set = new Set(items);
  }
  // 观察者模式
  private handlerSet: Set<SetHandlerFnType> = new Set<SetHandlerFnType>();
  public addObserver(handlerFn: SetHandlerFnType): void {
    this.handlerSet.add(handlerFn);
  }
  public removeObserver(handlerFn: SetHandlerFnType): void {
    this.handlerSet.delete(handlerFn);
  }
  private notify(item: any, isAdd: boolean, from: any): void {
    this.handlerSet.forEach((handlerFn: SetHandlerFnType) => {
      handlerFn(item, isAdd, from);
    });
  }
  public add(item: any, from?: any): this {
    if (!this.set.has(item)) {
      this.set.add(item);
      this.notify(item, true, from);
    }

    return this;
  }
  public delete(item: any, from?: any): boolean {
    if (this.set.has(item)) {
      this.set.delete(item);
      this.notify(item, false, from);

      return true;
    }

    return false;
  }
  public has(item: any): boolean {
    return this.set.has(item);
  }
}
